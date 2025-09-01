const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const { validateAddress } = require('../middleware/validation');

// Address routes for specific customer
router.get('/customers/:id/addresses', addressController.getCustomerAddresses);
router.post('/customers/:id/addresses', validateAddress, addressController.addAddress);

module.exports = router;
