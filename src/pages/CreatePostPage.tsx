import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Type, Image as ImageIcon, Link as LinkIcon, 
  Code2, Terminal, Save, X, LayoutTemplate
} from 'lucide-react';

const CreatePostPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'General';
  
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('TEXT');
  const [mediaUrl, setMediaUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://backend.c0f.lol/api/posts', {
        title,
        content,
        category,
        type,
        mediaUrl: type !== 'TEXT' ? mediaUrl : null
      }, {
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      });
      navigate(`/category/${category}`);
    } catch (err) {
      alert('Failed to post. Session might be expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Terminal size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Create Thread</h1>
            <div className="flex items-center gap-2 text-sm text-muted">
              <span>Target Node:</span>
              <span className="text-primary font-mono bg-primary/5 px-2 py-0.5 rounded border border-primary/10">{category}</span>
            </div>
          </div>
        </div>
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-lg text-muted hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="border-b border-white/5 p-4 bg-black/20">
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Thread Title..." 
            className="w-full bg-transparent text-xl font-bold text-white placeholder-muted/50 focus:outline-none"
            required 
            autoFocus
          />
        </div>

        <div className="flex items-center gap-1 p-2 bg-black/40 border-b border-white/5 overflow-x-auto">
          <button 
            type="button" 
            onClick={() => setType('TEXT')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${type === 'TEXT' ? 'bg-primary/20 text-primary border border-primary/20' : 'text-muted hover:text-white hover:bg-white/5'}`}
          >
            <Type size={16} /> Text
          </button>
          <button 
            type="button" 
            onClick={() => setType('IMAGE')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${type === 'IMAGE' ? 'bg-primary/20 text-primary border border-primary/20' : 'text-muted hover:text-white hover:bg-white/5'}`}
          >
            <ImageIcon size={16} /> Image
          </button>
          <button 
            type="button" 
            onClick={() => setType('LINK')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${type === 'LINK' ? 'bg-primary/20 text-primary border border-primary/20' : 'text-muted hover:text-white hover:bg-white/5'}`}
          >
            <LinkIcon size={16} /> Link
          </button>
          <div className="w-px h-4 bg-white/10 mx-2"></div>
          <button type="button" className="p-1.5 text-muted hover:text-white rounded hover:bg-white/5" title="Insert Code Block">
            <Code2 size={16} />
          </button>
          <button type="button" className="p-1.5 text-muted hover:text-white rounded hover:bg-white/5" title="Preview Layout">
            <LayoutTemplate size={16} />
          </button>
        </div>

        {type !== 'TEXT' && (
           <div className="p-4 bg-black/20 border-b border-white/5 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                  {type === 'IMAGE' ? <ImageIcon size={14} /> : <LinkIcon size={14} />}
                </div>
                <input 
                  type="text" 
                  value={mediaUrl} 
                  onChange={e => setMediaUrl(e.target.value)} 
                  placeholder={type === 'IMAGE' ? "https://example.com/image.png" : "https://example.com/resource"}
                  className="w-full bg-background border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors font-mono"
                />
              </div>
           </div>
        )}

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-black/30 border-r border-white/5 flex flex-col items-end pt-4 pr-3 text-muted/30 font-mono text-sm select-none">
            {Array.from({length: 10}).map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
          <textarea 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            className="w-full h-80 bg-background/50 p-4 pl-16 text-white placeholder-muted/30 font-mono text-sm focus:outline-none resize-none leading-relaxed"
            placeholder="Write your content here..."
            required 
            spellCheck={false}
          ></textarea>
        </div>

        <div className="p-4 bg-black/20 border-t border-white/5 flex justify-end items-center gap-3">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm font-medium text-muted hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <Save size={16} />
                Publish Thread
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
