import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <h2>Order ID: {order._id}</h2>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Status: {order.isDelivered ? 'Delivered' : 'Pending'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
