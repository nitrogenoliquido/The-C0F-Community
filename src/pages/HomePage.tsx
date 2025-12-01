import { Link } from 'react-router-dom';

const FORUM_NODES = [
  {
    category: "Official",
    nodes: [
      { id: 'announcements', title: "Announcements", desc: "Official C0F Community news and updates.", icon: "📢" },
      { id: 'rules', title: "Rules & Information", desc: "Please read before posting to avoid bans.", icon: "⚖️" }
    ]
  },
  {
    category: "Development & Releases",
    nodes: [
      { id: 'Client Releases', title: "Client Releases", desc: "Share and find the latest game clients.", icon: "💻" },
      { id: 'Source Codes', title: "Source Codes", desc: "Java, C++, and other source repositories.", icon: "🧩" },
      { id: 'Config Releases', title: "Config Releases", desc: "Optimized settings for Hvh and Legit play.", icon: "⚙️" }
    ]
  },
  {
    category: "General Discussion",
    nodes: [
      { id: 'Marketplace', title: "Marketplace", desc: "Buy, sell, and trade services safely.", icon: "🛒" },
      { id: 'Off-Topic', title: "Off-Topic", desc: "Talk about anything unrelated to development.", icon: "🗣️" }
    ]
  }
];

const HomePage = () => {
  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero / Announcement Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-surface to-surface border border-primary/20 p-8 shadow-2xl shadow-primary/5">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              FEATURED
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Kraken AntiCheat</h2>
            <p className="text-muted text-lg max-w-xl">The ultimate protection for your server. Advanced heuristics, zero false positives.</p>
          </div>
          <button className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Purchase License
          </button>
        </div>
      </div>

      {/* Forum Categories */}
      <div className="space-y-10">
        {FORUM_NODES.map((cat) => (
          <div key={cat.category} className="animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-5 pl-2 border-l-4 border-primary flex items-center gap-3">
              {cat.category}
              <span className="h-px w-full bg-white/5 ml-4 rounded-full"></span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.nodes.map(node => (
                <Link to={`/category/${node.id}`} key={node.id} className="group">
                  <div className="h-full p-5 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/50 hover:bg-surface transition-all duration-300 relative overflow-hidden">
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10 flex items-start gap-4">
                      <div className="text-4xl p-2 bg-black/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        {node.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                          {node.title}
                        </h4>
                        <p className="text-sm text-muted mt-1 leading-relaxed">
                          {node.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="text-center text-muted text-xs pt-12 border-t border-white/5">
        <p>&copy; 2025 The C0F Community. Built for the elite.</p>
      </footer>
    </div>
  );
};

export default HomePage;