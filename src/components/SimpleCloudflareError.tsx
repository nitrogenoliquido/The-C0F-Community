import { useEffect } from 'react';
import { CloudOff } from 'lucide-react';

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
            <div className="max-w-5xl w-full">
                {/* Header */}
                <div className="flex items-center gap-4 mb-12">
                    <h1 className="text-4xl font-light text-white">Web server is down</h1>
                </div>

                {/* Diagram Section */}
                <div className="flex items-center justify-between text-center mb-16 text-sm md:text-base px-4 md:px-12">
                    {/* Browser */}
                    <div className="flex flex-col items-center gap-4 relative z-10">
                        <div className="text-[#28a745] text-7xl">
                           <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><path d="m9 16 3-3 3 3"/></svg>
                        </div>
                        <div className="font-semibold text-white">You</div>
                        <div className="text-gray-500 text-xs uppercase tracking-wide">Browser</div>
                        <div className="text-[#28a745] text-xs font-bold mt-1">Working</div>
                    </div>

                    {/* Connection Line 1 */}
                    <div className="flex-grow h-px bg-gray-600 mx-2 relative -mt-12">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 text-xs bg-[#1a1a1a] px-2">&bull; &bull; &bull;</div>
                    </div>

                    {/* C0F Network (Cloudflare equivalent) */}
                    <div className="flex flex-col items-center gap-4 relative z-10">
                         <div className="text-[#28a745] text-7xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>
                         </div>
                        <div className="font-semibold text-white">C0F Network</div>
                        <div className="text-gray-500 text-xs uppercase tracking-wide">Proxy</div>
                        <div className="text-[#28a745] text-xs font-bold mt-1">Working</div>
                    </div>

                    {/* Connection Line 2 */}
                    <div className="flex-grow h-px bg-gray-600 mx-2 relative -mt-12">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 text-2xl font-light">×</div>
                    </div>

                    {/* Origin */}
                    <div className="flex flex-col items-center gap-4 relative z-10">
                         <div className="text-[#bd2426] text-7xl">
                            <CloudOff size={72} strokeWidth={1} />
                         </div>
                        <div className="font-semibold text-white">backend.c0f.lol</div>
                        <div className="text-gray-500 text-xs uppercase tracking-wide">Host</div>
                        <div className="text-[#bd2426] text-xs font-bold mt-1">Error</div>
                    </div>
                </div>

                {/* Info Text */}
                <div className="space-y-6 max-w-3xl">
                    <h2 className="text-3xl font-light text-white">Error 521</h2>
                    <p className="text-[#d1d5db] text-lg font-light leading-relaxed">
                        The web server is not returning a connection. As a result, the web page is not displaying.
                    </p>
                    <div className="bg-[#2d2d2d] p-6 rounded text-sm text-[#d1d5db] border-l-4 border-[#bd2426] mt-8 shadow-lg">
                        <p className="mb-3 font-bold text-white text-base">Troubleshooting</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-400">
                            <li>If you are a visitor of this website: Please try again in a few minutes.</li>
                            <li>Press <kbd className="bg-[#1a1a1a] px-2 py-1 rounded text-white font-mono text-xs border border-gray-600">R</kbd> to force a reload.</li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-24 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between text-xs text-gray-500 font-sans">
                    <div>Ray ID: <span className="font-mono text-[#d1d5db]">{Math.random().toString(36).substring(7).toUpperCase()}</span> &bull; 2025-12-01 22:42:05 UTC</div>
                    <div className="mt-2 md:mt-0">Performance & security by <span className="text-[#d1d5db] font-semibold hover:underline cursor-pointer">The C0F Community</span></div>
                </div>
            </div>
        </div>
    );
};
