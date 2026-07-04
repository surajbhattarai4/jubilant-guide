import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/dashboard/stats/restaurant-1');
        setStats(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  const StatCard = ({ icon: Icon, label, value, change }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && <p className="text-green-600 text-sm mt-1">+{change}%</p>}
        </div>
        <Icon className="w-12 h-12 text-red-600 opacity-20" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={DollarSign} label="Today's Revenue" value={`₨${stats?.todayRevenue}`} />
          <StatCard icon={ShoppingCart} label="Today's Orders" value={stats?.todayOrders} />
          <StatCard icon={Users} label="Total Customers" value={stats?.customerCount} />
          <StatCard icon={TrendingUp} label="Average Order Value" value={`₨${stats?.averageOrderValue}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Popular Items</h2>
            <div className="space-y-4">
              {stats?.popularItems?.map((item, index) => (
                <div key={index} className="flex justify-between items-center pb-4 border-b">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-red-600 font-bold">{item.orders} orders</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Status</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Pending Orders</p>
                <p className="text-3xl font-bold text-yellow-600">{stats?.pendingOrders}</p>
              </div>
              <div>
                <p className="text-gray-600">Completed Orders</p>
                <p className="text-3xl font-bold text-green-600">{stats?.completedOrders}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;