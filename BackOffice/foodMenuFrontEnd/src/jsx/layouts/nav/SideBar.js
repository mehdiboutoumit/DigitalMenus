import React, { Component } from "react";

/// Link
import { Link , BrowserRouter} from "react-router-dom";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Menu
import MetisMenu from "metismenujs";

const baseURL = "http://localhost:3000";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {
    this.mm("dispose");
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

class SideBar extends Component {
  /// Open menu
  componentDidMount() {
    // sidebar open/close
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");

    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }

    btn.addEventListener("click", toggleFunc);
  }
  render() {
    /// Path
    const path = window.location.pathname;

    /// Active menu
    let Collaborators = ["Collaborateurs"],Restaurant=["Restaurant"],
    Categories = ["Categories"],
    Dishes = ["Plats"],
    ContactSupport =["ConatctSupport"],
    deshBoard = ["", "analytics", "companies", "statistics"],
      app = [
        "app-profile",
        "app-calender",
        "email-compose",
        "email-inbox",
        "email-read",
        "ecom-product-grid",
        "ecom-product-list",
        "ecom-product-list",
        "ecom-product-order",
        "ecom-checkout",
        "ecom-invoice",
        "ecom-customers",
      ],
      charts = [
        "chart-morris",
        "chart-chartjs",
        "chart-chartist",
        "chart-sparkline",
        "chart-peity",
      ],
      bootstrap = [
        "ui-accordion",
        "ui-badge",
        "ui-alert",
        "ui-button",
        "ui-modal",
        "ui-button-group",
        "ui-list-group",
        "ui-media-object",
        "ui-card",
        "ui-carousel",
        "ui-dropdown",
        "ui-popover",
        "ui-progressbar",
        "ui-tab",
        "ui-typography",
        "ui-pagination",
        "ui-grid",
      ],
      plugins = [
        "uc-select2",
        "uc-nestable",
        "uc-sweetalert",
        "uc-toastr",
        "uc-jqvmap",
        "uc-noui-slider",
      ],
      // menus = ["menu-create", "menu-show"],
      menus = ["menus"],
      restaurants = ["restaurant-create", "restaurant-show"],
      orders = ["restaurant-show"],
      widget = ["widget"],
      commandes = ["commandes"],
      forms = [
        "form-element",
        "form-wizard",
        "form-editor-summernote",
        "form-pickers",
        "form-validation-jquery",
      ],
      table = ["table-bootstrap-basic", "table-datatable-basic"];

    return (
     
      <div className="deznav">
        <PerfectScrollbar className="deznav-scroll">
          <MM className="metismenu" id="menu">
            <li
              className={`${
                deshBoard.includes(path.slice(1)) ? "mm-active" : ""
              }`}
            >
              <Link className="ai-icon" to="/">
                <i className="flaticon-381-networking"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
              
            </li>
              {/* Collaborateurs */}
            {/* <li
              className={`${Collaborators.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link to="collaborateurs" className="ai-icon">
                <i className="flaticon-381-user-9"></i>
                <span className="nav-text">Collaborateurs</span>
              </Link>
            </li> */}


            
                       <li
              className={`${
                Restaurant.includes(path.slice(1)) ? "mm-active" : ""
              }`}
            >
              <Link className="has-arrow ai-icon" to="#">
                <i className="flaticon-381-home-1"></i>
                <span className="nav-text">Restaurants</span>
              </Link>
              <ul>
                <li>
                  <a href={`${baseURL}/CreerRestaurant`}>Créer un restaurant</a>
                </li>
                <li>
                  <a href={`${baseURL}/Restaurants`}>Mes restaurants</a>
                </li>
              </ul>
            </li>


          

            {<li
              className={`${orders.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link className="ai-icon" to="/Orders">
                <i className="flaticon-381-list"></i>
                <span className="nav-text">Commandes</span>
              </Link>
             
            </li> }
            {<li
              className={`${orders.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link className="ai-icon" to="/ContactSupport">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                <span className="nav-text"> Support 212</span>
              </Link>
             
            </li> }
           

            
          </MM>
      

         
        </PerfectScrollbar>
      </div>
    
    );
  }
}

export default SideBar;
