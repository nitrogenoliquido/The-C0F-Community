import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Terminal as TerminalIcon } from 'lucide-react';

export const TerminalError = () => {
    const [logs, setLogs] = useState<string[]>([
        "> SYSTEM_BOOT_SEQUENCE_INITIATED...",
        "> CHECKING_CONNECTION_INTEGRITY...",
        "> PING backend.c0f.lol [PORT: 443]...",
        "> ERROR: DESTINATION_HOST_UNREACHABLE",
        "> CRITICAL_FAILURE: MAIN_UPLINK_DOWN",
        "> ENTERING_SAFE_MODE...",
        "> WAITING_FOR_USER_INPUT..."
    ]);
    const [input, setInput] = useState('');
    const [ip, setIp] = useState('FETCHING...');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch Real IP
        axios.get('https://api.ipify.org?format=json')
            .then(res => setIp(res.data.ip))
            .catch(() => setIp('UNKNOWN'));
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [logs]);

    const handleCommand = (cmd: string) => {
        const command = cmd.trim().toLowerCase();
        setLogs(prev => [...prev, `user@c0f:~$ ${cmd}`]);
        
        if (command === 'help') {
            setLogs(prev => [...prev, 
                "AVAILABLE COMMANDS:",
                "  retry  - Attempt to reconnect to backend",
                "  ping   - Check local network status",
                "  clear  - Clear terminal output",
                "  status - Show system diagnostics"
            ]);
        } else if (command === 'retry' || command === 'r') {
             setLogs(prev => [...prev, "> RECONNECTING..."]);
             setTimeout(() => window.location.reload(), 1000);
        } else if (command === 'clear') {
            setLogs(["> CONSOLE_CLEARED"]);
        } else if (command === 'ping') {
            setLogs(prev => [...prev, "> PONG! (Local latency: <1ms)"]);
        } else if (command === 'status') {
            setLogs(prev => [...prev, 
                `> CLIENT_IP: ${ip}`,
                "> BACKEND: DISCONNECTED",
                "> FRONTEND: OPERATIONAL",
                "> TIMESTAMP: " + new Date().toISOString()
            ]);
        } else if (command === '') {
            // do nothing
        } else {
            setLogs(prev => [...prev, `> COMMAND_NOT_FOUND: ${command}`]);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-green-500 font-mono p-4 flex flex-col items-center justify-center selection:bg-green-500 selection:text-black">
            <div className="max-w-3xl w-full border border-green-500/30 bg-black/50 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.1)] overflow-hidden flex flex-col h-[600px]">
                
                {/* Header */}
                <div className="bg-green-900/10 border-b border-green-500/20 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold tracking-wider">
                        <TerminalIcon size={16} />
                        C0F_SYSTEM_DIAGNOSTICS
                    </div>
                    <div className="flex items-center gap-2 text-xs opacity-70">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        DISCONNECTED
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="flex-grow p-4 overflow-y-auto space-y-1 font-sm scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black">
                    {logs.map((log, i) => (
                        <div key={i} className={`${log.startsWith('user@') ? 'text-white' : 'text-green-400 opacity-90'}`}>
                            {log}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-green-900/5 border-t border-green-500/20 flex items-center gap-2">
                    <span className="text-white font-bold">{'>'}</span>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleCommand(input);
                                setInput('');
                            }
                        }}
                        className="w-full bg-transparent border-none outline-none text-green-400 placeholder-green-700/50 font-mono"
                        placeholder="Type 'help' for commands..."
                        autoFocus
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-2 text-green-700/60 text-xs uppercase tracking-[0.2em]">
                <div>CLIENT_IP: {ip}</div>
                <div>The C0F Community</div>
            </div>
        </div>
    );
};
