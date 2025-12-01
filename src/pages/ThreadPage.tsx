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
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
      try {
        const res = await axios.get(`https://backend.c0f.lol/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (!post) return <div className="container">Thread not found.</div>;

  return (
    <div className="container">
       <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#888' }}>&larr; Index</Link>
      </div>

      <h1 style={{ fontSize: '24px', marginBottom: '15px' }}>{post.title}</h1>

      <div className="thread-container">
        {/* Main Post */}
        <div className="post-card">
            {/* User Sidebar */}
            <div className="user-sidebar">
                <div className="user-avatar">
                   <span style={{ fontSize: '30px' }}>{post.author.username[0].toUpperCase()}</span>
                </div>
                <Link to={`/user/${post.author.username}`} className="user-name">{post.author.username}</Link>
                <div className={`user-role ${post.author.role === 'ADMIN' ? 'role-admin' : ''}`}>
                    {post.author.role}
                </div>
            </div>

            {/* Post Content */}
            <div className="post-content-area">
                <div className="post-header">
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                    <span>#{post.id}</span>
                </div>
                <div className="post-body">
                    {post.type === 'IMAGE' && post.mediaUrl && (
                        <div style={{ marginBottom: '15px' }}>
                            <img src={post.mediaUrl} alt="Post Attachment" style={{ maxWidth: '100%', border: '1px solid #333' }} />
                        </div>
                    )}
                    
                    {post.content.split('\n').map((line, i) => (
                        <p key={i} style={{ margin: '0 0 10px 0' }}>{line}</p>
                    ))}
                    
                    {post.type === 'LINK' && post.mediaUrl && (
                        <div style={{ padding: '10px', background: '#222', borderLeft: '3px solid #ff00ff' }}>
                            <a href={post.mediaUrl} target="_blank" rel="noreferrer" style={{ color: '#ff00ff' }}>{post.mediaUrl}</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
