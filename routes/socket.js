const express = require('express');
let { io } = require('../index')

console.log(io)
const router = express.Router();

let valor = 0

const multer = require('multer');
const upload = multer({ dest: "/img" });
var md_auth = require('../middleware/authenticated');
const jwt = require('jsonwebtoken');
router.get('/c2p', async (req, res) => {
  res.render('c2p')
})

router.get('/', async (req, res) => {
  valor = valor + 1
  console.log("intervalo" + valor)
  res.render('index', { menu: '' })
  //res.redirect('index.html')
})

router.get('/sign-in/', async (req, res) => {
  valor = valor + 1
  console.log("intervalo" + valor)
  res.render('sign-in', { menu: '' })
  //res.redirect('index.html')
})


router.get('/repuestos/', async (req, res) => {


  if (!req.cookies.access_token) return res.render('sign-in', { menu: '' })



  try {
    const token = req.cookies.access_token;
    const secretKey = 'mySecretKey';
    jwt.verify(token, secretKey)

    res.render('repuesto', { menu: '' })
  } catch {
    res.render('sign-in', { menu: '' })
  }

})

router.get('/repuesto-detail/', async (req, res) => {

  res.render('repuesto', { menu: '' })

})



router.get('/menu/:tipo', async (req, res) => {
  valor = valor + 1
  console.log("intervalo" + valor)
  if (req.params.tipo == 'promociones') {
    res.render('index', { menu: 'promociones' })
  } else {
    res.render('index', { menu: req.params.tipo })
  }

  //res.redirect('index.html')
})



module.exports = router;