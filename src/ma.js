

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    
    data() {
        return {
          dialog:false,
          marcas:null,
          marca:[
            
          ],
          Iespecial:false,
        vista:{
          terminoC:true,
          garantia:false,
          pregunta:false
        },
        preguntas:[
          { 
            pregunta:"¿Dónde puedo acudir para activar una garantía?            ",
            repuesta:"En cualquiera de nuestras sucursales a nivel nacional, a partir de las 8:00 am hasta el cierre de la tienda, cualquier día del año o por vía WhatsApp: 0424-4624218, marcando de seguidas la opción 2 (Garantía, Envío gratis,  Servicio de instalación o Servicio Técnico)"
        },
        { 
          pregunta:"¿Cómo puedo activar la garantía de mi producto instalado?          ",
          repuesta:"En caso de productos ya instalados de linea blanca (empotrados, tuberías y kit de conexión y/o que sean de gran Volumen) usted puede comunicarse vía WhatsApp: 0424-4624218 y de seguida marque la opción 2 (Garantía, Envío gratis,  Servicio de instalación o Servicio Técnico). En este caso, nuestro horario de atención es de lunes a viernes de 8:00 am a 5:00 pm, por lo que usted será contactado dentro de un plazo no mayor 72 horas  para que uno de nuestros servicios técnicos acuda al lugar donde se encuentra el producto y proceda a realizar el diagnostico correspondiente"  },
      { 
        pregunta:"¿En cuánto tiempo tengo respuesta sobre mi caso?        ",
        repuesta:"Una vez consignado el producto en nuestras tiendas físicas, Tiendas Daka tiene un tiempo estimado de cuatro (4) a cinco (5) días hábiles para dar respuesta."
    },
    {
      pregunta:"¿Mi producto de Venta Especial (producto reacondicionado o con detalle) tiene cambio inmediato?      ",
      repuesta:"Los productos de Venta Especial poseen Garantía Daka por el tiempo que indica la factura, siendo remitidos al servicio técnico. Estos casos no procede el cambio inmediato.       "
    },
    {
      pregunta:"¿Qué debo conservar mientras la garantía se encuentra vigente?      ",
      repuesta:"Factura de compra Original ,    Caja del producto en buen estado (aplica para línea hogar, marrón y digital) y Accesorios partes y piezas.       "
    },
    {
      pregunta:"Nuestro único nombre oficial en redes sociales ",
      repuesta:"@tiendasdaka"
    }
            
        ],
          TerminoYCondiciones:[
            {
              nombre:"Mercancía de Venta Ordinaria",
              imagen:"img/MD/normal.png",
              status:false
            },
            {
              nombre:"Mercancía de Venta Especial",
              imagen:"img/MD/especial.jpg",
              status:false
            }
           
          ],
          vista1:'card1',
          model: null,
        }

    },
    computed: {
      

    },

    async mounted() {
      let marca = await fetch('/producto/marca')
      marca = await marca.json()
    console.log(marca[45])
    this.marca = marca
     document.getElementById('loading').style.display = "none" 
     
    this.dialog = true;
  },


    methods: {
      Activ(a){
        console.log('corrio ',a)
for (let clave in this.vista){
  this.vista[clave] = false
}
console.log(this.vista)
this.vista[a]= true ;
this.TerminoYCondiciones[0].status = false
this.TerminoYCondiciones[1].status = false
console.log(this.vista)
      },
      eclick(a,b){
        a()
      if(b.status){
        console.log(b.status)
        
        b.status =  false
        console.log(b.status)
      }else{
        console.log(b.status)
        this.TerminoYCondiciones.forEach((item) => item.status = false );
        b.status =  true
        console.log(b.status)
      }
        
      }
        
    },

})
