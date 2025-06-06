const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.list);
router.post('/', ProductController.create);

module.exports = router;
