import { useState, useEffect } from 'react';

export const OfflineGame = () => {
    // Snake Game Hook & Logic
    const [snake, setSnake] = useState([[0,0], [1,0]]);
    const [food, setFood] = useState([5,5]);
    const [dir, setDir] = useState([1,0]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        // Key Listener for 'R' and Game Controls
        const handleKeys = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'r') window.location.reload();
            
            // Snake Controls
            switch(e.key) {
                case 'ArrowUp': if(dir[1]===0) setDir([0,-1]); break;
                case 'ArrowDown': if(dir[1]===0) setDir([0,1]); break;
                case 'ArrowLeft': if(dir[0]===0) setDir([-1,0]); break;
                case 'ArrowRight': if(dir[0]===0) setDir([1,0]); break;
            }
        };
        window.addEventListener('keydown', handleKeys);
        
        // Game Loop
        const moveSnake = () => {
            if (gameOver) return;
            setSnake(prev => {
                const newHead = [prev[prev.length-1][0] + dir[0], prev[prev.length-1][1] + dir[1]];
                // Wall Collision (Wrap around or Die - Let's wrap for endless fun)
                if (newHead[0] >= 20) newHead[0] = 0;
                if (newHead[0] < 0) newHead[0] = 19;
                if (newHead[1] >= 20) newHead[1] = 0;
                if (newHead[1] < 0) newHead[1] = 19;

                // Self Collision
                if (prev.some(s => s[0] === newHead[0] && s[1] === newHead[1])) {
                    setGameOver(true);
                    return prev;
                }

                const newSnake = [...prev, newHead];
                if (newHead[0] === food[0] && newHead[1] === food[1]) {
                    setFood([Math.floor(Math.random()*20), Math.floor(Math.random()*20)]);
                } else {
                    newSnake.shift();
                }
                return newSnake;
            });
        };

        const gameInterval = setInterval(moveSnake, 100);
        return () => {
            window.removeEventListener('keydown', handleKeys);
            clearInterval(gameInterval);
        };
    }, [dir, food, gameOver]);

    return (
        <div className="min-h-screen bg-[#111] text-[#d1d5db] font-sans flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full space-y-8">
                {/* Header */}
                <div className="border-b border-white/10 pb-6">
                    <h1 className="text-3xl font-light mb-2">Backend Connection Failed</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Error 521: Web Server is Down
                    </div>
                </div>

                {/* Main Info */}
                <div className="space-y-4">
                    <p className="text-lg">
                        The browser was able to connect to the frontend, but the backend API is unreachable.
                    </p>
                    <div className="bg-[#000] p-4 rounded border border-white/5 font-mono text-xs text-gray-400">
                        <p>{'>'} GET https://backend.c0f.lol/api/public/status</p>
                        <p className="text-red-400">{'>'} ERR_CONNECTION_TIMED_OUT</p>
                    </div>
                    <p className="text-sm text-gray-500">
                        Press <kbd className="bg-white/10 px-2 py-0.5 rounded text-white font-mono">R</kbd> to retry connection.
                    </p>
                </div>

                {/* Mini Game */}
                <div className="mt-12">
                    <p className="text-xs text-center mb-2 text-gray-600 uppercase tracking-widest">Waiting Room • High Score: {snake.length - 2}</p>
                    <div className="w-[300px] h-[300px] mx-auto bg-black border border-white/10 grid grid-cols-20 grid-rows-20 relative">
                        {gameOver && (
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center flex-col z-10">
                                <span className="text-red-500 font-bold mb-2">GAME OVER</span>
                                <button onClick={() => {setSnake([[0,0],[1,0]]); setGameOver(false);}} className="text-xs border border-white/20 px-2 py-1 hover:bg-white/10">Restart</button>
                            </div>
                        )}
                        {/* Food */}
                        <div className="bg-primary" style={{ gridColumn: food[0]+1, gridRow: food[1]+1 }}></div>
                        {/* Snake */}
                        {snake.map((s, i) => (
                            <div key={i} className={`${i === snake.length-1 ? 'bg-white' : 'bg-gray-500'}`} style={{ gridColumn: s[0]+1, gridRow: s[1]+1 }}></div>
                        ))}
                    </div>
                    <p className="text-[10px] text-center mt-2 text-gray-700">Use Arrow Keys to Play</p>
                </div>

                {/* Footer */}
                <div className="pt-8 border-t border-white/5 flex justify-between text-[10px] text-gray-600 font-mono">
                    <span>Ray ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                    <span>IP: Dynamic</span>
                    <span>C0F Security Network</span>
                </div>
            </div>
        </div>
    );
};
