import React, { useRef, useState, useEffect } from 'react';
import './Navbar.css';
import './UploadFiles.css';
import { Link } from 'react-router-dom';
import cmalogo from "./Cma.png";
import ToggleComponent from './ToggleComponent';

function UploadFiles() {
  const mediaDropZoneRef = useRef(null);
  const thumbnailDropZoneRef = useRef(null);

  let mediaFile = null;
  let thumbnailFile = null;

  const handleMediaDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // Handle media file upload logic here
    console.log('Media files dropped:', files);
  };

  const handleThumbnailDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // Handle thumbnail file upload logic here
    console.log('Thumbnail files dropped:', files);
  };

  const handleMediaClick = () => {
    // Trigger a click on the media input element
    if (mediaDropZoneRef.current) {
      mediaDropZoneRef.current.click();
    }
  };

  const handleThumbnailClick = () => {
    // Trigger a click on the thumbnail input element
    if (thumbnailDropZoneRef.current) {
      thumbnailDropZoneRef.current.click();
    }
  };

  const handleMediaUpload = (e) => {
    const files = e.target.files;
    // Handle media file upload logic here
    console.log('Media files selected:', files);
  };

  const handleThumbnailUpload = (e) => {
    const files = e.target.files;
    // Handle thumbnail file upload logic here
    console.log('Thumbnail files selected:', files);
  };

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [mandals, setMandals] = useState([]);
  const [selectedMandal, setSelectedMandal] = useState('');

  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState('');

  useEffect(() => {
    fetch('https://api.cma.finstrokes.in/address/getStatesByContryId')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'SUCCESS') {
          const stateData = data.result;
          setStates(stateData);
        } else {
          console.error('Failed to fetch states from the API');
        }
      })
      .catch((error) => {
        console.error('An error occurred while fetching states:', error);
      });
  }, []);

  const fetchDistrictsByState = (stateId) => {
    if (stateId) {
      const apiUrl = stateId === '1'
        ? 'https://api.cma.finstrokes.in/address/getDistrictsByStateId?state_id=1'
        : 'https://api.cma.finstrokes.in/address/getDistrictsByStateId?state_id=2';

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'SUCCESS') {
            const districtData = data.result;
            setDistricts(districtData);
          } else {
            console.error('Failed to fetch districts from the API');
          }
        })
        .catch((error) => {
          console.error('An error occurred while fetching districts:', error);
        });
    } else {
      setDistricts([]);
    }
  };

  const fetchMandalsByDistrict = (districtId) => {
    if (districtId) {
      const apiUrl = `https://api.cma.finstrokes.in/address/getMandalsByDistrictId?district_id=${districtId}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'SUCCESS') {
            const mandalData = data.result;
            setMandals(mandalData);
          } else {
            console.error('Failed to fetch mandals from the API');
          }
        })
        .catch((error) => {
          console.error('An error occurred while fetching mandals:', error);
        });
    } else {
      setMandals([]);
    }
  };

  const fetchVillagesByMandal = (mandalId) => {
    if (mandalId) {
      const apiUrl = `https://api.cma.finstrokes.in/address/getVillageByMandalId?mandal_id=${mandalId}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'SUCCESS') {
            const villageData = data.result;
            setVillages(villageData);
          } else {
            console.error('Failed to fetch villages from the API');
          }
        })
        .catch((error) => {
          console.error('An error occurred while fetching villages:', error);
        });
    } else {
      setVillages([]);
    }
  };

  const handleStateChange = (stateId) => {
    setSelectedState(stateId);
    setSelectedDistrict('');
    setSelectedMandal('');
    setSelectedVillage('');
    fetchDistrictsByState(stateId);
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedMandal('');
    setSelectedVillage('');
    fetchMandalsByDistrict(districtId);
  };

  const handleMandalChange = (mandalId) => {
    setSelectedMandal(mandalId);
    setSelectedVillage('');
    fetchVillagesByMandal(mandalId);
  };

  const handleSubmit = () => {
    // Collect the form data and other selected values
    const formData = {
      title: document.querySelector('input[type="text"][placeholder="Enter title"]').value,
      category: document.querySelector('select').value,
      description: document.querySelector('input[type="text"][placeholder="Enter description"]').value,
      tag: document.querySelector('input[type="text"][placeholder="Enter tag"]').value,
      state: selectedState,
      district: selectedDistrict,
      mandal: selectedMandal,
      village: selectedVillage,
    };

    // Create a FormData object to handle file uploads
    const formDataWithFiles = new FormData();
    formDataWithFiles.append('media', mediaFile); // Replace 'mediaFile' with your media file input
    formDataWithFiles.append('thumbnail', thumbnailFile); // Replace 'thumbnailFile' with your thumbnail file input

    // Append form data to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
      formDataWithFiles.append(key, value);
    });

    // Perform any further actions, such as sending the data to your server
    console.log('Form data to be submitted:', formData);
    console.log('Media file:', mediaFile);
    console.log('Thumbnail file:', thumbnailFile);

    // Send 'formDataWithFiles' to your server using fetch or any other method
  };




  const handleVillageChange = (village) => setSelectedVillage(village);

  const navbarStyle = {
    marginTop: '30px',
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  };

  const navItemStyle = {
    marginRight: '10px',
    padding: '20px',
    fontFamily: 'Open Sans',
    fontSize: '24px',
  };

  const selectStyle = {
    cursor: 'pointer',
    marginLeft: '5px',
    padding: '10px',
    fontFamily: 'Open Sans',
    width: '200px',
    borderRadius: '10px',
    border: '2px solid',
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img
            src={cmalogo}
            className="png"
            style={{ width: '172px', height: '64px' }}
          />
        </div>
        <div className="search-bar">
          <input className='s1' type="text" placeholder="Search for news" />
          <button className='b1' type="submit">Search</button>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link> {/* Use Link for client-side navigation */}
          <Link to="/news">News</Link>
          <Link to="/concern">Concern</Link>
        </div>
      </nav>

      {<ToggleComponent />}
      <div className='fileupload'>
        <h1 className='fileuploadh1'>What would you like to <span className='uploadcolor'>Upload</span> </h1>
      </div>

      <div className='form-container'>
        <div className='form-field'>
          <label>Title:</label>
          <input type="text" placeholder="Enter title" />
        </div>
        <div className='form-field'>
          <label>Select Category:</label>
          <select>
            <option value="selectall">Select All</option>
            <option value="gaming">Gaming</option>
            <option value="business">Business</option>
            <option value="sports">Sports</option>
            <option value="political">Political</option>
            <option value="movies">Movies</option>
            <option value="entertainment">Entertainment</option>
            <option value="education">Education</option>
            <option value="entertainment">Fashion</option>
          </select>
        </div>
        <div className='form-field'>
          <label>Description:</label>
          <input type="text" placeholder="Enter description" />
        </div>
        <div className='form-field'>
          <label>Add Tag:</label>
          <input type="text" placeholder="Enter tag" />
        </div>
      </div>
      <nav style={navbarStyle}>
        <div style={navItemStyle}>
          <label>State:</label>
          <select
            style={selectStyle}
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.state_name}
              </option>
            ))}
          </select>
        </div>

        <div style={navItemStyle}>
          <label>District:</label>
          <select
            style={selectStyle}
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.district_name}
              </option>
            ))}
          </select>
        </div>
        <div style={navItemStyle}>
          <label>Mandal:</label>
          <select
            style={selectStyle}
            value={selectedMandal}
            onChange={(e) => handleMandalChange(e.target.value)}
          >
            <option value="">Select Mandal</option>
            {mandals.map((mandal) => (
              <option key={mandal.id} value={mandal.id}>
                {mandal.mandal_name}
              </option>
            ))}
          </select>
        </div>
        <div style={navItemStyle}>
          <label>Village:</label>
          <select
            style={selectStyle}
            value={selectedVillage}
            onChange={(e) => handleVillageChange(e.target.value)}
          >
            <option value="">Select Village</option>
            {villages.map((village) => (
              <option key={village.id} value={village.id}>
                {village.village_name}
              </option>
            ))}
          </select>
        </div>
      </nav>
      <div className='drag-and-drop-container'>
        <div
          className='drag-and-drop-box'
          onDrop={handleMediaDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={handleMediaClick}
        >
          <p>Drag and drop media files here or click to open</p>
          <input
            type="file"
            accept="image/*, video/*"
            style={{ display: 'none' }}
            ref={mediaDropZoneRef}
            onChange={handleMediaUpload}
          />
        </div>

        <div
          className='drag-and-drop-box'
          onDrop={handleThumbnailDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={handleThumbnailClick}
        >
          <p>Drag and drop thumbnails here or click to open</p>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={thumbnailDropZoneRef}
            onChange={handleThumbnailUpload}
          />
        </div>
      </div>
      <div className='form-field'>
  <button className='upload-button-for-files' onClick={handleSubmit}>
    Upload
  </button>
</div><br></br>
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

      

    </>
  );
}

export default UploadFiles;
