import React from "react";
import {Link} from 'react-router-dom';

import logo from "./logo.png";
import "./footer.css";

const Footer = () => {
   return (
      <div className="footer">
         <div className="copyright">
            <p>
               Copyright ©  Developed by{" "}
               <Link to="#" target="_blank">
                  212 Consulting Agency
               </Link>{" "}
               2023 <br/>
               <img className="watermark-image" src={logo} alt="watermark" />
            </p>
            
         </div>
        
      </div>
   );
};

export default Footer;
