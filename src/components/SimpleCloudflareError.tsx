import { useEffect, useState } from 'react';
import { Laptop, Cloud, Database, X, RefreshCw } from 'lucide-react';

export const SimpleCloudflareError = () => {
    const [isReloading, setIsReloading] = useState(false);

    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'r') {
                setIsReloading(true);
                window.location.reload();
            }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, []);

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-400 font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-red-500/20 selection:text-red-200">
            
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Custom Animation Keyframes */}
            <style>{`
                @keyframes data-flow {
                    0% { left: -10%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
            `}</style>

            <div className="max-w-3xl w-full relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center gap-2 mb-10">
                    <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono font-bold tracking-widest uppercase">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                        </span>
                        ERROR WHILE TRYING TO CONNECT
                    </div>
                    <h1 className="text-3xl font-medium text-zinc-100 tracking-tight mt-2">Connection Failed</h1>
                </div>

                {/* Main Card */}
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-xl p-8 shadow-2xl shadow-black/50">
                    
                    {/* Diagram Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 relative px-4">
                        
                        {/* Browser Node */}
                        <div className="flex flex-col items-center gap-3 w-24 relative group">
                            <div className="w-16 h-16 rounded-xl bg-zinc-800/50 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors duration-500 shadow-lg">
                                <Laptop size={28} className="text-emerald-500" />
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-zinc-200 text-sm">You</div>
                                <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mt-0.5">Browser</div>
                            </div>
                            <div className="absolute -bottom-6 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-mono font-medium">
                                WORKING
                            </div>
                        </div>

                        {/* Line 1 (Green Flow) */}
                        <div className="hidden md:flex flex-grow h-px bg-zinc-800 relative mx-2 overflow-hidden -mt-6">
                             <div className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" style={{ animation: 'data-flow 1.5s linear infinite' }}></div>
                        </div>

                        {/* Frontend Node */}
                        <div className="flex flex-col items-center gap-3 w-24 relative group">
                             <div className="w-16 h-16 rounded-xl bg-zinc-800/50 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors duration-500 shadow-lg">
                                 <Cloud size={28} className="text-emerald-500" />
                             </div>
                            <div className="text-center">
                                <div className="font-semibold text-zinc-200 text-sm">Frontend</div>
                                <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mt-0.5">Edge</div>
                            </div>
                            <div className="absolute -bottom-6 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-mono font-medium">
                                WORKING
                            </div>
                        </div>

                        {/* Line 2 (Broken) */}
                        <div className="hidden md:flex flex-grow h-px bg-zinc-800 relative mx-2 items-center justify-center -mt-6">
                            <div className="w-6 h-6 rounded-full bg-zinc-950 border border-red-500/50 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                                <X size={12} className="text-red-500" strokeWidth={3} />
                            </div>
                        </div>

                        {/* Origin Node */}
                        <div className="flex flex-col items-center gap-3 w-24 relative group">
                             <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-red-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.15)] animate-pulse">
                                 <Database size={28} className="text-red-500" />
                             </div>
                            <div className="text-center">
                                <div className="font-semibold text-zinc-200 text-sm">Origin</div>
                                <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mt-0.5">Host Error</div>
                            </div>
                            <div className="absolute -bottom-6 px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-mono font-medium">
                                UNREACHABLE
                            </div>
                        </div>
                    </div>

                    {/* Technical Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6 mt-10">
                        <div className="space-y-2 text-center md:text-left">
                            <h2 className="text-lg font-medium text-white flex items-center justify-center md:justify-start gap-2">
                                <span className="text-red-500 font-mono font-bold text-xl tracking-tighter">521</span> 
                                Origin Down
                            </h2>
                            <p className="text-xs leading-relaxed text-zinc-500">
                                The origin server refused the connection. Usually indicates the server is offline or blocking requests.
                            </p>
                        </div>
                        
                        <div className="bg-zinc-950/30 rounded-lg p-4 border border-white/5 flex flex-col justify-center items-center text-center">
                            <div className="mb-3">
                                <p className="text-xs text-zinc-400">
                                    Click to reload or press <kbd className="bg-zinc-800 border border-zinc-700 px-1 py-0.5 rounded text-[10px] font-mono text-zinc-100 mx-1">R</kbd>
                                </p>
                            </div>
                            <button 
                                onClick={() => window.location.reload()}
                                className="group w-full flex items-center justify-center gap-2 px-3 py-2 bg-zinc-100 hover:bg-white text-black font-bold rounded transition-all active:scale-[0.98] shadow-lg shadow-white/5"
                            >
                                {isReloading ? <RefreshCw size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                                <span className="text-xs">Reload Page</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 font-mono uppercase tracking-wider px-2">
                    <div className="flex items-center gap-3">
                        <span>Ray ID: <span className="text-zinc-500">{Math.random().toString(36).substring(7).toUpperCase()}</span></span>
                        <span className="hidden md:inline text-zinc-800">&bull;</span>
                        <span>{new Date().toUTCString()}</span>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-900 border border-emerald-500/50"></div>
                        <span>C0F Community Systems</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
