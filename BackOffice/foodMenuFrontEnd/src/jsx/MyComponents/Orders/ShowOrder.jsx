import React, { useEffect, useState } from "react";
import "./Orders.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../../api/baseURL";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ShowOrder = ({ Gorder }) => {

  const {id} = useParams();
  const [orders, setOrders]  =useState([]);

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
      setOrders(res.data.orders)
      console.log(res.data.orders);

    } catch (error) {
      
    }
  }

  useEffect(()=>{
      fetchData();
  },[])
  
  return (
    <div className="order-details">
      <h2 className="order-header">Order Details</h2>
      <Table striped bordered>
        <tbody>
          <tr>
            <td><strong>Order ID:</strong></td>
            <td>{id}</td>
          </tr>
          <tr>
            <td><strong>Order Date:</strong></td>
           {orders.length !=0 && <td>{orders[0].createdAt}</td>}
          </tr>
        </tbody>
      </Table>
      {orders && orders.map((individualOrder, index) => (
        <div key={index} className="individual-order">
          <h3>Individual Order #{index + 1}</h3>
          <Table striped bordered>
            <thead>
              <tr>
                {<th>Dish</th>}
                {<th>Portion</th>}
                <th>Price</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              
                <tr key={index}>
                  {<td>{individualOrder.id_dish}</td>}
                 { <td>{individualOrder.id_dish}</td>}
                  <td>{individualOrder.price}</td>
                  <td>{individualOrder.note}</td>
                </tr>
           
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default ShowOrder;
