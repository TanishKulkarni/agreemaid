const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getAgreements } = require('../controllers/agreementController');


router.get('/', protect, getAgreements);

module.exports = router;