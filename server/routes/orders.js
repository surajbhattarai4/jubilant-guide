const express = require('express');
const router = express.Router();

// Mock data
const orders = [];

// Get all orders
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: orders
  });
});

// Get orders by restaurant
router.get('/restaurant/:restaurantId', (req, res) => {
  const restaurantOrders = orders.filter(o => o.restaurantId === req.params.restaurantId);
  res.json({
    success: true,
    data: restaurantOrders
  });
});

// Get single order
router.get('/:orderId', (req, res) => {
  const order = orders.find(o => o.id === req.params.orderId);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
  res.json({
    success: true,
    data: order
  });
});

// Create order
router.post('/', (req, res) => {
  try {
    const { restaurantId, tableNumber, items, orderType, notes, customerPhone } = req.body;

    const newOrder = {
      id: 'ORD-' + Date.now(),
      restaurantId,
      tableNumber,
      items,
      orderType, // 'dine-in', 'takeaway', 'pickup'
      status: 'pending', // pending, confirmed, preparing, ready, completed, cancelled
      notes,
      customerPhone,
      totalAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    orders.push(newOrder);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: newOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Update order status
router.patch('/:orderId/status', (req, res) => {
  try {
    const { status } = req.body;
    const order = orders.find(o => o.id === req.params.orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    order.updatedAt = new Date();

    res.json({
      success: true,
      message: 'Order status updated',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update order',
      error: error.message
    });
  }
});

module.exports = router;
