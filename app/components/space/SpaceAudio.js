import { useState, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three'; // Add this import

export const SpaceAudio = ({ audioPath = '/space.mp3' }) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  const { camera } = useThree();

  useEffect(() => {
    // Create audio listener and attach to camera
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // Create audio object
    audioRef.current = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    
    audioLoader.load(audioPath, (buffer) => {
      audioRef.current.setBuffer(buffer);
      audioRef.current.setLoop(true);
      audioRef.current.setVolume(0.3);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.stop();
        camera.remove(listener);
      }
    };
  }, [audioPath, camera]);

  const toggleAudio = () => {
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setAudioPlaying(!audioPlaying);
  };

  return (
    <group>
      {/* This empty group is just to satisfy R3F's requirement for JSX */}
      <group onClick={toggleAudio} />
    </group>
  );
};