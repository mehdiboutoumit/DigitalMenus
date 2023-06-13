import React, { Component } from "react";

/// Link
import { Link } from "react-router-dom";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Menu
import MetisMenu from "metismenujs";

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
            <li
              className={`${Collaborators.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link to="collaborateurs" className="ai-icon">
                <i className="flaticon-381-user-9"></i>
                <span className="nav-text">Collaborateurs</span>
              </Link>
            </li>


            
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
                  <Link to="CreerRestaurant">Créer un restaurant</Link>
                </li>
                <li>
                  <Link to="Restaurants">Voir les restaurants</Link>
                </li>
              </ul>
            </li>


            {/* {<li
              className={`${Categories.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link  to="Categories">
                <i className="flaticon-381-list"></i>
                <span className="nav-text">Categories</span>
              </Link>
             
            </li> }

            {<li
              className={`${Dishes.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link  to="Dishes">
                <i className="flaticon-381-box"></i>
                <span className="nav-text">Plats</span>
              </Link>
             
            </li> } */}

            {<li
              className={`${orders.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link className="ai-icon" to="/Orders">
                <i className="flaticon-381-list"></i>
                <span className="nav-text">Commandes</span>
              </Link>
             
            </li> }
            {/* <li
              className={`${menus.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link className="has-arrow ai-icon" to="#">
                <i className="flaticon-381-heart"></i>
                <span className="nav-text">Menu</span>
              </Link>
              <ul>
                <li>
                  <Link to="/menu-create">Créer un menu</Link>
                </li>
                <li>
                  <Link to="/menu-show">Voir les menus</Link>
                </li>
              </ul>
            </li> */}
            {/* <li
              className={`${
                plugins.includes(path.slice(1)) ? "mm-active" : ""
              }`}
            >
              <Link className="has-arrow ai-icon" to="#">
                <i className="flaticon-381-heart"></i>
                <span className="nav-text">Plugins</span>
              </Link>
              <ul>
                <li>
                  <Link to="/uc-select2">Select 2</Link>
                </li>
                <li>
                  <Link to="/uc-nestable">Nestedable</Link>
                </li>
                <li>
                  <Link to="/uc-noui-slider">Noui Slider</Link>
                </li>
                <li>
                  <Link to="/uc-sweetalert">Sweet Alert</Link>
                </li>
                <li>
                  <Link to="/uc-toastr">Toastr</Link>
                </li>
                <li>
                  <Link to="/map-jqvmap">Jqv Map</Link>
                </li>
              </ul>
            </li> */}
            {/* <li
              className={`${widget.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link to="widget-basic" className="ai-icon">
                <i className="flaticon-381-settings-2"></i>
                <span className="nav-text">Widget</span>
              </Link>
            </li> */}
            {/* commandes */}
            {/* <li
              className={`${
                commandes.includes(path.slice(1)) ? "mm-active" : ""
              }`}
            >
              <Link to="commandes" className="ai-icon">
                <i className="flaticon-381-settings-2"></i>
                <span className="nav-text">Commandes</span>
              </Link>
            </li> */}
            {/* menus */}
            {/* <li
              className={`${menus.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link to="menus" className="ai-icon">
                <i className="flaticon-381-settings-2"></i>
                <span className="nav-text">Menus</span>
              </Link>
            </li>
            <li
              className={`${forms.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link className="has-arrow ai-icon" to="#">
                <i className="flaticon-381-notepad"></i>
                <span className="nav-text forms">Forms</span>
              </Link>
              <ul>
                <li>
                  <Link to="/form-element">Form Elements</Link>
                </li>
                <li>
                  <Link to="/form-wizard">Wizard</Link>
                </li>
                <li>
                  <Link to="/form-editor-summernote">Summernote</Link>
                </li>
                <li>
                  <Link to="form-pickers">Pickers</Link>
                </li>
                <li>
                  <Link to="form-validation-jquery">Jquery Validate</Link>
                </li>
              </ul>
            </li>
            <li className={`${app.includes(path.slice(1)) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="#">
                <i className="flaticon-381-television"></i>
                <span className="nav-text">Apps</span>
              </Link>
              <ul>
                <li>
                  <Link to="/app-profile">Profile</Link>
                </li>
                <li>
                  <Link className="has-arrow" to="#">
                    Email
                  </Link>
                  <ul>
                    <li>
                      <Link to="/email-compose">Compose</Link>
                    </li>
                    <li>
                      <Link to="/email-inbox">Inbox</Link>
                    </li>
                    <li>
                      <Link to="/email-read">Read</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/app-calender">Calendar</Link>
                </li>
                <li>
                  <Link className="has-arrow" to="#">
                    Plats
                  </Link>
                  <ul>
                    <li>
                      <Link to="/ecom-product-grid">Product Grid</Link>
                    </li>
                    <li>
                      <Link to="/ecom-product-list">Product List</Link>
                    </li>
                    <li>
                      <Link to="/ecom-product-detail">Product Details</Link>
                    </li>
                    <li>
                      <Link to="/ecom-product-order">Order</Link>
                    </li>
                    <li>
                      <Link to="/ecom-checkout">Checkout</Link>
                    </li>
                    <li>
                      <Link to="/ecom-invoice">Invoice</Link>
                    </li>
                    <li>
                      <Link to="/ecom-customers">Customers</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li
              className={`${charts.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link className="has-arrow ai-icon" to="#">
                <i className="flaticon-381-controls-3"></i>
                <span className="nav-text">Charts</span>
              </Link>
              <ul>
                <li>
                  <Link to="/chart-rechart">RechartJs</Link>
                </li>
                <li>
                  <Link to="/chart-float">Chartfloat</Link>
                </li>
                <li>
                  <Link to="/chart-chartjs">Chartjs</Link>
                </li>
                <li>
                  <Link to="/chart-chartist">Chartist</Link>
                </li>
                <li>
                  <Link to="/chart-sparkline">Sparkline</Link>
                </li>
                <li>
                  <Link to="/chart-apexchart">Apexchart</Link>
                </li>
              </ul>
            </li> */}
            {/* <li
              className={`${
                bootstrap.includes(path.slice(1)) ? "mm-active" : ""
              }`}
            >
              <Link className="has-arrow ai-icon" to="#">
                <i className="flaticon-381-internet"></i>
                <span className="nav-text">Bootstrap</span>
              </Link>
              <ul>
                <li>
                  <Link to="/ui-accordion">Accordion</Link>
                </li>
                <li>
                  <Link to="/ui-alert">Alert</Link>
                </li>
                <li>
                  <Link to="/ui-badge">Badge</Link>
                </li>
                <li>
                  <Link to="/ui-button">Button</Link>
                </li>
                <li>
                  <Link to="/ui-modal">Modal</Link>
                </li>
                <li>
                  <Link to="/ui-button-group">Button Group</Link>
                </li>
                <li>
                  <Link to="/ui-list-group">List Group</Link>
                </li>
                <li>
                  <Link to="/ui-media-object">Media Object</Link>
                </li>
                <li>
                  <Link to="/ui-card">Cards</Link>
                </li>
                <li>
                  <Link to="/ui-carousel">Carousel</Link>
                </li>
                <li>
                  <Link to="/ui-dropdown">Dropdown</Link>
                </li>
                <li>
                  <Link to="/ui-popover">Popover</Link>
                </li>
                <li>
                  <Link to="/ui-progressbar">Progressbar</Link>
                </li>
                <li>
                  <Link to="/ui-tab">Tab</Link>
                </li>
                <li>
                  <Link to="/ui-typography">Typography</Link>
                </li>
                <li>
                  <Link to="/ui-pagination">Pagination</Link>
                </li>
                <li>
                  <Link to="/ui-grid">Grid</Link>
                </li>
              </ul>
            </li> */}

            {/* <li
              className={`${table.includes(path.slice(1)) ? "mm-active" : ""}`}
            >
              <Link className="has-arrow ai-icon" to="#">
                <i className="flaticon-381-network"></i>
                <span className="nav-text">Table</span>
              </Link>
              <ul>
                <li>
                  <Link to="table-bootstrap-basic">Bootstrap</Link>
                </li>
                <li>
                  <Link to="table-datatable-basic">Datatable</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="has-arrow ai-icon" to="#">
                <i className="flaticon-381-layer-1"></i>
                <span className="nav-text">Pages</span>
              </Link>
              <ul>
                <li>
                  <Link to="/page-register">Register</Link>
                </li>
                <li>
                  <Link to="/page-login">Login</Link>
                </li>
                <li>
                  <Link className="has-arrow" to="#">
                    Error
                  </Link>
                  <ul>
                    <li>
                      <Link to="/page-error-400">Error 400</Link>
                    </li>
                    <li>
                      <Link to="/page-error-403">Error 403</Link>
                    </li>
                    <li>
                      <Link to="/page-error-404">Error 404</Link>
                    </li>
                    <li>
                      <Link to="/page-error-500">Error 500</Link>
                    </li>
                    <li>
                      <Link to="/page-error-503">Error 503</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/page-lock-screen">Lock Screen</Link>
                </li>
              </ul>
            </li> */}

            
          </MM>
          {/* <div className="plus-box">
            <p className="fs-13 font-w300 mb-4">
              Organize your menus through button bellow
            </p>
            <Link
              className="btn bg-white text-black btn-rounded d-block"
              to="#"
            >
              +Add Menus
            </Link>
          </div> */}
          {/* <div className="copyright">
            <p>
              <strong>Koki Restaurant React Dashboard</strong> ©All Rights
              Reserved
            </p>
            <p>by DexignZone</p>
          </div> */}
        </PerfectScrollbar>
      </div>
    );
  }
}

export default SideBar;
