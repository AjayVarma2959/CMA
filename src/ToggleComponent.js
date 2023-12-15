import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import './ToggleComponent.css';


function ToggleComponent({ onCategoryChange, onOptionSelect }) {
  const [isConcern, setIsConcern] = useState(false);
  const [showNewsOptions, setShowNewsOptions] = useState(false);
  const [showConcernOptions, setShowConcernOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleNewsOptions = () => {
    setIsConcern(false);
    onCategoryChange('News');
    setShowNewsOptions(true);
    setShowConcernOptions(false);
    setSelectedOption(''); 
  };

  const toggleConcernOptions = () => {
    setIsConcern(true);
    onCategoryChange('Concern'); 
    setShowNewsOptions(false);
    setShowConcernOptions(true);
    setSelectedOption(''); 
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onOptionSelect(option); 

    
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
          
          <button className={`option-button ${selectedOption === 'Audio' ? 'selected' : ''}`} onClick={() => handleOptionClick('Audio')}>Audio</button>
          <button className={`option-button ${selectedOption === 'Video' ? 'selected' : ''}`} onClick={() => handleOptionClick('Video')}>Video</button>
          <button className={`option-button ${selectedOption === 'Text' ? 'selected' : ''}`} onClick={() => handleOptionClick('Text')}>Text</button>
          <button className={`option-button ${selectedOption === 'Image' ? 'selected' : ''}`} onClick={() => handleOptionClick('Image')}>Image</button>
        </div>
      )}
      {showConcernOptions && (
        <div className="options-container2">
          
          <button className={`option-button ${selectedOption === 'Audio' ? 'selected' : ''}`} onClick={() => handleOptionClick('Audio')}>Audio</button>
          <button className={`option-button ${selectedOption === 'Video' ? 'selected' : ''}`} onClick={() => handleOptionClick('Video')}>Video</button>
          <button className={`option-button ${selectedOption === 'Text' ? 'selected' : ''}`} onClick={() => handleOptionClick('Text')}>Text</button>
          <button className={`option-button ${selectedOption === 'Image' ? 'selected' : ''}`} onClick={() => handleOptionClick('Image')}>Image</button>
        </div>
      )}
    </div>
  );
}


ToggleComponent.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  onOptionSelect: PropTypes.func.isRequired,
};

export default ToggleComponent;
