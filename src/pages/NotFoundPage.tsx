import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-white/20">
      
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

      <div className="text-center z-10 space-y-8">
        {/* Animated 404 Text */}
        <h1 className="text-[12rem] leading-none font-bold tracking-tighter select-none bg-gradient-to-t from-zinc-800 via-zinc-500 to-white bg-clip-text text-transparent animate-pulse-slow">
          404
        </h1>

        <div className="space-y-4">
          <h2 className="text-2xl font-light text-zinc-400 tracking-wide uppercase">Page Not Found</h2>
          <p className="text-zinc-600 max-w-md mx-auto">
            The requested resource has vanished into the void or never existed.
          </p>
        </div>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 mt-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-zinc-300 transition-all hover:scale-105 active:scale-95"
        >
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
