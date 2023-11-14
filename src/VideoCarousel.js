import React, { useState, useRef , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import './VideoCarousel.css';
import ReactPlayer from 'react-player';



function timeAgo(dateParam) {
  if (!dateParam) {
      return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const today = new Date();
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30);
  const years = Math.round(months / 12);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (seconds < 60) {
      return rtf.format(-seconds, 'second');
  } else if (minutes < 60) {
      return rtf.format(-minutes, 'minute');
  } else if (hours < 24) {
      return rtf.format(-hours, 'hour');
  } else if (days < 30) {
      return rtf.format(-days, 'day');
  } else if (months < 12) {
      return rtf.format(-months, 'month');
  } else {
      return rtf.format(-years, 'year');
  }
}

const VideoCarousel = () => {

  
  const [featuredData, setFeaturedData] = useState([]);
  
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const handleMouseEnter = (videoId) => {
    setPlayingVideoId(videoId);
  };

  const handleMouseLeave = () => {
    setPlayingVideoId(null);
  };
  
  
  

  const navigate = useNavigate();

  async function fetchFeaturedVideos() {
    const url = "https://api.cma.finstrokes.in/user_media/get_media_by_categories";
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Include other headers if needed, like authorization tokens
        },
        body: JSON.stringify({
            category: "Featured",
            'page': 1,
            'size': 100,
            'tags': 'all',
            'searchTerm': 'political',
            // Include any other body data required by the API
        })
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data.result);
        return data.result; // Make sure this aligns with your actual data structure
    } catch (error) {
        console.error('Fetching Featured videos failed:', error);
        // Handle error as needed
    }
}


  
   

useEffect(() => {
    fetchFeaturedVideos().then(initialVideos => {
        if (initialVideos && Array.isArray(initialVideos)) {
            setFeaturedData(initialVideos);
        }
    });
}, []);


const [trendingData,setTrendingData] = useState([]);

async function fetchTrendingVideos() {
  const url = "https://api.cma.finstrokes.in/user_media/get_media_by_categories";
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // Include other headers if needed, like authorization tokens
      },
      body: JSON.stringify({
          category: "Trending",
          'page': 1,
          'size': 100,
          'tags': 'all',
          'searchTerm': 'political',
          // Include any other body data required by the API
      })
  };

  try {
      const response = await fetch(url, options);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response:', data.result);
      return data.result; // Make sure this aligns with your actual data structure
  } catch (error) {
      console.error('Fetching Featured videos failed:', error);
      // Handle error as needed
  }
}



 

useEffect(() => {
  fetchTrendingVideos().then(initialVideos => {
      if (initialVideos && Array.isArray(initialVideos)) {
          setTrendingData(initialVideos);
      }
  });
}, []);


const [likedData,setLikedData] = useState([]);

async function fetchLikedVideos() {
  const url = "https://api.cma.finstrokes.in/user_media/get_media_by_categories";
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // Include other headers if needed, like authorization tokens
      },
      body: JSON.stringify({
          category: "Newly Added",
          'page': 1,
          'size': 100,
          'tags': 'all',
          'searchTerm': 'political',
          // Include any other body data required by the API
      })
  };

  try {
      const response = await fetch(url, options);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response:', data.result);
      return data.result; // Make sure this aligns with your actual data structure
  } catch (error) {
      console.error('Fetching Featured videos failed:', error);
      // Handle error as needed
  }
}



 

useEffect(() => {
  fetchLikedVideos().then(initialVideos => {
      if (initialVideos && Array.isArray(initialVideos)) {
          setLikedData(initialVideos);
      }
  });
}, []);



   const customStylesForFirstCarousel = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'light blue',
    
  };

  const seeMoreButton1 = () => (
    <button
      className="see-more-button1"
      onClick={() => navigate('/featured')} // Update onClick handler
    >
      See More
    </button>
  );

  const seeMoreButton2 = () => (
    <button
      className="see-more-button1"
      onClick={() => navigate('/trending')} // Update onClick handler
    >
      See More
    </button>
  );

  const seeMoreButton3 = () => (
    <button
      className="see-more-button1"
      onClick={() => navigate('/liked')} // Update onClick handler
    >
      See More
    </button>
  );

  




 

 

  const options = {
    items:4,
    nav: false,
    rewind: false,
    dots: false,
  };

  

 

  

  

  const carouselRefs = [useRef(), useRef(), useRef()];

  

  const customNavButtons = (setIndex) => (
    <div className="custom-nav">
      <button className="prev-button" onClick={() => carouselRefs[setIndex].current.prev()}>
        &lt;
      </button>
      <button className="next-button" onClick={() => carouselRefs[setIndex].current.next()}>
        &gt;
      </button>
    </div>
  );

  return (
    <div>
    
      
       <div className={"video-carousel-container" }style={{customStylesForFirstCarousel , backgroundColor: 'lightblue'} } >
        {seeMoreButton1(0)} 
      
        <h1 className="h1v"><span style={{ color: 'orange' }}>★</span> Featured News</h1>
        <OwlCarousel options={options} ref={carouselRefs[0]}>
        
        {featuredData.slice(0, 12).map((video) => ( 
             <div key={video.id} className="video-card"
             onMouseEnter={() => handleMouseEnter(video.id)}
             onMouseLeave={handleMouseLeave}
             
             >
              <div className="video-info-top"> {/* Container for the video info to be on top */}
      <div className="video-item-posted-dateforVCF">{timeAgo(video.created_date)}</div>
      <div className="video-item-iconsforVCF">
        <span>👍 {video.liked_count}</span>
        <span>👀 {video.viewed_count}</span>
      </div>
    </div>
              
              <ReactPlayer
              
                url={video.media_url}
                width="100%"
                height="100%"
                playing={playingVideoId === video.id}
                controls
                muted={true}
                config={{

                  youtube: {
                    playerVars: {
                      
                      rel: 0, // Hide related videos at the end
                      quality: 'hd720',
                      
                    },
                  },
                }}
              />
              <div className="video-title">{video.media_title}</div>
               
            </div>
          ))}
        </OwlCarousel>
        {customNavButtons(0)}
      </div>

      

      <div style={{ margin: '20px' }}></div>

      <div className={"video-carousel-container" }  style={{customStylesForFirstCarousel , backgroundColor: 'lightblue'}}>
      {seeMoreButton2(0)}
        <h1 className="h1v">🔥Trending News</h1>
        <OwlCarousel options={options} ref={carouselRefs[1]}>
        {trendingData.slice(0, 12).map((video) => ( 
              <div key={video.id}  className="video-card"
              onMouseEnter={() => handleMouseEnter(video.id)}
             onMouseLeave={handleMouseLeave}
              
              >
                 <div className="video-info-top"> {/* Container for the video info to be on top */}
      <div className="video-item-posted-dateforVCT">{timeAgo(video.created_date)}</div>
      <div className="video-item-iconsforVCT">
        <span>👍 {video.liked_count}</span>
        <span>👀 {video.viewed_count}</span>
      </div>
    </div>
              <ReactPlayer
                url={video.media_url}
                width="100%"
                height="100%"
                playing={playingVideoId === video.id}
                controls
                muted={true}
                config={{
                  youtube: {
                    playerVars: {
                      
                      rel: 0, 
                      quality: 'hd720',
                    },
                  },
                }}
              />
              <div className="video-title">{video.media_title}</div>
              
            </div>
          ))}
        </OwlCarousel>
        {customNavButtons(1)}
      </div>

      

      <div style={{ margin: '20px' }}></div>

      <div className={"video-carousel-container" }  style={{customStylesForFirstCarousel , backgroundColor: 'lightblue'}}>
      {seeMoreButton3(0)}
        <h1 className="h1v">👍Liked News</h1>
        <OwlCarousel options={options} ref={carouselRefs[2]}>
        {likedData.slice(0, 12).map((video) => ( 
             <div key={video.id}className="video-card"
             
             onMouseEnter={() => handleMouseEnter(video.id)}
             onMouseLeave={handleMouseLeave}
             
             >
               <div className="video-info-top"> {/* Container for the video info to be on top */}
      <div className="video-item-posted-dateforVCL">{timeAgo(video.created_date)}</div>
      <div className="video-item-iconsforVCL">
        <span>👍 {video.liked_count}</span>
        <span>👀 {video.viewed_count}</span>
      </div>
    </div>
              
              <ReactPlayer
                url={video.media_url}
                width="100%"
                height="100%"
                playing={playingVideoId === video.id}
                controls
                muted={true}
                config={{
                  youtube: {
                    playerVars: {
                     
                      rel: 0, 
                      quality: 'hd720',
                    },
                  },
                }}
              />
             <div className="video-title">{video.media_title}</div>
              
            </div>
          ))}
        </OwlCarousel>
        {customNavButtons(2)}
      </div>
      
      <div style={{ margin: '20px' }}></div>
     
<div className="background-after-line">
  <div className="email-input">
    <input type="email" placeholder="Your email address" />
  </div>

  <div className="useful-links">
    <h4>USEFUL LINKS</h4>
    <ul className="nav-items-last">
      <li>About</li>
      <li>Services</li>
      <li>Contact</li>
      <li>Shop</li>
      <li>Blog</li>
    </ul>
  </div>
  <div className="contact-info">
    <p>CONTACT</p>
    <p>123, XYZ ROAD, BSK3 Vijayawada, Andhra Pradesh</p>
  </div>
</div>
</div>
);
};


export default VideoCarousel;