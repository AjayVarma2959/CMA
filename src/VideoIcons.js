import React from "react";
import "./VideoIcons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types"; // Import PropTypes

import {
  
  faThumbsUp,
  faClock,
  faHistory,
  faFire,
  faVolumeUp,
  faGamepad,
  faFilm,
  faGavel,
  faFutbol,
  faGraduationCap,
  faTshirt,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";



function VideoIcons({ visible }) {
  const className = `video-icons${visible ? 'show' : ''}`;
  return (
    <div className={className}>
      
      <FontAwesomeIcon icon={faThumbsUp} />
      <FontAwesomeIcon icon={faClock} />
      <FontAwesomeIcon icon={faHistory} />
      <FontAwesomeIcon icon={faFire} />
      <FontAwesomeIcon icon={faVolumeUp} />
      <FontAwesomeIcon icon={faGamepad} />
      <FontAwesomeIcon icon={faFilm} />
      <FontAwesomeIcon icon={faGavel} />
      <FontAwesomeIcon icon={faFutbol} />
      <FontAwesomeIcon icon={faGraduationCap} />
      <FontAwesomeIcon icon={faTshirt} />
      <FontAwesomeIcon icon={faMusic} />
    </div>
  );
}
VideoIcons.propTypes = {
  visible: PropTypes.bool.isRequired, // Ensure 'visible' is a required boolean prop
};

export default VideoIcons;
