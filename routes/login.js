const express = require('express');
const { response } = require('../app');
const PASSWORD = require('./constants');
const dbConnection = require('../db/dbconnection'); 
const router = express.Router();

const jwt = require("jsonwebtoken");


router.post("/",
  async (req, res, next) => {
      let {  password } = req.body;

      if (password != PASSWORD) {
        res.status(401).json({ message: 'Şifreniz hatalı' });
        return;
     }
      
       
      let token;
      try {
          //Creating jwt token
          token = jwt.sign(
              {
                  user: "admin"
              },
              "secretkeyappearshere",
              { expiresIn: "12h" }
          );
      } catch (err) {
          console.log(err);
          const error =
              new Error("Error! Something went wrong.");
          return next(error);
      }

      res
          .status(200)
          .json({
              success: true,
              data: {
                  token: token,
              },
          });
  });

/*router.post('/', async (req, res) => {
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
 });*/
 
 

module.exports = router;