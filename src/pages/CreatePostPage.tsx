import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreatePostPage = () => {
  const { categoryId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('TEXT');
  const [mediaUrl, setMediaUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://backend.c0f.lol/api/posts', {
        title,
        content,
        category: categoryId,
        type,
        mediaUrl: type !== 'TEXT' ? mediaUrl : null
      }, {
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      });
      navigate(`/category/${categoryId}`);
    } catch (err) {
      alert('Failed to post. Session might be expired.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>Post New Thread in {categoryId}</h2>
      
      <form onSubmit={handleSubmit} style={{ background: '#1e1e1e', padding: '20px', border: '1px solid #333' }}>
        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Thread Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Type</label>
            <select value={type} onChange={e => setType(e.target.value)} style={{ padding: '8px', background: '#333', color: 'white', border: '1px solid #555' }}>
                <option value="TEXT">Text</option>
                <option value="IMAGE">Image</option>
                <option value="LINK">Link</option>
            </select>
        </div>

        {type !== 'TEXT' && (
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Media URL / Link</label>
                <input type="text" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} placeholder="http://..." />
            </div>
        )}

        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Content</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={10} required style={{ fontFamily: 'sans-serif' }}></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Post Thread</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
