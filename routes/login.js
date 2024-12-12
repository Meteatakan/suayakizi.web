const express = require('express');
const { response } = require('../app');
const PASSWORD = require('./constants');
const dbConnection = require('../db/dbconnection'); 
const router = express.Router();


router.post('/', async (req, res) => {
   try {

    const { password } = req.body;


    if (password. PASSWORD) {
        res.status(401).json({ message: 'Şifreniz hatalı' });
        return;
     }
     
     res.status(200).json({message:"Giriş Başarılı"});
   } catch (error) {
    console.log(error);
     res.status(500).json({ error: 'Barkod eklenemedi.' });
   }
 });
 
 

module.exports = router;