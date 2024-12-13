const express = require('express');
const { response } = require('../app');
const PASSWORD = require('./constants');
const dbConnection = require('../db/dbconnection'); 
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
    const token = req.headers.authorization.split(' ')[1];
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
      res.status(500)
          .json(
              {
                  success: false,
                  message: "Error on server"
              }
          );
      return;
    }

   try {
     
     const { barkodNo, productId } = req.body;
     const productBarkod = await dbConnection.Barcode.create({ 
       barkodNo, 
       product_id : productId// Burada product_id'yi manuel olarak belirtiyoruz
     });
     res.status(201).json(productBarkod);
   } catch (error) {
    console.log(error);
     res.status(500).json({ error: 'Barkod eklenemedi.' });
   }
 });
 
 router.get('/:barkodNo', async (req, res) => {
   try {
     const { barkodNo } = req.params;
    
     // Barkod numarasına göre ilişkili ürünü bulma
     const productBarkod = await dbConnection.Barcode.findOne({
       where: { barkodNo },
       include: dbConnection.Product // Product tablosunu dahil et
     });
 
     if (productBarkod) {
       res.status(200).json(productBarkod.Product); // Ürün bilgilerini döndür
     } else {
       res.status(404).json({ error: 'Barkod bulunamadı.' });
     }
   } catch (error) {
    console.log(error);
     res.status(500).json({ error: 'Ürün bilgisi alınamadı.' });
   }
 });

module.exports = router;