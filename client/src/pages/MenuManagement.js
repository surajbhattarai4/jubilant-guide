import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Image } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Momo',
    image: null
  });

  const categories = ['Momo', 'Thali', 'Chowmein', 'Curry', 'Drinks', 'Desserts'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/menu', formData);
      toast.success('Menu item added successfully!');
      setFormData({ name: '', description: '', price: '', category: 'Momo', image: null });
      setShowForm(false);
    } catch (error) {
      toast.error('Failed to add menu item');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Menu Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Item
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6">Add New Menu Item</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows="3"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                  <Image className="w-5 h-5 mr-2 text-gray-400" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <span>Upload Image</span>
                </label>
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                  Add Item
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No menu items yet</td>
                </tr>
              ) : (
                menuItems.map(item => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">₨{item.price}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800"><Edit2 className="w-4 h-4" /></button>
                      <button className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;