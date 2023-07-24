import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { Line } from "react-chartjs-2";
import Select from "react-select";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { baseURL } from "../../../api/baseURL";
import swal from 'sweetalert'

function SuperAdminDashboard() {

  const accessType = Cookies.get('accessType')
  const [dataRestaurants , setdataRestaurants] = useState([]);

  const fetchData = async () => {
    try {
      if(accessType === "superadmin"){
      const response = await axios.get(`${baseURL}/restaurant/`, {
  headers: {
    authorization: `Bearer ${Cookies.get('accessToken')}`,
    id : `Bearer ${Cookies.get('userId')}`
  },
});
      setdataRestaurants(response.data.restaurants);
    }
    else { 
      if(accessType === "admin"){
                const adminId = Cookies.get('userId');
                const response = await axios.get(`${baseURL}/restaurant/admin/${adminId}`,  {
                  headers: {
                    authorization: `Bearer ${Cookies.get(Cookies.get('accessToken'))}`,
                    id : `Bearer ${Cookies.get('userId')}`
                  },
                });
                setdataRestaurants(response.data.restaurants);
      }
      else {
        swal ({text : "Non authentifie" }).then((confirm) => {
          if (confirm) {
              window.location.href = "/login";
          };})
      }
      
    }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        window.location.href = '/logout';
      } else {
        window.location.href = "/error500"
       // history.push('/error500');
      }
      console.error('Error fetching restaurants:', error);
    }
  };
  useEffect(() =>{
    fetchData();
  },[])
  
  //Trending restaurant


  //Income per month
  

   // Dummy data for statistics
   const restaurants = [
    "Restaurant A",
    "Restaurant B",
    "Restaurant C",
    // Add more restaurants here
  ];

  // Sample data for the statistics (replace with real data)
  const restaurantData = {
    "Restaurant A": {
      restaurantCount: 3,
      totalIncomes: 1250,
      numberOfMenus: 5,
      trendingMenus: ["Menu X", "Menu Y", "Menu Z"],
      subs: 50,
      numberOfOrders: [20, 30, 15, 10, 25, 5],
    },
    "Restaurant B": {
      restaurantCount: 2,
      totalIncomes: 850,
      numberOfMenus: 3,
      trendingMenus: ["Menu Y", "Menu P", "Menu Q"],
      subs: 30,
      numberOfOrders: [15, 10, 5, 12, 8, 15],
    },
    "Restaurant C": {
      restaurantCount: 4,
      totalIncomes: 1800,
      numberOfMenus: 7,
      trendingMenus: ["Menu X", "Menu Z", "Menu R"],
      subs: 70,
      numberOfOrders: [25, 40, 35, 20, 15, 30],
    },
    // Add more data for other restaurants
  };

  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]);

  const handleChangeRestaurant = (selectedOption) => {
    setSelectedRestaurant(selectedOption.value);
  };


 // Data for charts (updated for each month)
 const chartData = {
   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
   datasets: [
     {
       label: "Number of Orders",
       backgroundColor: "rgba(75,192,192,1)",
       borderColor: "rgba(0,0,0,1)",
       borderWidth: 1,
       data: restaurantData["Restaurant A"].numberOfOrders,
     },
   ],
 };

 // Chart options
 const chartOptions = {
   scales: {
     y: {
       beginAtZero: true,
     },
   },
 };

 return (

  
   <div className=" text-center">
     <h1>Bienvenue dans votre Espace Personnel {Cookies.get('name')}</h1>
       <div className="widget-stat card bg-success container">
                  <div className="card-body p-4">
                     <div className="media">
                        <span className="mr-3">
                           <i className="flaticon-381-home-1"></i>
                        </span>
                        <div className="media-body text-white text-right">
                           <p className="mb-1">Nombre des restaurants</p>
                           <h3 className="text-white">{dataRestaurants.length}</h3>
                        </div>
                     </div>
                  </div>
               </div>
       
     <div className="row mb-4 d-flex justify-content-center align-items-center">
       <div className="col-md-6">
         {/* Dropdown list of restaurants */}
         <Select
           options={dataRestaurants.map((r) => ({ value: r, label: r.name }))}
           value={{ value: selectedRestaurant, label: selectedRestaurant.name }}
           onChange={handleChangeRestaurant}
         />
       </div>
     </div>
     <div className="row d-flex justify-content-center align-items-center">
       {/* Creative cards to display statistics */}
      
       {/* <div className="col-md-4 mb-4 mx-auto">
         <div className="card p-3" style={{ backgroundColor: "#FFA500" }}>
           <h5>Total Incomes</h5>
           <p>{restaurantData[selectedRestaurant].totalIncomes}</p>
         </div>
       </div> */}
      
       <div className="col-xl-3 col-lg-6 col-sm-6">
               <div className="widget-stat card bg-warning">
                  <div className="card-body p-4">
                     <div className="media">
                        <span className="mr-3">
                           <i className="flaticon-381-list"></i>
                        </span>
                        <div className="media-body text-white text-right">
                           <p className="mb-1">Nombre des menus</p>
                           <h3 className="text-white">{restaurantData["Restaurant A"].numberOfMenus}</h3>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="col-xl-3 col-lg-6 col-sm-6">
               <div className="widget-stat card bg-info">
                  <div className="card-body p-4">
                     <div className="media">
                        <span className="mr-3">
                           <i className="la la-users"></i>
                        </span>
                        <div className="media-body text-white text-right">
                           <p className="mb-1">Nombre des Abonnés </p>
                           <h3 className="text-white">{restaurantData["Restaurant A"].subs}</h3>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
     </div>
     <div className="row d-flex f-column justify-content-center align-items-center">
       {/* Chart to display number of orders */}
      
       <div className="card m-2">
								<div className="card-header border-0">
									<div>
										<h4 className="card-title mb-2">Daily Trending Menus</h4>
										<p className="mb-0 fs-14">Lorem ipsum dolor</p>
									</div>
								</div>
								<div className="card-body p-2"></div>
       <div className="widget-media trending-menus">
										<ul className="timeline">
											<li>
												<div className="timeline-panel">
													<div className="media mr-4">
														<Link to={"/ecom-product-detail"}>
															<img alt="1" width="90"  />
														</Link>	
														<div className="number">#1</div>
													</div>
													<div className="media-body">
														<h5 className="mb-3 text-black"><Link to={"/ecom-product-detail"}  className="text-black">Chicken curry special with cucumber</Link></h5>
														<div className="d-flex justify-content-between align-items-center">
															<h4 className="mb-0 text-black font-w600">$5.6</h4>
															<p className="mb-0">Order <strong className="text-black font-w500">89x</strong></p>
														</div>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media mr-4">
														<Link to={"/ecom-product-detail"}>
															<img alt="2" width="90"  />
														</Link>	
														<div className="number">#2</div>
													</div>
													<div className="media-body">
														<h5 className="mb-3 text-black"><Link to={"/ecom-product-detail"} className="text-black">Watermelon juice with ice</Link></h5>
														<div className="d-flex justify-content-between align-items-center">
															<h4 className="mb-0 text-black font-w600">$4.8</h4>
															<p className="mb-0">Order <strong className="text-black font-w500">67x</strong></p>
														</div>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media mr-4">
														<Link to={"/ecom-product-detail"}>
															<img alt="3" width="90"  />
														</Link>	
														<div className="number">#3</div>
													</div>
													<div className="media-body">
														<h5 className="mb-3 text-black"><Link to={"/ecom-product-detail"}  className="text-black">Italiano pizza with garlic</Link></h5>
														<div className="d-flex justify-content-between align-items-center">
															<h4 className="mb-0 text-black font-w600">$12.3</h4>
															<p className="mb-0">Order <strong className="text-black font-w500">59x</strong></p>
														</div>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media mr-4">
														<Link to={"/ecom-product-detail"}>
															<img alt="4" width="90" />
														</Link>	
														<div className="number">#4</div>
													</div>
													<div className="media-body">
														<h5 className="mb-3 text-black"><Link to={"#"} href="ecom-product-detail.html" className="text-black">Tuna soup spinach with himalaya salt</Link></h5>
														<div className="d-flex justify-content-between align-items-center">
															<h4 className="mb-0 text-black font-w600">$3.6</h4>
															<p className="mb-0">Order <strong className="text-black font-w500">49x</strong></p>
														</div>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media mr-4">
														<Link to={"/ecom-product-detail"}>
															<img alt="5" width="90" />
														</Link>	
														<div className="number">#5</div>
													</div>
													<div className="media-body">
														<h5 className="mb-3 text-black"><Link to={"/ecom-product-detail"}  className="text-black">Medium Spicy Spagethi Italiano</Link></h5>
														<div className="d-flex justify-content-between align-items-center">
															<h4 className="mb-0 text-black font-w600">$4.2</h4>
															<p className="mb-0">Order <strong className="text-black font-w500">49x</strong></p>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</div>
                  </div>
                  <div className="card m-3">
                      <div className="card-header border-0">
                        <div>
                          <h4 className="card-title mb-2">Les commandes</h4>
                          <p className="mb-0 fs-14">Lorem ipsum dolor</p>
                        </div>
                      </div>
                    <div className="card-body p-0"></div>
                      <div className="col-md-12">
                        <Line data={chartData} options={chartOptions} />
                      </div>
                  </div>
     </div>

   </div>
 );
}

export default SuperAdminDashboard