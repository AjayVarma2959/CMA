import React, { useState, useEffect } from 'react';
import './PhotoSlider.css';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

function PhotoSlider({ videoUrls, mediaDescription }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videoUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videoUrls.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    // Automatically switch to the next video every 10 seconds
    const intervalId = setInterval(() => {
      nextVideo();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentVideoIndex, videoUrls.length]); // Ensure videoUrls.length is included in the dependency array

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
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              quality: 'hd720',
            },
          },
        }}
      />
      {/* Conditionally render the media description if it exists */}
      {mediaDescription && mediaDescription[currentVideoIndex] && (
        <div className="video-description">
          {mediaDescription[currentVideoIndex]}
        </div>
      )}
      <div className="slider-controls">
        <button onClick={previousVideo} className="slide-button">
          &lt;
        </button>
        <button onClick={nextVideo} className="slide-button">
          &gt;
        </button>
      </div>
    </div>
  );
}

PhotoSlider.propTypes = {
  videoUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  mediaDescription: PropTypes.arrayOf(PropTypes.string), // Include the mediaDescriptions propType
};

export default PhotoSlider;
