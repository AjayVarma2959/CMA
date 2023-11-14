import React, { useState } from 'react';
import './ToggleComponent.css';

function ToggleComponent() {
  const [isConcern, setIsConcern] = useState(false);
  const [showNewsOptions, setShowNewsOptions] = useState(false);
  const [showConcernOptions, setShowConcernOptions] = useState(false);

  const toggleNewsOptions = () => {
    setIsConcern(false);
    setShowNewsOptions(true);
    setShowConcernOptions(false);
  };

  const toggleConcernOptions = () => {
    setIsConcern(true);
    setShowNewsOptions(false);
    setShowConcernOptions(true);
  };

  return (
    <div className="component-container">
      <div className="toggle-container">
        <button 
          className={!isConcern ? "toggle-button active" : "toggle-button"} 
          onClick={toggleNewsOptions}
        >
          News
        </button>
        <button 
          className={isConcern ? "toggle-button active" : "toggle-button"} 
          onClick={toggleConcernOptions}
        >
          Concern
        </button>
      </div>
      {showNewsOptions && (
        <div className="options-container1">
          {/* Replace these with actual news options */}
          <button className="option-button">Audio</button>
          <button className="option-button">Video</button>
          <button className="option-button">Text</button>
          <button className="option-button">Image</button>
        </div>
      )}
      {showConcernOptions && (
        <div className="options-container2">
          {/* Replace these with actual concern options */}
          <button className="option-button">Audio</button>
          <button className="option-button">Video</button>
          <button className="option-button">Text</button>
          <button className="option-button">Image</button>
        </div>
      )}
    </div>
  );
}

export default ToggleComponent;
