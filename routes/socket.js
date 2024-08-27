const express = require('express');
let {io} = require('../index')

console.log(io)
const router = express.Router();

let valor= 0

const multer  = require('multer');
const upload = multer({ dest: "/img" });

router.get('/c2p',  async (req,res)=>{
  res.render('c2p')
     })

router.get('/',  async (req,res)=>{
  valor = valor+1
  console.log("intervalo"+valor)
  res.render('index',{menu:''})
  //res.redirect('index.html')
     })


     router.get('/repuestos/',  async (req,res)=>{
      valor = valor+1
      console.log("intervalo"+valor)
      res.render('repuesto',{menu:''})
      //res.redirect('index.html')
         })
    
router.get('/menu/:tipo',  async (req,res)=>{
      valor = valor+1
      console.log("intervalo"+valor)
      if(req.params.tipo == 'promociones'){
        res.render('index',{menu:'promociones'})
      }else{
        res.render('index',{menu:req.params.tipo})
      }
    
      //res.redirect('index.html')
         })

        

module.exports = router;