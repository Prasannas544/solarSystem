const Comet = () => {
    const ref = useRef();
    useFrame(({ clock }) => {
      ref.current.position.x = Math.sin(clock.getElapsedTime()) * 50;
      ref.current.position.y = Math.cos(clock.getElapsedTime()) * 30;
      ref.current.position.z = Math.sin(clock.getElapsedTime() * 0.5) * 50;
    });
    return (
      <mesh ref={ref}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#66ccff" />
        <pointLight color="#66ccff" intensity={2} distance={10} />
      </mesh>
    );
  };