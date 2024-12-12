const express = require('express');
const { response } = require('../app');
const dbConnection = require('../db/dbconnection'); 
const PASSWORD = require('./constants');
const router = express.Router();

router.post('/', async (req, res) => {
   try {
      if (req.headers.authorization != PASSWORD) {
         res.status(401).json({ message: 'Yetkiniz yok' });
         return;
      }
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
     const { barkodNo } = req.params;
     // Barkod numarasına göre ilişkili ürünü bulma
     const products = await dbConnection.Product.findAll(); 
 
      
       res.status(200).json(products); // Ürün bilgilerini döndür
      
   } catch (error) {
     res.status(500).json({ message: 'Ürün bilgisi alınamadı.' });
   }
 });

module.exports = router;