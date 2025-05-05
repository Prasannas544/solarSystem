// app/components/AnimeCDNDemo.tsx
'use client';

import { useEffect } from 'react';

export default function AnimeCDNDemo() {
  useEffect(() => {
    // Dynamic import from CDN
    import('https://cdn.jsdelivr.net/npm/animejs@3.2.2/+esm')
      .then(({ animate }) => {
        animate({
          targets: '.cdn-element',
          translateY: 100,
          opacity: [0, 1],
          duration: 1200
        });
      });
  }, []);

  return <div className="cdn-element">CDN Loaded Animation</div>;
}