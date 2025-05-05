export const PlanetInfo = ({ planet }) => {
    if (!planet) return null;
  
    return (
      <div className="planet-info">
        <h2>{planet.name}</h2>
        <p>{planet.info}</p>
        <style jsx>{`
          .planet-info {
            position: absolute;
            bottom: 20px;
            left: 20px;
            color: white;
            background-color: rgba(0,0,0,0.7);
            padding: 20px;
            border-radius: 10px;
            max-width: 400px;
          }
        `}</style>
      </div>
    );
  };