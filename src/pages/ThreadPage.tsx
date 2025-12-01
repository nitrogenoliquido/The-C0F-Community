import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  author: { username: string; role: string; profilePictureUrl?: string };
  createdAt: string;
  type: string;
  mediaUrl?: string;
}

const ThreadPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
      try {
        const res = await axios.get(`https://backend.c0f.lol/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
  };

  if (loading) return <div className="text-center p-12 text-muted animate-pulse">Loading thread...</div>;
  if (!post) return <div className="text-center p-12 text-red-400">Thread not found or deleted.</div>;

  return (
    <div className="space-y-6">
       <div className="mb-6">
        <Link to="/" className="text-muted hover:text-white transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Forum Index
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="px-3 py-1 rounded bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
            {post.type}
        </div>
        <h1 className="text-3xl font-bold text-white leading-tight">{post.title}</h1>
      </div>

      {/* Main Post Card */}
      <div className="bg-surface border border-white/5 rounded-xl overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row">
            
            {/* User Sidebar */}
            <div className="md:w-64 bg-black/20 p-6 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-white/5">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1 mb-4 shadow-lg shadow-primary/20">
                   <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
                        {post.author.profilePictureUrl ? (
                            <img src={post.author.profilePictureUrl} alt={post.author.username} className="w-full h-full object-cover" />
                        ) : (
                            post.author.username[0].toUpperCase()
                        )}
                   </div>
                </div>
                <Link to={`/user/${post.author.username}`} className="text-lg font-bold text-white hover:text-primary transition-colors mb-1">
                    {post.author.username}
                </Link>
                <div className={`px-2 py-0.5 rounded text-xs font-bold border ${
                    post.author.role === 'ADMIN' 
                    ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                    : 'bg-white/5 text-muted border-white/10'
                }`}>
                    {post.author.role}
                </div>
                
                <div className="mt-6 w-full space-y-2">
                     <div className="flex justify-between text-xs text-muted">
                        <span>Joined:</span>
                        <span className="text-white">Jan 2025</span>
                     </div>
                     <div className="flex justify-between text-xs text-muted">
                        <span>Posts:</span>
                        <span className="text-white">42</span>
                     </div>
                </div>
            </div>

            {/* Post Content */}
            <div className="flex-grow p-6 md:p-8">
                <div className="flex justify-between items-center text-xs text-muted mb-6 pb-4 border-b border-white/5">
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                    <span className="font-mono opacity-50">#{post.id}</span>
                </div>
                
                <div className="prose prose-invert max-w-none">
                    {post.type === 'IMAGE' && post.mediaUrl && (
                        <div className="mb-6 rounded-lg overflow-hidden border border-white/10 bg-black/50">
                            <img src={post.mediaUrl} alt="Post Attachment" className="w-full h-auto max-h-[500px] object-contain mx-auto" />
                        </div>
                    )}
                    
                    <div className="space-y-4 text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                    </div>
                    
                    {post.type === 'LINK' && post.mediaUrl && (
                        <div className="mt-6 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                            <p className="text-xs text-primary font-bold uppercase mb-1">Attached Link</p>
                            <a href={post.mediaUrl} target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80 break-all font-medium">
                                {post.mediaUrl}
                            </a>
                        </div>
                    )}
                </div>

                {/* Post Footer / Signature */}
                <div className="mt-12 pt-6 border-t border-white/5 flex justify-end gap-3">
                    <button className="text-xs text-muted hover:text-white flex items-center gap-1 transition-colors">
                        <span>⚠️</span> Report
                    </button>
                    <button className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                        <span>↩️</span> Reply
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
