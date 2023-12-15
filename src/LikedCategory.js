import React, { useState, useEffect , useRef} from 'react';
import Navbar from './Navbar';
import PhotoSlider from './PhotoSlider';
import NavbarC from './NavbarC';
import './LikedCategory.css';
import VideosForLiked from './VideosForLiked';

function LikedCategory (){
  const [videoUrls, setVideoUrls] = useState([]);
  const [mediaDescription, setMediaDescription] = useState([]);
  const [ setCurrentVideoIndex] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        const response = await fetch('https://api.cma.finstrokes.in/media_data/get_media_data?media_type=news');
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
      <PhotoSlider videoUrls={videoUrls} mediaDescription={mediaDescription}/>
      <NavbarC />

      <h1 className="h1v3" color='blue'><span style={{ color: 'orange' }}>👍</span> Liked News</h1>
      <VideosForLiked/>
      
      </div>
    
  );
}

export default LikedCategory;