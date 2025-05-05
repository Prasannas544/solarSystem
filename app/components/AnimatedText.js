'use client'; // Required for client-side animations

import { useEffect } from 'react';
import { animate } from 'animejs';

export default function AnimatedText() {
  useEffect(() => {
    const animation = animate('span', {
      // Property keyframes
      y: [
        { value: '-2.75rem', easing: 'easeOutExpo', duration: 600 },
        { value: 0, easing: 'easeOutBounce', duration: 800, delay: 100 }
      ],
      // Property specific parameters
      rotate: {
        value: ['-1turn', 0],
        delay: 0
      },
      delay: (el, i) => i * 50, // Staggered delay
      easing: 'easeInOutCirc',
      loop: true,
      loopDelay: 1000
    });

    return () => {
      animation.pause(); // Cleanup animation on unmount
    };
  }, []);

  return (
    <div className="text-animation-container">
      <h2 className="letter-grid">
        {'HELLO WORLD'.split('').map((letter, i) => (
          <span key={i} className="letter">
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </h2>
    </div>
  );
}