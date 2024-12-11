const express = require('express');
const { response } = require('../app');
const router = express.Router();

// Define a user route
router.get('/', function(req, res, next) {
   const users = {
    'a' : 'qasd'
   }
   res.send(users);
});

module.exports = router;