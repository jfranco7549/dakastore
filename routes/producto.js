const express = require('express');
const Producto = require('../models/producto.js')
const articulo = require('../models/articulo.js')
const router = express.Router();
const Marca = require('../models/marca.js')
const categoria = require('../models/categoria.js')
const caracteristica = require('../models/caracteristica.js')
const multer  = require('multer');


//devuelve la marca
router.get('/marca',  async (req,res)=>{
  try{
    let list = [];
    let val = await  Marca.find()
    
    res.json(val)

  }catch(err){
    res.json({})
  }

})
router.get('/caracterisctica/:sap',  async (req,res)=>{
try{

  let list = [];
  
  let val = await  caracteristica.find({q:req.params.sap})
  let ico = {}
  
  for( let caracteristicas of val){

    
    let val2 = await  categoria.findOne({atributo:caracteristicas.atributo})
    
    if(val2){
     
      ico[caracteristicas.atributo] = val2.icono
     
     
    }else{
      
      ico[caracteristicas.atributo] =  "mdi-tools"
     
    }

  }
  
  
  res.json({"valor":val,"ico":ico})

}catch(err){
  console.log(err)
res.json({"valor":'s',"ico":'se'})
}
})
router.get('/categoria/:atributo',  async (req,res)=>{
try{
  let list = [];
  let val = await  categoria.findOne({atributo:req.params.atributo})
  
  res.json(val)
}catch(err){
  res.json({})
}
})
router.get('/destacado',  async (req,res)=>{
 try{
  let list = [];
  let val = await  articulo.find({status:true,categoria: {
    $ne: "repuesto"
  }}).limit(6).sort({uv:-1});
  for(let i of val){

    list.push(i.sap)
    
  }
 
  res.json(list)
 }catch(err){
  
  console.log(err)
  res.json([])
 }
})
router.get('/parati',  async (req,res)=>{
  try{
   let list = [];
   let val = await  articulo.find({status:true,categoria: {
    $ne: "repuesto"
  }}).limit(6).sort({uv:1});
   for(let i of val){
 
     list.push(i.sap)
     
   }
  
   res.json(list)
  }catch(err){
   
   console.log(err)
   res.json([])
  }
 })
router.get('/lineas/:linea',  async (req,res)=>{
  try{
    let list = [];
  let cant  =  await  articulo.find({familia:req.params.linea,status:true,categoria: {
    $ne: "repuesto"
  }}).count()

  cant = cant - 3
  cant = Math.round(Math.random() * cant)

  let val = await  articulo.find({familia:req.params.linea,status:true,categoria: {
    $ne: "repuesto"
  }}).skip(cant).limit(3)
  
  for(let i of val){

    list.push(i.sap)
    
  }
 
  res.json(list)

  }catch(err){
    console.log(err)
    res.json({})

  }
  
})

router.get('/list',  async (req,res)=>{
try{
  let list = [];
  let val = await  articulo.find({status:true,categoria: {
    $ne: "repuesto"
  }}).limit(20)
  let cant =  await  articulo.find({status:true,categoria: {
    $ne: "repuesto"
  }}).count() 

  for( let articulo of val ){
    if(articulo.status){
      let ar = await  Producto.findOne({sap:articulo.sap})
     
      if(ar){
        list.push({sap:articulo.sap,categoria:articulo.categoria,promo:articulo.promo,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
      }
    }
     
  }

     res.json({valor:list,n:cant})
}catch(err){
 
  res.json({list:[],cant:0})
}
      })

      router.get('/listR',  async (req,res)=>{
        try{
          let list = [];
          let val = await  articulo.find({
            sap: {
              $regex: "^(31|32)"
            }
          }).limit(20)
          let cant =  await  articulo.find({
            sap: {
              $regex: "^(31|32)"
            }
          }).count() 
        
          for( let articulo of val ){
            if(articulo.status){
              let ar = await  Producto.findOne({sap:articulo.sap})
             
              if(ar){
                list.push({sap:articulo.sap,categoria:articulo.categoria,promo:articulo.promo,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
              }
            }
             
          }
        
             res.json({valor:list,n:cant})
        }catch(err){
         
          res.json({list:[],cant:0})
        }
              })
      router.get('/promo/:inicio/:fin',  async (req,res)=>{
        try{
          if(req.params.inicio < 0){
            req.params.inicio = 0
          }
          if(req.params.fin < 0){
            req.params.fin = 0
          }
          
          let list = [];
          let val = await  articulo.find({status:true,promo:true,categoria: {
            $ne: "repuesto"
          }}).skip(req.params.inicio).limit(req.params.fin)
          let cont = await  articulo.find({status:true,promo:true,categoria: {
            $ne: "repuesto"
          }}).count()
         
          for( let articulo of val ){
            if(articulo.status){
              let ar = await  Producto.findOne({sap:articulo.sap})
            
              if(ar){
                list.push({sap:articulo.sap,categoria:articulo.categoria,promo:articulo.promo,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
              }
            }
             
          }
        
             res.json({valor:list,n:cont})

        }catch(err){
          console.log(err)
          res.json(list)

        }
            })
            router.get('/listR/:inicio/:fin',  async (req,res)=>{
              try{
                if(req.params.inicio < 0){
                  req.params.inicio = 0
                }
                if(req.params.fin < 0){
                  req.params.fin = 0
                }
               
                let list = [];
                let val = await  articulo.find({
                  sap: {
                    $regex: "^(31|32)"
                  }
                }).skip(req.params.inicio).limit(req.params.fin)
                let cont = await  articulo.find({
                  sap: {
                    $regex: "^(31|32)"
                  }
                }).count()
       
                for( let articulo of val ){
                  if(articulo.status){
                    let ar = await  Producto.findOne({sap:articulo.sap})
                  
                    if(ar){
                      list.push({sap:articulo.sap,categoria:articulo.categoria,promo:articulo.promo,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
                    }
                  }
                   
                }
              
                   res.json({valor:list,n:cont})
      
              }catch(err){
                console.log(err)
                res.json(list)
      
              }
                  })

      router.get('/list/:inicio/:fin',  async (req,res)=>{
        try{
          if(req.params.inicio < 0){
            req.params.inicio = 0
          }
          if(req.params.fin < 0){
            req.params.fin = 0
          }
         
          let list = [];
          let val = await  articulo.find({status:true,categoria: {
            $ne: "repuesto"
          }}).skip(req.params.inicio).limit(req.params.fin)
          let cont = await  articulo.find({status:true,categoria: {
            $ne: "repuesto"
          }}).count()
 
          for( let articulo of val ){
            if(articulo.status){
              let ar = await  Producto.findOne({sap:articulo.sap})
            
              if(ar){
                list.push({sap:articulo.sap,categoria:articulo.categoria,promo:articulo.promo,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
              }
            }
             
          }
        
             res.json({valor:list,n:cont})

        }catch(err){
          console.log(err)
          res.json(list)

        }
            })
      
//162 lista con descripcion 
      router.get('/list_des/:desp/:inicio/:fin',  async (req,res)=>{

            try{
                     //descripcion para la busqueda
        /*{descripcion: { $regex: '.*' +  + '.*' } }  */
        let descrip = req.params.desp
       
        let list = [];
      let cand = await Producto.find( {descripcion: { $regex: '.*' + descrip + '.*' },status:true }).count()
      
        let prod = await  Producto.find( {descripcion: { $regex: '.*' + descrip + '.*' },status:true  }).skip(req.params.inicio).limit(req.params.fin)
     
        for( let p of prod ){

          let ar = await  articulo.findOne({sap:p.sap,status:true,categoria: {
            $ne: "repuesto"
          }})
              
           
           
            if(ar){
              if(ar.status){
                list.push({sap:ar.sap,categoria:ar.categoria,promo:ar.promo,precio:ar.precio,descripcion:p.descripcion,marca:ar.marca,familia:ar.familia,view:true})
            }
          }
           
        }
        
      
        
           res.json({valor:list,n:cand})

            }catch(err){
              console.log(err,"162")
              res.json([])
            }
            })
            //descrip producto
            router.get('/list_desr/:desp/:inicio/:fin',  async (req,res)=>{

              try{
                       //descripcion para la busqueda
          /*{descripcion: { $regex: '.*' +  + '.*' } }  */
          let descrip = req.params.desp
         
          let list = [];
        let cand = await Producto.find( {linea:"repuesto" ,descripcion: { $regex: '.*' + descrip + '.*' } }).count()
        
          let prod = await  Producto.find( {linea:"repuesto" ,descripcion: { $regex: '.*' + descrip + '.*' } }).skip(req.params.inicio).limit(req.params.fin)
   
          for( let p of prod ){
 
            let ar = await  articulo.findOne({sap:p.sap,categoria:'repuesto'})
           
             
              if(ar){
               
                  list.push({sap:ar.sap,categoria:ar.categoria,promo:ar.promo,precio:ar.precio,descripcion:p.descripcion,marca:ar.marca,familia:ar.familia,view:true})
              
            }
             
          }
          
        
          
             res.json({valor:list,n:cand})
  
              }catch(err){
                console.log(err,"162")
                res.json([])
              }
              })
            router.get('/list_marca/:desp/:inicio/:fin',  async (req,res)=>{

              try{
                       //descripcion para la busqueda
          /*{descripcion: { $regex: '.*' +  + '.*' } }  */
          let descrip = req.params.desp
          
          let list = [];
        let cand =   await  articulo.find({marca:descrip,status:true,categoria: {
          $ne: "repuesto"
        }}).count()
          let ar = await  articulo.find({marca:descrip,status:true,categoria: {
            $ne: "repuesto"
          }}).skip(req.params.inicio).limit(req.params.fin)
      
          for( let p of ar ){ 
            let prod = await  Producto.findOne({sap:p.sap})
                
             
             
              if(prod){
                list.push({sap:p.sap,promo:p.promo, categoria:p.categoria,precio:p.precio,descripcion:prod.descripcion,marca:p.marca,familia:p.familia,view:true})
            }
             
          }
         
             res.json({valor:list,cand:cand})
  
              }catch(err){
                console.log(err,"162")
                res.json([])
              }
              })
            router.get('/list_linea/:desp/:inicio/:fin',  async (req,res)=>{

              try{
                       //descripcion para la busqueda
          /*{descripcion: { $regex: '.*' +  + '.*' } }  */
          let descrip = req.params.desp
          
          let list = [];
        let cand =   await  articulo.find({familia:descrip,status:true}).count()
          let ar = await  articulo.find({familia:descrip,status:true}).skip(req.params.inicio).limit(req.params.fin)
      
          for( let p of ar ){ 
            let prod = await  Producto.findOne({sap:p.sap})
                
             
             
              if(prod){
                list.push({sap:p.sap,promo:p.promo, categoria:p.categoria,precio:p.precio,descripcion:prod.descripcion,marca:p.marca,familia:p.familia,view:true})
            }
             
          }
         
             res.json({valor:list,cand:cand})
  
              }catch(err){
                console.log(err,"162")
                res.json([])
              }
              })
      
//194 listado por categoria
      router.get('/list/:categoria/:incio/:fin',  async (req,res)=>{
      try{
        let list = [];
        let cand = await  articulo.find({status:true,categoria:req.params.categoria}).count()
        let val = await  articulo.find({status:true,categoria:req.params.categoria}).limit(req.params.fin).skip(req.params.inicio)
        for( let articulo of val ){
        
            let ar = await  Producto.findOne({sap:articulo.sap})

            if(ar){
              
              list.push({sap:articulo.sap,categoria:articulo.categoria,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,promo:articulo.promo,familia:articulo.familia,view:true})
            }
          
           
        }
          
           res.json({valor:list,n:cand})
      }catch(err){
        console.log(err,"194")
        res.json({})
      }
            })
//214 listado de articulos completo
      router.get('/lists',  async (req,res)=>{
 try{
  let list = [];
  let val = await  articulo.find( {status:true} )
  for( let articulo of val ){
    if(articulo.status){
      let ar = await  Producto.findOne({sap:articulo.sap})
      if(ar){
        list.push({sap:articulo.sap,categoria:articulo.categoria,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,promo:articulo.promo,familia:articulo.familia,view:true})
      }
    }
     
  }
    
     res.json(list)
 }catch(err){
  console.log(err,"214")
  res.json({})
 }
            })
           
       
 
//237 optiene informacion del [producto ]
router.get('/getproducto/:sap',  async (req,res)=>{

 
try{
  if(!req.params.sap){
    res.json({sap:"LD-0000000",categoria:'',precio:'0',promo:false,descripcion:"ARTICULO NO EXISTE",marca:'',familia:'',view:false})
   }

  let articulos = await  articulo.findOne({sap:req.params.sap})
 
 if(!articulos){
  console.log(articulos, "no existe")
 return res.json({sap:"LD-0000000",categoria:'',precio:'0',promo:false,descripcion:"ARTICULO NO EXISTE",marca:'',familia:'',view:false})
 }
  let ar = await  Producto.findOne({sap:req.params.sap})
  
  return  res.json({sap:articulos.sap,categoria:articulos.categoria,precio:articulos.precio,promo:articulo.promo,descripcion:ar.descripcion,marca:articulos.marca,familia:articulos.familia,view:true})
    
}catch(err){
  console.log(err,'237')
  res.json({})
}
  })

module.exports = router;