import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConcernSection.css';
import defaultImage from './photos/CMA.png';

function ConcernSection() {
  const [newsItems, setNewsItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNewsItems() {
      try {
        const response = await fetch('https://api.cma.finstrokes.in/user_media/get_concern_by_categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: "Newly Added",
            page: 1,
            size: 4,
            media_category: ["Political"],
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setNewsItems(data.result);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }

    fetchNewsItems();
  }, []);

  const handleNewsClick = (newsId, newsItem) => {
    navigate(`/news/${newsId}`, { state: { newsItem } });
  };

  return (
    <div className="concern-sectionH">
      <h2 className="h2C">Have a Concern</h2>
      <p className="p1C">CMA, which is for the people, by the people.</p>
      <p className="p2C">Anyone can post anything related to your concern.</p>
      <div className="card-containerH">
        {newsItems.map(item => (
          <div key={item.Media.id} className="cardH" onClick={() => handleNewsClick(item.Media.id, item)}>
            <div className="card-imageH">
              <img src={item.Media.thumbnail || defaultImage} alt={item.Media.media_title} />
            </div>
            <div className="card-contentH">
              <h3>{item.Media.media_title}</h3>
              {/* <p>{item.Media.media_description}</p> */}
            </div>
            <div className="actionsH">
              <i className="far fa-thumbs-up"></i>
              <i className="far fa-share-square"></i>
              <i className="far fa-comment"></i>
              <i className="far fa-clock"></i>
            </div>
          </div>
        ))}
      </div>
      <br /><br />
      <button className="upload-butttonH" onClick={() => navigate('/uploadfiles')}>Upload Your Concern</button>
      <div className="gap"></div><br /><br />
      <hr className="horizontal-line" /><br />
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

export default ConcernSection;
