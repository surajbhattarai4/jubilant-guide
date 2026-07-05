# Nepali Restaurant QR Code Ordering System

A modern, mobile-first digital menu and QR code ordering system designed specifically for Nepali restaurant owners.

## ��� Features

### For Restaurant Owners
- **QR Code Menu** - Generate QR codes for each table
- **Digital Menu Management** - Easy-to-use dashboard for managing menu items, prices, and photos
- **Order Management** - Real-time order tracking and status updates
- **Kitchen Dashboard** - Live orders visible in the kitchen
- **Analytics & Reports** - Daily sales, popular items, customer insights
- **Multi-branch Support** - Manage multiple restaurants from one account
- **Payment Integration** - Accept online payments securely
- **Staff Management** - Create accounts for waiters and kitchen staff

### For Customers
- **Scan & Order** - Customers scan QR code and place orders instantly
- **Browse Menu** - Beautiful digital menu with photos, descriptions, and prices
- **Multiple Order Types** - Dine-in, Takeaway, Pickup
- **Cart Management** - Easy add/remove items with quantity control
- **Ratings & Reviews** - Leave feedback about their experience

## 🚀 Tech Stack

### Backend
- Node.js & Express.js
- MongoDB (database)
- JWT Authentication
- QR Code Generation
- Stripe Integration (payments)

### Frontend
- React 18
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- Lucide Icons

### Features
- Progressive Web App (PWA)
- Mobile-first responsive design
- Real-time notifications
- Secure authentication
- Cloud-based

## 📋 Project Structure

```
jubilant-guide/
├── server/
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── restaurants.js   # Restaurant management
│   │   ├── menu.js          # Menu CRUD operations
│   │   ├── orders.js        # Order management
│   │   ├── qrcode.js        # QR code generation
│   │   ├── dashboard.js     # Analytics & reports
│   │   └── payments.js      # Payment processing
│   └── index.js             # Server entry point
├── client/
│   ├── public/
│   │   ├── index.html       # HTML template
│   │   └── manifest.json    # PWA manifest
│   └── src/
│       ├── pages/
│       │   ├── Homepage.js           # Landing page
│       │   ├── Dashboard.js          # Admin dashboard
│       │   ├── MenuManagement.js     # Menu editor
│       │   ├── Orders.js             # Order management
│       │   ├── CustomerMenu.js       # Customer facing menu
│       │   ├── Pricing.js            # Pricing page
│       ���   ├── Login.js              # Login page
│       │   ├── Register.js           # Registration page
│       │   └── NotFound.js           # 404 page
│       ├── App.js           # Main app component
│       ├── index.js         # React entry point
│       └── index.css        # Global styles
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
└── README.md                # This file
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your values:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/restaurant-qr
   JWT_SECRET=your_secret_key_here
   ```

3. **Start server**
   ```bash
   npm run server:dev
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

### Run Both (Concurrently)

```bash
npm run dev
```

Server runs on `http://localhost:5000`
Client runs on `http://localhost:3000`

## 📱 Pages Overview

### Public Pages
- **Homepage** - Hero section with features, testimonials, FAQ
- **Pricing** - Plans: Basic (Free), Professional (₹2,999/month), Enterprise (Custom)
- **Login** - Restaurant owner login
- **Register** - Create new account

### Customer Pages
- **Menu** - Digital menu with QR scanning
- **Cart** - Order cart management
- **Checkout** - Payment processing

### Admin Pages
- **Dashboard** - Analytics and overview
- **Menu Management** - Add/edit/delete items
- **Orders** - View and manage orders
- **Settings** - Restaurant profile and preferences

## 🎨 Design Features

- **Color Palette**: Red (#DC2626), White, Dark Gray (#1f2937)
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Mobile-first**: Optimized for smartphone users
- **Fast Loading**: Optimized images and code splitting
- **Accessibility**: WCAG compliant
- **PWA Ready**: Can be installed as app on mobile

## 🔐 Security

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Environment variables for sensitive data
- Secure payment integration

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new restaurant
- `POST /api/auth/login` - Login

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get single restaurant
- `POST /api/restaurants` - Create restaurant
- `PUT /api/restaurants/:id` - Update restaurant

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/restaurant/:restaurantId` - Get restaurant menu
- `POST /api/menu` - Create menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:orderId` - Get single order
- `GET /api/orders/restaurant/:restaurantId` - Get restaurant orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/:orderId/status` - Update order status

### QR Code
- `POST /api/qrcode/generate` - Generate QR code
- `GET /api/qrcode/:restaurantId/:tableNumber` - Get table QR code

### Dashboard
- `GET /api/dashboard/stats/:restaurantId` - Get statistics
- `GET /api/dashboard/sales/:restaurantId` - Get sales report
- `GET /api/dashboard/feedback/:restaurantId` - Get feedback

### Payments
- `POST /api/payments/process` - Process payment
- `GET /api/payments/methods` - Get payment methods

## 🌐 Deployment

### Deploy Backend (Heroku/Railway/Render)
```bash
git push heroku main
```

### Deploy Frontend (Vercel/Netlify)
```bash
npm run build
# Upload 'build' folder to hosting service
```

## 📈 Scaling

- MongoDB Atlas for cloud database
- AWS S3 for image storage
- CDN for fast content delivery
- Load balancing for high traffic

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 📞 Support

- Email: surajxc123@gmail.
- Phone: +08064607546
- Website: www.qrmenu.com
- Documentation: https://docs.qrmenu.com

## 🎉 Credits

Built with ❤️ for Nepali restaurant owners worldwide.

---

**Made for restaurants, by developers who understand restaurants.**
