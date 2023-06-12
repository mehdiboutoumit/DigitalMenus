import React from "react";
import "./Orders.css";
import { Card, Accordion } from "react-bootstrap";



  
  const OrderDetails = ({ Gorder }) => {
    const order = {
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
      <Accordion>
        <Card style={{width : '100%'}}>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <h5>Order Information</h5>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Customer Name:</strong> {order.customerName}</p>
              <p><strong>Order Date:</strong> {order.orderDate}</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {order.individualOrders.map((individualOrder, index) => (
          <Card key={index}>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
                <h5>Individual Order #{index + 1}</h5>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index + 1}>
              <Card.Body>
                <p><strong>Table Number:</strong> {individualOrder.tableNumber}</p>
                <div className="dishes">
                  {individualOrder.dishes.map((dish, dishIndex) => (
                    <div key={dishIndex} className="dish">
                      <h6>{dish.name}</h6>
                      <p><strong>Quantity:</strong> {dish.quantity}</p>
                      <p><strong>Price:</strong> ${dish.price}</p>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  

  );
};

export default OrderDetails;
