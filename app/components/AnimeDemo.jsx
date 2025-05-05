// app/components/AnimeDemo.tsx
'use client'; // Required for client-side animations

import { useEffect } from 'react';
import anime from 'animejs';

export default function AnimeDemo() {
  useEffect(() => {
    anime({
      targets: '.animated-element',
      translateX: 250,
      rotate: '1turn',
      duration: 800,
      easing: 'easeInOutSine'
    });
  }, []);

  return (
    <div className="animated-element" style={{
      width: '50px',
      height: '50px',
      backgroundColor: 'blue'
    }} />
  );
}