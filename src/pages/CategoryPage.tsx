import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  author: { username: string; role: string };
  createdAt: string;
  // We'll treat 'Post' as a Thread for now
}

const CategoryPage = () => {
  const { id } = useParams();
  const [threads, setThreads] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreads();
  }, [id]);

  const fetchThreads = async () => {
    try {
      // In a real app, filtering by category happens on backend
      const res = await axios.get(`https://backend.c0f.lol/api/posts/category/${id}`);
      setThreads(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#888' }}>&larr; Back to Index</Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, borderLeft: '3px solid #ff00ff', paddingLeft: '15px' }}>{id}</h2>
        <Link to={`/create-thread/${id}`}>
            <button className="btn btn-primary">Post New Thread</button>
        </Link>
      </div>

      <div className="node-category">
        <div className="node-header">Threads</div>
        {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
        ) : threads.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>There are no threads in this forum yet.</div>
        ) : (
            threads.map(thread => (
                <div className="node-row" key={thread.id}>
                    <div className="node-icon" style={{ fontSize: '18px' }}>📄</div>
                    <div className="node-info">
                        <Link to={`/thread/${thread.id}`} className="node-title" style={{ fontSize: '15px' }}>{thread.title}</Link>
                        <div style={{ fontSize: '11px', color: '#888' }}>
                            Started by <span style={{ color: '#aaa' }}>{thread.author?.username}</span>, {new Date(thread.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
