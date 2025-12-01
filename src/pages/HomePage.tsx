import { Link } from 'react-router-dom';
import { 
  Shield, Terminal, Cpu, Code2, Globe, ShoppingCart, 
  MessageSquare, Flame, AlertCircle, Lock, Server, 
  Database, Activity, Search, Zap
} from 'lucide-react';

const FORUM_ZONES = [
  {
    title: "The Headquarters",
    nodes: [
      { id: 'announcements', title: "Announcements", desc: "Official intel and platform updates.", icon: <Shield className="text-red-500" /> },
      { id: 'rules', title: "Protocol & Rules", desc: "Read before executing interactions.", icon: <AlertCircle className="text-yellow-500" /> }
    ]
  },
  {
    title: "Development Sector",
    nodes: [
      { id: 'reverse-engineering', title: "Reverse Engineering", desc: "Disassembly, debugging, and analysis.", icon: <Search className="text-blue-400" /> },
      { id: 'source-codes', title: "Source Depository", desc: "C++, Java, Rust, and kernel drivers.", icon: <Code2 className="text-green-400" /> },
      { id: 'anti-cheat', title: "Anti-Cheat Research", desc: "Bypassing mainstream protections.", icon: <Lock className="text-purple-400" /> },
      { id: 'web-dev', title: "Web & Backend", desc: "Full-stack vulnerabilities and tools.", icon: <Globe className="text-cyan-400" /> }
    ]
  },
  {
    title: "Underground Market",
    nodes: [
      { id: 'premium-cheats', title: "Private Software", desc: "Invite-only and paid solutions.", icon: <Zap className="text-yellow-400" /> },
      { id: 'marketplace', title: "Black Market", desc: "Accounts, HWIDs, and services.", icon: <ShoppingCart className="text-emerald-400" /> },
      { id: 'hosting', title: "Bulletproof Hosting", desc: "VPS and dedicated servers.", icon: <Server className="text-gray-400" /> }
    ]
  },
  {
    title: "The Lounge",
    nodes: [
      { id: 'hardware', title: "Hardware & Tech", desc: "Rigs, peripherals, and optimization.", icon: <Cpu className="text-orange-400" /> },
      { id: 'off-topic', title: "Off-Topic", desc: "Discussions unrelated to operations.", icon: <MessageSquare className="text-pink-400" /> }
    ]
  }
];

const HomePage = () => {
  return (
    <div className="space-y-12 pb-12">
      
      {/* Immersive Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-surface border border-white/5 shadow-2xl group">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-all duration-1000"></div>
        
        <div className="relative z-10 p-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wider">
              <Flame size={14} className="fill-red-500/20" />
              HOT RELEASE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Kraken <span className="text-primary">AntiCheat</span>
            </h1>
            <p className="text-muted text-lg max-w-xl leading-relaxed">
              Next-generation behavioral analysis for game servers. 
              Detects <span className="text-white font-mono">InvalidMove</span> packets in 0.05ms.
            </p>
            <div className="flex gap-4 pt-2">
              <button className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2">
                <Terminal size={18} />
                Get Access
              </button>
              <button className="px-8 py-3 bg-white/5 text-white border border-white/10 font-bold rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                View Documentation
              </button>
            </div>
          </div>
          
          {/* Abstract Visual */}
          <div className="relative w-64 h-64 flex items-center justify-center">
             <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-spin-slow"></div>
             <div className="absolute inset-4 border border-primary/30 rounded-full"></div>
             <Shield size={80} className="text-primary drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
          </div>
        </div>
      </div>

      {/* Forum Statistics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Online Users", val: "1,240", icon: <Activity size={16} className="text-green-500" /> },
          { label: "Total Threads", val: "84.5K", icon: <Database size={16} className="text-blue-500" /> },
          { label: "Latest Member", val: "Ghost_User", icon: <UserBadge /> },
          { label: "Server Status", val: "Stable", icon: <Server size={16} className="text-emerald-500" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-surface/30 border border-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-surface/50 transition-colors">
            <div className="flex flex-col">
              <span className="text-xs text-muted uppercase tracking-wider font-semibold">{stat.label}</span>
              <span className="text-lg font-mono text-white">{stat.val}</span>
            </div>
            <div className="p-2 bg-white/5 rounded-lg">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="space-y-12">
        {FORUM_ZONES.map((zone) => (
          <div key={zone.title} className="animate-fade-in-up">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 mb-6 pl-2 border-l-4 border-primary/50 flex items-center gap-3 uppercase tracking-widest">
              {zone.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {zone.nodes.map(node => (
                <Link to={`/category/${node.id}`} key={node.id} className="group h-full">
                  <div className="h-full p-5 rounded-xl bg-surface/40 border border-white/5 hover:border-primary/40 hover:bg-surface/80 transition-all duration-300 relative overflow-hidden flex flex-col gap-4 shadow-lg hover:shadow-primary/5">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-black/40 rounded-lg border border-white/5 group-hover:scale-110 group-hover:border-primary/20 transition-all duration-300">
                        {node.icon}
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-2">
                        <ArrowUpRight />
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-200 group-hover:text-primary transition-colors">
                        {node.title}
                      </h4>
                      <p className="text-xs text-muted mt-2 leading-relaxed font-medium">
                        {node.desc}
                      </p>
                    </div>

                    {/* Footer / Meta */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-muted font-mono uppercase">
                      <span>2.4k Posts</span>
                      <span className="text-green-400/80">New</span>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper Components
const UserBadge = () => <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-primary to-secondary"></div>;
const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
);

export default HomePage;