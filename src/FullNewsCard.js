import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faShare, faCopy, faClock } from '@fortawesome/free-solid-svg-icons';
import defaultImage from './photos/CMA.png';
import './FullNewsCard.css';
import Navbar from './Navbar';

function FullNewsCard() {
  const location = useLocation();
  const newsItem = location.state?.newsItem;
  const [reviewerName, setReviewerName] = useState('');
  const [likedCount, setLikedCount] = useState(newsItem?.Media?.liked_count || 0);


  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const readFromLocalStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };
  
  
  const [actionStatus, setActionStatus] = useState(() => {
    return readFromLocalStorage('actionStatus', {
      LIKE: false,
      VIEW: false,
      SHARE: false,
      DISLIKE: false
    });
  });


  useEffect(() => {
    saveToLocalStorage('actionStatus', actionStatus);
  }, [actionStatus]);


  useEffect(() => {
    const fetchMediaData = async () => {
      const userId = 1;
      const mediaId = newsItem?.Media?.id || 3; 
      const page = 1;
      const size = 100;

      const url = `https://api.cma.finstrokes.in/user_media/get_media_by_id?user_id=${userId}&media_id=${mediaId}&page=${page}&size=${size}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const mediaData = data?.result?.media?.media;
        if (mediaData) {
          setReviewerName(mediaData.reviewer?.name || 'Reviewer data not available');
          
          
          setActionStatus(mediaData.filteredActions || {
            LIKE: false,
            VIEW: false,
            SHARE: false,
            DISLIKE: false
          });
          
          setLikedCount(mediaData.liked_count);
        }
      } catch (error) {
        console.error('Error fetching media data:', error);
        setReviewerName('Reviewer data not available');
      }
    };

    fetchMediaData();
  }, [newsItem]);

  const handleLike = async () => {
    const currentLikeStatus = !actionStatus.LIKE;
    setActionStatus({
      ...actionStatus,
      LIKE: currentLikeStatus,
      
      DISLIKE: currentLikeStatus ? false : actionStatus.DISLIKE
    });
    
    const userId = 17; 
    const mediaId = newsItem?.Media?.id; 

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('media_id', mediaId);

    try {
      const response = await fetch('https://api.cma.finstrokes.in/user_media/update_like', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.statusCode !== 200) {
        
        setActionStatus({ ...actionStatus, LIKE: !currentLikeStatus });
        setLikedCount(!currentLikeStatus ? likedCount + 1 : likedCount - 1);
      }
    } catch (error) {
      
      setActionStatus({ ...actionStatus, LIKE: !currentLikeStatus });
      setLikedCount(!currentLikeStatus ? likedCount + 1 : likedCount - 1);
      console.error('Error when trying to like/dislike:', error);
    }
  };


  const handleDislike = async () => {
    const newDislikeStatus = !actionStatus.DISLIKE;
    setActionStatus(prevStatus => ({
      ...prevStatus,
      
      LIKE: newDislikeStatus ? false : prevStatus.LIKE,
      DISLIKE: newDislikeStatus
    }));
    const formData = new FormData();
    formData.append('media_id', newsItem?.Media?.id || 314); 

    try {
      const response = await fetch('https://api.cma.finstrokes.in/user_media/update_disLike', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.statusCode !== 200) {
       
        setActionStatus({ ...actionStatus, DISLIKE: !newDislikeStatus });
      }
      
    } catch (error) {
      
      setActionStatus({ ...actionStatus, DISLIKE: !newDislikeStatus });
      console.error('Error when trying to dislike:', error);
    }
  };

  if (!newsItem || !newsItem.Media) {
    return <div>No news item found.</div>;
  }

  const isVideo = newsItem.Media.media_type === 'video';
  const formattedDate = new Date(newsItem.Media.created_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatViewCount = (count) => {
    if (count < 1000) return count.toString();
    if (count < 10000) return (count / 1000).toFixed(1) + 'K';
    return Math.round(count / 1000) + 'K';
  };

  return (
    <div>
      <Navbar />
      <div className="news-card-wrapper">
        <div className="news-card">
          <div className="news-thumbnail">
            {isVideo ? (
              <video controls src={newsItem.Media.thumbnail} alt="News Video" />
            ) : (
              <img src={newsItem.Media.thumbnail || defaultImage} alt="News Thumbnail" />
            )}
          </div>
          <div className="news-info">
            <h1 className="news-title">{newsItem.Media.media_title}</h1>
            <span className="news-views">
              <strong>{formatViewCount(newsItem.Media.viewed_count)} Views</strong>
            </span>
            <div className="social-icons">
            <button 
  aria-label="like" 
  className={`icon-like-dislike ${actionStatus.LIKE ? 'active' : ''}`}
  onClick={handleLike}
>
  <FontAwesomeIcon icon={faThumbsUp} />
  {likedCount > 0 && <span>{likedCount}</span>}
</button>

<button 
  aria-label="dislike" 
  className={`icon-like-dislike ${actionStatus.DISLIKE ? 'active' : ''}`}
  onClick={handleDislike}
>
  <FontAwesomeIcon icon={faThumbsDown} />
  {newsItem.Media.disliked_count > 0 && <span>{newsItem.Media.disliked_count}</span>}
</button>

<button aria-label="share" className={`icon-other ${actionStatus.SHARE ? 'active' : ''}`}>
  <FontAwesomeIcon icon={faShare} />
  {newsItem.Media.shared_count > 0 && <span>{newsItem.Media.shared_count}</span>}
</button>

              <button aria-label="copy" className="icon-other">
                <FontAwesomeIcon icon={faCopy} />
                
              </button>
              <button aria-label="watch later" className="icon-other">
                <FontAwesomeIcon icon={faClock} />
               
              </button>
            </div>
          </div>
        </div>
        <span className="upload-status">
          {newsItem.Media.upload_status} On {formattedDate} by <span style={{ color: 'blue' }}>{reviewerName}</span>
        </span>
        <br />
        <br />
        <br />
        <h1 className="news-descriptions">{newsItem.Media.media_description}</h1>
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

export default FullNewsCard;
