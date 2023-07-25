import React, { useEffect, useState } from "react";
import "./Orders.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../../api/baseURL";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ShowOrder = ({ Gorder }) => {

  const {id} = useParams();
  const [orders, setOrders]  =useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  Gorder = {
    id: 1,
    customerName: "John Doe",
    orderDate: "2023-06-05",
    individualOrders: [
      {
        tableNumber: 1,
        dishes: [
          {
            name: "Pizza",
            quantity: 2,
            price: 10.99,
          },
          {
            name: "Burger",
            quantity: 1,
            price: 8.99,
          },
        ],
      },
      {
        tableNumber: 2,
        dishes: [
          {
            name: "Salad",
            quantity: 1,
            price: 6.99,
          },
        ],
      },
    ],
  };

  const fetchData = async ()=> {
    try {
      const res = await axios.get(`${baseURL}/order/details/${id}`);
      const ordersWithNames = await Promise.all(
        res.data.orders.map(async (order) => {
          const dishResponse = await axios.get(`${baseURL}/dish/${order.id_dish}`);
          const portionResponse = await axios.get(`${baseURL}/portion/${order.id_portion}`);
          const updatedOrder = {
            ...order,
            dishName: dishResponse.data.dish.name,
            portionName: portionResponse.data.portion.name,
          };
          return updatedOrder;
        })
      );
      setOrders(ordersWithNames)
      console.log(ordersWithNames);

    } catch (error) {
      
    }
  }

  const calculateTotalPrice = () => {
    if (orders.length !== 0) {
      const total = orders.reduce((acc, order) => {
        return acc + parseInt(order.price); // Replace 'price' with the actual property name that holds the price value in the order object
      }, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  };

  useEffect(()=>{
      fetchData();
      calculateTotalPrice();
  },[orders])
  
  return (
    <div className="order-details">
      <h2 className="order-header">Details de la commande</h2>
      <Table striped bordered>
        <tbody>
          <tr>
            <td><strong>ID:</strong></td>
            <td>{id}</td>
          </tr>
          <tr>
            <td><strong>Date :</strong></td>
           {orders.length !=0 && <td>{orders[0].createdAt}</td>}
          </tr>
          <tr>
            <td><strong>Prix Total</strong></td>
           {orders.length !=0 && <td>{totalPrice} DH</td>}
          </tr>
        </tbody>
      </Table>
      {orders && orders.map((order, index) => (
        <div key={index} className="individual-order">
          <h3>Plat #{index + 1}</h3>
          <Table striped bordered>
            <thead>
              <tr>
                {order.id_dish &&<th>Plat</th>}
                {order.id_portion &&<th>Portion</th>}
                <th>Prix</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              
                <tr key={index}>
                  {order.id_dish && <td>{order.dishName}</td>}
                 {order.id_portion && <td>{order.portionName}</td>}
                  <td>{order.price}</td>
                  <td>{order.note}</td>
                </tr>
           
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default ShowOrder;
