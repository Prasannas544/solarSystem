"use client";
import { useState } from "react";
import SolarSystem from "./SolarSystem";
import { useAudioPlayer } from "./components/AudioPlayer";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const { play, stop } = useAudioPlayer();

  const toggleMute = () => {
    if (isMuted) {
      play("/space.mp3");
    } else {
      stop();
    }
    setIsMuted(!isMuted);
  };

  return (
    <main style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <SolarSystem />
      
      {/* Futuristic Audio Control Button */}
      <button
        style={{
          position: "absolute",
          bottom: "50px",
          right: "50px",
          padding: "12px 24px 12px 16px",
          borderRadius: "4px",
          border: "1px solid rgba(0, 180, 255, 0.3)",
          background: "linear-gradient(135deg, rgba(10,25,60,0.7) 0%, rgba(5,15,40,0.9) 100%)",
          color: "#e0f0ff",
          cursor: "pointer",
          fontFamily: '"Courier New", monospace',
          fontSize: "0.9rem",
          textTransform: "uppercase",
          letterSpacing: "1px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 0 10px rgba(0, 120, 255, 0.3)",
          transition: "all 0.3s ease",
          zIndex: 100
        }} 
        onClick={toggleMute}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 180, 255, 0.5)"}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 120, 255, 0.3)"}
      >
        {/* Dynamic Futuristic Volume Icon */}
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={isMuted ? "#f44" : "#4af"} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{
            filter: isMuted ? "drop-shadow(0 0 3px rgba(255,50,50,0.7))" : "drop-shadow(0 0 3px rgba(0,180,255,0.7))"
          }}
        >
          {isMuted ? (
            <>
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="21" y1="9" x2="15" y2="15" />
              <line x1="21" y1="15" x2="15" y2="9" />
            </>
          ) : (
            <>
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </>
          )}
        </svg>
        
        {!isMuted ? "ACTIVATED" : "MUTED"}
      </button>
    </main>
  );
}