<template>
        <v-app >
      <v-main>
     
        <v-app-bar
        style="position: sticky;"
                        dense
                        
                          color="#FFDD00"
                          elevate-on-scroll
                          shrink-on-scroll
                          fade-img-on-scroll
                          src="/img/banner/2.png"
                          prominent
                          scroll-target="#scrolling-techniques-3"
                        >
                          <template v-slot:img="{ props }">
                            <v-img
                            contain
                              v-bind="props"
                             
                            ></v-img>
                          </template>
                    
                          
                    
                          <v-app-bar-title>Tiendas Daka </v-app-bar-title>
                    
                          <v-spacer></v-spacer>
                    
                       
                         <v-btn  @click.stop="drawer = !drawer" icon>
                            <v-badge
                            :value="carrito.length > 0"
                            overlap
                          color="green"
                          :content="carrito.length"
                        >
                            <v-icon>mdi-cart</v-icon>
                            </v-badge>
                          </v-btn>
                        
                
                       

                          <template v-slot:extension>
                           
                            <v-tabs align-with-title>
                              
                              <v-tab  @click="filtro()">Catalogo</v-tab>
                              <v-tab @click="menuSelect('PROMO')">PROMO</v-tab>
                              <v-tab  @click="openModal('quienes')">Ubicanos </v-tab>
                              <v-tab  @click="openModal('servicio')">Servicios</v-tab>

                              <v-spacer></v-spacer> <v-spacer></v-spacer>
                              
                                <v-text-field block width="50px" v-model="buscador"  @keydown="filtro()" black filled label="Que te gustaria comprar?" background-color="whiter"   append-icon="mdi-magnify"></v-text-field>
                            </v-tabs>
                          </template>
                          
                        </v-app-bar>

                        <v-app-bar
                          v-if="buscador !=''" 
                          color="#143E8F"
                          dense
                          dark
                        >
                         
                    
                        
                    
                          <v-btn v-for="(item,i) in menus" @click="menuSelect(item)" plain>
                             {{item}}
                          </v-btn>
                    
                          
                          <v-spacer></v-spacer>
                        </v-app-bar>

   <v-sheet
                    id="scrolling-techniques-3"
                    class="overflow-y-auto"
                    max-height="1080"
                  >
        <v-container fluid >
        
                   
                        
                        <v-row>
                   
            
                <v-col cols="12">
                 
                      <v-row>
                                            
    <v-navigation-drawer
    right
    app
    v-model="drawer"
    
    bottom
    temporary
    
    
    fixed
   
    
    
    
  >
    <v-list
      nav
      dense
    >
      <v-list-item-group
  
        active-class="deep-purple--text text--accent-4"
      >
     
        <v-list-item
        v-for="articulo of carrito"
      >
        <v-list-item-avatar>
          <v-img   :src="'img/producto/'+articulo.sap+'.jpg'"></v-img>
        </v-list-item-avatar>
      
        <v-list-item-content>
          <v-list-item-title v-html="articulo.descripcion"></v-list-item-title>
          <v-list-item-subtitle v-html="articulo.precio"></v-list-item-subtitle>
       
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon @click="RemoveCarrito(articulo)"  >
            mdi-delete
        </v-icon>
        </v-list-item-icon>
      </v-list-item>
      total:{{totalCarro}} $
      <v-btn
  block
  
  outlined
  rounded
  @click="SendWhs"
> COMPRAR</v-btn>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
               
  <v-col v-if="buscador ==''" cols="12">
    <v-carousel height="300" hide-delimiters>
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          contain
        ></v-carousel-item>
      </v-carousel>
    
</v-col>
<v-col cols="12">
    <v-row>
          
 
       
       
        
   
        
            
      
    </v-row>
</v-col>
                           
                        
                      </v-row>
               
                      
                  
                
                </v-col>
            </v-row>
        </v-container> 
     </v-sheet>
      </v-main>
    </v-app>
</template>
<script>
 export default {
     
   
     
     data() {
   return {
     modal:{
      servicios:false,
      quienes:false
     },
     zoom: 2,
     servicios:[
     {
       nombre:"Instalacion",
     },
     {
       nombre:"Tecnico",
     },
     {
       nombre:"Garantia",
     },
     {
       nombre:"Envio Gratis",
     }
     ],
     map: null,
     tileLayer: null,
     layers: [],
       carrito:[],
       menus: [
        
       ],
       items: [
         {
           src: 'img/banner/1.png',
         },
      
         {
           src: 'img/banner/4.png',
         },
         {
           src: 'img/banner/5.png',
         },
     
       ],
       articulos:[],
       buscador:'',
       drawer: false,
   }
 
 },
 computed:{
   totalCarro: function (){
       let total = 0 ;
       this.carrito.forEach( (item) => {
           total = total + item.precio;
       })
       return total
   }

 },

async mounted() {
   let that = this;
   /*

   
   window.addEventListener('load', function() {
      
       that.initLayers();
   });*/

 document.body.onload = function() {
   let loading = document.getElementById('loads')

   loading.setAttribute("class", "hides");
}
 
    let res = await fetch('/producto/list')
    res = await res.json()
  this.articulos = res
   }, 
 
  
     methods: {
       openModal(a){
          
           if(a == 'quienes'){
               this.modal.quienes = true
           
           }else{
               this.modal.servicios = true
           }
       },
       colorPromo(a){
         if(a=='PROMO'){
           return "#143E8F"
         }
       },
       SendWhs(){
           let total = 'lista:' ;
       this.carrito.forEach( (item) => {
           total = total +" - "+ item.sap;
       })
           
           let msm = 'https://api.whatsapp.com/send/?phone=584160289275&text='+total +'&type=phone_number&app_absent=0'
           location.href = msm
       },
       menuSelect(a){
         this.articulos.forEach(element => {
           if(element.familia == a){
             element.view = true;
           }else{
             element.view = false;
           }
         })
       },
       filtro(a){
         let categoria = [];
           this.articulos.forEach(element => {
             
               if(element.descripcion.search(this.buscador.toUpperCase()) == -1){
                 
                   element.view = false;
               }else{
                 categoria.push(element.familia)
                   element.view = true;
               }
               let result = categoria.filter((item,index)=>{
   return categoria.indexOf(item) === index;
 })
 this.menus = result
           });
           
       },
       RemoveCarrito(articulo){
           articulo['carrito'] = false;
           var index =  this.carrito.findIndex(e => e == articulo);
           if(index == 0){
             this.carrito = [];
             return;
           }
          this.carrito.splice(index,index);
           console.log(index)
       },
       addCarrito(articulo){
           articulo['carrito'] = true;
           this.carrito.push(articulo)
       },
   async getinfo(articulo,tipo){
      
       let res = await fetch('/producto/getproducto/'+articulo.sap)
     
       res = await res.json()
       articulo[tipo] = await res[tipo];
      return articulo[tipo]
    }
     }, 
 }
</script>