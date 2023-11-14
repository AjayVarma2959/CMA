

import { useNavigate } from "react-router-dom";
import React from "react";
import "./NewSection.css";

function NewSection() {

  const navigate = useNavigate();
  return (
    <div className="news-section">
      <h2>Have a News?</h2>
      <h3>CMA can be your solution</h3>
      <p className="p1">CMA, which is for the people, by the people.</p>
        <p className="p2">Anyone can post anything related to your concern.</p>
      <button className="upload-button"   onClick={() => navigate('/uploadfiles')}>Upload Your News</button>
    </div>
  );
}

export default NewSection;
