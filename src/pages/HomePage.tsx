import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

// Hardcoded categories structure for the "Forum Index" look
const FORUM_NODES = [
  {
    category: "Official",
    nodes: [
      { id: 'announcements', title: "Announcements", desc: "Official C0F Community news." },
      { id: 'rules', title: "Rules & Information", desc: "Read before posting." }
    ]
  },
  {
    category: "Cheating",
    nodes: [
      { id: 'Client Releases', title: "Client Releases", desc: "Post your client releases here." },
      { id: 'Source Codes', title: "Source Codes", desc: "Java, C++, and other sources." },
      { id: 'Config Releases', title: "Config Releases", desc: "Best settings for Hvh/Legit." }
    ]
  },
  {
    category: "General",
    nodes: [
      { id: 'Marketplace', title: "Marketplace", desc: "Buy, sell, trade." },
      { id: 'Off-Topic', title: "Off-Topic", desc: "Anything goes." }
    ]
  }
];

const HomePage = () => {
  const { logout, role, username } = useAuth(); // Assuming username is in auth context, if not we'll fix
  
  return (
    <div className="container">
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '20px 0', borderBottom: '1px solid #333' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div className="rainbow-text" style={{ fontSize: '3rem', letterSpacing: '-2px' }}>C0F</div>
            <span style={{ color: '#666', fontSize: '1.2rem', marginTop: '10px' }}>Community</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span>Welcome, <b>{role}</b></span>
            <button className="btn" onClick={logout}>Logout</button>
        </div>
      </header>

      {/* Announcements Banner */}
      <div style={{ background: '#111', border: '1px solid #ff00ff', padding: '15px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 0 10px rgba(255, 0, 255, 0.1)' }}>
        <span style={{ color: '#ff00ff', fontWeight: 'bold' }}>IMPORTANT</span>
        <span style={{ color: 'white' }}>Kraken AntiCheat - The best protection for your server.</span>
        <button className="btn btn-primary" style={{ fontSize: '11px' }}>BUY NOW</button>
      </div>

      {/* Forum Nodes */}
      {FORUM_NODES.map((cat) => (
        <div className="node-category" key={cat.category}>
          <div className="node-header">{cat.category}</div>
          {cat.nodes.map(node => (
            <Link to={`/category/${node.id}`} key={node.id} style={{ display: 'block' }}>
                <div className="node-row">
                    <div className="node-icon">💬</div>
                    <div className="node-info">
                        <span className="node-title">{node.title}</span>
                        <div style={{ fontSize: '12px', color: '#888' }}>{node.desc}</div>
                    </div>
                    <div className="node-stats">
                        {/* Placeholder stats */}
                        <div>-- Threads</div>
                        <div>-- Posts</div>
                    </div>
                </div>
            </Link>
          ))}
        </div>
      ))}

      <footer style={{ textAlign: 'center', color: '#444', marginTop: '50px', fontSize: '11px' }}>
        &copy; 2025 The C0F Community. All rights reserved. <br/>
        Time: {new Date().toLocaleTimeString()}
      </footer>
    </div>
  );
};

export default HomePage;
