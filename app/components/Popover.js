'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { PopoverPlanet } from './three/PopoverPlanet'

export const Popover = ({ planet, onClose }) => {
  if (!planet) return null

  return (
    <div className="popover-overlay">
      <div className="popover-container">
        <div className="popover-content">
          <div className="popover-threejs">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[2, 10, 10]} />
              <PopoverPlanet planet={planet} />
              <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>
          </div>
          <div className="popover-info">
            <div className="info-header">
              <h2 className="planet-name">{planet.name}</h2>
              <div className="planet-status">
                <span className="status-indicator"></span>
                <span>ACTIVE SCAN</span>
              </div>
            </div>
            <div className="info-grid">
              <div className="grid-item">
                <span className="grid-label">CLASS</span>
                <span className="grid-value">{planet.class || 'TERRESTRIAL'}</span>
              </div>
              <div className="grid-item">
                <span className="grid-label">GRAVITY</span>
                <span className="grid-value">{planet.gravity || '1.0G'}</span>
              </div>
              <div className="grid-item">
                <span className="grid-label">TEMPERATURE</span>
                <span className="grid-value">{planet.temp || '288K'}</span>
              </div>
              <div className="grid-item">
                <span className="grid-label">ATMOSPHERE</span>
                <span className="grid-value">{planet.atmosphere || 'N2/O2'}</span>
              </div>
            </div>
            <div className="info-scroll">
              <p className="planet-description">{planet.info}</p>
            </div>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>
          <span className="close-icon">⨯</span>
          <span className="close-text">TERMINATE CONNECTION</span>
        </button>
        <div className="corner-decor corner-tl"></div>
        <div className="corner-decor corner-tr"></div>
        <div className="corner-decor corner-bl"></div>
        <div className="corner-decor corner-br"></div>
        <div className="scanline"></div>
      </div>
      <style jsx>{`
        @keyframes flicker {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .popover-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(0,20,50,0.8) 0%, rgba(0,0,0,0.9) 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }
        
        .popover-container {
          width: 85vw;
          height: 75vh;
          background: linear-gradient(135deg, rgba(10,25,60,0.5) 0%, rgba(5,15,40,0.3) 100%);
          border-radius: 4px;
          padding: 2px;
          position: relative;
          border: 1px solid rgba(0, 180, 255, 0.3);
          box-shadow: 0 0 20px rgba(0, 120, 255, 0.3),
                      inset 0 0 15px rgba(0, 150, 255, 0.2);
          overflow: hidden;
          animation: flicker 5s infinite;
        }
        
        .popover-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            rgba(0, 100, 255, 0.1) 1px, 
            transparent 1px
          );
          background-size: 100% 2px;
          pointer-events: none;
        }
        
        .popover-content {
          display: flex;
          height: calc(100% - 4px);
          margin: 2px;
          background: rgba(5, 10, 30, 0.6);
        }
        
        .popover-threejs {
          width: 55%;
          height: 100%;
          border-right: 1px solid rgba(0, 180, 255, 0.2);
        }
        
        .popover-info {
          width: 45%;
          padding: 20px;
          color: #e0f0ff;
          font-family: 'Courier New', monospace;
          display: flex;
          flex-direction: column;
        }
        
        .info-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(0, 180, 255, 0.3);
        }
        
        .planet-name {
          margin: 0;
          color: #4af;
          font-size: 2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(0, 180, 255, 0.5);
        }
        
        .planet-status {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          color: #0f0;
          letter-spacing: 1px;
        }
        
        .status-indicator {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #0f0;
          border-radius: 50%;
          margin-right: 8px;
          box-shadow: 0 0 5px #0f0;
          animation: pulse 1.5s infinite;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 25px;
        }
        
        .grid-item {
          display: flex;
          flex-direction: column;
        }
        
        .grid-label {
          font-size: 0.7rem;
          color: #8af;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 3px;
        }
        
        .grid-value {
          font-size: 1rem;
          color: #fff;
          background: rgba(0, 50, 100, 0.3);
          padding: 5px 10px;
          border-left: 2px solid #4af;
        }
        
        .info-scroll {
          flex-grow: 1;
          overflow-y: auto;
          padding-right: 10px;
        }
        
        .planet-description {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #c0e0ff;
          margin: 0;
        }
        
        .close-button {
          position: absolute;
          bottom: 25px;
          right: 25px;
          background: rgba(200, 50, 50, 0.2);
          border: 1px solid rgba(255, 50, 50, 0.5);
          color: #f44;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 5px 10px;
          transition: all 0.3s;
          z-index: 10;
        }
        
        .close-button:hover {
          background: rgba(255, 50, 50, 0.3);
          box-shadow: 0 0 10px rgba(255, 50, 50, 0.5);
        }
        
        .close-icon {
          margin-right: 8px;
          font-size: 1.2rem;
        }
        
        .close-text {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .corner-decor {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: #4af;
          border-style: solid;
          border-width: 0;
          pointer-events: none;
        }
        
        .corner-tl {
          top: 0;
          left: 0;
          border-top-width: 2px;
          border-left-width: 2px;
        }
        
        .corner-tr {
          top: 0;
          right: 0;
          border-top-width: 2px;
          border-right-width: 2px;
        }
        
        .corner-bl {
          bottom: 0;
          left: 0;
          border-bottom-width: 2px;
          border-left-width: 2px;
        }
        
        .corner-br {
          bottom: 0;
          right: 0;
          border-bottom-width: 2px;
          border-right-width: 2px;
        }
        
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.5), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
          opacity: 0.3;
        }
        
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        
        /* Custom scrollbar */
        .info-scroll::-webkit-scrollbar {
          width: 4px;
        }
        
        .info-scroll::-webkit-scrollbar-track {
          background: rgba(0, 30, 60, 0.3);
        }
        
        .info-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 180, 255, 0.5);
          border-radius: 2px;
        }
      `}</style>
    </div>
  )
}