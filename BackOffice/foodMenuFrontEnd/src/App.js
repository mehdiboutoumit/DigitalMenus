import React, { Fragment, useEffect } from "react";

/// Components
import Markup from "./jsx";

/// Style
import "./css/style.css";
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";

import { withResizeDetector } from "react-resize-detector";



const App = ({ width }) => {
   const body = document.querySelector("body");
   // useEffect(() => {
   //    const btn = document.querySelector('.nav-control');
  
 
   //       function toggleFunc() {
   //          const currentStyle = body.getAttribute('data-sidebar-style');
   //          const newStyle = currentStyle === 'mini' ? 'full' : 'mini';
   //          body.setAttribute('data-sidebar-style', newStyle);
     
   //        }
  
   //    btn.addEventListener('click', toggleFunc);
  
   //    return () => {
      
   //    };
   //  }, []);
 

   width >= 1300
      ? body.setAttribute("data-sidebar-style", "full")
      : width <= 1299 && width >= 767
      ? body.setAttribute("data-sidebar-style", "mini")
      : body.setAttribute("data-sidebar-style", "overlay");
   
   return (
      <Fragment>
         <Markup />
      </Fragment>
   );
};

export default withResizeDetector(App);
