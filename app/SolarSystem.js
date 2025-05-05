"use client";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { planetData } from "./components/PlanetData";
import { useAudioPlayer } from "./components/AudioPlayer";
import { Popover } from "./components/Popover";
import { Sun } from "./components/three/Sun";
import { Planet } from "./components/three/Planet";
import { Orbit } from "./components/Orbit";
import { SpaceScene } from "./components/space/SpaceScene";

export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const { play, stop } = useAudioPlayer();

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
    play(planet.music);
  };

  const closePopover = () => {
    setSelectedPlanet(null);
    stop();
  };

  return (
    <div className="fullscreen-container">
      <SpaceScene>

        <color attach="background" args={["#020207"]} />
        <ambientLight intensity={0.15} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          color="#FFFFFF"
        />

        <Sun />
        {planetData.map((planet) => (
          <Orbit key={`orbit-${planet.id}`} radius={planet.radius} />
        ))}
        {planetData.map((planet) => (
          <Planet
            key={planet.id}
            {...planet}
            onClick={() => handlePlanetClick(planet)}
            isSelected={selectedPlanet?.id === planet.id}
            hasRings={planet.hasRings}
          />
        ))}

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={15}
          maxDistance={150}
        />
        </SpaceScene>

      <Popover planet={selectedPlanet} onClose={closePopover} />

      <style jsx>{`
        .fullscreen-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}
