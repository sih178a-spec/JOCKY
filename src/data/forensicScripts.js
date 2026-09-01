export const SAMPLE_SCRIPTS = [
  {
    id: "dkom_hunt",
    title: "DKOM Hidden Process Hunt",
    category: "Memory Forensics",
    description: "Detects rootkits and hidden processes by traversing Direct Kernel Object structures (EPROCESS) vs active scheduling tables.",
    targetOS: "Windows & Linux",
    code: `// JOCKY Forensic Module: DKOM Hidden Process Discovery
module EnterpriseDefense.DKOMHunter;

import forensics.kernel.process;
import forensics.memory.vad;
import telemetry.sink;

workflow HuntUnlinkedProcesses(target: host) {
    // 1. Query scheduler and direct kernel ActiveProcessLinks
    let active_threads = process.enumerate_active_schedulers();
    let eprocess_list = process.scan_pool_tags(tag: "Proc");

    for p in eprocess_list {
        // Compare physical kernel object with OS process table
        if (!active_threads.contains_pid(p.pid) || p.is_unlinked) {
            sink.emit_alert(
                severity: CRITICAL,
                alert_type: "DKOM_HIDDEN_PROCESS",
                pid: p.pid,
                image_name: p.image_path,
                eprocess_addr: p.kernel_address
            );
            
            // Non-destructively snapshot VAD tree for offline triage
            let vad_nodes = vad.extract_tree(p.pid, mode: VOLATILE_READONLY);
            sink.stream_telemetry(channel: "MEMORY_TRIAGE", payload: vad_nodes);
        }
    }
}`,
    ast: {
      type: "Program",
      module: "EnterpriseDefense.DKOMHunter",
      imports: ["forensics.kernel.process", "forensics.memory.vad", "telemetry.sink"],
      workflow: "HuntUnlinkedProcesses",
      statements: [
        { type: "VariableDecl", name: "active_threads", call: "process.enumerate_active_schedulers()" },
        { type: "VariableDecl", name: "eprocess_list", call: "process.scan_pool_tags(tag='Proc')" },
        { type: "ForLoop", iterator: "p", collection: "eprocess_list", body: "Check is_unlinked -> Emit Alert & Stream VAD" }
      ]
    },
    llvmIR: `; ModuleID = 'jocky_dkom_hunter.bc'
target datalayout = "e-m:e-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-pc-windows-msvc"

define void @HuntUnlinkedProcesses(%struct.host* %target) {
entry:
  %sched_list = call i8* @jocky_kintrospect_sched_list()
  %proc_pool = call i8* @jocky_kscan_pool_tags(i32 1886613360) ; 'Proc'
  br label %loop.check

loop.check:
  %curr = phi i8* [ %proc_pool, %entry ], [ %next, %loop.body ]
  %is_unlinked = call i1 @jocky_eval_dkom_linkage(i8* %curr, i8* %sched_list)
  br i1 %is_unlinked, label %alert.unlinked, label %loop.next

alert.unlinked:
  call void @jocky_sink_emit(i32 3, i8* %curr) ; CRITICAL
  br label %loop.next

loop.next:
  %next = call i8* @jocky_pool_next(i8* %curr)
  %has_more = icmp ne i8* %next, null
  br i1 %has_more, label %loop.check, label %exit

exit:
  ret void
}`,
    binarySize: "642 KB",
    compiledMetrics: {
      compileTimeMs: 38,
      memoryAllocBytes: "1.2 MB",
      riskScore: "HIGH"
    },
    simulationOutput: [
      { timestamp: "14:20:01.104", type: "INIT", text: "Initializing JOCKY LLVM 18.1 micro-engine..." },
      { timestamp: "14:20:01.118", type: "COMPILE", text: "Compiling 'EnterpriseDefense.DKOMHunter' -> Native micro-binary (642 KB)" },
      { timestamp: "14:20:01.142", type: "KERNEL", text: "Kernel pool tag scanner initialized [Tag: 'Proc']" },
      { timestamp: "14:20:01.189", type: "AUDIT", text: "Auditing 248 active thread schedulers against physical EPROCESS list..." },
      { timestamp: "14:20:01.215", type: "ALERT", level: "CRITICAL", text: "[ALERT] Unlinked Kernel Process Found! PID: 4892 (Image: svch0st_fake.exe)" },
      { timestamp: "14:20:01.228", type: "TELEMETRY", text: "EPROCESS Addr: 0xFFFFB201A94F8080 | ActiveProcessLinks altered (DKOM detected)" },
      { timestamp: "14:20:01.240", type: "STREAM", text: "VAD Tree extracted (42 pages, 1 unbacked RWX region @ 0x7FFA81000000)" },
      { timestamp: "14:20:01.255", type: "SUCCESS", text: "Triage sweep complete in 41ms. Telemetry encrypted & streamed to SOC Broker." }
    ]
  },
  {
    id: "byovd_audit",
    title: "BYOVD Vulnerable Driver Auditor",
    category: "Kernel Defense",
    description: "Inspects loaded Windows/Linux kernel drivers against known vulnerability hashes and detects disabled EDR callbacks.",
    targetOS: "Cross-Platform",
    code: `// JOCKY Forensic Module: Kernel Driver & BYOVD Mitigation
module EnterpriseDefense.BYOVDAuditor;

import forensics.kernel.drivers;
import forensics.kernel.callbacks;
import threatintel.whql;
import telemetry.sink;

workflow AuditKernelIntegrity(node: endpoint) {
    let loaded_drivers = drivers.get_active_modules();
    let known_bad_hashes = threatintel.load_known_vulnerable_hashes();

    // 1. Verify digital certificates and WHQL status
    for driver in loaded_drivers {
        if (!driver.is_valid_whql || known_bad_hashes.contains(driver.sha256)) {
            sink.emit_alert(
                severity: HIGH,
                alert_type: "VULNERABLE_DRIVER_DETECTED",
                driver_name: driver.base_name,
                base_address: driver.image_base,
                sha256: driver.sha256
            );
        }
    }

    // 2. Audit PsSetCreateProcessNotifyRoutine array for zeroed pointers
    let edr_callbacks = callbacks.inspect_process_creation_callbacks();
    for cb in edr_callbacks {
        if (cb.is_tampered || cb.is_nullified) {
            sink.emit_alert(
                severity: CRITICAL,
                alert_type: "EDR_CALLBACK_SUBVERTED",
                offset: cb.callback_offset
            );
        }
    }
}`,
    ast: {
      type: "Program",
      module: "EnterpriseDefense.BYOVDAuditor",
      imports: ["forensics.kernel.drivers", "forensics.kernel.callbacks", "threatintel.whql"],
      workflow: "AuditKernelIntegrity",
      statements: [
        { type: "VariableDecl", name: "loaded_drivers", call: "drivers.get_active_modules()" },
        { type: "Iteration", name: "driver", condition: "!is_valid_whql || is_bad_hash" },
        { type: "AuditCall", call: "callbacks.inspect_process_creation_callbacks()" }
      ]
    },
    llvmIR: `; ModuleID = 'jocky_byovd_auditor.bc'
define void @AuditKernelIntegrity(%struct.endpoint* %node) {
entry:
  %drv_list = call %struct.driver_iter* @jocky_enum_kernel_modules()
  %cbs = call i8* @jocky_inspect_kernel_callbacks(i32 1) ; ProcessNotify
  call void @jocky_verify_cert_chains(%struct.driver_iter* %drv_list)
  ret void
}`,
    binarySize: "518 KB",
    compiledMetrics: {
      compileTimeMs: 29,
      memoryAllocBytes: "890 KB",
      riskScore: "CRITICAL"
    },
    simulationOutput: [
      { timestamp: "14:21:12.002", type: "INIT", text: "Compiling 'EnterpriseDefense.BYOVDAuditor' for Target: Kernel x86_64" },
      { timestamp: "14:21:12.022", type: "DRIVER", text: "Enumerating 194 loaded kernel modules & WHQL signature chains..." },
      { timestamp: "14:21:12.045", type: "ALERT", level: "HIGH", text: "[ALERT] High-Risk Driver Identified: gdrv.sys (CVE-2018-19320)" },
      { timestamp: "14:21:12.051", type: "HASH", text: "SHA-256: 31f4f6e520023447fbfe73130c00d4375b42ec3f631481b7e4526227b2e9d24f" },
      { timestamp: "14:21:12.072", type: "CALLBACK", text: "Scanning PsSetCreateProcessNotifyRoutine (8 callback slots)..." },
      { timestamp: "14:21:12.085", type: "ALERT", level: "CRITICAL", text: "[ALERT] Callback Slot #3 NULLIFIED (0x0000000000000000) - Possible EDR Blindspot" },
      { timestamp: "14:21:12.099", type: "SUCCESS", text: "Kernel audit finished in 32ms. Forensic state saved to immutable log." }
    ]
  },
  {
    id: "memory_injection",
    title: "Unbacked Executable Memory Scanner",
    category: "Threat Detection",
    description: "Finds reflective DLL injection, process hollowing, and unbacked memory pages (PAGE_EXECUTE_READWRITE) across running processes.",
    targetOS: "Windows & Linux",
    code: `// JOCKY Forensic Module: In-Memory Payload & Hook Detector
module EnterpriseDefense.MemoryInjectionScan;

import forensics.memory.pages;
import forensics.symbols.export_table;
import telemetry.sink;

workflow ScanExecutableMemory(host_target: host) {
    let procs = process.get_user_processes();

    for p in procs {
        let memory_regions = pages.query_regions(p.pid);
        
        for region in memory_regions {
            // Flag memory allocated as RWX that does NOT map to a legitimate disk binary
            if (region.is_executable && !region.is_backed_by_file) {
                sink.emit_alert(
                    severity: CRITICAL,
                    alert_type: "UNBACKED_EXECUTABLE_MEMORY",
                    pid: p.pid,
                    process_name: p.name,
                    base_address: region.base_address,
                    region_size: region.size
                );
            }
        }
    }
}`,
    ast: {
      type: "Program",
      module: "EnterpriseDefense.MemoryInjectionScan",
      imports: ["forensics.memory.pages", "forensics.symbols.export_table"],
      workflow: "ScanExecutableMemory",
      statements: [
        { type: "ForEachProcess", target: "user_processes" },
        { type: "QueryPages", filter: "is_executable && !is_backed_by_file" },
        { type: "AlertTrigger", severity: "CRITICAL" }
      ]
    },
    llvmIR: `; ModuleID = 'jocky_mem_inject.bc'
define void @ScanExecutableMemory(%struct.host* %host_target) {
entry:
  %iter = call %struct.proc_iter* @jocky_get_user_processes()
  call void @jocky_scan_unbacked_rwx(%struct.proc_iter* %iter)
  ret void
}`,
    binarySize: "480 KB",
    compiledMetrics: {
      compileTimeMs: 24,
      memoryAllocBytes: "720 KB",
      riskScore: "HIGH"
    },
    simulationOutput: [
      { timestamp: "14:22:05.310", type: "INIT", text: "Compiling 'EnterpriseDefense.MemoryInjectionScan' -> In-Memory JIT Bytecode" },
      { timestamp: "14:22:05.334", type: "SCAN", text: "Analyzing Virtual Memory Descriptors for 112 active user processes..." },
      { timestamp: "14:22:05.361", type: "MEM", text: "PID 1920 (explorer.exe): 4,812 pages checked. Backed: 100% OK" },
      { timestamp: "14:22:05.388", type: "ALERT", level: "CRITICAL", text: "[ALERT] Unbacked RWX Region in PID: 3104 (spoolsv.exe) @ 0x000001FA88900000" },
      { timestamp: "14:22:05.395", type: "FORENSIC", text: "Region Size: 64 KB | Memory Type: MEM_PRIVATE | Protect: PAGE_EXECUTE_READWRITE" },
      { timestamp: "14:22:05.412", type: "SUCCESS", text: "Scan finished in 28ms. 1 active reflective injection detected." }
    ]
  },
  {
    id: "timeline_harvest",
    title: "Fast Cross-Platform Timeline Harvester",
    category: "Incident Response",
    description: "Extracts NTFS $MFT, USN Journal, Linux cron, and systemd service timelines in parallel for instant incident root-cause reconstruction.",
    targetOS: "Cross-Platform",
    code: `// JOCKY Forensic Module: High-Speed Incident Timeline Harvester
module EnterpriseDefense.TimelineHarvester;

import forensics.fs.mft;
import forensics.linux.systemd;
import telemetry.sink;

workflow BuildIncidentTimeline(window_hours: int = 24) {
    sink.log("Starting cross-platform forensic timeline synthesis...");
    
    // Windows NTFS Master File Table parsing
    if (system.is_windows()) {
        let mft_records = mft.extract_recent_events(hours: window_hours);
        sink.stream_telemetry(channel: "TIMELINE_EVENTS", data: mft_records);
    } 
    // Linux systemd & auditd extraction
    else if (system.is_linux()) {
        let journal_events = systemd.get_unit_state_changes(hours: window_hours);
        sink.stream_telemetry(channel: "TIMELINE_EVENTS", data: journal_events);
    }
}`,
    ast: {
      type: "Program",
      module: "EnterpriseDefense.TimelineHarvester",
      imports: ["forensics.fs.mft", "forensics.linux.systemd"],
      workflow: "BuildIncidentTimeline",
      statements: [
        { type: "BranchOS", on_win: "mft.extract_recent_events", on_linux: "systemd.get_unit_state_changes" },
        { type: "StreamSink", channel: "TIMELINE_EVENTS" }
      ]
    },
    llvmIR: `; ModuleID = 'jocky_timeline.bc'
define void @BuildIncidentTimeline(i32 %window_hours) {
entry:
  %is_win = call i1 @jocky_is_windows_os()
  br i1 %is_win, label %win.mft, label %linux.journal
win.mft:
  call void @jocky_extract_mft_events(i32 %window_hours)
  br label %exit
linux.journal:
  call void @jocky_extract_journal_events(i32 %window_hours)
  br label %exit
exit:
  ret void
}`,
    binarySize: "590 KB",
    compiledMetrics: {
      compileTimeMs: 31,
      memoryAllocBytes: "1.1 MB",
      riskScore: "LOW"
    },
    simulationOutput: [
      { timestamp: "14:23:40.010", type: "INIT", text: "Compiling 'EnterpriseDefense.TimelineHarvester' (Window: Last 24 Hours)" },
      { timestamp: "14:23:40.035", type: "PARSE", text: "Reading Raw $MFT Stream directly from physical volume \\\\.\\C:" },
      { timestamp: "14:23:40.082", type: "EVENT", text: "Extracted 1,482 file creation and rename records from USN Journal" },
      { timestamp: "14:23:40.098", type: "CORRELATION", text: "Correlated 3 anomalous .tmp dropped binaries in C:\\Windows\\Temp\\" },
      { timestamp: "14:23:40.115", type: "SUCCESS", text: "Unified timeline generated in 48ms (2,190 events synchronized)." }
    ]
  }
];

export const BENCHMARK_DATA = [
  {
    tool: "JOCKY (DSL + LLVM)",
    memoryFootprint: "0.8 MB",
    rawMemoryMB: 0.8,
    executionTimeMs: 35,
    evidencePreservation: "99.9%",
    kernelDepth: "Deep Native (NT/eBPF)",
    zeroDependency: "Yes (Self-Contained)",
    crossPlatform: "Windows & Linux Unified"
  },
  {
    tool: "Volatility 3 (Python)",
    memoryFootprint: "185 MB",
    rawMemoryMB: 185,
    executionTimeMs: 14200,
    evidencePreservation: "78.4%",
    kernelDepth: "Dump-Only Analysis",
    zeroDependency: "No (Requires Python 3+)",
    crossPlatform: "Requires Memory Image Dump"
  },
  {
    tool: "osquery (C++)",
    memoryFootprint: "88 MB",
    rawMemoryMB: 88,
    executionTimeMs: 820,
    evidencePreservation: "85.2%",
    kernelDepth: "User-Mode Table Abstraction",
    zeroDependency: "No (Heavy Daemon)",
    crossPlatform: "Partial Kernel Table Support"
  },
  {
    tool: "PowerShell IR Scripts",
    memoryFootprint: "140 MB",
    rawMemoryMB: 140,
    executionTimeMs: 3800,
    evidencePreservation: "62.0%",
    kernelDepth: "Surface (WMI/Win32 APIs)",
    zeroDependency: "No (.NET Runtime Heavy)",
    crossPlatform: "Windows Only (Limited pwsh)"
  }
];

export const PITCH_SLIDES = [
  {
    id: 1,
    tag: "Slide 01",
    title: "Executive Summary & The Big Vision",
    subtitle: "Re-imagining Digital Forensics with a Zero-Footprint Domain Specific Language",
    bullets: [
      "Target Challenge: Incident Responders and Defense Agencies (NTRO/CERT-In) face severe forensic friction during active breaches.",
      "The Heisenberg Problem: Heavy contemporary tools (Python, PowerShell, Daemons) overwrite volatile RAM and alter disk states while investigating.",
      "The JOCKY Solution: A purpose-built, LLVM-backed forensic programming language that compiles human-readable security playbooks into micro-binaries (<1 MB).",
      "Core Promise: 100x faster execution, zero evidence pollution, and deep kernel-level visibility across Windows & Linux."
    ],
    metric: "100x Faster Triage",
    badge: "Problem ID: 26148"
  },
  {
    id: 2,
    tag: "Slide 02",
    title: "The Problem: Why Traditional DFIR Tools Fail",
    subtitle: "Analyzing the Limitations of Modern Endpoint Telemetry",
    bullets: [
      "Volatile Memory Contamination: Loading large runtimes (.NET, Python) replaces memory pages, destroying critical in-memory malware artifacts.",
      "Kernel Blindspots: Standard APIs cannot detect Direct Kernel Object Manipulation (DKOM) where rootkits unlink processes from the OS scheduler.",
      "BYOVD (Bring Your Own Vulnerable Driver) Exploitation: Attackers load signed but vulnerable third-party drivers to nullify security callbacks.",
      "Cross-Platform Tool Fragmentation: Teams must manage completely different toolsets for Linux servers and Windows workstations."
    ],
    metric: "0% Evidence Loss Guarantee",
    badge: "Forensic Integrity"
  },
  {
    id: 3,
    tag: "Slide 03",
    title: "The Innovation: JOCKY Architecture",
    subtitle: "Statically Typed Forensic DSL with LLVM IR Code Generation",
    bullets: [
      "First-Ever Dedicated Forensic DSL: Native syntax for process trees, memory descriptors (VAD), kernel pools, and network sockets.",
      "Automated CI/CD Compilation Pipeline: Triage scripts are verified, type-checked, and compiled into native machine code on demand.",
      "Safe Direct Kernel Introspection: Direct NT API calls on Windows and eBPF/kprobes on Linux bypass user-mode hooking securely.",
      "Encrypted Telemetry Mesh: Micro-binaries stream compressed, authenticated diagnostic telemetry back to the SOC console."
    ],
    metric: "<850 KB Binary Size",
    badge: "LLVM 18+ Backend"
  },
  {
    id: 4,
    tag: "Slide 04",
    title: "Core Defense Capabilities",
    subtitle: "Next-Generation Digital Forensics at Enterprise Scale",
    bullets: [
      "Live In-Memory Shellcode Detection: Scans for unbacked RWX pages and reflective DLL injection without pausing host processes.",
      "Proactive BYOVD & Driver Auditing: Evaluates loaded driver certificate chains against known vulnerability catalogs in real-time.",
      "Unified Timeline Synthesis: Extracts NTFS $MFT, USN Journals, and Linux systemd logs simultaneously.",
      "Fleet-Wide Micro-Sweeps: Dispatches customized JOCKY investigation scripts to 50,000+ endpoints in parallel."
    ],
    metric: "35ms Average Sweep",
    badge: "Zero Footprint"
  },
  {
    id: 5,
    tag: "Slide 05",
    title: "National Impact & Strategic Value",
    subtitle: "Strengthening India's Cyber Defense & Sovereign Security",
    bullets: [
      "National Security Alignment: Directly supports NTRO, CERT-In, DRDO, and Armed Forces Cyber Defense wings.",
      "Drastic MTTR Reduction: Cuts enterprise mean-time-to-respond from several hours to under 60 seconds per incident.",
      "Court-Admissible Evidence: Implements cryptographic hashing and zero-tampering memory extraction for legal digital forensics.",
      "Sovereign Technology: Eliminates reliance on foreign proprietary forensic software suites."
    ],
    metric: "100% Sovereign IP",
    badge: "Make in India / SIH"
  },
  {
    id: 6,
    tag: "Slide 06",
    title: "Feasibility, Tech Stack & Roadmap",
    subtitle: "Clear 6-Month Plan to Production Deployment",
    bullets: [
      "Months 1-2: Grammar specification (ANTLR/Rust) & LLVM IR Code Generator backend.",
      "Months 3-4: Low-level Windows NT kernel bindings & Linux eBPF telemetry sensors.",
      "Months 5-6: High-throughput gRPC central ingestion broker & Web SOC Analyst console.",
      "Future Scope: LLM-assisted Natural Language to JOCKY script generation and embedded IoT/OT compiler targets."
    ],
    metric: "6-Month Production Plan",
    badge: "Roadmap"
  }
];
