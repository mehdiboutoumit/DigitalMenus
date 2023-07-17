import React from "react";
import Cookie from 'js-cookie'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Image
import profileIcon from "../../../images/profileIcon.png";
import avatar from "../../../images/avatar/1.jpg";

const Header = ({ onNote, toggle, onProfile, onActivity, onNotification }) => {
  var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName
  // .includes("app")
  //   ? filterName.filter((f) => f !== "app")
  //   : filterName.includes("ui")
  //   ? filterName.filter((f) => f !== "menu")
  //   : filterName.includes("menu")
  //   ? filterName.filter((f) => f !== "restaurant")
  //   : filterName.includes("restaurant")
  //   ? filterName.filter((f) => f !== "order")
  //   : filterName.includes("order")
  //   ? filterName.filter((f) => f !== "ui")
  //   : filterName.includes("uc")
  //   ? filterName.filter((f) => f !== "uc")
  //   : filterName.includes("basic")
  //   ? filterName.filter((f) => f !== "basic")
  //   : filterName.includes("form")
  //   ? filterName.filter((f) => f !== "form")
  //   : filterName.includes("table")
  //   ? filterName.filter((f) => f !== "table")
  //   : filterName.includes("page")
  //   ? filterName.filter((f) => f !== "page")
  //   : filterName.includes("email")
  //   ? filterName.filter((f) => f !== "email")
  //   : filterName.includes("ecom")
  //   ? filterName.filter((f) => f !== "ecom")
  //   : filterName.includes("chart")
  //   ? filterName.filter((f) => f !== "chart")
  //   : filterName.includes("editor")
  //   ? filterName.filter((f) => f !== "editor")
  //   : filterName;

  var page_name =
    finalName.join(" ") === "" ? "Dashboard" : finalName.join(" ");

    const handleLogout = () => {
      Swal.fire({
        title: 'Etes vous sure vous vouler se deconnecter ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, se deconnecter',
        cancelButtonText: 'Annuler',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/logout';
        }}
      )
    }
      

  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div
                className="dashboard_bar"
                style={{ textTransform: "capitalize" }}
              >
               
              </div>
            </div>

            <ul className="navbar-nav header-right">
             
              <li
                className={`nav-item dropdown header-profile ${
                  toggle === "profile" ? "show" : ""
                }`}
                onClick={() => onProfile()}
              >
                <Link
                  to={"#"}
                  className="nav-link"
                  role="button"
                  data-toggle="dropdown"
                >
                  <div className="header-info">
                    <small></small>
                    <span>{Cookie.get('name')}</span>
                  </div>
                  <img src={profileIcon} width="20" alt="" />
                </Link>
                <div
                  className={`dropdown-menu dropdown-menu-right ${
                    toggle === "profile" ? "show" : ""
                  }`}
                >

 <Link to="#" className="dropdown-item ai-icon" onClick={handleLogout}>
        <svg
          id="icon-logout"
          xmlns="http://www.w3.org/2000/svg"
          className="text-danger"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span className="ml-2">Logout</span>
      </Link>
                 
                 
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
