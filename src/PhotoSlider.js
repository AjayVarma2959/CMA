import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import './PhotoSlider.css';

function PhotoSlider({ videoUrls, mediaDescription }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const nextVideo = () => {
    setCurrentVideoIndex(prevIndex =>
      prevIndex === videoUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousVideo = () => {
    setCurrentVideoIndex(prevIndex =>
      prevIndex === 0 ? videoUrls.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextVideo();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentVideoIndex, videoUrls.length]);

  return (
    <div className="photo-slider">
      <ReactPlayer
        url={videoUrls[currentVideoIndex]}
        playing
        controls
        width="85vw"
        height="100vh"
        onClick={nextVideo}
        muted={true}
        
      />
       {mediaDescription && mediaDescription[currentVideoIndex] && (
        <div className="media-info">
          <h1 className="media-title">{mediaDescription[currentVideoIndex].media_title}</h1>
          
        </div>
      )}
      <div className="slider-controls">
        <button onClick={previousVideo} className="slide-button">&lt;</button>
        <button onClick={nextVideo} className="slide-button">&gt;</button>
      </div>
    </div>
  );
}

PhotoSlider.propTypes = {
  videoUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  mediaDescription: PropTypes.arrayOf(PropTypes.shape({
    media_title: PropTypes.string,
    media_description: PropTypes.string
  })),
};

export default PhotoSlider;
