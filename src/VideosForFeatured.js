import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import InfiniteScroll from 'react-infinite-scroll-component';
import './VideosForFeatured.css'

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




const VideosForFeatured = () => {
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [playingVideoId, setPlayingVideoId] = useState(null);

  const handleMouseEnter = (videoId) => {
    setPlayingVideoId(videoId);
  };

  const handleMouseLeave = () => {
    setPlayingVideoId(null);
  };

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

    const fetchMoreData = async () => {
        if (videos.length >= 1000) {
            setHasMore(false);
            return;
        }

        const newVideos = await fetchFeaturedVideos();
        if (newVideos && Array.isArray(newVideos)) {
            setVideos(prevVideos => [...prevVideos, ...newVideos]);
        } else {
            setHasMore(false);
        }
    };

    useEffect(() => {
        fetchFeaturedVideos().then(initialVideos => {
            if (initialVideos && Array.isArray(initialVideos)) {
                setVideos(initialVideos);
            }
        });
    }, []);

    return (
        <>
            <InfiniteScroll
                dataLength={videos.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                className="video-gridforF"
            >
                {videos.map((video) => (
                    <div key={video.id} className="video-itemforF"
                    
                    onMouseEnter={() => handleMouseEnter(video.id)}
                    onMouseLeave={handleMouseLeave}>
                       
                        <ReactPlayer
                            url={video.media_url} // Adjusted to use the correct property from the API
                            width="100%"
                            height="100%"
                            controls={true}
                            playing={playingVideoId === video.id}
                        />
                        <div className="video-title">{video.media_title}</div>
                         <div className="video-item-infoforF">
                            
          <div className="video-item-posted-dateforF">
              {timeAgo(video.created_date)} 
          </div>
          <div className="video-item-iconsforF">
              <span>👍 {video.liked_count}</span>
          </div>
          <div className="video-item-iconsforF">
              <span>👀 {video.viewed_count}</span>
          </div>
      </div>
  </div>
))}
            </InfiniteScroll>
            {/* Styles omitted for brevity */}
        </>
    );
};

export default VideosForFeatured;
