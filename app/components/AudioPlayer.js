import { useRef } from 'react';

export const useAudioPlayer = () => {
  const audioRef = useRef(null);

  const play = (src) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    audioRef.current = new Audio(src);
    audioRef.current.play();
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { play, stop };
};