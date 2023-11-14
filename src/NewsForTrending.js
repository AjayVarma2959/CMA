import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import './NewsForTrending.css';

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
        
        
        <div className="news-card-containerTN">
            
            <div 
                className="news-card-for-featuredFN"
                onClick={toggleDescription}
                
            >
                
                <img src={Media.thumbnail} alt={Media.media_title} className="news-imageFN" />
                {showDescription && (
                    <div className="news-contentFN">
                        <p className="news-descriptionFN">{Media.media_description}</p>
                    </div>
                )}
            </div>
            <div className="news-infoTN">
                <h3 className="news-titleTN">{Media.media_title}</h3>
                <div className="news-metaTN">
                    <span className="news-likesTN">👍 {Media.liked_count}</span>
                    <span className="news-viewsTN">👀 {Media.viewed_count}</span>
                    <span className="news-posted-timeTN">{timeAgo(Media.created_date)}</span>
                </div>
            </div>
        </div>
    );
};


const NewsForTrending = () => {
    const [news, setNews] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    

    async function fetchTrendingNews() {
        const url = "https://api.cma.finstrokes.in/user_media/get_concern_by_categories";
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include other necessary headers, such as authorization tokens
            },
            body: JSON.stringify({
                category: "Trending",
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
            return data.result; // Assuming 'result' contains the array of news items
        } catch (error) {
            console.error('Fetching Trending news failed:', error);
        }
    }

    const fetchMoreData = async () => {
        const newNews = await fetchTrendingNews(page);
        if (newNews && newNews.length > 0) {
            setNews(prevNews => [...prevNews, ...newNews]);
            setPage(prevPage => prevPage + 1);
        } else {
            setHasMore(false);
        }
    };

    useEffect(() => {
         // Fetch initial news items
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
                    <NewsCard key={item.Media.id} Media={item.Media} />
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
          created_date: PropTypes.string, // or PropTypes.instanceOf(Date) if it's a Date object
          id: PropTypes.number, // Assuming the ID is a number, adjust if it's a string
        }).isRequired,
};

export default NewsForTrending;
