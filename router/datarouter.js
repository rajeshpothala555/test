const express = require('express');
const router = express.Router();
const {Data}  = require('../controller/datacontroller')

router.post('/',Data);

module.exports = router;