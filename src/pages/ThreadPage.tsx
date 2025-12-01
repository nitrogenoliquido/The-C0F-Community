import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, CornerDownRight, Shield } from 'lucide-react';

interface Author {
    username: string;
    role: string;
    profilePictureUrl?: string;
}

interface Comment {
    id: number;
    content: string;
    author: Author;
    createdAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  type: string;
  mediaUrl?: string;
}

const PostItem = ({ author, content, createdAt, isMain = false, title }: { author: Author, content: string, createdAt: string, isMain?: boolean, title?: string }) => {
    const isAdmin = author.role === 'ADMIN';
    
    return (
        <div className={`bg-zinc-900/50 border ${isMain ? 'border-primary/20' : 'border-white/5'} rounded-xl overflow-hidden shadow-lg mb-6`}>
            {/* Header only for main post */}
            {isMain && title && (
                <div className="bg-white/5 px-6 py-4 border-b border-white/5">
                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                </div>
            )}
            
            <div className="flex flex-col md:flex-row">
                {/* User Sidebar */}
                <div className="md:w-64 bg-black/20 p-6 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-white/5 shrink-0">
                    <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-xl border-4 border-[#09090b] ${isAdmin ? 'bg-red-600' : 'bg-zinc-700'}`}>
                        {author.profilePictureUrl ? (
                            <img src={author.profilePictureUrl} alt={author.username} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            author.username[0].toUpperCase()
                        )}
                    </div>
                    
                    <Link to={`/user/${author.username}`} className={`text-lg font-bold hover:underline mb-1 ${isAdmin ? 'text-red-400' : 'text-zinc-200'}`}>
                        {author.username}
                    </Link>
                    
                    <div className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider mb-4 ${
                        isAdmin 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                        {author.role}
                    </div>

                    {isAdmin && <Shield className="text-red-500 fill-red-500/20 mb-4" size={24} />}

                    <div className="w-full space-y-2 text-xs text-zinc-500 font-mono mt-auto">
                        <div className="flex justify-between w-full">
                            <span>Joined:</span>
                            <span className="text-zinc-400">Jan 25</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span>Messages:</span>
                            <span className="text-zinc-400">--</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow p-6 md:p-8 flex flex-col min-h-[300px]">
                    <div className="flex justify-between items-center text-xs text-zinc-500 mb-6 pb-4 border-b border-white/5 font-mono">
                        <span>{new Date(createdAt).toLocaleString()}</span>
                        <span>#{isMain ? '1' : 'REPLY'}</span>
                    </div>
                    
                    <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed whitespace-pre-wrap flex-grow">
                        {content}
                    </div>

                    {/* Footer / Signature Area */}
                    <div className="mt-12 pt-6 border-t border-white/5 flex justify-end gap-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        <button className="hover:text-white transition-colors flex items-center gap-1">
                            <CornerDownRight size={14} /> Reply
                        </button>
                        <button className="hover:text-red-400 transition-colors">Report</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ThreadPage = () => {
  const { postId } = useParams();
  const { token } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchData();
  }, [postId]);

  const fetchData = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
            axios.get(`https://backend.c0f.lol/api/posts/${postId}`),
            axios.get(`https://backend.c0f.lol/api/posts/${postId}/comments`)
        ]);
        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
  };

  const handleReply = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newComment.trim()) return;
      
      setSending(true);
      try {
          await axios.post(`https://backend.c0f.lol/api/posts/${postId}/comments`, {
              content: newComment
          }, {
              headers: { 'Authorization': `Bearer ${token}` }
          });
          setNewComment('');
          fetchData(); // Refresh to see new comment
      } catch (err) {
          alert("Error posting reply. Are you logged in?");
      } finally {
          setSending(false);
      }
  };

  if (loading) return <div className="text-center p-20 text-zinc-500 animate-pulse font-mono">Loading thread data...</div>;
  if (!post) return <div className="text-center p-20 text-red-400 font-mono">THREAD_NOT_FOUND_404</div>;

  return (
    <div className="space-y-6 pb-20">
       <div className="mb-6">
        <Link to={`/category/general`} className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1 text-sm font-mono">
            &larr; BACK TO INDEX
        </Link>
      </div>

      {/* Main Post */}
      <PostItem 
        author={post.author} 
        content={post.content} 
        createdAt={post.createdAt} 
        isMain={true} 
        title={post.title} 
      />

      {/* Comments */}
      {comments.map((comment) => (
          <PostItem 
            key={comment.id}
            author={comment.author}
            content={comment.content}
            createdAt={comment.createdAt}
          />
      ))}

      {/* Reply Box */}
      {token ? (
          <div className="mt-12 bg-zinc-900 border border-white/5 rounded-xl overflow-hidden p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 text-zinc-400">
                  <MessageSquare size={18} />
                  <span className="font-bold text-sm uppercase tracking-wider">Post a Reply</span>
              </div>
              <form onSubmit={handleReply}>
                  <textarea 
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="w-full h-32 bg-black/30 border border-white/10 rounded-lg p-4 text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-primary/50 transition-colors font-sans resize-y"
                    placeholder="Write your reply here..."
                    required
                  ></textarea>
                  <div className="flex justify-end mt-4">
                      <button 
                        type="submit" 
                        disabled={sending}
                        className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                      >
                          {sending ? 'Posting...' : 'Post Reply'}
                      </button>
                  </div>
              </form>
          </div>
      ) : (
          <div className="mt-12 p-8 text-center bg-zinc-900/50 border border-white/5 rounded-xl">
              <p className="text-zinc-500">You must be logged in to reply to this thread.</p>
              <Link to="/login" className="text-primary hover:underline font-bold mt-2 inline-block">Login here</Link>
          </div>
      )}
    </div>
  );
};

export default ThreadPage;
