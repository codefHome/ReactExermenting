import React, { useState, useEffect, useContext } from "react";
import { ChallengeContext } from "./CentralStorage";

const ZoomComponent = () => {
  const { zoomLevel, setZoomLevel } = useContext(ChallengeContext);
  let zoomOptions = [];
  let i = 25;
  while (i <= 150) {
    zoomOptions.push({ label: `${i}%`, value: i });
    if (i === 25) {
      i = i + 5;
    } else if (i > 25 && i < 100) {
      i = i + 10;
    } else {
      i = i + 25;
    }
  }

  useEffect(() => {
    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);
  const increaseZoom = () => {
    if (zoomLevel >= 100) {
      return 25;
    } else if (zoomLevel <= 100 && zoomLevel >= 30) {
      return 10;
    } else {
      return 5;
    }
  };
  const decreaseZoom = () => {
    if (zoomLevel > 100) {
      return 25;
    } else if (zoomLevel > 25 && zoomLevel <= 100) {
      return 10;
    } else {
      return 5;
    }
  };
  const handleWheel = (event: any) => {
    const deltaY = event.deltaY;

    if (deltaY > 0) {
      setZoomLevel(Math.min(zoomLevel + increaseZoom(), 150));
    } else if (deltaY < 0) {
      setZoomLevel(Math.max(zoomLevel - decreaseZoom(), 25));
    }
  };

  const handleChange = (event: any) => {
    setZoomLevel(event.target.value);
  };

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + increaseZoom(), 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - decreaseZoom(), 25));
  };

  return (
    <div className="zoomStyle">
      <button onClick={handleZoomOut}>-</button>

      <select value={zoomLevel} onChange={handleChange}>
        {zoomOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button onClick={handleZoomIn}>+</button>
    </div>
  );
};

export default ZoomComponent;
