import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  author: { username: string; role: string };
  createdAt: string;
}

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [threads, setThreads] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreads();
  }, [categoryName]);

  const fetchThreads = async () => {
    try {
      // In a real app, filtering by category happens on backend. 
      // Using categoryName for display purposes now.
      const res = await axios.get(`https://backend.c0f.lol/api/posts/category/${categoryName}`);
      setThreads(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-muted hover:text-white transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <h2 className="text-2xl font-bold text-white border-l-4 border-primary pl-4">{categoryName}</h2>
        </div>
        
        <Link to={`/create-post?category=${categoryName}`}>
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-primary/25">
              + New Thread
            </button>
        </Link>
      </div>

      <div className="bg-surface/50 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="px-6 py-4 border-b border-white/5 bg-white/5 font-medium text-sm text-muted uppercase tracking-wider">
          Threads
        </div>
        
        {loading ? (
            <div className="p-12 text-center text-muted animate-pulse">Loading threads...</div>
        ) : threads.length === 0 ? (
            <div className="p-12 text-center text-muted flex flex-col items-center gap-4">
              <span className="text-4xl">📭</span>
              <p>No threads found in this category.</p>
            </div>
        ) : (
            <div className="divide-y divide-white/5">
              {threads.map(thread => (
                  <div className="p-4 hover:bg-white/5 transition-colors group" key={thread.id}>
                      <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
                            📄
                          </div>
                          <div className="flex-grow">
                              <Link to={`/thread/${thread.id}`} className="text-lg font-semibold text-white group-hover:text-primary transition-colors block mb-1">
                                {thread.title}
                              </Link>
                              <div className="text-xs text-muted flex items-center gap-2">
                                  <span>by <span className="text-white">{thread.author?.username}</span></span>
                                  <span>•</span>
                                  <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                              </div>
                          </div>
                          <div className="text-right hidden sm:block">
                            {/* Placeholder for stats */}
                            <div className="text-xs text-muted">Replies: 0</div>
                            <div className="text-xs text-muted">Views: 0</div>
                          </div>
                      </div>
                  </div>
              ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
