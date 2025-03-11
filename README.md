# ShopIT - Full-Stack E-commerce Platform

ShopIT is a full-stack web application built with React and Flask that allows users to buy and sell products in a secure and user-friendly environment. Buyers can browse, search, and purchase products, while sellers can create listings and manage orders. The platform supports role-based functionalities with robust authentication using JWT.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Optional Features](#optional-features)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [License](#license)
- [Final Thoughts](#final-thoughts)

## Project Overview
ShopIT provides a platform for online commerce by connecting buyers and sellers. With role-based access, the system ensures that each user (buyer or seller) can perform tasks specific to their needs. Buyers can add items to their shopping cart, checkout, and track orders, while sellers can manage product listings and order details.

### Key Features:
- **User Registration & Login**: Secure signup and login using JWT for both buyers and sellers.
- **Product Listings**: Sellers can create listings with details such as title, description, price, and images.
- **Product Search & Filtering**: Buyers can search for products by keywords and filter based on categories, price range, etc.
- **Shopping Cart & Order Checkout**: Buyers can add products to their cart and complete purchases with shipping and payment details.
- **User Dashboards**: Distinct dashboards for buyers and sellers to manage profiles, orders, and product listings.
- **Secure API**: A RESTful API built with Flask to handle all frontend requests.

## Technologies Used

### Frontend:
- React
- Redux (state management)
- React Router (routing)
- Axios (for API calls)
- CSS for styling

### Backend:
- Flask (Python web framework)
- PostgreSQL (database)

### Authentication:
- JWT (JSON Web Tokens) for secure authentication

### Payment Integration:
- Stripe (or another payment gateway)

### Image and File Storage:
- Cloudinary (or a similar cloud storage service)

## Setup & Installation

### Clone the repository:
```bash
git clone https://github.com/your-username/ShopIT.git
cd ShopIT
```

### Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
```
Install the dependencies:
```bash
npm install
```
Start the development server:
```bash
npm start
```

### Backend Setup
Navigate to the backend directory:
```bash
cd ../backend
```
Create and activate a virtual environment:
```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```
Install the dependencies:
```bash
pip install -r requirements.txt
```

## Configuration
The application is configured using a Config class located in `app/config.py` (or an equivalent settings file). Important settings include:
- **SQLALCHEMY_DATABASE_URI**: Defines the connection string for your PostgreSQL database.
- **JWT_SECRET_KEY**: A secret key used to sign and verify JWT tokens (ensure you change this to a secure value in production).
- **PAYMENT_GATEWAY_CONFIG**: Settings for Stripe or your chosen payment integration.
- **IMAGE_STORAGE**: Credentials and settings for Cloudinary (or your chosen image storage service).

## Database Setup
ShopIT uses PostgreSQL for storing product information, user details, and order history. To initialize your database:

Set the FLASK_APP environment variable:
```bash
export FLASK_APP=app:create_app  # On Windows: set FLASK_APP=app:create_app
```
Initialize the migrations folder:
```bash
flask db init
```
Generate the migration scripts:
```bash
flask db migrate -m "Initial migration"
```
Apply the migrations:
```bash
flask db upgrade
```
This process will create your database schema and set up the necessary tables.

## API Endpoints

### 1. User Registration (Signup)
**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "Jane Doe",
  "password": "securePassword123",
  "role": "buyer"  // or "seller"
}
```
**Response:**
```json
{
  "message": "User created successfully"
}
```

### 2. User Login
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
**Response:**
```json
{
  "access_token": "your_jwt_token_here"
}
```

### 3. Product Management
- **Listing Products:** `GET /api/products`
- **Creating a Product (Seller):** `POST /api/products`
- **Updating a Product (Seller):** `PUT /api/products/<product_id>`
- **Deleting a Product (Seller):** `DELETE /api/products/<product_id>`

### 4. Order Management
- **Checkout Order:** `POST /api/orders`
- **View Order Details:** `GET /api/orders/<order_id>`

## Optional Features
If implemented, ShopIT also includes the following bonus features:
- **Reviews & Ratings**: Buyers can rate and review purchased products.
- **Wishlist**: Buyers can save products for future purchase.
- **Product Recommendations**: Personalized product suggestions based on user behavior.
- **Order Tracking**: Real-time updates on the status of orders.
- **Admin Dashboard**: Tools for admins to manage users, products, and orders.

## Running the App
After completing the setup and configuration, run the app locally:

Ensure the FLASK_APP environment variable is set:
```bash
export FLASK_APP=app:create_app  # On Windows: set FLASK_APP=app:create_app
```
Start the Flask server:
```bash
flask run
```
The backend will be available at `http://localhost:5000` and the frontend at `http://localhost:3000` (or your specified port).

## Testing
Tests for the API and frontend components are located under the `tests/` directory. Run the tests using:
```bash
pytest
```

## License
This project is licensed under the MIT License – see the LICENSE file for details.

## Final Thoughts
ShopIT is a comprehensive platform designed to simplify online buying and selling with secure authentication and a user-friendly interface. Whether you're a buyer looking for a smooth shopping experience or a seller managing product listings, ShopIT provides all the essential features in one robust system.

