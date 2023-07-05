import React from 'react'
import Chart from 'react-apexcharts'
import { Box } from '@material-ui/core';

function Dashboard() {
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
        <>
        <h1 className='text-center'>Acceuil</h1>
            <div className='d-flex justify-content-center justify-content-between'>
                
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
      </>
      );
    
}

export default Dashboard