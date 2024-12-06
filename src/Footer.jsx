import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUser, faPlus, faGear, faHome } from "@fortawesome/free-solid-svg-icons";

const Footer = ({ onPhoneClick }) => {
  return (
    <footer className="footer">
      <div className="row main-row">
        <div className='col-md-5'>
          <div className='row'>
            <div className='col-md-6 text-center'>
              <FontAwesomeIcon 
                icon={faPhone} 
                className="phone-black-icon text-black" 
                onClick={onPhoneClick} 
              />
            </div>
            <div className='col-md-6 text-center'>
              <FontAwesomeIcon icon={faUser} className="other-black-icon" />
            </div>
          </div>
        </div>
        <div className='col-md-2 footer-2 text-center'>
          <div className='footer-plus'>
            <FontAwesomeIcon icon={faPlus} className="other-black-icon text-white" />
          </div>
        </div>
        <div className='col-md-5'>
          <div className='row'>
            <div className='col-md-6 text-center'>
              <FontAwesomeIcon icon={faGear} className="other-black-icon" />
            </div>
            <div className='col-md-6 text-center'>
              <FontAwesomeIcon icon={faHome} className="other-black-icon" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
