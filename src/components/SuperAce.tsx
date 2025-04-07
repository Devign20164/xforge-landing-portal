
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationsContext";
import { 
  Star, 
  Zap, 
  Crown, 
  Diamond, 
  Heart, 
  Club, 
  Spade, 
  Gem, 
  Award,
  RotateCw,
  Trophy,
  Gift
} from "lucide-react";

// Game configuration
const REELS = 5;
const ROWS = 4;
const SYMBOLS = [
  { id: 1, icon: <Diamond className="h-8 w-8 text-red-400" />, name: "Diamond", value: 5 },
  { id: 2, icon: <Crown className="h-8 w-8 text-yellow-400" />, name: "Crown", value: 4 },
  { id: 3, icon: <Star className="h-8 w-8 text-orange-400" />, name: "Star", value: 3 },
  { id: 4, icon: <Zap className="h-8 w-8 text-blue-400" />, name: "Zap", value: 2 },
  { id: 5, icon: <Heart className="h-8 w-8 text-pink-400" />, name: "Heart", value: 1.5 },
  { id: 6, icon: <Club className="h-8 w-8 text-green-400" />, name: "Club", value: 1.2 },
  { id: 7, icon: <Spade className="h-8 w-8 text-white" />, name: "Spade", value: 1 }
];
const JOKER = { id: 8, icon: <Gem className="h-8 w-8 text-xforge-teal" />, name: "Joker", value: 0 };
const SCATTER = { id: 9, icon: <Award className="h-8 w-8 text-purple-400" />, name: "Scatter", value: 0 };

const BASE_MULTIPLIERS = [1, 2, 3, 5];
const FREE_SPIN_MULTIPLIERS = [2, 4, 6, 10];

type SlotSymbol = typeof SYMBOLS[0] | typeof JOKER | typeof SCATTER;
type Position = { row: number; col: number };
type GoldenCardPosition = Position | null;

interface GameState {
  grid: SlotSymbol[][];
  spinning: boolean;
  wins: number;
  balance: number;
  betAmount: number;
  freeSpins: number;
  currentFreeSpins: number;
  cascadeLevel: number;
  currentMultiplier: number;
  goldenCards: GoldenCardPosition[];
  winningPositions: Position[];
  hasWon: boolean;
}

const SuperAce: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    grid: Array(ROWS).fill(null).map(() => Array(REELS).fill(SYMBOLS[0])),
    spinning: false,
    wins: 0,
    balance: 2000,
    betAmount: 100,
    freeSpins: 0,
    currentFreeSpins: 0,
    cascadeLevel: 0,
    currentMultiplier: 1,
    goldenCards: [],
    winningPositions: [],
    hasWon: false,
  });
  
  const spinSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);
  const { addNotification } = useNotifications();
  
  // Initialize audio
  useEffect(() => {
    if (typeof Audio !== 'undefined') {
      spinSound.current = new Audio();
      winSound.current = new Audio();
      
      // In a real implementation, you would set actual audio file paths
      // spinSound.current.src = '/sounds/spin.mp3';
      // winSound.current.src = '/sounds/win.mp3';
    }
    
    return () => {
      if (spinSound.current) {
        spinSound.current.pause();
        spinSound.current = null;
      }
      if (winSound.current) {
        winSound.current.pause();
        winSound.current = null;
      }
    };
  }, []);
  
  // Generate random symbol
  const getRandomSymbol = (): SlotSymbol => {
    // 5% chance for scatter
    if (Math.random() < 0.05) {
      return SCATTER;
    }
    
    const randomIndex = Math.floor(Math.random() * SYMBOLS.length);
    return SYMBOLS[randomIndex];
  };
  
  // Determine if position should have a golden card
  const shouldAddGoldenCard = (col: number): boolean => {
    // 20% chance to appear on reels 2-4
    return (col >= 1 && col <= 3) && Math.random() < 0.2;
  };
  
  // Spin the reels
  const spinReels = () => {
    if (gameState.spinning || gameState.balance < gameState.betAmount) {
      return;
    }
    
    // Play spin sound
    if (spinSound.current) {
      spinSound.current.currentTime = 0;
      spinSound.current.play().catch(() => {});
    }
    
    setGameState(prev => ({
      ...prev,
      spinning: true,
      hasWon: false,
      winningPositions: [],
      balance: prev.currentFreeSpins > 0 ? prev.balance : prev.balance - prev.betAmount,
    }));
    
    // Generate golden card positions (only on reels 2-4)
    const newGoldenCards: GoldenCardPosition[] = [];
    for (let col = 0; col < REELS; col++) {
      for (let row = 0; row < ROWS; row++) {
        if (shouldAddGoldenCard(col)) {
          newGoldenCards.push({ row, col });
        }
      }
    }
    
    // Generate random grid
    setTimeout(() => {
      const newGrid = Array(ROWS).fill(null).map(() => 
        Array(REELS).fill(null).map(() => getRandomSymbol())
      );
      
      setGameState(prev => ({
        ...prev,
        grid: newGrid,
        spinning: false,
        goldenCards: newGoldenCards,
        cascadeLevel: 0,
        currentMultiplier: prev.currentFreeSpins > 0 ? FREE_SPIN_MULTIPLIERS[0] : BASE_MULTIPLIERS[0],
      }));
      
      // Check for wins after spinning
      checkWins(newGrid, newGoldenCards);
    }, 1200);
  };
  
  // Check for winning combinations
  const checkWins = (grid: SlotSymbol[][], goldenCards: GoldenCardPosition[]) => {
    let totalWin = 0;
    const winPositions: Position[] = [];
    
    // Check for scatter (3+ triggers free spins)
    let scatterCount = 0;
    const scatterPositions: Position[] = [];
    
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < REELS; col++) {
        if (grid[row][col].name === "Scatter") {
          scatterCount++;
          scatterPositions.push({ row, col });
        }
      }
    }
    
    // Add scatter positions to winning positions
    if (scatterCount >= 3) {
      winPositions.push(...scatterPositions);
      
      // Add free spins
      const newFreeSpins = scatterCount === 3 ? 8 : scatterCount === 4 ? 12 : 15;
      
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          freeSpins: prev.freeSpins + newFreeSpins,
          currentFreeSpins: prev.currentFreeSpins + newFreeSpins,
          winningPositions: scatterPositions,
          hasWon: true,
        }));
        
        toast.success(`${newFreeSpins} Free Spins Triggered!`, {
          position: "top-center"
        });
        
        addNotification({
          title: "Free Spins Triggered!",
          message: `You've won ${newFreeSpins} free spins!`,
          type: "points"
        });
      }, 300);
    }
    
    // Check all possible ways to win (adjacent symbols from left to right)
    // This is simplified - in a real slot game, this would be more complex
    for (let row = 0; row < ROWS; row++) {
      let currentSymbol = grid[row][0];
      let count = 1;
      let positions: Position[] = [{ row, col: 0 }];
      
      for (let col = 1; col < REELS; col++) {
        const symbol = grid[row][col];
        const isJoker = symbol.name === "Joker";
        const isGoldenCard = goldenCards.some(pos => pos.row === row && pos.col === col);
        
        // Check if the next symbol is the same as the current one or a joker
        if (symbol.name === currentSymbol.name || isJoker || currentSymbol.name === "Joker") {
          count++;
          positions.push({ row, col });
          
          // If we have a golden card, it will turn into a joker after a win
          if (isGoldenCard) {
            // This will be handled in the cascadeReels function
          }
        } else {
          break;
        }
      }
      
      // We need at least 3 matching symbols for a win
      if (count >= 3) {
        const symbolValue = currentSymbol.value;
        const win = symbolValue * count * gameState.betAmount * (gameState.currentFreeSpins > 0 ? FREE_SPIN_MULTIPLIERS[gameState.cascadeLevel] : BASE_MULTIPLIERS[gameState.cascadeLevel]);
        totalWin += win;
        winPositions.push(...positions);
      }
    }
    
    // If we have wins, update the game state
    if (totalWin > 0 || scatterCount >= 3) {
      setGameState(prev => {
        const multiplierArray = prev.currentFreeSpins > 0 ? FREE_SPIN_MULTIPLIERS : BASE_MULTIPLIERS;
        const multiplierIndex = Math.min(prev.cascadeLevel, multiplierArray.length - 1);
        
        return {
          ...prev,
          wins: prev.wins + totalWin,
          balance: prev.balance + totalWin,
          hasWon: true,
          winningPositions: winPositions,
        };
      });
      
      if (totalWin > 0) {
        // Play win sound
        if (winSound.current) {
          winSound.current.currentTime = 0;
          winSound.current.play().catch(() => {});
        }
        
        // Show toast for win
        toast.success(`You won ${totalWin.toFixed(2)} points!`, {
          position: "top-center"
        });
        
        // Add to notifications
        if (totalWin >= gameState.betAmount * 10) {
          addNotification({
            title: "Big Win!",
            message: `You've won ${totalWin.toFixed(2)} points in Super Ace!`,
            type: "points"
          });
        }
        
        // Cascade reels after a delay
        setTimeout(() => {
          cascadeReels(winPositions);
        }, 1000);
      }
    } else if (gameState.currentFreeSpins > 0) {
      // Continue with next free spin
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          currentFreeSpins: prev.currentFreeSpins - 1,
        }));
        
        if (gameState.currentFreeSpins > 1) {
          setTimeout(spinReels, 1000);
        }
      }, 1000);
    }
  };
  
  // Cascade reels (remove winning symbols and drop new ones)
  const cascadeReels = (winPositions: Position[]) => {
    // Create a copy of the current grid
    const newGrid = [...gameState.grid.map(row => [...row])];
    const newGoldenCards = [...gameState.goldenCards];
    
    // Convert golden cards in winning positions to jokers
    for (const pos of winPositions) {
      const goldenCardIndex = newGoldenCards.findIndex(
        card => card && card.row === pos.row && card.col === pos.col
      );
      
      if (goldenCardIndex >= 0) {
        newGrid[pos.row][pos.col] = JOKER;
        newGoldenCards.splice(goldenCardIndex, 1);
      } else {
        // Replace winning symbols with new random ones
        newGrid[pos.row][pos.col] = getRandomSymbol();
      }
    }
    
    // Update game state with new grid and increment cascade level
    setGameState(prev => {
      const newCascadeLevel = Math.min(prev.cascadeLevel + 1, 3); // Max 4 levels (0-3)
      const multiplierArray = prev.currentFreeSpins > 0 ? FREE_SPIN_MULTIPLIERS : BASE_MULTIPLIERS;
      const multiplierIndex = Math.min(newCascadeLevel, multiplierArray.length - 1);
      
      return {
        ...prev,
        grid: newGrid,
        goldenCards: newGoldenCards,
        cascadeLevel: newCascadeLevel,
        currentMultiplier: multiplierArray[multiplierIndex],
        winningPositions: [],
        hasWon: false,
      };
    });
    
    // Check for new wins after cascading
    setTimeout(() => {
      checkWins(newGrid, newGoldenCards);
    }, 500);
  };
  
  // Adjust bet amount
  const adjustBet = (amount: number) => {
    if (gameState.spinning) return;
    
    setGameState(prev => ({
      ...prev,
      betAmount: Math.max(50, Math.min(500, prev.betAmount + amount)),
    }));
  };
  
  // Reset the game
  const resetGame = () => {
    setGameState({
      grid: Array(ROWS).fill(null).map(() => Array(REELS).fill(SYMBOLS[0])),
      spinning: false,
      wins: 0,
      balance: 2000,
      betAmount: 100,
      freeSpins: 0,
      currentFreeSpins: 0,
      cascadeLevel: 0,
      currentMultiplier: 1,
      goldenCards: [],
      winningPositions: [],
      hasWon: false,
    });
    
    toast.success("Game Reset", {
      description: "Your balance has been reset to 2000 points.",
      position: "top-center"
    });
  };
  
  // Auto-spin free spins
  useEffect(() => {
    if (gameState.currentFreeSpins > 0 && !gameState.spinning) {
      const timer = setTimeout(() => {
        spinReels();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.currentFreeSpins, gameState.spinning]);
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Super Ace</h3>
        <p className="text-xforge-gray max-w-2xl mx-auto">
          Match adjacent symbols from left to right to win. Golden cards transform into Joker wilds after a win!
        </p>
      </div>
      
      {/* Game Information */}
      <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-2xl">
        <div className="bg-xforge-dark/80 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-center">
          <p className="text-xforge-gray text-sm">Balance</p>
          <p className="text-white font-bold text-xl">{gameState.balance}</p>
        </div>
        <div className="bg-xforge-dark/80 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-center">
          <p className="text-xforge-gray text-sm">Win</p>
          <p className="text-white font-bold text-xl">{gameState.wins}</p>
        </div>
        <div className="bg-xforge-dark/80 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-center">
          <p className="text-xforge-gray text-sm">Free Spins</p>
          <p className="text-white font-bold text-xl">{gameState.currentFreeSpins}</p>
        </div>
      </div>
      
      {/* Multiplier Display */}
      <div className="mb-6 flex items-center justify-center">
        <div className={`p-3 rounded-lg border text-center transition-all duration-300 ${
          gameState.cascadeLevel > 0 
            ? 'bg-gradient-to-r from-xforge-teal to-blue-500 border-xforge-teal' 
            : 'bg-xforge-dark/80 border-white/10'
        }`}>
          <p className="text-white text-sm">Multiplier</p>
          <p className="text-white font-bold text-xl">x{gameState.currentMultiplier}</p>
        </div>
      </div>
      
      {/* Slot Grid */}
      <div className="bg-[#1A1A1A]/80 backdrop-blur-sm p-4 rounded-xl border border-white/10 mb-6">
        <div className="grid grid-cols-5 gap-1 p-2 bg-[#0F0F0F] rounded-lg">
          {gameState.grid.map((row, rowIndex) => (
            <React.Fragment key={`row-${rowIndex}`}>
              {row.map((symbol, colIndex) => {
                const isWinningPosition = gameState.winningPositions.some(
                  pos => pos.row === rowIndex && pos.col === colIndex
                );
                const isGoldenCard = gameState.goldenCards.some(
                  pos => pos && pos.row === rowIndex && pos.col === colIndex
                );
                
                return (
                  <div 
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={`relative h-16 w-16 md:h-20 md:w-20 flex items-center justify-center rounded-md transition-all duration-300 ${
                      isWinningPosition 
                        ? 'bg-gradient-to-r from-xforge-teal/30 to-purple-500/30 animate-pulse' 
                        : isGoldenCard 
                          ? 'bg-gradient-to-r from-yellow-500/30 to-amber-300/30' 
                          : 'bg-[#1E1E1E]'
                    } ${gameState.spinning ? 'animate-spin-slow' : ''}`}
                  >
                    {/* Symbol */}
                    <div className={`transform transition-all duration-300 ${
                      isWinningPosition ? 'scale-125' : ''
                    }`}>
                      {symbol.icon}
                    </div>
                    
                    {/* Golden Card Overlay */}
                    {isGoldenCard && (
                      <div className="absolute inset-0 border-2 border-yellow-500 rounded-md pointer-events-none"></div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Game Controls */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 w-full max-w-2xl">
        <div className="flex items-center gap-2 bg-xforge-dark/80 backdrop-blur-sm p-2 rounded-lg border border-white/10">
          <button 
            onClick={() => adjustBet(-50)}
            disabled={gameState.spinning || gameState.betAmount <= 50}
            className="w-10 h-10 flex items-center justify-center rounded-md bg-[#1E1E1E] text-white hover:bg-[#2E2E2E] disabled:opacity-50"
          >
            -
          </button>
          <div className="w-24 text-center">
            <p className="text-xforge-gray text-xs">Bet</p>
            <p className="text-white font-bold">{gameState.betAmount}</p>
          </div>
          <button 
            onClick={() => adjustBet(50)}
            disabled={gameState.spinning || gameState.betAmount >= 500}
            className="w-10 h-10 flex items-center justify-center rounded-md bg-[#1E1E1E] text-white hover:bg-[#2E2E2E] disabled:opacity-50"
          >
            +
          </button>
        </div>
        
        <button 
          onClick={spinReels}
          disabled={gameState.spinning || (gameState.balance < gameState.betAmount && gameState.currentFreeSpins <= 0)}
          className={`flex-1 h-12 rounded-lg font-bold text-lg transition-all duration-300 ${
            gameState.spinning 
              ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
              : gameState.currentFreeSpins > 0
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-600/20'
                : 'bg-gradient-to-r from-xforge-teal to-[#02c4af] text-xforge-dark hover:shadow-lg hover:shadow-xforge-teal/20'
          }`}
        >
          {gameState.spinning ? 'Spinning...' : gameState.currentFreeSpins > 0 ? `Free Spin (${gameState.currentFreeSpins})` : 'Spin'}
        </button>
        
        <button
          onClick={resetGame}
          disabled={gameState.spinning}
          className="h-12 w-12 flex items-center justify-center rounded-lg bg-[#1E1E1E] text-white hover:bg-[#2E2E2E] disabled:opacity-50"
        >
          <RotateCw className="h-5 w-5" />
        </button>
      </div>
      
      {/* Game Information */}
      <div className="bg-xforge-dark/80 backdrop-blur-sm p-4 rounded-xl border border-white/10 mb-6 w-full max-w-2xl">
        <h4 className="text-white font-bold mb-3">Game Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-6 w-6 bg-gradient-to-r from-yellow-500/30 to-amber-300/30 rounded flex items-center justify-center">
              <Gift className="h-4 w-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-white font-medium">Golden Cards</p>
              <p className="text-xforge-gray text-sm">20% chance to appear on reels 2–4. Transform into Joker wilds after a win.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-6 w-6 bg-gradient-to-r from-xforge-teal/30 to-blue-500/30 rounded flex items-center justify-center">
              <Zap className="h-4 w-4 text-xforge-teal" />
            </div>
            <div>
              <p className="text-white font-medium">Combo Multipliers</p>
              <p className="text-xforge-gray text-sm">Increase with cascading wins—x1, x2, x3, x5 in base game and x2, x4, x6, x10 during Free Spins.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-6 w-6 bg-purple-500/30 rounded flex items-center justify-center">
              <Award className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <p className="text-white font-medium">Free Spins</p>
              <p className="text-xforge-gray text-sm">Triggered by 3+ Scatter symbols. 3 = 8 spins, 4 = 12 spins, 5 = 15 spins.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-6 w-6 bg-green-500/30 rounded flex items-center justify-center">
              <Trophy className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <p className="text-white font-medium">Max Win</p>
              <p className="text-xforge-gray text-sm">Up to 1,500x your bet with stacked wins and multipliers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAce;
