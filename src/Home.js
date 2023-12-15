import React, { useState, useEffect , useRef} from 'react';
import {   Route, Routes } from 'react-router-dom';
import PhotoSlider from './PhotoSlider';
import FeaturedCategory from './FeaturedCategory';
import TrendingCategory from './TrendingCategory';
import LikedCategory from './LikedCategory';
import NavbarC from './NavbarC';
import NewSection from './NewSection';
// import Concerns from './Concerns';
import VideoGrid from './VideoGrid';
// import Footer from './Footer';
import ConcernSection from './ConcernSection';
import Navbar from './Navbar';

import Concern from './Concern';
import News from './News';
import UploadFiles from './UploadFiles';







function Home() {
  

  const [videoUrls, setVideoUrls] = useState([]);
  const [mediaDescription, setMediaDescription] = useState([]);
  const [ setCurrentVideoIndex] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        const response = await fetch('https://api.cma.finstrokes.in/media_data/get_media_data?media_type=home');
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
    
    <Routes>
      
      
      <Route path="/concern" element={<Concern />} />
      <Route path="/News" element={<News />} />
      
      <Route path="/featured" element={<FeaturedCategory />} />
      <Route path="/trending" element={<TrendingCategory />} />
      <Route path="/liked" element={<LikedCategory />} />
      <Route path="/uploadfiles" element={<UploadFiles/>} />
      
     

      
      <Route path="/" element={
        <>
        

          <Navbar />
          <PhotoSlider videoUrls={videoUrls}  mediaDescription={mediaDescription} />
          
          <NavbarC />
          <NewSection />
          {/* <Concerns /> */}
          <VideoGrid/>
          {/* <Footer /> */}
          <ConcernSection/>
          
          
          
          
          
         
        </>
      } />
    </Routes>
    
  );
}

export default Home;
