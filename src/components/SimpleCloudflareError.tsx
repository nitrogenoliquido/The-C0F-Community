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
        <div className="min-h-screen bg-[#09090b] text-zinc-400 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-red-500/20 selection:text-red-200">
            
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Custom Animation Keyframes injected locally style tag for simplicity in this component */}
            <style>{`
                @keyframes data-flow {
                    0% { left: -10%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
            `}</style>

            <div className="max-w-5xl w-full relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center gap-2 mb-16">
                    <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono font-bold tracking-widest uppercase">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        ERROR WHILE TRYING TO CONNECT
                    </div>
                    <h1 className="text-5xl font-medium text-zinc-100 tracking-tight mt-4">Connection Failed</h1>
                </div>

                {/* Main Card */}
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/50">
                    
                    {/* Diagram Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 relative">
                        
                        {/* Browser Node */}
                        <div className="flex flex-col items-center gap-4 w-32 relative group">
                            <div className="w-20 h-20 rounded-2xl bg-zinc-800/50 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors duration-500 shadow-lg">
                                <Laptop size={32} className="text-emerald-500" />
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-zinc-200">You</div>
                                <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mt-1">Browser</div>
                            </div>
                            <div className="absolute -bottom-8 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono font-medium">
                                WORKING
                            </div>
                        </div>

                        {/* Line 1 (Green Flow) */}
                        <div className="hidden md:flex flex-grow h-px bg-zinc-800 relative mx-4 overflow-hidden">
                             {/* The travelling packet */}
                             <div className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" style={{ animation: 'data-flow 2s linear infinite' }}></div>
                        </div>

                        {/* Frontend Node */}
                        <div className="flex flex-col items-center gap-4 w-32 relative group">
                             <div className="w-20 h-20 rounded-2xl bg-zinc-800/50 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors duration-500 shadow-lg">
                                 <Cloud size={32} className="text-emerald-500" />
                             </div>
                            <div className="text-center">
                                <div className="font-semibold text-zinc-200">Frontend</div>
                                <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mt-1">Edge Network</div>
                            </div>
                            <div className="absolute -bottom-8 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono font-medium">
                                WORKING
                            </div>
                        </div>

                        {/* Line 2 (Broken) */}
                        <div className="hidden md:flex flex-grow h-px bg-zinc-800 relative mx-4 items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-950 border border-red-500/50 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                <X size={14} className="text-red-500" strokeWidth={3} />
                            </div>
                        </div>

                        {/* Origin Node */}
                        <div className="flex flex-col items-center gap-4 w-32 relative group">
                             <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-red-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.15)] animate-pulse">
                                 <Database size={32} className="text-red-500" />
                             </div>
                            <div className="text-center">
                                <div className="font-semibold text-zinc-200">Origin</div>
                                <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mt-1">Host Error</div>
                            </div>
                            <div className="absolute -bottom-8 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono font-medium">
                                UNREACHABLE
                            </div>
                        </div>
                    </div>

                    {/* Technical Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-8 mt-12">
                        <div className="space-y-4">
                            <h2 className="text-xl font-medium text-white flex items-center gap-3">
                                <span className="text-red-500 font-mono font-bold text-2xl tracking-tighter">521</span> 
                                Origin Down
                            </h2>
                            <p className="text-sm leading-relaxed text-zinc-500">
                                The origin server refused the connection from the frontend. This usually indicates the server is offline, restarting, or blocking requests on port 443.
                            </p>
                        </div>
                        
                        <div className="bg-zinc-950/50 rounded-xl p-6 border border-white/5 flex flex-col justify-between items-center text-center">
                            <div className="mb-4">
                                <p className="text-sm text-zinc-300">
                                    Click to reload or press <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-xs font-mono text-zinc-100 mx-1">R</kbd>
                                </p>
                            </div>
                            <button 
                                onClick={() => window.location.reload()}
                                className="group w-full flex items-center justify-center gap-3 px-4 py-3 bg-zinc-100 hover:bg-white text-black font-bold rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-white/5"
                            >
                                {isReloading ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                                <span className="text-sm">Reload Page</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 font-mono uppercase tracking-wider">
                    <div className="flex items-center gap-4">
                        <span>Ray ID: <span className="text-zinc-400">{Math.random().toString(36).substring(7).toUpperCase()}</span></span>
                        <span className="hidden md:inline">&bull;</span>
                        <span>{new Date().toUTCString()}</span>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-900 border border-emerald-500/50"></div>
                        <span>C0F Community Systems</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
