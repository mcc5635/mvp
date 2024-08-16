import React, { useState, useRef, useEffect } from 'react';
import '../styling/ProgressBar.css';

const ProgressBar = ({ progress, title }) => {
  const [handlePosition, setHandlePosition] = useState(progress);
  const progressBarRef = useRef(null);

  const handleMouseMove = (event) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const newWidth = Math.min(Math.max(0, event.clientX - rect.left), rect.width);
      const newProgress = (newWidth / rect.width) * 100;
      setHandlePosition(newProgress);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    setHandlePosition(progress);
  }, [progress]);

  return (
    <div className="progress-bar-wrapper">
      <div className="bg-[#f19e75] py-1 px-3 rounded d-flex justify-center align-middle">
        <div>

          <text style={{fontSize: 15}}>{`${Math.round(handlePosition)}% Assets`}</text>
        </div>
        <div style={{marginTop: 3}}>
         <text style={{fontSize: 18}}>{title}</text>
        </div>
      </div>
      <div className="slider">
        <div
          className="progress-bar-container"
          ref={progressBarRef}
        >
          <div
            className="progress-bar"
            style={{ width: `100%` }}
          />
          <div
            className="handle"
            style={{ left: `${handlePosition}%` }}
            onMouseDown={handleMouseDown}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
