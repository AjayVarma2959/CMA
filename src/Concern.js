import React, { useState, useEffect , useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import Navbar from './Navbar';
import PhotoSlider from './PhotoSlider';
import NavbarC from './NavbarC';
import './Concerrn.css'; 
import OwlCarousel from 'react-owl-carousel2'; 
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import defaultImage from './photos/CMA.png';




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



const NewsCard = ({ Media}) => {
    const [showDescription, setShowDescription] = useState(false);
    
    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    return (
        
        
        <div className="news-card-container">
            
            <div 
                className="news-card-for-featuredFN"
                onClick={toggleDescription}
                
            >
                
                <img 
                  src={Media.thumbnail || defaultImage} 
                  alt={Media.media_title || 'Default image'} 
                  className="news-imageFN" 
                />
                {showDescription && (
                    <div className="news-contentFN">
                        <p className="news-descriptionFN">{Media.media_description}</p>
                    </div>
                )}
            </div>
            <div className="news-infoFN">
                <h3 className="news-titleFN">{Media.media_title}</h3>
                <div className="news-metaFN">
                    <span className="news-likesFN">👍 {Media.liked_count}</span>
                    <span className="news-viewsFN">👀 {Media.viewed_count}</span>
                    <span className="news-posted-timeFN">{timeAgo(Media.created_date)}</span>
                </div>
            </div>
        </div>
    );
};

NewsCard.propTypes = {
  Media: PropTypes.shape({
    thumbnail: PropTypes.string,
    media_title: PropTypes.string,
    media_description: PropTypes.string,
    liked_count: PropTypes.number,
    viewed_count: PropTypes.number,
    created_date: PropTypes.string,
  }).isRequired,
};





function Concern() {
 
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
            const urls = mediaData.map(item => item.media_data);
            const descriptions = mediaData.map(item => ({
              media_title: item.media_title,
              media_description: item.media_description
            }));
            setVideoUrls(urls);
            setMediaDescription(descriptions);
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



  const [featuredConcern, setFeaturedConcern] = useState([]);
  
  const navigate = useNavigate();

  
  async function fetchFeaturedConcern() {
    const url = "https://api.cma.finstrokes.in/user_media/get_concern_by_categories";
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({
            category: "Featured",
            'page': 1,
            'size': 1000,
            
            
        })
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data.result);
        return data.result;
    } catch (error) {
        console.error('Fetching Featured videos failed:', error);
       
    }
}



   

useEffect(() => {
  fetchFeaturedConcern().then(fetchedNews => {
    if (fetchedNews && Array.isArray(fetchedNews)) {
      setFeaturedConcern(fetchedNews.slice(0, 12)); 
    }
  });
}, []);






const [trendingConcern, setTrendingConcern] = useState([]);


async function fetchTrendingConcern() {
  const url = "https://api.cma.finstrokes.in/user_media/get_concern_by_categories";
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          
      },
      body: JSON.stringify({
          category: "Trending",
          'page': 1,
          'size': 1000,
          
          
      })
  };

  try {
      const response = await fetch(url, options);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response:', data.result);
      return data.result; 
  } catch (error) {
      console.error('Fetching Featured videos failed:', error);
      
  }
}



 

useEffect(() => {
  fetchTrendingConcern().then(fetchedNews => {
    if (fetchedNews && Array.isArray(fetchedNews)) {
      setTrendingConcern(fetchedNews.slice(0, 12)); 
    }
  });
}, []);




const [likedConcern, setLikedConcern] = useState([]);


async function fetchLikedConcern() {
  const url = "https://api.cma.finstrokes.in/user_media/get_concern_by_categories";
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          
      },
      body: JSON.stringify({
          category: "Newly Added",
          'page': 1,
          'size': 1000,
          
          
      })
  };

  try {
      const response = await fetch(url, options);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response:', data.result);
      return data.result; 
  } catch (error) {
      console.error('Fetching Featured videos failed:', error);
      
  }
}



 
useEffect(() => {
  fetchLikedConcern().then(fetchedNews => {
    if (fetchedNews && Array.isArray(fetchedNews)) {
      setLikedConcern(fetchedNews.slice(0, 12)); 
    }
  });
}, []);





const customStylesForFirstConcernCarousel = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor:'light blue',
  
};


const seeMoreButton1concern = () => (
  <button
    className="see-more-button1Concern"
    onClick={() => navigate('/featuredconcern')} 
  >
    See More
  </button>
);

const seeMoreButton2concern = () => (
  <button
    className="see-more-button2Concern"
    onClick={() => navigate('/trendingconcern')} 
  >
    See More
  </button>
);

const seeMoreButton3concern = () => (
  <button
    className="see-more-button3Concern"
    onClick={() => navigate('/likedconcern')} 
  >
    See More
  </button>
);



 

  const options = {
    items: 4, 
    nav: false, 
    rewind: false, 
    dots: false, 
  };


  const carouselRefs = [useRef(), useRef(), useRef()];

  const customNavButtonsConcern = (setIndex) => (
    <div className="custom-nav">
      <button className="prev-buttonConcern" onClick={() => carouselRefs[setIndex].current.prev()}>
        &lt;
      </button>
      <button className="next-buttonConcern" onClick={() => carouselRefs[setIndex].current.next()}>
        &gt;
      </button>
    </div>
  );

  



  
  return (
    <div>
      <Navbar />
      <PhotoSlider videoUrls={videoUrls}  mediaDescription={mediaDescription} />
      <NavbarC />
      <div className={"video-carousel-containerConcern" }style={{customStylesForFirstConcernCarousel, backgroundColor: 'lightblue'} } >
        {seeMoreButton1concern(0)} 
      
        <h1 className="h1v"><span style={{ color: 'orange' }}>★</span> Featured Concern</h1>
        <OwlCarousel options={options} ref={carouselRefs[0]}>
          
        {featuredConcern.map((item) => (
                     <NewsCard key={item.Media.id} Media={item.Media} defaultImage={defaultImage} />
                ))}
      
    
  
</OwlCarousel>
        {customNavButtonsConcern(0)}
      </div>

      

      <div style={{ margin: '20px' }}></div>

      <div className={"video-carousel-containerConcern" }  style={{customStylesForFirstConcernCarousel , backgroundColor: 'lightblue'}}>
      {seeMoreButton2concern(0)}
        <h1 className="h1v">🔥Trending Concern</h1>
        <OwlCarousel options={options} ref={carouselRefs[1]}>
        {trendingConcern.map((item) => (
                     <NewsCard key={item.Media.id} Media={item.Media} defaultImage={defaultImage} />
                ))}
        </OwlCarousel>
        {customNavButtonsConcern(1)}
      </div>

      

      <div style={{ margin: '20px' }}></div>

      <div className={"video-carousel-containerConcern" }  style={{customStylesForFirstConcernCarousel , backgroundColor: 'lightblue'}}>
      {seeMoreButton3concern(0)}
        <h1 className="h1v">👍Liked Concern</h1>
        <OwlCarousel options={options} ref={carouselRefs[2]}>
        {likedConcern.map((item) => (
                     <NewsCard key={item.Media.id} Media={item.Media} defaultImage={defaultImage} />
                ))}
        </OwlCarousel>
        {customNavButtonsConcern(2)}
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



}


export default Concern;