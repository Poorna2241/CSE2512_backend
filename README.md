### Frontend Url = "https://github.com/Sanjaya-Samudra/CSE2512_frontend"

# CSE2512 Backend API

A comprehensive RESTful API backend for an e-commerce platform built with Node.js, Express, and MongoDB. This API provides complete functionality for user management, product catalog, and order processing with JWT-based authentication and role-based access control.

## 🚀 Features

### User Management

- User registration with bcrypt password hashing
- JWT-based authentication with role-based access control
- User profile management
- Admin user management (block/unblock users)

### Product Management

- CRUD operations for products
- Product search with regex pattern matching
- Alternative product names support
- Category and brand classification
- Stock management
- Product availability control
- Admin-only product management

### Order Management

- Order creation with automatic order ID generation
- Order tracking and status updates
- User-specific order history
- Admin order management
- Total price calculation
- Order items management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd CSE2512_backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000`

## 📦 Dependencies

- **express** (^5.1.0) - Web framework
- **mongoose** (8.10) - MongoDB object modeling
- **bcrypt** (^6.0.0) - Password hashing
- **jsonwebtoken** (^9.0.2) - JWT authentication
- **cors** (^2.8.5) - Cross-Origin Resource Sharing
- **dotenv** (^17.2.3) - Environment variable management
- **nodemon** (^3.1.10) - Development auto-reload
- **axios** (^1.13.2) - HTTP client


## 📚 API Documentation

### Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Endpoints

#### Create User (Register)

```http
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securePassword123"
}
```

#### Login

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "role": "customer"
}
```

#### Get Current User (Protected)

```http
GET /api/users
Authorization: Bearer <token>
```

#### Get All Users (Admin Only)

```http
GET /api/users/all
Authorization: Bearer <admin_token>
```

#### Toggle User Block Status (Admin Only)

```http
PUT /api/users/toggle-block/:email
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "isBlocked": true
}
```

### Product Endpoints

#### Get All Products

```http
GET /api/products
```

- Regular users see only available products
- Admins see all products

#### Get Product by ID

```http
GET /api/products/:productID
```

#### Search Products

```http
GET /api/products/search/:query
```

Searches in product name and alternative names (case-insensitive)

#### Get Trending Products

```http
GET /api/products/trending
```

#### Create Product (Admin Only)

```http
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "productID": "PROD001",
  "name": "Product Name",
  "altNames": ["Alternative Name 1", "Alternative Name 2"],
  "description": "Product description",
  "price": 99.99,
  "labelledPrice": 129.99,
  "images": ["image1.jpg", "image2.jpg"],
  "category": "Electronics",
  "model": "Standard",
  "brand": "Generic",
  "stock": 100,
  "isAvailable": true
}
```

#### Update Product (Admin Only)

```http
PUT /api/products/:productID
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 89.99,
  "stock": 150
}
```

#### Delete Product (Admin Only)

```http
DELETE /api/products/:productID
Authorization: Bearer <admin_token>
```

### Order Endpoints

#### Create Order (Protected)

```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "address": "123 Main St, City, Country",
  "phone": "+1234567890",
  "items": [
    {
      "productID": "PROD001",
      "quantity": 2
    }
  ]
}
```

**Response:**

```json
{
  "message": "Order placed successfully",
  "orderId": "ORD000001"
}
```

#### Get Orders (Protected)

```http
GET /api/orders
Authorization: Bearer <token>
```

- Regular users see only their own orders
- Admins see all orders

#### Update Order Status (Admin Only)

```http
PUT /api/orders/:orderId
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "shipped",
  "notes": "Order dispatched via FedEx"
}
```

## 🗄️ Database Models

### User Schema

```javascript
{
  email: String (unique, required),
  firstName: String (required),
  lastName: String (required),
  password: String (required, hashed),
  role: String (default: "customer"),
  isBlocked: Boolean (default: false),
  isEmailVerified: Boolean (default: false),
  image: String (default: "/default.jpg")
}
```

### Product Schema

```javascript
{
  productID: String (unique, required),
  name: String (required),
  altNames: [String],
  description: String (required),
  price: Number (required),
  labelledPrice: Number (required),
  images: [String] (required),
  category: String (required),
  model: String (default: "Standard"),
  brand: String (default: "Generic"),
  stock: Number (default: 0),
  isAvailable: Boolean (default: true)
}
```

### Order Schema

```javascript
{
  orderId: String (unique, required),
  email: String (required),
  name: String (required),
  address: String (required),
  date: Date (default: Date.now),
  total: Number (required),
  status: String (default: "pending"),
  phone: String,
  notes: String,
  items: [{
    productID: String (required),
    name: String (required),
    price: Number (required),
    quantity: Number (required),
    image: String (required)
  }]
}
```

## 🔒 Security Features

- **Password Hashing**: Uses bcrypt with salt rounds of 10
- **JWT Authentication**: Token-based authentication with 150-hour expiry
- **Role-Based Access Control**: Admin and customer roles with different permissions
- **User Blocking**: Admins can block/unblock users
- **Middleware Authentication**: Automatic token verification on protected routes

## 🏗️ Project Structure

```
CSE2512_backend/
├── controllers/
│   ├── userController.js      # User business logic
│   ├── productController.js   # Product business logic
│   └── orderController.js     # Order business logic
├── models/
│   ├── User.js               # User schema
│   ├── Product.js            # Product schema
│   └── Order.js              # Order schema
├── routes/
│   ├── userRouter.js         # User routes
│   ├── productRouter.js      # Product routes
│   └── orderRouter.js        # Order routes
├── index.js                  # Application entry point
├── package.json             # Project dependencies
└── .env                     # Environment variables
```

## 🚦 Middleware

### JWT Authentication Middleware

- Automatically verifies JWT tokens from Authorization header
- Attaches decoded user information to `req.user`
- Allows public access to routes if no token is provided
- Returns 401 for invalid tokens

### CORS

- Enabled for all origins
- Allows cross-origin requests from frontend applications

## 🔄 Order ID Generation

The system automatically generates sequential order IDs:

- Format: `ORD000001`, `ORD000002`, etc.
- Automatically increments based on the latest order
- Zero-padded to 6 digits

## 👨‍💼 Admin Functions

Admins have special privileges including:

- View all products (including unavailable ones)
- Create, update, and delete products
- View all orders from all users
- Update order status and add notes
- View all registered users
- Block/unblock users
- Cannot change their own block status


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC

## 👤 Author

CSE2512 Development Team

---

**Note**: This is a backend API server. You'll need a separate frontend application to interact with these endpoints.
