// app/hooks/useAnime.js
'use client';

import { useEffect } from 'react';
import anime from 'animejs';

export default function useAnime(targets, animation) {
  useEffect(() => {
    anime({
      targets,
      ...animation
    });
  }, [targets, animation]);
}