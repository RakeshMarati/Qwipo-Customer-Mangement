# 🏢 Customer Management System

A full-stack web application for managing customers and their addresses, built with React.js, Node.js, Express.js, and SQLite.

## 🚀 Features

### Customer Management
- ✅ **Create New Customer**: Add customers with validation
- ✅ **Read Customer Details**: View customer information and addresses
- ✅ **Update Customer**: Edit customer information
- ✅ **Delete Customer**: Remove customers with confirmation
- ✅ **Search & Filter**: Search by name, phone, email, city, state, PIN code
- ✅ **Pagination**: Navigate through large datasets
- ✅ **Sorting**: Sort by name, phone, created date

### Address Management
- ✅ **Multiple Addresses**: Add multiple addresses per customer
- ✅ **Primary Address**: Mark addresses as primary
- ✅ **Address CRUD**: Create, read, update, delete addresses
- ✅ **Address Search**: Search addresses by city, state, PIN code

### Advanced Features
- ✅ **Multiple Addresses View**: List customers with multiple addresses
- ✅ **Single Address View**: List customers with only one address
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Real-time Validation**: Client and server-side validation
- ✅ **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite** - Database
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Material-UI** - UI components
- **Axios** - HTTP client

## 📁 Project Structure

```
customer-management-app/
├── server/                 # Backend API
│   ├── models/
│   │   └── database.js     # Database connection & setup
│   ├── controllers/
│   │   ├── customerController.js
│   │   └── addressController.js
│   ├── routes/
│   │   ├── customerRoutes.js
│   │   └── addressRoutes.js
│   ├── middleware/
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── responseHandler.js
│   ├── app.js             # Express app configuration
│   ├── index.js           # Server entry point
│   └── package.json
├── client/                # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   └── AddressForm.js
│   │   ├── pages/
│   │   │   ├── CustomerList.js
│   │   │   ├── CustomerDetail.js
│   │   │   ├── CustomerForm.js
│   │   │   ├── AddressSearch.js
│   │   │   ├── MultipleAddresses.js
│   │   │   └── SingleAddress.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd customer-management-app
```

2. **Install backend dependencies**
```bash
cd server
npm install
```

3. **Install frontend dependencies**
```bash
cd ../client
npm install
```

4. **Start the backend server**
```bash
cd ../server
npm run dev
```
The backend will start on `http://localhost:5000`

5. **Start the frontend development server**
```bash
cd ../client
npm start
```
The frontend will start on `http://localhost:3000`

## 📚 API Documentation

### Customer Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | Get all customers with pagination & filters |
| GET | `/api/customers/:id` | Get customer by ID |
| POST | `/api/customers` | Create new customer |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |
| GET | `/api/customers/multiple-addresses/list` | Get customers with multiple addresses |
| GET | `/api/customers/single-address/list` | Get customers with single address |

### Address Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers/:id/addresses` | Get addresses for customer |
| POST | `/api/customers/:id/addresses` | Add address to customer |
| PUT | `/api/addresses/:addressId` | Update address |
| DELETE | `/api/addresses/:addressId` | Delete address |
| GET | `/api/addresses/search` | Search addresses by city/state/pin |

### Query Parameters

#### Customer List
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search in name, phone, email
- `city` - Filter by city
- `state` - Filter by state
- `pin_code` - Filter by PIN code
- `sortBy` - Sort field (first_name, last_name, phone_number, created_at)
- `sortOrder` - Sort order (ASC, DESC)

#### Address Search
- `city` - Search by city
- `state` - Search by state
- `pin_code` - Search by PIN code

## 🎯 Usage Examples

### Creating a Customer
```javascript
const customerData = {
  first_name: "John",
  last_name: "Doe",
  phone_number: "1234567890",
  email: "john@example.com"
};

const response = await customerAPI.createCustomer(customerData);
```

### Adding an Address
```javascript
const addressData = {
  address_details: "123 Main Street, Apartment 4B",
  city: "Mumbai",
  state: "Maharashtra",
  pin_code: "400001",
  is_primary: true
};

const response = await addressAPI.addAddress(customerId, addressData);
```

### Searching Customers
```javascript
const params = {
  search: "john",
  city: "mumbai",
  page: 1,
  limit: 10,
  sortBy: "first_name",
  sortOrder: "ASC"
};

const response = await customerAPI.getCustomers(params);
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:

```env
PORT=5000
NODE_ENV=development
```

### Database
The application uses SQLite with automatic table creation. The database file (`database.db`) will be created automatically in the server directory.

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔒 Security Features

- **Input Validation**: Client and server-side validation
- **SQL Injection Protection**: Parameterized queries
- **CORS**: Configured for cross-origin requests
- **Helmet**: Security headers
- **Error Handling**: No sensitive information in error messages

## 🚀 Deployment

### Backend Deployment
1. Set environment variables
2. Run `npm run build`
3. Start with `npm start`

### Frontend Deployment
1. Run `npm run build`
2. Deploy the `build` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the repository or contact the development team.

## 🎉 Features Implemented

### ✅ All Required Features Completed

1. **Customer CRUD Operations**
   - Create, Read, Update, Delete customers
   - Validation for all fields
   - Success/error messages

2. **Address Management**
   - Multiple addresses per customer
   - Primary address designation
   - Address CRUD operations

3. **Search & Filtering**
   - Search by name, phone, email
   - Filter by city, state, PIN code
   - Sort by various fields

4. **Pagination**
   - Page navigation
   - Configurable items per page
   - Total count display

5. **Special Views**
   - Customers with multiple addresses
   - Customers with single address
   - Address search functionality

6. **Responsive Design**
   - Mobile-friendly interface
   - Responsive tables and forms
   - Touch-friendly interactions

7. **Error Handling**
   - Comprehensive error messages
   - Loading states
   - User-friendly notifications

8. **Modern UI/UX**
   - Material-UI components
   - Clean, professional design
   - Intuitive navigation

The application is now ready for use and meets all the requirements specified in the assignment!
