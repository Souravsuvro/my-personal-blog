import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';
import { TwitterIcon, FacebookIcon, LinkedinIcon, WhatsappIcon } from 'react-share';

interface GameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onScoreChange: (score: number) => void;
  onGameOver: (finalScore: number) => void;
}

const triggerHaptic = (pattern: number | number[] = 50) => {
  if (navigator.vibrate) navigator.vibrate(pattern);
};

// Memory Match
const MemoryMatch: React.FC<GameProps> = ({ difficulty, onScoreChange, onGameOver }) => {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const numPairs = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : 10;
  const baseTime = difficulty === 'easy' ? 90 : difficulty === 'medium' ? 70 : 50;

  useEffect(() => {
    const emojis = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🥑', '🍍', '🥝', '🍊', '🍑', '🍋'].slice(0, numPairs);
    const gameCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5).map((emoji, index) => ({ id: index, emoji }));
    setCards(gameCards);
    setTimeLeft(baseTime);
  }, [numPairs, baseTime]);

  useEffect(() => {
    if (timeLeft <= 0) { onGameOver(score); return; }
    const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, score, onGameOver]);

  const handleFlip = (id: number) => {
    triggerHaptic(30);
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[b].emoji) {
        const newMatched = [...matched, a, b];
        setMatched(newMatched);
        const points = 100 + Math.floor(timeLeft / 2);
        const newScore = score + points;
        setScore(newScore);
        onScoreChange(newScore);
        setFlipped([]);
        if (newMatched.length === cards.length) setTimeout(() => onGameOver(newScore), 500);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  return (
    <div className="text-center px-4">
      <div className="flex justify-between items-center mb-8 max-w-2xl mx-auto text-lg md:text-xl">
        <div>Score: <span className="text-4xl font-bold text-blue-400">{score}</span></div>
        <div>Time: <span className="font-mono">{timeLeft}s</span></div>
      </div>
      <div className={`grid grid-cols-4 sm:grid-cols-5 gap-2 md:gap-3 max-w-2xl mx-auto`}>
        {cards.map((card, i) => (
          <div key={i} onClick={() => handleFlip(i)} className={`aspect-square flex items-center justify-center text-4xl sm:text-5xl cursor-pointer rounded-2xl border-4 border-gray-700 transition-all select-none active:scale-95 ${flipped.includes(i) || matched.includes(i) ? 'bg-gray-800 scale-110' : 'bg-gray-900 hover:bg-gray-800'}`}>
            {(flipped.includes(i) || matched.includes(i)) ? card.emoji : '❓'}
          </div>
        ))}
      </div>
    </div>
  );
};

// Reaction Time
const ReactionTime: React.FC<GameProps> = ({ difficulty, onScoreChange, onGameOver }) => {
  const [targets, setTargets] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);

  const speed = difficulty === 'easy' ? 1200 : difficulty === 'medium' ? 800 : 500;

  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    if (timeLeft <= 0 && gameStarted) onGameOver(score);
  }, [timeLeft, gameStarted, score, onGameOver]);

  const spawnTarget = () => {
    const newTarget = Date.now();
    setTargets(prev => [...prev.slice(-3), newTarget]);
    setTimeout(() => setTargets(p => p.filter(t => t !== newTarget)), 800);
  };

  useEffect(() => {
    if (!gameStarted) return;
    const i = setInterval(spawnTarget, speed);
    return () => clearInterval(i);
  }, [gameStarted, speed]);

  const hitTarget = (id: number) => {
    triggerHaptic(50);
    const points = difficulty === 'hard' ? 25 : difficulty === 'medium' ? 20 : 15;
    const newScore = score + points;
    setScore(newScore);
    onScoreChange(newScore);
    setTargets(prev => prev.filter(t => t !== id));
  };

  const startGame = () => setGameStarted(true);

  return (
    <div className="px-4">
      {!gameStarted ? (
        <button onClick={startGame} className="px-12 py-6 text-2xl bg-purple-600 rounded-2xl hover:bg-purple-500 w-full max-w-xs mx-auto block">Start Reaction Challenge</button>
      ) : (
        <>
          <div className="flex justify-between text-xl md:text-2xl mb-8">
            <div>Score: {score}</div>
            <div>Time: {timeLeft}s</div>
          </div>
          <div className="relative h-80 md:h-96 border-2 border-dashed border-gray-700 rounded-3xl overflow-hidden mx-auto max-w-lg cursor-crosshair bg-gray-950">
            {targets.map(id => (
              <div key={id} onClick={() => hitTarget(id)} className="absolute w-16 h-16 md:w-20 md:h-20 bg-red-500 rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-2xl cursor-pointer active:scale-75" style={{left: `${10 + Math.random()*80}%`, top: `${15 + Math.random()*65}%`}}>⚡</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Math Sprint
const MathSprint: React.FC<GameProps> = ({ difficulty, onScoreChange, onGameOver }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [numAnswered, setNumAnswered] = useState(0);

  const maxQ = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 18 : 25;

  const generate = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 25) + 5;
    let b = Math.floor(Math.random() * 15) + 3;
    if (op === '-' && a < b) [a, b] = [b, a];
    setQuestion(`${a} ${op} ${b}`);
    setAnswer('');
  };

  useEffect(() => { generate(); const t = setInterval(() => setTimeLeft(tt => tt > 0 ? tt - 1 : 0), 1000); return () => clearInterval(t); }, []);

  useEffect(() => { if (timeLeft <= 0 || numAnswered >= maxQ) onGameOver(score); }, [timeLeft, numAnswered, score, onGameOver]);

  const submit = () => {
    triggerHaptic(40);
    // eslint-disable-next-line no-eval
    const correct = eval(question);
    if (parseInt(answer) === correct) {
      const pts = 40 + (difficulty === 'hard' ? 25 : 0);
      const ns = score + pts;
      setScore(ns);
      onScoreChange(ns);
      setNumAnswered(n => n + 1);
      generate();
    } else {
      setTimeLeft(t => Math.max(5, t - 8));
    }
    setAnswer('');
  };

  return (
    <div className="max-w-md mx-auto text-center px-4">
      <div className="flex justify-between mb-8 text-xl">
        <div>Score: {score}</div>
        <div>Time: {timeLeft}s</div>
      </div>
      <div className="text-5xl md:text-6xl mb-12 font-bold min-h-[80px]">{question} =</div>
      <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} className="w-full text-center text-5xl bg-transparent border-b-4 border-purple-500 py-6 focus:outline-none" autoFocus />
      <button onClick={submit} className="mt-12 w-full py-6 bg-purple-600 rounded-2xl text-xl">Submit</button>
    </div>
  );
};

// Simon Says
const SimonSays: React.FC<GameProps> = ({ difficulty, onScoreChange, onGameOver }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isShowing, setIsShowing] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOverState, setGameOverState] = useState(false);

  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308'];
  const audioContext = React.useRef<AudioContext | null>(null);

  const playSound = (index: number) => {
    if (!audioContext.current) audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 300 + index * 100;
    gain.gain.value = 0.3;
    oscillator.connect(gain);
    gain.connect(audioContext.current.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 200);
    triggerHaptic([60, 30]);
  };

  const addToSequence = () => {
    const newSeq = [...sequence, Math.floor(Math.random() * 4)];
    setSequence(newSeq);
    setIsShowing(true);
    newSeq.forEach((colorIndex, i) => setTimeout(() => playSound(colorIndex), i * 600));
    setTimeout(() => setIsShowing(false), newSeq.length * 600);
  };

  const handleColorClick = (index: number) => {
    if (isShowing) return;
    triggerHaptic(50);
    const newPlayerSeq = [...playerSequence, index];
    setPlayerSequence(newPlayerSeq);
    playSound(index);

    if (newPlayerSeq[newPlayerSeq.length - 1] !== sequence[newPlayerSeq.length - 1]) {
      setGameOverState(true);
      onGameOver(score);
      return;
    }

    if (newPlayerSeq.length === sequence.length) {
      const newScore = score + 50 * sequence.length;
      setScore(newScore);
      onScoreChange(newScore);
      setPlayerSequence([]);
      setTimeout(addToSequence, 800);
    }
  };

  useEffect(() => {
    if (sequence.length === 0) addToSequence();
  }, []);

  return (
    <div className="text-center px-4">
      <div className="text-4xl font-bold mb-8">Score: {score}</div>
      <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-xs mx-auto">
        {colors.map((color, index) => (
          <button key={index} onClick={() => handleColorClick(index)} className="h-28 md:h-36 rounded-3xl shadow-2xl active:scale-95 transition-all" style={{ backgroundColor: color, opacity: isShowing ? 0.7 : 1 }} />
        ))}
      </div>
      {gameOverState && <div className="mt-8 text-xl">Game Over! Final Score: {score}</div>}
    </div>
  );
};

const BrainGames: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [currentScore, setCurrentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bestScores, setBestScores] = useState<Record<string, number>>({});

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const gameNames: Record<string, string> = { memory: 'Memory Match', reaction: 'Reaction Time', math: 'Math Sprint', simon: 'Simon Says' };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('brainGameBestScores') || '{}');
    setBestScores(saved);
  }, []);

  const saveBest = (gid: string, sc: number) => {
    const k = `${gid}-${difficulty}`;
    const nb = Math.max(bestScores[k] || 0, sc);
    const up = { ...bestScores, [k]: nb };
    localStorage.setItem('brainGameBestScores', JSON.stringify(up));
    setBestScores(up);
  };

  const handleOver = (sc: number) => {
    if (selectedGame) saveBest(selectedGame, sc);
    setCurrentScore(sc);
    setGameOver(true);
  };

  const reset = () => {
    setSelectedGame(null);
    setGameOver(false);
    setCurrentScore(0);
  };

  const shareUrl = `${siteUrl}/games`;
  const shareTitle = selectedGame ? `Scored ${currentScore} on ${gameNames[selectedGame]} (${difficulty})! 🧠` : '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 text-lg">← Home</Link>
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">🧠 Brain Games</h1>
          <p className="text-xl md:text-2xl text-gray-400">Challenge yourself. Beat records. Share victories.</p>
        </div>

        {!selectedGame ? (
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              { id: 'memory', name: 'Memory Match', emoji: '🃏', desc: 'Match pairs of cards' },
              { id: 'reaction', name: 'Reaction Time', emoji: '⚡', desc: 'Smash fast targets' },
              { id: 'math', name: 'Math Sprint', emoji: '🔢', desc: 'Solve equations fast' },
              { id: 'simon', name: 'Simon Says', emoji: '🎵', desc: 'Repeat the sequence' }
            ].map(g => (
              <div key={g.id} className="bg-gray-900 border border-gray-700 rounded-3xl p-8 md:p-10 hover:border-purple-400 group transition-all">
                <div className="text-6xl md:text-8xl mb-6 group-hover:scale-110 transition">{g.emoji}</div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{g.name}</h3>
                <p className="text-gray-400 mb-10 text-base md:text-lg">{g.desc}</p>
                <div className="grid grid-cols-3 gap-3">
                  {(['easy', 'medium', 'hard'] as const).map(d => (
                    <button key={d} onClick={() => { setSelectedGame(g.id); setDifficulty(d); }} className="py-4 md:py-5 rounded-2xl text-sm font-semibold border border-gray-700 hover:bg-white hover:text-black transition-all capitalize">{d}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-3xl p-8 md:p-12 min-h-[500px] md:min-h-[600px]">
            {selectedGame === 'memory' && <MemoryMatch difficulty={difficulty} onScoreChange={setCurrentScore} onGameOver={handleOver} />}
            {selectedGame === 'reaction' && <ReactionTime difficulty={difficulty} onScoreChange={setCurrentScore} onGameOver={handleOver} />}
            {selectedGame === 'math' && <MathSprint difficulty={difficulty} onScoreChange={setCurrentScore} onGameOver={handleOver} />}
            {selectedGame === 'simon' && <SimonSays difficulty={difficulty} onScoreChange={setCurrentScore} onGameOver={handleOver} />}
          </div>
        )}

        {gameOver && (
          <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 md:p-6">
            <div className="bg-gray-900 border border-purple-500/50 rounded-3xl p-10 md:p-16 max-w-lg w-full text-center">
              <div className="text-6xl md:text-8xl mb-6">🏆</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Fantastic!</h2>
              <div className="text-7xl md:text-[110px] font-mono text-purple-400 mb-8">{currentScore}</div>
              <div className="flex justify-center gap-4 md:gap-6 mb-10 md:mb-12">
                <TwitterShareButton url={shareUrl} title={shareTitle}><TwitterIcon size={48} round /></TwitterShareButton>
                <FacebookShareButton url={shareUrl} title={shareTitle}><FacebookIcon size={48} round /></FacebookShareButton>
                <LinkedinShareButton url={shareUrl} title={shareTitle}><LinkedinIcon size={48} round /></LinkedinShareButton>
                <WhatsappShareButton url={shareUrl} title={shareTitle}><WhatsappIcon size={48} round /></WhatsappShareButton>
              </div>
              <button onClick={reset} className="px-12 md:px-20 py-5 md:py-6 bg-white text-black text-xl md:text-2xl font-bold rounded-2xl hover:bg-gray-100">Play Again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrainGames;
