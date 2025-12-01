import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MessageSquare, Shield, Hash } from 'lucide-react';

interface UserProfile {
  username: string;
  role: string;
  joinDate: string;
  postCount: number;
  recentPosts: { id: number; title: string; createdAt: string }[];
}

const UserProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://backend.c0f.lol/api/users/${username}`);
        setProfile(res.data);
      } catch (err) {
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  if (loading) return <div className="text-center p-20 text-zinc-500 font-mono animate-pulse">Scanning database...</div>;
  if (error || !profile) return (
    <div className="text-center p-20">
        <h1 className="text-4xl font-bold text-zinc-200">User Not Found</h1>
        <p className="text-zinc-500 mt-2">The requested identity does not exist in the registry.</p>
    </div>
  );

  const isAdmin = profile.role === 'ADMIN';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Profile Header Card */}
      <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
        
        {/* Banner / Cover */}
        <div className={`h-32 w-full ${isAdmin ? 'bg-gradient-to-r from-red-900/40 to-black' : 'bg-gradient-to-r from-blue-900/20 to-black'}`}></div>
        
        <div className="px-8 pb-8 flex flex-col md:flex-row items-start gap-6 -mt-12">
            {/* Avatar */}
            <div className={`relative w-32 h-32 rounded-2xl flex items-center justify-center text-5xl font-bold text-white shadow-xl border-4 border-[#09090b] ${isAdmin ? 'bg-red-600' : 'bg-zinc-700'}`}>
                {profile.username[0].toUpperCase()}
                {isAdmin && (
                    <div className="absolute -bottom-2 -right-2 bg-black rounded-full p-1 border border-red-500/50" title="Administrator">
                        <Shield className="text-red-500 fill-red-500/20" size={20} />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-grow pt-14 md:pt-12 space-y-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-white">{profile.username}</h1>
                    {isAdmin ? (
                        <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                            Administrator
                        </span>
                    ) : (
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                            Member
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MessageSquare size={14} />
                        <span>{profile.postCount} messages</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Hash size={14} />
                        <span>ID: {Math.floor(Math.random() * 9000) + 1000}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-zinc-200 flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  Recent Activity
              </h3>
              
              {profile.recentPosts.length > 0 ? (
                  <div className="bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden">
                      {profile.recentPosts.map((post) => (
                          <div key={post.id} className="p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                              <Link to={`/thread/${post.id}`} className="block">
                                  <div className="text-zinc-200 font-medium group-hover:text-primary transition-colors">{post.title}</div>
                                  <div className="text-xs text-zinc-500 mt-1">{new Date(post.createdAt).toLocaleString()}</div>
                              </Link>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="p-8 text-center text-zinc-600 border border-white/5 rounded-xl border-dashed">
                      No recent activity detected.
                  </div>
              )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
              <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-5">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">User Statistics</h4>
                  <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Reputation</span>
                          <span className="text-green-400 font-mono">0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Warning Points</span>
                          <span className="text-zinc-200 font-mono">0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Last Seen</span>
                          <span className="text-zinc-200">Just now</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
