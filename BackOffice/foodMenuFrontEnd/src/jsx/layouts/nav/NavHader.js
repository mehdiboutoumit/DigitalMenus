import React, { useEffect, useState } from "react";

/// React router dom
import { Link } from "react-router-dom";

/// images
import logo from "../../../images/logo1.png";
import logoText from "../../../images/logo-text.png";

const NavHader = () => {
   const [toggle, setToggle] = useState(false);
   const body = document.querySelector("body");

   useEffect(() => {
      const btn = document.querySelector('.nav-control');
  
 
         function toggleFunc() {
            const currentStyle = body.getAttribute('data-sidebar-style');
            const newStyle = currentStyle === 'mini' ? 'overlay' : 'mini';
            body.setAttribute('data-sidebar-style', newStyle);
     
          }
  
      btn.addEventListener('click', toggleFunc);
      return () => {
      
      };
    }, []);
 
   return (
      <div className="nav-header">
         <Link to="/" className="brand-logo">
            <img className="logo-abbr" src={logo} alt="" />
            <img className="logo-compact" src={logoText} alt="" />
            <img className="brand-title" src={logoText} alt="" />
         </Link>

         <div className="nav-control1" onClick={() => setToggle(!toggle)}>
            <div className={`hamburger ${toggle ? "is-active" : ""}`}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>
         <div className="nav-control" onClick={() => setToggle(!toggle)}>
            <div className={`hamburger ${toggle ? "is-active" : ""}`}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>
      </div>
   );
};

export default NavHader;
