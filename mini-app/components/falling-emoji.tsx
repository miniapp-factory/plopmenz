'use client';

import { useEffect, useRef } from 'react';

const EMOJIS = ['🐱', '🐶', '🦊', '🐹', '🐴'];

export default function FallingEmoji() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spawn = () => {
      const emoji = document.createElement('div');
      const size = Math.random() * 30 + 20; // 20-50px
      const left = Math.random() * 100; // percent
      const rotation = Math.random() * 360;
      const duration = Math.random() * 5 + 5; // 5-10s

      emoji.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      emoji.style.position = 'absolute';
      emoji.style.left = `${left}%`;
      emoji.style.top = '-60px';
      emoji.style.transform = `rotate(${rotation}deg)`;
      emoji.style.fontSize = `${size}px`;
      emoji.style.pointerEvents = 'none';
      emoji.style.animation = `fall ${duration}s linear forwards`;
      emoji.style.zIndex = '9999';

      container.appendChild(emoji);

      emoji.addEventListener('animationend', () => {
        container.removeChild(emoji);
      });
    };

    const interval = setInterval(spawn, 800);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 999,
      }}
    >
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
