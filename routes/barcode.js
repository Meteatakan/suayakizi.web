const express = require('express');
const { response } = require('../app');
const dbConnection = require('../db/dbconnection'); 
const router = express.Router();


router.post('/', async (req, res) => {
   try {
     const { barkodNo, productId } = req.body;
     const productBarkod = await dbConnection.ProductBarcode.create({ 
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
     const productBarkod = await dbConnection.ProductBarcode.findOne({
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