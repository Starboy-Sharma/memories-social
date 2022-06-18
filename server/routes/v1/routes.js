const express = require('express');
const router = express.Router();

router.use('/user', require('../../api/v1/Users/routes/userRoutes'));

module.exports = router;