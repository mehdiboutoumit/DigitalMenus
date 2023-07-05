import React from "react";

/// React router dom
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";

//MyComponents
//import Collaborators from "./MyComponents/Collaborators/Collaborators";
import Registration from "./MyComponents/Auth/Registration";
import Login from "./MyComponents/Auth/Login";
import ForgotPassword from "./MyComponents/Auth/ForgotPassword";
import LockScreen from "./MyComponents/Auth/LockScreen";
import LoginUser from "./MyComponents/Auth/LoginUser";

import CollabView from "./MyComponents/Collaborators/CollabView";

import Restaurants from "./MyComponents/Restaurants/Restaurants.jsx";
import CreateRestau from "./MyComponents/Restaurants/createRestau";
import ShowRestaurant from "./MyComponents/Restaurants/ShowRestaurant";

import Categories from "./MyComponents/Categories/Categories";

import Dishes from "./MyComponents/Dishes/Dishes";

import Menus from "./MyComponents/Menus/Menus";

import ShowMenu from './MyComponents/Menus/ShowMenu';

import Tables from "./MyComponents/Tables/Tables";

import Orders from "./MyComponents/Orders/Orders";

import ShowOrder from "./MyComponents/Orders/ShowOrder";

import Subs from "./MyComponents/Subs/Subs";

import ContactSupport from "./MyComponents/ConatctSupport/ContactSupport";

/// Pages
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";
// import LoginUser from "./pages/LoginUser";
// import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
//import ForgotPassword from "./pages/ForgotPassword";

/// Widget
import Widget from "./pages/Widget";

// Orders
import Commandes from "./pages/commandes";
import menus from "./pages/menus";
/// Deshboard
import Dashboard from "./MyComponents/Dashboard/Dashboard";
import Companies from "./components/Dashboard/Companies/Companies";
import Analytics from "./components/Dashboard/Analytics/Analytics";
import Review from "./components/Dashboard/Review/Review";
import Order from "./components/Dashboard/Order/Order";
import Orderlist from "./components/Dashboard/Orderlist/Orderlist";
import Customerlist from "./components/Dashboard/Customerlist/Customerlist";

/// Bo
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiMediaObject from "./components/bootstrap/MediaObject";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";
/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Chart
import SparklineChart from "./components/charts/Sparkline";
import ChartFloat from "./components/charts/chartflot/index";
import ChartJs from "./components/charts/Chartjs";
import Chartist from "./components/charts/chartist";
import BtcChart from "./components/charts/apexcharts/ApexChart";
import ApexChart from "./components/charts/apexcharts";

/// Table
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import SummerNote from "./components/Forms/Summernote/SummerNote";
import Pickers from "./components/Forms/Pickers/Pickers";
import jQueryValidation from "./components/Forms/jQueryValidation/jQueryValidation";

/// Pulgin
import Select2 from "./components/PluginsMenu/Select2/Select2";
import Nestable from "./components/PluginsMenu/Nestable/Nestable";
import MainNouiSlider from "./components/PluginsMenu/Noui Slider/MainNouiSlider";
import MainSweetAlert from "./components/PluginsMenu/Sweet Alert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./components/PluginsMenu/Jqv Map/JqvMap";
import RechartJs from "./components/charts/rechart";
import Logout from "./MyComponents/Auth/Logout";



const Markup = () => {
  const routes = [
    //auth
    {url : "locked", component: LockScreen},
    {url : "register", component: Registration},
    {url : "login", component: Login},
    {url : "forgotpassword", component: ForgotPassword},
    {url : "userlogin", component: LoginUser},
    {url : "logout", component: Logout},


    


    //Collab
    {url : "collaborateurs", component: CollabView},

    //Restau
    {url : "Restaurants", component: Restaurants},
    {url : "CreerRestaurant", component : CreateRestau },
 // {url : "ShowRestaurant", component : ShowRestaurant },
  {
    url: "ShowRestaurant/:restaurantId",
    component: ShowRestaurant
  },

    //Categories
    {url : "Categories", component : Categories},

    //Dishes
    {url : "Dishes", component : Dishes},

    //Menus
    {url : "Menus", component : Menus},
    {
      url: "ShowMenu/:menuId",
      component: ShowMenu
    },
    //Tables
    {url : "Tables", component : Tables},

    //Orders
    {url : "Orders" , component : Orders},
    {url : "ShowOrder", component : ShowOrder},
    
    //Subs
    {url : "Subs", component : Subs}
    
    ,

  //Contact support
  {url : "ContactSupport", component : ContactSupport},

    /// Deshborad
    { url: "", component: Dashboard },
    { url: "companies", component: Companies },
    { url: "analytics", component: Analytics },
    { url: "review", component: Review },
    { url: "order", component: Order },
    { url: "order-list", component: Orderlist },
    { url: "customer-list", component: Customerlist },
    /// Bootstrap
    { url: "ui-alert", component: UiAlert },
    { url: "ui-badge", component: UiBadge },
    { url: "ui-button", component: UiButton },
    { url: "ui-modal", component: UiModal },
    { url: "ui-button-group", component: UiButtonGroup },
    { url: "ui-accordion", component: UiAccordion },
    { url: "ui-list-group", component: UiListGroup },
    { url: "ui-media-object", component: UiMediaObject },
    { url: "ui-card", component: UiCards },
    { url: "ui-carousel", component: UiCarousel },
    { url: "ui-dropdown", component: UiDropDown },
    { url: "ui-popover", component: UiPopOver },
    { url: "ui-progressbar", component: UiProgressBar },
    { url: "ui-tab", component: UiTab },
    { url: "ui-pagination", component: UiPagination },
    { url: "ui-typography", component: UiTypography },
    { url: "ui-grid", component: UiGrid },
    /// Apps
    { url: "app-profile", component: AppProfile },
    { url: "post-details", component: PostDetails },
    { url: "email-compose", component: Compose },
    { url: "email-inbox", component: Inbox },
    { url: "email-read", component: Read },
    { url: "app-calender", component: Calendar },
    /// Shop
    { url: "ecom-product-grid", component: ProductGrid },
    { url: "ecom-product-list", component: ProductList },
    { url: "ecom-product-detail", component: ProductDetail },
    { url: "ecom-product-order", component: ProductOrder },
    { url: "ecom-checkout", component: Checkout },
    { url: "ecom-invoice", component: Invoice },
    { url: "ecom-product-detail", component: ProductDetail },
    { url: "ecom-customers", component: Customers },

    /// Chart
    { url: "chart-sparkline", component: SparklineChart },
    { url: "chart-float", component: ChartFloat },
    { url: "chart-chartjs", component: ChartJs },
    { url: "chart-chartist", component: Chartist },
    { url: "chart-btc", component: BtcChart },
    { url: "chart-apexchart", component: ApexChart },
    { url: "chart-rechart", component: RechartJs },

    /// table
    { url: "table-datatable-basic", component: DataTable },
    { url: "table-bootstrap-basic", component: BootstrapTable },

    /// Form
    { url: "form-element", component: Element },
    { url: "form-wizard", component: Wizard },
    { url: "form-wizard", component: Wizard },
    { url: "form-editor-summernote", component: SummerNote },
    { url: "form-pickers", component: Pickers },
    { url: "form-validation-jquery", component: jQueryValidation },

    /// Plugin

    { url: "uc-select2", component: Select2 },
    { url: "uc-nestable", component: Nestable },
    { url: "uc-noui-slider", component: MainNouiSlider },
    { url: "uc-sweetalert", component: MainSweetAlert },
    { url: "uc-toastr", component: Toastr },
    { url: "map-jqvmap", component: JqvMap },

    /// pages
    { url: "widget-basic", component: Widget },
    // { url: "page-register", component: Registration },
    // { url: "page-lock-screen", component: LockScreen },
    // { url: "page-login", component: Login },
    { url: "commandes", component: Commandes },
   // { url: "menus", component: menus },
    { url: "page-error-400", component: Error400 },
    { url: "page-error-403", component: Error403 },
    { url: "page-error-404", component: Error404 },
    { url: "page-error-500", component: Error500 },
    { url: "page-error-503", component: Error503 },
    // { url: "page-forgot-password", component: ForgotPassword },
  ];
  return (
    // you can change baseName to whatever you want
    <Router basename="/">
      <Switch>
        <Route path="/login">
          <div className="container-fluid">
            <Login />
          </div>
        </Route>
        <Route path="/register">
          <div className="container-fluid">
            <Registration />
          </div>
        </Route>
        <Route path="/forgotpassword">
          <div className="container-fluid">
            <ForgotPassword />
          </div>
        </Route>
        <Route path="/locked">
          <div className="container-fluid">
            <LockScreen />
          </div>
        </Route>
        <Route path="/userlogin">
          <div className="container-fluid">
            <LoginUser />
          </div>
        </Route>
        <Route>
          <div id="" className="show">
            <Nav />
            <div className="content-body">
              <div className="container-fluid">
                <Switch>
                  {routes.map((data, i) => (
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                  ))}
                </Switch>
              </div>
            </div>
            <Footer />
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default Markup;
