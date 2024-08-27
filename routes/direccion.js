const express = require('express');

const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const estados = require('../models/estado.js')
const municipios = require('../models/municipio.js')
const parroquias = require('../models/parroquia.js')
const tienda = require('../models/tiendas.js')
const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJVU2ZTQ2RXcUlVSndRc2Y2Q1BzeGExM1VrQXl3MkViSGxHX0haT3IzUWNjIn0.eyJleHAiOjE3MTY5MDQ1NjcsImlhdCI6MTcxNjkwNDI2NywianRpIjoiZGNlODU4OTAtOTgyMC00ZTgzLTg4ZjctM2M0NjU1ODllYmMwIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmFwbi5nb2IudmUvYXV0aC9yZWFsbXMvQVBJU0VHRU4iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMzQ5YTM4NjUtMjY4Ni00MTY4LWJiMTktNTk5OGFiZmVjMmY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYXBpcyIsInNlc3Npb25fc3RhdGUiOiJiNmIxM2IzZi1lYTFiLTRiZTEtOTY0NC1jYmI2MzMxZjk2ZjAiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vYXBpc2VnZW4uYXBuLmdvYi52ZSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJKb3NlIEZyYW5jbyIsInByZWZlcnJlZF91c2VybmFtZSI6ImpmcmFuY283NTQ5IiwiZ2l2ZW5fbmFtZSI6Ikpvc2UiLCJmYW1pbHlfbmFtZSI6IkZyYW5jbyIsImVtYWlsIjoiamZyYW5jbzc1NDlAZ21haWwuY29tIn0.rduFIY5CczVpL6uoILNqdL_XVmJlF3dWkS5wZCNrlW5zq5h8elmTv7vg4MSUJkkv4XGJaJjr5oo5h0-Gfyg-KZA6ajQ-SuZu0bIOhxrCWa2wkLqYw0AdRcNpjUq2prVZnn53i1tqo4eE5w-ijrGwzIa2yuJytf4bt1-CFV3Rulfd_xx7jHcztPaY6z_YcysS0arqfnWB-jbYmfoF41eUG8x-oesUq0dEP8ot653utJraXN3z_0ECvufdfZ1p3DnSEL-ygPzxmjz5jFZyaFcRlJRgSpfLqmEsOC7hP3JBy0v_6J_Xfe8Me0NzfJowPA1YkN8_R31iPxriY3nAG_eGNw"
const multer  = require('multer');

router.get('/getestado',  async (req,res)=>{
  let Estados = await estados.find()
  res.json(Estados)
})
router.get('/Gettienda',  async (req,res)=>{
  let Tienda = await tienda.find()

  res.json(Tienda)
})
router.get('/getmunicipio/:estado',  async (req,res)=>{
  let muni = await municipios.find({cod_entidad:req.params.estado})
  res.json(muni)
})
router.get('/getparroquia/:mun/:estado',  async (req,res)=>{
 
  let parr = await parroquias.find({id_mun:req.params.mun,id_entidad:req.params.estado})
  
  res.json(parr)
})
     
router.get('/getestados',  async (req,res)=>{
  let Estados = await estados.find()
  for(let estado of Estados){
    
    let mun = await municipios.find({cod_entidad:estado.cod_entidad})
    for(let m of mun ){
        const response = await fetch('https://apisegen.apn.gob.ve/api/v1/listadoParroquia?token='+token+'&codEntidad='+estado.cod_entidad+"&codMunicipio="+m.cod_mun);
    const data = await response.json();
    let valor = data.data
    if(valor){ 
      for(let d of data.data){
    let parroquia =  await new parroquias()
    parroquia.cod_parroquia = d.cod_parroquia_ine
    parroquia.nombre = d.parroquia_ine
    parroquia.id_mun = m.cod_mun
    parroquia.id_entidad = estado.cod_entidad
   // await parroquia.save()
   
    }
  }
   
  
  }
  }
  
 
  
  res.send("listo")

   })


module.exports = router;