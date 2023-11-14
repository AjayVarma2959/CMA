import React from "react";
import "./ConcernSection.css";
import { useNavigate } from "react-router-dom";

function ConcernSection() {
  const navigate = useNavigate();
  return (
    <div className="concern-section">
      <h2 className="h2C">Have a Concern</h2>
      <p className="p1C">CMA, which is for the people, by the people.</p>
      <p className="p2C">Anyone can post anything related to your concern.</p>
      <div className="card-container">
        {/* Card 1 */}
        <div className="card">
          <img src="./images/logo1.png" alt="Logo 1" />
          
          
          <div className="actions">
          <i className="far fa-thumbs-up"></i>
            <i className="far fa-share-square"></i>
            <i className="far fa-comment"></i>
            <i className="far fa-clock"></i>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card">
          <img src="./images/logo2.png" alt="Logo 2" />
          
          <div className="actions">
          <i className="far fa-thumbs-up"></i>
            <i className="far fa-share-square"></i>
            <i className="far fa-comment"></i>
            <i className="far fa-clock"></i>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card">
          <img src="./images/logo3.png" alt="Logo 3" />
          
          <div className="actions">
          <i className="far fa-thumbs-up"></i>
            <i className="far fa-share-square"></i>
            <i className="far fa-comment"></i>
            <i className="far fa-clock"></i>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card">
          <img src="./images/logo4.png" alt="Logo 4" />
          
          <div className="actions">
          <i className="far fa-thumbs-up"></i>
            <i className="far fa-share-square"></i>
            <i className="far fa-comment"></i>
            <i className="far fa-clock"></i>
          </div>
        </div>
      </div><br/><br/>
      <button className="upload-buttton" onClick={() => navigate('/uploadfiles')}>Upload Your Concern</button>
      <div className="gap"></div><br/><br/>
      {/* Horizontal line */}
      <hr className="horizontal-line" /><br/>

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
