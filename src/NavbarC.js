import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import VideoIcons from './VideoIcons'; 
import { CSSTransition } from 'react-transition-group';


const NavbarC = () => {
  const [showVideoIcons, setShowVideoIcons] = useState(false); 

  const navigate = useNavigate();


  
  
  
  

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
    }


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
    
  
  
  
  
  
  
 
  
  const handleVillageChange = (village) => setSelectedVillage(village);
 

  

  const handleBarsIconClick = () => {
    setShowVideoIcons(!showVideoIcons); 
  };








  const navbarStyle = {
    marginTop: '0px',
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#09a6c6',
    padding: '10px',
    
    
    
  };

  const menuIconStyle = {
    color:'white',
    marginLeft: '10px',
    fontSize: '24px',
    cursor: 'pointer',
   
  };

  const navItemStyle = {
    marginRight: '10px',
    padding: '20px',
    fontFamily: 'Open Sans',
    fontSize: '18px',
    
  };

  const selectStyle = {
    cursor: 'pointer',
    marginLeft: '5px',
    padding: '10px',
    fontFamily: 'Open Sans',
    width: '150px',
    borderRadius: '10px',
    
  };

  const uploadButtonStyle = {
    marginLeft: '10px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontFamily: 'cursive',
    backgroundColor: 'rgb(79, 146, 197)',
    color: 'white',
  };


  

  
  return (
    <nav style={navbarStyle}>
      <div>
      <div style={menuIconStyle} onClick={handleBarsIconClick}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <CSSTransition
          in={showVideoIcons}
          timeout={500} 
          classNames="video-icons"
          unmountOnExit
        >

         <div>
            <VideoIcons />
          </div>
        </CSSTransition>
      </div>
      <div style={navItemStyle}>
        <label>State:</label>
        <select 
        style={selectStyle} 
        value={selectedState} 
        onChange={(e) => handleStateChange(e.target.value)}>
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
        <select style={selectStyle} value={selectedDistrict} onChange={(e) => handleDistrictChange(e.target.value)}>
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
        <select style={selectStyle} value={selectedMandal} onChange={(e) => handleMandalChange(e.target.value)}>
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
        <select style={selectStyle} value={selectedVillage} onChange={(e) => handleVillageChange(e.target.value)}>
          <option value="">Select Village</option>
          {villages.map((village) => (
            <option key={village.id} value={village.id}>
              {village.village_name}
            </option>
          ))}
        </select>
      </div>
      <button style={uploadButtonStyle} onClick={() => navigate('/uploadfiles')}>
        Upload
      </button>
    </nav>
  );
};

export default NavbarC;
