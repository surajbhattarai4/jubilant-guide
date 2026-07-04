import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders/restaurant/restaurant-1');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Orders</h1>
        
        <div className="flex space-x-4 mb-8">
          {['all', 'pending', 'preparing', 'ready', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize ${filter === status ? 'bg-red-600 text-white' : 'bg-white text-gray-900 border'}`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Order {order.id}</h3>
                  <p className="text-sm text-gray-600">Table {order.tableNumber} • {order.orderType}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="capitalize font-semibold">{order.status}</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {order.items?.map((item, idx) => (
                    <li key={idx}>{item.name} x{item.quantity} - ₨{item.price * item.quantity}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="font-bold">Total: ₨{order.totalAmount}</span>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  Update Status
                </button>
              </div>
            </div>
          ))}
          {filteredOrders.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;