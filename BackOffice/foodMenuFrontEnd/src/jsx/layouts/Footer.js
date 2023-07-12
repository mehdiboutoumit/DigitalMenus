import React from "react";
import {Link} from 'react-router-dom';

import logo from "./logo.png";
import "./footer.css";

var style = {
   backgroundColor: "#F8F8F8",
   borderTop: "1px solid #E7E7E7",
   textAlign: "center",
   position: "fixed",
   left: "0",
   bottom: "0",
   height: "auto",
   width: "100%",
}

const Footer = () => {
   return (
      <div className="footer" >
        
         <div className="copyright"  >
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
