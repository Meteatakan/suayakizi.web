const express = require('express');
const { response } = require('../app');
const dbConnection = require('../db/dbconnection'); 
const PASSWORD = require('./constants');
const router = express.Router();

const jwt = require("jsonwebtoken");
router.post('/', async (req, res) => {
   try {
    
    
    if (req.headers.authorization == undefined || req.headers.authorization.split(' ').length != 2 ){
      res.status(401)
          .json(
              {
                  success: false,
                  message: "You don't have the required rights"
              }
          );
          return;
    }
    const token = req.headers .authorization.split(' ')[1];
      jwt.verify(token, "secretkeyappearshere");
    //Authorization: 'Bearer TOKEN'
    if (!token) {
        res.status(401)
          .json(
              {
                  success: false,
                  message: "You don't have the required rights"
              }
          );
          return;
    }}catch (error) {
      console.log(error);
      res.status(401)
      .json(
          {
              success: false,
              message: "You don't have the required rights"
          }
      );
      return;
    }
    try{
     const { name, waterPrint, color } = req.body;
     
     // Ürün oluşturuluyor
     const product = await dbConnection.Product.create({ 
       name, 
       waterPrint,
       color
     });
 
     // Ürün başarıyla oluşturulduysa, yanıt olarak döndürülür
     res.status(201).json({message : "Kaydedildi"});
   } catch (error) {
     console.log(error);
     res.status(500).json({ message: 'Ürün eklenemedi.' });
   }
 });

 router.get('/', async (req, res) => {
   try {
     
   const products = await dbConnection.Product.findAll({
    include: [{
      model: dbConnection.ProductBarcode, // Barkod modelini doğru şekilde kullanın
      as: 'ProductBarcodes', // İlişkiyi doğru adla belirlediyseniz
     
    }]
  });
      
       res.status(200).json(products); // Ürün bilgilerini döndür
      
   } catch (error) {

    console.log(error);
     res.status(500).json({ message: 'Ürün bilgisi alınamadı.' });
   }
 });

module.exports = router;