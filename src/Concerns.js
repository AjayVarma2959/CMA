import React from 'react';
import './Concern.css'; 

function Concerns() {
  return (
    <>
      <div className='centerr'>
        <div className='kkk'>
          <h1 className='heading'>Have a Concern</h1>
          <p>CMA which is for the people, by the people</p>
          <p>Anyone can post anything related to your concern</p>
        </div>
        <div className='post'>
          <div className="video-row">
            {/* First Row */}
            <div className="video-slot">
              {/* Video Slot 1 */}
              <iframe
               width="900"
               height="415"
                src="https://www.youtube.com/embed/VIDEO_ID_1"
                title="Video 1"
                frameborder="8"
                allowfullscreen
              ></iframe>
            </div>
            <div className="video-slot">
              {/* Video Slot 2 */}
              <iframe
               width="600"
               height="415"
                src="https://www.youtube.com/embed/VIDEO_ID_2"
                title="Video 2"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="video-row">
            {/* Second Row */}
            <div className="video-slot">
              {/* Video Slot 3 */}
              <iframe
                width="600"
                height="415"
                src="https://www.youtube.com/embed/VIDEO_ID_3"
                title="Video 3"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
            <div className="video-slot">
              {/* Video Slot 4 */}
              <iframe
                width="600"
                height="415"
                src="https://www.youtube.com/embed/VIDEO_ID_4"
                title="Video 4"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>

        <button className='butttt'>Upload concern</button>
      </div>
    </>
  );
}

export default Concerns;
