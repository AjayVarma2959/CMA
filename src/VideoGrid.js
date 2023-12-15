import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import './VideoGrid.css';

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

function VideoGrid() {
    const [likedVideos, setLikedVideos] = useState([]);
   

   

    async function fetchLikedVideos() {
        const url = "https://api.cma.finstrokes.in/user_media/get_media_by_categories";
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              category: "Newly Added",
              'page': 1,
              'size': 100,
              'tags': 'all',
              'searchTerm': 'political',
            })
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setLikedVideos(data.result.slice(0, 4)); 
        } catch (error) {
            console.error('Fetching Liked videos failed:', error);
        }
    }

    useEffect(() => {
        fetchLikedVideos();
    }, []);


   

    return (
      <div className="video-gridH">
          {likedVideos.map((video) => (
              <div key={video.id} className="videoH">
                  <div className="video-info-top">
                      <div className="video-item-posted-date">{timeAgo(video.created_date)}</div>
                      <div className="video-item-stats">
                          <span>👍 {video.liked_count}</span>
                          <span>👀 {video.viewed_count}</span>
                      </div>
                  </div>
                    <ReactPlayer
                        url={video.media_url}
                       
                        controls={true}
                        width="100%"
                        height="100%"
                       
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
                    <div className="video-titleH">{video.media_title}</div>
                </div>
            ))}
        </div>
    );
}

export default VideoGrid;
