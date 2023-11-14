import React, { useState } from "react";
import "./VideoGrid.css";
import ReactPlayer from "react-player/youtube";




function VideoGrid() {
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = () => {
    setPlaying(true);
  };

  const handleMouseLeave = () => {
    setPlaying(false);
  };

  return (
    <div className="video-grid">
      <div className="video-row">
        <div
          className="video"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=tROYQ-XNRx0"
            playing={playing}
            controls={false} // Hide video controls
            width="360px"
            height="180px"
            muted={true}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1, // Hide YouTube logo
                  rel: 0, // Hide related videos at the end
                  quality: 'hd720',
                },
              },
            }}
          />
        </div>










        <div
          className="video"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=7NXBQg-H-YE"
            playing={playing}
            controls={false} // Hide video controls
            width="360px"
            height="180px"
            muted={true}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1, // Hide YouTube logo
                  rel: 0, // Hide related videos at the end
                  quality: 'hd720',
                },
              },
            }}
          />
        </div>
      </div>









      <div className="video-row">
        <div
          className="video"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=E28DsVgqgDk"
            playing={playing}
            controls={false} // Hide video controls
            width="360px"
            height="180px"
            muted={true}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1, // Hide YouTube logo
                  rel: 0, // Hide related videos at the end
                  quality: 'hd720',
                },
              },
            }}
          />
        </div>












        
        <div
          className="video"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=4tgoFCij6h8"
            playing={playing}
            controls={false} // Hide video controls
            width="360px"
            height="180px"
            muted={true}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1, // Hide YouTube logo
                  rel: 0, // Hide related videos at the end
                  quality: 'hd720',
                  
                },
              },
            }}
            
          />
        </div>
      </div>
    </div>
  );
}

export default VideoGrid;
