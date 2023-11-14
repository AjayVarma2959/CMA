import React, { useState, useEffect,useRef} from 'react';
import Navbar from './Navbar';
import PhotoSlider from './PhotoSlider';
import NavbarC from './NavbarC';

import './FeaturedConcernCategory.css';
import NewsForFeatured from './NewsForFeatured';

function FeaturedConcernCategory() {
  const [videoUrls, setVideoUrls] = useState([]);
  const [mediaDescription, setMediaDescription] = useState([]);
  const [ setCurrentVideoIndex] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        const response = await fetch('https://api.cma.finstrokes.in/media_data/get_media_data?media_type=concern');
        if (response.ok) {
          const data = await response.json();
          const mediaData = data.result;

          if (Array.isArray(mediaData)) {
            const urls = mediaData.map((item) => item.media_data);
            const description = mediaData.map((item) => item.media_description);
            setVideoUrls(urls);
            setMediaDescription(description);
          } else {
            console.error('API response is not in the expected format.');
          }
        } else {
          console.error('Failed to fetch video URLs from the API');
        }
      } catch (error) {
        console.error('An error occurred while fetching video URLs:', error);
      }
    };

    fetchVideoUrls();
  }, []);

  useEffect(() => {
    // Automatically play the next video when the current one ends
    if (playerRef.current) {
      playerRef.current.getInternalPlayer().addEventListener('ended', () => {
        setCurrentVideoIndex((prevIndex) =>
          prevIndex === videoUrls.length - 1 ? 0 : prevIndex + 1
        );
      });
    }
  }, [videoUrls]);
  

 

  return (
    <div>
      <Navbar />
      <PhotoSlider videoUrls={videoUrls}  mediaDescription={mediaDescription} />
      <NavbarC />

      <h1 className="h1v1Concern1" style={{ color: 'blue' }}>
        <span style={{ color: 'orange' }}>★</span> Featured Concern
      </h1>

     <NewsForFeatured/>
    </div>
  );
}

export default FeaturedConcernCategory;