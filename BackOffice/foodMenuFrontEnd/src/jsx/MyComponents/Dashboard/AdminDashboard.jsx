import React from 'react'
import Chart from 'react-apexcharts'
import { Box } from '@material-ui/core';

function AdminDashboard() {
      //Restaurants count
      const restaurantsCount = 7;

      //Total Incomes
      const totalIncome = 1000;

      //Subs
      const SubsData = [
        { day: "Monday", count: 101 },
        { day: "Tuesday", count: 5 },
        { day: "Wednesday", count: 1 },
        { day: "Thursday", count: 89 },
        { day: "Friday", count: 12 },
        { day: "Saturday", count: 6 },
        { day: "Sunday", count: 9 },
      ];
      
    const optionsSubs = {
        chart: {
          id: "order-chart",
        },
        xaxis: {
          categories: SubsData.map((order) => order.day),
        },
      };
    
      const seriesSubs = [
        {
          name: "Orders",
          data: SubsData.map((order) => order.count),
        },
      ];

    //orders
    const orderData = [
        { day: "Monday", count: 10 },
        { day: "Tuesday", count: 5 },
        { day: "Wednesday", count: 15 },
        { day: "Thursday", count: 8 },
        { day: "Friday", count: 12 },
        { day: "Saturday", count: 6 },
        { day: "Sunday", count: 9 },
      ];
      
    const optionsOrders = {
        chart: {
          id: "order-chart",
        },
        xaxis: {
          categories: orderData.map((order) => order.day),
        },
      };
    
      const seriesOrders = [
        {
          name: "Orders",
          data: orderData.map((order) => order.count),
        },
      ];
    
  return (
    <div>
         <div className='d-flex align-items-center justify-content-center justify-content-between'>

      <div className="row d-flex align-items-center justify-content-center">
              
      <div className="col-xl-3 col-lg-6 col-sm-6">
            <div className="widget-stat card bg-success">
                <div className="card-body p-4">
                  <div className="media">
                      <span className="mr-3">
                        <i className="flaticon-381-diamond"></i>
                      </span>
                      <div className="media-body text-white text-center">
                        <p className="mb-1">Revenus</p>
                        <h3 className="text-white" style={{ fontSize: "25px", overflowWrap: "break-word" }}>{totalIncome} MAD</h3>
                      </div>
                  </div>
                </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-sm-6">
            <div className="widget-stat card bg-primary">
                <div className="card-body p-4">
                  <div className="media">
                      <span className="mr-3">
                        <i className="flaticon-381-home-1"></i>
                      </span>
                      <div className="media-body text-white text-center">
                        <p className="mb-1">Restaurants</p>
                        <h3 className="text-white" style={{ fontSize: "25px", overflowWrap: "break-word" }}>{restaurantsCount}</h3>
                      </div>
                  </div>
                </div>
            </div>
          </div>
    <div className="row">
        
    <Box border={1} p={2} mb={2}>
        <h3>Nombre de commandes quotidiennes</h3>
        <Chart options={optionsOrders} series={seriesOrders} type="bar" height={400} />
        </Box>
        <Box border={1} p={2} mb={2}>
        <h3>Nombre de abonnements quotidiennes</h3>
        <Chart options={optionsSubs} series={seriesSubs} type="line" height={400} />
        </Box>
        <Box border={1} p={2} mb={2}>
        <h3>Nombre de abonnements quotidiennes</h3>
        <Chart options={optionsSubs} series={seriesSubs} type="line" height={400} />
    </Box>
          
</div>
</div>
</div>
    </div>
  )
}

export default AdminDashboard