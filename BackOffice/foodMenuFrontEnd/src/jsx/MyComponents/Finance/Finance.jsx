import axios from 'axios'
import Cookies from 'js-cookie'
import { MDBDataTable } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../../api/baseURL'

function Finance() {
  const [restaurants, setRestaurants] = useState([]);

  const [restaurantsSum, setRestaurantsSum] = useState([]);

  // Fetch restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${baseURL}/restaurant`, {
        headers: {
          authorization: `Bearer ${Cookies.get('accessToken')}`,
          id : `Bearer ${Cookies.get('userId')}`
        },
      });
      setRestaurants(response.data.restaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  // Fetch individual orders for a global order and calculate the sum
  const fetchGlobalOrderSum = async (globalOrderId) => {
    try {
      const response = await axios.get(`${baseURL}/order/details/${globalOrderId}`, {
        headers: {
          authorization: `Bearer ${Cookies.get('accessToken')}`,
          id : `Bearer ${Cookies.get('userId')}`
        },
      });
      const sum = response.data.orders.reduce((total, order) => total + parseFloat(order.price), 0);
      return sum;
    } catch (error) {
      console.error(`Error fetching individual orders for global order ${globalOrderId}:`, error);
      return 0;
    }
  };

  // Fetch global orders for each restaurant and calculate the total sum
  const fetchGlobalOrdersAndSum = async () => {
    const updatedRestaurantsSum = [];
    for (const restaurant of restaurants) {
      try {
        const response = await axios.get(`${baseURL}/order/restaurant/${restaurant.id}`, {
          headers: {
            authorization: `Bearer ${Cookies.get('accessToken')}`,
            id : `Bearer ${Cookies.get('userId')}`
          },
        });
        const globalOrders = response.data.orders;
        let sum = 0;
        for (const globalOrder of globalOrders) {
          sum += await fetchGlobalOrderSum(globalOrder.id);
        }
        updatedRestaurantsSum.push({ [restaurant.name]: sum });
      } catch (error) {
        console.error(`Error fetching global orders for restaurant ${restaurant.id}:`, error);
        updatedRestaurantsSum.push({ [restaurant.name]: 0 });
      }
    }
    console.log(updatedRestaurantsSum);
    setRestaurantsSum(updatedRestaurantsSum);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    fetchGlobalOrdersAndSum();
    console.log(restaurantsSum)
  }, [restaurants]);


  const rows = restaurantsSum.map((restaurantSum) => {
    const restaurantName = Object.keys(restaurantSum)[0];
    const sum = restaurantSum[restaurantName];
    return { restaurant: restaurantName, sum: sum + " DH" };
  });
const data ={
  columns : [
    {label : "Resturant", field :"restaurant"},
    {label : "Revenue", field :"sum"}
  ],
rows :rows 
  
}




  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <div className='m-5'><h1>Gestion Financiere</h1></div>
     
        <MDBDataTable data={data} noBottomColumns></MDBDataTable>
     
    </div>
  )
}

export default Finance