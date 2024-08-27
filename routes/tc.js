const express = require('express');

const router = express.Router();



const multer  = require('multer');

router.get('/4f64eaa44708eacdfb67703150ce5f05.jpg',  async (req,res)=>{
  
    res.redirect('/img//4f64eaa44708eacdfb67703150ce5f05.jpg')
  
     })
     
router.get('/',  async (req,res)=>{
  
  res.render('condicion')

   })

router.get('/:id',  async (req,res)=>{
  if(!req.params.id){
    res.render('condicion')
  }else{
    res.render('condicion'+req.params.id)
  }
     })

module.exports = router;