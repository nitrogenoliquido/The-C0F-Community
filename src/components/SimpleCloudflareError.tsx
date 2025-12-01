import { useEffect } from 'react';
import { Laptop, Cloud, Database, X } from 'lucide-react';

export const SimpleCloudflareError = () => {
    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'r') window.location.reload();
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, []);

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-[#d1d5db] font-sans flex flex-col items-center justify-center p-4 selection:bg-[#f48120] selection:text-white">
            <div className="max-w-4xl w-full flex flex-col items-center">
                
                {/* Diagram Section */}
                <div className="w-full flex items-center justify-between mb-16 px-4 md:px-12 max-w-3xl">
                    
                    {/* Browser */}
                    <div className="flex flex-col items-center gap-4 w-24">
                        <Laptop size={64} strokeWidth={1} className="text-[#28a745]" />
                        <div className="flex flex-col items-center">
                            <div className="font-semibold text-white">You</div>
                            <div className="text-gray-500 text-xs uppercase tracking-wide">Browser</div>
                            <div className="text-[#28a745] text-xs font-bold mt-1">Working</div>
                        </div>
                    </div>

                    {/* Connection Line 1 */}
                    <div className="flex-grow h-px bg-gray-600 relative mx-4 -mt-12">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#28a745] rounded-full"></div>
                    </div>

                    {/* Frontend */}
                    <div className="flex flex-col items-center gap-4 w-24">
                         <Cloud size={64} strokeWidth={1} className="text-[#28a745]" />
                        <div className="flex flex-col items-center">
                            <div className="font-semibold text-white">Frontend</div>
                            <div className="text-gray-500 text-xs uppercase tracking-wide">Proxy</div>
                            <div className="text-[#28a745] text-xs font-bold mt-1">Working</div>
                        </div>
                    </div>

                    {/* Connection Line 2 */}
                    <div className="flex-grow h-px bg-gray-600 relative mx-4 -mt-12">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a] p-1">
                            <div className="w-5 h-5 rounded-full border-2 border-[#bd2426] flex items-center justify-center">
                                <X size={12} className="text-[#bd2426]" strokeWidth={3} />
                            </div>
                        </div>
                    </div>

                    {/* Origin (Backend hidden) */}
                    <div className="flex flex-col items-center gap-4 w-24">
                         <Database size={64} strokeWidth={1} className="text-[#bd2426]" />
                        <div className="flex flex-col items-center">
                            <div className="font-semibold text-white">Origin</div>
                            <div className="text-gray-500 text-xs uppercase tracking-wide">Host</div>
                            <div className="text-[#bd2426] text-xs font-bold mt-1">Error</div>
                        </div>
                    </div>
                </div>

                {/* Info Text */}
                <div className="text-center space-y-6 max-w-2xl">
                    <h1 className="text-4xl font-light text-white">Web server is down</h1>
                    
                    <div className="space-y-2">
                        <h2 className="text-2xl font-light text-white">Error code 521</h2>
                        <p className="text-[#9ca3af] text-base leading-relaxed">
                            The web server is not returning a connection. As a result, the web page is not displaying.
                        </p>
                    </div>

                    <div className="bg-[#2d2d2d] p-6 rounded text-sm text-[#d1d5db] border-t-2 border-[#bd2426] shadow-lg text-left inline-block w-full max-w-lg">
                        <p className="mb-3 font-bold text-white text-base">What can I do?</p>
                        <p className="mb-2 text-gray-400">If you are a visitor of this website:</p>
                        <ul className="list-disc pl-5 space-y-1 text-gray-400 mb-4">
                            <li>Please try again in a few minutes.</li>
                        </ul>
                         <p className="text-gray-400">
                            Press <kbd className="bg-[#1a1a1a] px-2 py-1 rounded text-white font-mono text-xs border border-gray-600">R</kbd> to reload.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-24 w-full pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans px-4">
                    <div>Ray ID: <span className="font-mono text-[#d1d5db]">{Math.random().toString(36).substring(7).toUpperCase()}</span></div>
                    <div className="mt-2 md:mt-0">Performance & security by <span className="text-[#d1d5db] font-semibold">The C0F Community</span></div>
                </div>
            </div>
        </div>
    );
};
