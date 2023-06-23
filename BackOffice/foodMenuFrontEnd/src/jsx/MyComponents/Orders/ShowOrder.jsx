import React from "react";
import "./Orders.css";
import { Table } from "react-bootstrap";

const ShowOrder = ({ Gorder }) => {
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
  
  return (
    <div className="order-details">
      <h2 className="order-header">Order Details</h2>
      <Table striped bordered>
        <tbody>
          <tr>
            <td><strong>Order ID:</strong></td>
            <td>{Gorder.id}</td>
          </tr>
          <tr>
            <td><strong>Customer Name:</strong></td>
            <td>{Gorder.customerName}</td>
          </tr>
          <tr>
            <td><strong>Order Date:</strong></td>
            <td>{Gorder.orderDate}</td>
          </tr>
        </tbody>
      </Table>
      {Gorder.individualOrders.map((individualOrder, index) => (
        <div key={index} className="individual-order">
          <h3>Individual Order #{index + 1}</h3>
          <Table striped bordered>
            <tbody>
              <tr>
                <td><strong>Table Number:</strong></td>
                <td>{individualOrder.tableNumber}</td>
              </tr>
            </tbody>
          </Table>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Dish</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {individualOrder.dishes.map((dish, dishIndex) => (
                <tr key={dishIndex}>
                  <td>{dish.name}</td>
                  <td>{dish.quantity}</td>
                  <td>${dish.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default ShowOrder;
