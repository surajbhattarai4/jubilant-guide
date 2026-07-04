import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';

const CustomerMenu = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  
  const categories = ['Momo', 'Thali', 'Chowmein', 'Curry', 'Drinks', 'Desserts'];
  const [activeCategory, setActiveCategory] = useState('Momo');

  const menuItems = [
    { id: 1, name: 'Chicken Momo', category: 'Momo', price: 180, image: '🥟' },
    { id: 2, name: 'Vegetable Momo', category: 'Momo', price: 150, image: '🥟' },
    { id: 3, name: 'Buff Thali', category: 'Thali', price: 350, image: '🍛' },
    { id: 4, name: 'Vegetable Thali', category: 'Thali', price: 300, image: '🍛' },
    { id: 5, name: 'Chicken Chowmein', category: 'Chowmein', price: 220, image: '🍜' },
    { id: 6, name: 'Momo Curry', category: 'Curry', price: 280, image: '🍲' },
  ];

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast.success('Added to cart!');
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(c => c.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(c => c.id === itemId ? { ...c, quantity } : c));
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">Restaurant Menu</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu */}
        <div className="lg:col-span-2">
          {/* Category Filter */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex overflow-x-auto space-x-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="bg-gray-200 h-48 flex items-center justify-center text-6xl">
                  {item.image}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  <p className="text-red-600 font-bold text-xl my-2">₨{item.price}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="font-bold">₨{item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-bold">Total:</span>
                      <span className="text-2xl font-bold text-red-600">₨{total}</span>
                    </div>
                    <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-bold">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerMenu;