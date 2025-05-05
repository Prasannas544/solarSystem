// app/components/AnimeGlobal.js
'use client';

import { useEffect } from 'react';

export default function AnimeGlobal() {
  useEffect(() => {
    if (window.anime) {
      window.anime({
        targets: '.global-box',
        scale: [0, 1],
        duration: 1000
      });
    }
  }, []);

  return <div className="global-box">Global Script Animation</div>;
}