const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const addressController = require('../controllers/addressController');
const { validateCustomer, validateAddress } = require('../middleware/validation');

// Customer CRUD routes
router.post('/', validateCustomer, customerController.createCustomer);
router.get('/', customerController.getCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', validateCustomer, customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

// Address routes for specific customer
router.get('/:id/addresses', addressController.getCustomerAddresses);
router.post('/:id/addresses', validateAddress, addressController.addAddress);

// Address CRUD routes
router.put('/addresses/:addressId', validateAddress, addressController.updateAddress);
router.delete('/addresses/:addressId', addressController.deleteAddress);
router.get('/addresses/search', addressController.searchAddresses);

module.exports = router;
