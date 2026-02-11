
import React, { useMemo, useState, useEffect, useCallback } from 'react';

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  rotation: number;
}

interface BackgroundEffectsProps {
  type: 'hearts' | 'stars' | 'leaves' | 'bubbles' | 'glow' | 'pulse';
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ type }) => {
  const [bursts, setBursts] = useState<BurstParticle[]>([]);

  const getEmoji = useCallback(() => {
    switch (type) {
      case 'hearts': return '💖';
      case 'stars': return '✨';
      case 'leaves': return '🍃';
      case 'bubbles': return '🫧';
      case 'glow': return '✨';
      case 'pulse': return '💗';
      default: return '❤️';
    }
  }, [type]);

  const ambientElements = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 20 + 15}px`,
      duration: `${Math.random() * 10 + 10}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, [type]);

  useEffect(() => {
    const handleTap = (e: MouseEvent | TouchEvent) => {
      // Don't trigger if clicking on an interactive element like a button
      if ((e.target as HTMLElement).closest('button')) return;

      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const newParticles: BurstParticle[] = Array.from({ length: 10 }).map((_, i) => ({
        id: Date.now() + i,
        x,
        y,
        tx: (Math.random() - 0.5) * 400,
        ty: (Math.random() - 0.5) * 400,
        size: Math.random() * 20 + 20,
        rotation: Math.random() * 360,
      }));

      setBursts((prev) => [...prev, ...newParticles]);

      // Cleanup particles after animation completes
      setTimeout(() => {
        setBursts((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
      }, 1000);
    };

    window.addEventListener('mousedown', handleTap);
    window.addEventListener('touchstart', handleTap, { passive: true });
    return () => {
      window.removeEventListener('mousedown', handleTap);
      window.removeEventListener('touchstart', handleTap);
    };
  }, [type]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Ambient background elements */}
      {ambientElements.map((el) => (
        <div
          key={el.id}
          className="floating-element opacity-30"
          style={{
            left: el.left,
            fontSize: el.size,
            '--duration': el.duration,
            animationDelay: el.delay,
          } as React.CSSProperties}
        >
          {getEmoji()}
        </div>
      ))}

      {/* Interactive tap bursts */}
      {bursts.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            fontSize: p.size,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            animation: 'burst 1s cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
            transformOrigin: 'center',
          } as React.CSSProperties}
        >
          <div style={{ transform: `rotate(${p.rotation}deg)` }}>
            {getEmoji()}
          </div>
        </div>
      ))}

      {/* Specialty Background Effects */}
      {type === 'glow' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-yellow-100/10 blur-[150px] rounded-full animate-pulse" />
      )}
      
      {type === 'pulse' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[40vh] h-[40vh] bg-pink-400/5 rounded-full animate-[ping_4s_ease-in-out_infinite]" />
        </div>
      )}

      <style>{`
        @keyframes burst {
          0% { 
            transform: translate(-50%, -50%) scale(0); 
            opacity: 0; 
          }
          20% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1.2); 
          }
          100% { 
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.2); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundEffects;
