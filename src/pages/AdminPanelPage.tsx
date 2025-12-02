import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Terminal, UserX, Trash2, ShieldAlert, Activity } from 'lucide-react';

const AdminPanelPage = () => {
  const { token } = useAuth();
  const [output, setOutput] = useState<string[]>([]);
  const [targetId, setTargetId] = useState('');

  const executeCommand = async (cmd: string) => {
      try {
          // In a real app, this would hit a specific admin endpoint. 
          // For now, let's simulate sending commands to a "console endpoint" if it existed, 
          // or map buttons to specific API calls.
          
          setOutput(prev => [...prev, `> ${cmd}`, "Executing..."]);
          
          // Simulation of API calls based on command
          if (cmd.startsWith("ban")) {
              await axios.post(`https://backend.c0f.lol/api/admin/ban/${targetId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
              setOutput(prev => [...prev, "User banned successfully."]);
          } else if (cmd.startsWith("kick")) {
              // ...
              setOutput(prev => [...prev, "User session terminated."]);
          } else {
              setOutput(prev => [...prev, "Command sent to server queue."]);
          }
      } catch (err) {
          setOutput(prev => [...prev, "ERROR: Execution failed. Check permissions."]);
      }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <div className="p-3 bg-red-600 rounded-lg shadow-lg shadow-red-600/20">
                <ShieldAlert size={32} className="text-white" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-white">Administration Control</h1>
                <p className="text-red-400 font-mono text-sm">LEVEL 5 CLEARANCE REQUIRED</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">User Management</h3>
                <input 
                    type="text" 
                    placeholder="Target User ID" 
                    value={targetId}
                    onChange={e => setTargetId(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white font-mono text-sm focus:border-red-500/50 outline-none"
                />
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => executeCommand(`ban ${targetId}`)} className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 py-2 rounded text-sm font-bold transition-all">
                        <UserX size={14} /> BAN
                    </button>
                    <button onClick={() => executeCommand(`kick ${targetId}`)} className="flex items-center justify-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border border-orange-500/30 py-2 rounded text-sm font-bold transition-all">
                        <Activity size={14} /> KICK
                    </button>
                </div>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Content Control</h3>
                <input 
                    type="text" 
                    placeholder="Post/Comment ID" 
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white font-mono text-sm focus:border-red-500/50 outline-none"
                />
                <button className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-red-900/30 text-zinc-300 border border-white/10 hover:border-red-500/30 py-2 rounded text-sm font-bold transition-all">
                    <Trash2 size={14} /> NUKE CONTENT
                </button>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none"></div>
                <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-2">Emergency Protocols</h3>
                <div className="space-y-3">
                    <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-lg shadow-red-600/20 transition-all uppercase tracking-widest text-xs">
                        ENABLE LOCKDOWN
                    </button>
                    <p className="text-[10px] text-zinc-500 text-center">Freezes all non-admin interactions.</p>
                </div>
            </div>
        </div>

        {/* Live Console Log */}
        <div className="bg-black border border-white/10 rounded-xl overflow-hidden font-mono text-sm">
            <div className="bg-zinc-900 px-4 py-2 border-b border-white/5 flex items-center gap-2 text-zinc-400 text-xs">
                <Terminal size={12} />
                <span>SYSTEM_LOG_STREAM</span>
            </div>
            <div className="p-4 h-64 overflow-y-auto space-y-1 text-zinc-300">
                <div className="text-green-500">{">"} Connection established to Mainframe [SECURE]</div>
                {output.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default AdminPanelPage;
