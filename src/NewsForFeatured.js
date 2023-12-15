import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import './NewsForFeatured.css';
import defaultImage from './photos/altCMA.jpg';

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

const NewsCard = ({ Media }) => {
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
                  alt={Media.media_title || 'Default image'} className="news-imageFN" />
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


const NewsForFeatured = () => {
    const [news, setNews] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    

    async function fetchFeaturedNews() {
        const url = "https://api.cma.finstrokes.in/user_media/get_concern_by_categories";
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                category: "Featured",
                page: 1,
                size: 1000,
               
            })
        };
        

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.result; 
        } catch (error) {
            console.error('Fetching featured news failed:', error);
        }
    }

    const fetchMoreData = async () => {
        const newNews = await fetchFeaturedNews(page);
        if (newNews && newNews.length > 0) {
            setNews(prevNews => [...prevNews, ...newNews]);
            setPage(prevPage => prevPage + 1);
        } else {
            setHasMore(false);
        }
    };

    useEffect(() => {
        
    }, []);




    

    return (
        <div className="news-containerFN">
              

              <InfiniteScroll
                dataLength={news.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                className="news-containerFN"
            >
                {news.map((item) => (
                     <NewsCard key={item.Media.id} Media={item.Media} defaultImage={defaultImage} />
                ))}
            </InfiniteScroll>
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
          id: PropTypes.number, 
        }).isRequired,
};

export default NewsForFeatured;
