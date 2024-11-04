
//import ubicanos from './component/ubicanos.vue'
/*import {Feature, Map, Overlay, View} from 'ol/index.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Point} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {useGeographic} from 'ol/proj.js';
import {Circle, Fill, Style} from 'ol/style.js';
*/
//import App from './App.vue'
import StadiaMaps from 'ol/source/StadiaMaps.js';

new Vue({
  el: '#app',
  vuetify: new Vuetify(),

  data() {
    return {
      modal: {
        servicios: false,
        quienes: false,
        producto: false
      },
      prueba:false,
      datosG: {
        estado: null,
        municipio: null,
        parroquia: null,
      },
      marca: [
        "ANKER",
        "BREMEN",
        "DAEWOO",
        "HAMILTON BEACH",
        "HYUNDAI",
        "KITCHENAID",
        "LG",
        "OSTER",
        "RIBELLE",
        "SAMSUNG",
        "WHIRLPOOL",
        "XIAOMI"
      ],
      model: null,
      carouselHeight: '500px',
      Carrusel1: [

        {
          src: '../img/banner/slite/1.webp',
        },
        {
          src: '../img/banner/slite/2.webp',
        },
        {
          src: '../img/banner/slite/3.webp',
        },

      ],
      pag: {
        cant: 0,
        inicio: 0,
        ruta: '/producto/list',
        fin: 0,
        actual: 1,

      },
      zoom: 2,
      MenuCategoria: [
        {
          titulo: "HOGAR",
          Nombre: "Linea Hogar",
          producto: ["LH-00000006"]
        },
        {
          titulo: "ELECTRODOMÉSTICOS",
          Nombre: "Linea Blanca",
          producto: ["LB-00000001"]
        },
        {
          titulo: "TV - AUDIO",
          Nombre: "Linea Marron",
          producto: ["LM-00000023"]
        },
        {
          titulo: "TECNOLOGÍA",
          Nombre: "Linea Digital",
          producto: ["LD-00000027"]
        },




      ],
      comprar: false,
      titulo: '',
      init: false,
      servicios: [
        {
          nombre: "Instalacion",
          url: "../video/intalacion.mp4",
          ico: "mdi-tools"
        },
        {
          nombre: " Servicio Tecnico",
          url: "../video/gg.mp4",
          ico: "mdi-cube-send"
        },
        {
          nombre: "Garantia",
          url: "../video/garantia.mp4",
          ico: "mdi-ballot-recount"
        },
        {
          nombre: "Envio Gratis",
          url: "../video/envio.mp4",
          ico: "mdi-van-utility"
        }
      ],
      catselect: '',
      parati: [

      ],
      Pdestacado: [
        { sap: 'LB-00000478' },
        { sap: 'LB-00001048' },
        { sap: "LB-00000632" },
        { sap: 'LB-00000972' }
      ],
      categoria: [
       
      ],
      videoP: "video/servicio1.mp4",
      map: null,
      cliente: {
        nombre: '',
        cedula: '',
        estado: '',
        municipio: '',
        parroquia: '',
        direccion: ''
      },
      metodoSelect: '',
      banner: true,
      dirtienda: [],
      modelProd: null,
      metodos: ["Delivery", "Retiro En tienda"],
      tiendas: [],
      tileLayer: null,
      layers: [],
      carrito: [],
      menus: [

      ],
      icons: [
        {
          url: "https://www.instagram.com/tiendasdaka/",
          ico: 'mdi-instagram',
        },
        {
          url: "https://www.facebook.com/TiendasDakaOficial",
          ico: 'mdi-facebook',
        },
        {
          url: "https://x.com/tiendasdaka?mx=2",
          ico: 'mdi-twitter',
        },
        {
          url: "https://www.tiktok.com/@tiendasdaka",
          ico: 'mdi-music-note',
        },

      ],
      items: [
        {
          src: 'img/banner/1.webp',
        },

        {
          src: 'img/banner/4.webp',
        },
        {
          src: 'img/banner/5.webp',
        },

      ],
      articulos: [],
      articulosR: [],
      stop: true,
      categoriaico: {},
      buscador: '',
      canvas:null,
      ctx:null,
      drawer: false,
    }

  },
  computed: {

    totalCarro: function () {
      let total = 0;
      this.carrito.forEach((item) => {
        total = total + item.precio;
      })
      return total
    }

  },


  async mounted() {
   this.getproducto()
 

   
    this.updateCarouselHeight();
    window.addEventListener('resize', this.updateCarouselHeight);

    //this.ProductoDestacado()
   // this.productoparati()
    //this.ProductoLinea()
    this.getTiendas()
    this.getstado()
    let that = this;




    /*
 
    
    window.addEventListener('load', function() {
       
        that.initLayers();
    });*/
  
        that.insertarCanvas("paginas",5)
        that.canvas = document.getElementById("canvas1");
        that.ctx =  this.canvas.getContext("2d");
        let canvas = []
        canvas[0] = document.getElementById("canvas2");
        let ctx = []
        ctx[0] = canvas[0].getContext("2d")
    document.body.onload = function () {
      let loading = document.getElementById('loads')
      setTimeout(function () {
        loading.setAttribute("class", "hides");
      
console.log( that.articulos.length)
        that.draw(that.ctx);
        var valor = that.articulos.slice(16, that.articulos.length);
      
        let inicio = 16 , fin = 40 ;
   
        for (let i = 0; i < 4; i++) { 
          
          canvas[i] = document.getElementById("canvas"+(i+2));
          ctx[i]    = canvas[i].getContext("2d")
          var valor = that.articulos.slice(inicio, fin);
          inicio = inicio + 24
          fin = fin + 24 
           that.hoja(ctx[i], valor); 
          }
      }, "2000")
    //  

    }
 
    
  },

  methods: {
     insertarCanvas(divId,total) {
      // Obtén el div por su id
      var div = document.getElementById(divId);
      
      // Crea y añade tres elementos canvas
      for (var i = 0; i < total; i++) {

          var canvas = document.createElement('canvas');
          canvas.id = 'canvas'+(i+1)
          canvas.width = 630;  // Ajusta el ancho del canvas
          canvas.height = 853; // Ajusta la altura del canvas
          //canvas.style.border = '1px solid black'; // Opcional: agrega un borde para ver el canvas
          div.appendChild(canvas);
      }
  },
  
  // Usa la función pasando el id del div
  
  
    print(){
      const canvas = document.getElementById('canvas1');
      const canvas2 = document.getElementById('canvas2');
      const dataURL = canvas.toDataURL('image/png');
      const dataURL2 = canvas2.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Canvas</title>
            <style>
              @page { size: letter; margin: 0; }
          
            </style>
          </head>
          <body>
            <div class="print-container">
              <img width= "1700" src="${dataURL}" />
              <img width= "1700" src="${dataURL2}" />
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
      };
      
  
    },
     wrapText(context, text, x, y, maxWidth, lineHeight) 
     { const words = text.split(' '); let line = '';
       let yPosition = y;
        for (let i = 0; i < words.length; i++) 
          { const testLine = line + words[i] + ' ';
             const metrics = context.measureText(testLine); 
             const testWidth = metrics.width;
              if (testWidth > maxWidth && i > 0) { context.fillText(line, x, yPosition);
                 line = words[i] + ' ';
                  yPosition += lineHeight;
                 } else { 
                  line = testLine;

                  } } 
                  context.fillText(line, x, yPosition);
                 },
    draw(ctx) {

      // capa1/Recortar grupo
      ctx.save();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(79.7, 381.9);
      ctx.lineTo(134.2, 381.9);
      ctx.lineTo(134.2, 314.3);
      ctx.lineTo(79.7, 314.3);
      ctx.lineTo(79.7, 381.9);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(79.7, 381.9);
      ctx.lineTo(134.2, 381.9);
      ctx.lineTo(134.2, 314.3);
      ctx.lineTo(79.7, 314.3);
      ctx.lineTo(79.7, 381.9);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      
      ctx.drawImage(document.getElementById("image-"+this.articulos[0].sap), 79.7, 314.3,54,69);

      // capa1/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(201.3, 381.9);
      ctx.lineTo(255.8, 381.9);
      ctx.lineTo(255.8, 314.3);
      ctx.lineTo(201.3, 314.3);
      ctx.lineTo(201.3, 381.9);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[1].sap), 201.3, 314.3, 54,69);

      // capa1/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(359.2, 381.9);
      ctx.lineTo(413.8, 381.9);
      ctx.lineTo(413.8, 314.3);
      ctx.lineTo(359.2, 314.3);
      ctx.lineTo(359.2, 381.9);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(359.2, 381.9);
      ctx.lineTo(413.8, 381.9);
      ctx.lineTo(413.8, 314.3);
      ctx.lineTo(359.2, 314.3);
      ctx.lineTo(359.2, 381.9);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[2].sap), 359.2, 314.3,54,69);

      // capa1/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(489.1, 381.9);
      ctx.lineTo(543.6, 381.9);
      ctx.lineTo(543.6, 314.3);
      ctx.lineTo(489.1, 314.3);
      ctx.lineTo(489.1, 381.9);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(489.1, 381.9);
      ctx.lineTo(543.6, 381.9);
      ctx.lineTo(543.6, 314.3);
      ctx.lineTo(489.1, 314.3);
      ctx.lineTo(489.1, 381.9);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[3].sap), 489.1, 314.3,54,69);

      // capa1/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(79.7, 503.3);
      ctx.lineTo(134.2, 503.3);
      ctx.lineTo(134.2, 435.6);
      ctx.lineTo(79.7, 435.6);
      ctx.lineTo(79.7, 503.3);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(79.7, 503.3);
      ctx.lineTo(134.2, 503.3);
      ctx.lineTo(134.2, 435.6);
      ctx.lineTo(79.7, 435.6);
      ctx.lineTo(79.7, 503.3);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[4].sap), 79.7, 435.6,54,69);

      // capa1/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(201.3, 503.3);
      ctx.lineTo(255.8, 503.3);
      ctx.lineTo(255.8, 435.6);
      ctx.lineTo(201.3, 435.6);
      ctx.lineTo(201.3, 503.3);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[5].sap), 201.3, 435.6,54,69);

      // capa1/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(359.2, 503.3);
      ctx.lineTo(413.8, 503.3);
      ctx.lineTo(413.8, 435.6);
      ctx.lineTo(359.2, 435.6);
      ctx.lineTo(359.2, 503.3);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(359.2, 503.3);
      ctx.lineTo(413.8, 503.3);
      ctx.lineTo(413.8, 435.6);
      ctx.lineTo(359.2, 435.6);
      ctx.lineTo(359.2, 503.3);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[6].sap), 359.2, 435.6,54,69);

      // capa1/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(489.1, 503.3);
      ctx.lineTo(543.6, 503.3);
      ctx.lineTo(543.6, 435.6);
      ctx.lineTo(489.1, 435.6);
      ctx.lineTo(489.1, 503.3);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(489.1, 503.3);
      ctx.lineTo(543.6, 503.3);
      ctx.lineTo(543.6, 435.6);
      ctx.lineTo(489.1, 435.6);
      ctx.lineTo(489.1, 503.3);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[7].sap), 489.1, 435.6,54,69);

      // capa1/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(79.7, 624.7);
      ctx.lineTo(134.2, 624.7);
      ctx.lineTo(134.2, 557.0);
      ctx.lineTo(79.7, 557.0);
      ctx.lineTo(79.7, 624.7);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(79.7, 624.7);
      ctx.lineTo(134.2, 624.7);
      ctx.lineTo(134.2, 557.0);
      ctx.lineTo(79.7, 557.0);
      ctx.lineTo(79.7, 624.7);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[8].sap), 79.7, 557.0,54,69);

      // capa1/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(201.3, 624.7);
      ctx.lineTo(255.8, 624.7);
      ctx.lineTo(255.8, 557.0);
      ctx.lineTo(201.3, 557.0);
      ctx.lineTo(201.3, 624.7);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[9].sap), 201.3, 557.0,54,69);

      // capa1/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(359.2, 624.7);
      ctx.lineTo(413.8, 624.7);
      ctx.lineTo(413.8, 557.0);
      ctx.lineTo(359.2, 557.0);
      ctx.lineTo(359.2, 624.7);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(359.2, 624.7);
      ctx.lineTo(413.8, 624.7);
      ctx.lineTo(413.8, 557.0);
      ctx.lineTo(359.2, 557.0);
      ctx.lineTo(359.2, 624.7);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[10].sap), 359.2, 557.0,54,69);

      // capa1/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(489.1, 624.7);
      ctx.lineTo(543.6, 624.7);
      ctx.lineTo(543.6, 557.0);
      ctx.lineTo(489.1, 557.0);
      ctx.lineTo(489.1, 624.7);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(489.1, 624.7);
      ctx.lineTo(543.6, 624.7);
      ctx.lineTo(543.6, 557.0);
      ctx.lineTo(489.1, 557.0);
      ctx.lineTo(489.1, 624.7);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[11].sap), 489.1, 557.0,54,69);

      // capa1/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(79.7, 746.0);
      ctx.lineTo(134.2, 746.0);
      ctx.lineTo(134.2, 678.4);
      ctx.lineTo(79.7, 678.4);
      ctx.lineTo(79.7, 746.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(79.7, 746.0);
      ctx.lineTo(134.2, 746.0);
      ctx.lineTo(134.2, 678.4);
      ctx.lineTo(79.7, 678.4);
      ctx.lineTo(79.7, 746.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[12].sap), 79.7, 678.4,54,69);

      // capa1/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(201.3, 746.0);
      ctx.lineTo(255.8, 746.0);
      ctx.lineTo(255.8, 678.4);
      ctx.lineTo(201.3, 678.4);
      ctx.lineTo(201.3, 746.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[13].sap), 201.3, 678.4,54,69);

      // capa1/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(359.2, 746.0);
      ctx.lineTo(413.8, 746.0);
      ctx.lineTo(413.8, 678.4);
      ctx.lineTo(359.2, 678.4);
      ctx.lineTo(359.2, 746.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(359.2, 746.0);
      ctx.lineTo(413.8, 746.0);
      ctx.lineTo(413.8, 678.4);
      ctx.lineTo(359.2, 678.4);
      ctx.lineTo(359.2, 746.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[14].sap), 359.2, 678.4,54,69);

      // capa1/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(489.1, 746.0);
      ctx.lineTo(543.6, 746.0);
      ctx.lineTo(543.6, 678.4);
      ctx.lineTo(489.1, 678.4);
      ctx.lineTo(489.1, 746.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(489.1, 746.0);
      ctx.lineTo(543.6, 746.0);
      ctx.lineTo(543.6, 678.4);
      ctx.lineTo(489.1, 678.4);
      ctx.lineTo(489.1, 746.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+this.articulos[15].sap), 489.1, 678.4,54,69);

      // capa1/AIRE ACONDICIONADO 
      ctx.restore();
      ctx.restore();
      ctx.font = "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";

      this.wrapText(ctx, this.articulos[3].Dcomercial ,  466.7, 296.2, 125, 13) 
      
      //ctx.fillText(this.articulos[3].Dcomercial,, );

      // capa1/24000 BTU SPLIT 
      //ctx.fillText("24000 BTU SPLIT ", 466.7, 305.2);

      // capa1/INVERTER
      //ctx.fillText("INVERTER", 466.7, 314.2);

      // capa1/1099
       ctx.font = "11px 'Roboto'";
      ctx.fillText("$"+this.articulos[3].precio, 536.5, 385.3);

      // capa1/99
      

      // capa1/VR242CW
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
     // ctx.fillText(this.articulos[3].Modelo, 465.8, 320.8);
    
      // capa1/AIRE ACONDICIONADO
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
      //ctx.fillText("AIRE ACONDICIONADO", 184.2, 417.4);
 this.wrapText(ctx, this.articulos[1].Dcomercial ,  184.2, 417.4, 130, 13) 
      // capa1/24000 BTU SPLIT
      //ctx.fillText("24000 BTU SPLIT", 184.2, 426.4);

      // capa1/549
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$"+this.articulos[1].precio, 261.1, 505.8);

      // capa1/99
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("99", 290.7, 502.1);

      // capa1/HYNA24000SP24SE
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
      //ctx.fillText("HYNA24000SP24SE", 182.1, 433.7);

      // capa1/AIRE ACONDICIONADO
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
      //ctx.fillText("AIRE ACONDICIONADO", 183.8, 296.1);
      this.wrapText(ctx, this.articulos[1].Dcomercial , 183.8, 296.1, 130, 13) 
      // capa1/18000 BTU SPLIT 
      //ctx.fillText("18000 BTU SPLIT ", 183.8, 305.1);

      // capa1/INVERTER 220V 
      //ctx.fillText("INVERTER 220V ", 183.8, 314.1);

      // capa1/880
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$-"+this.articulos[1].precio, 257.5, 385.3);

      // capa1/00
      ctx.font = "UltraItalic 6.6px 'Myriad Pro'";
     // ctx.fillText("00", 289.1, 381.5);

      // capa1/AIRE ACONDICIONADO
      ctx.font =  "7px 'Roboto'";;
      //ctx.fillText("AIRE ACONDICIONADO", 315.1, 296.3);
      this.wrapText(ctx, this.articulos[2].Dcomercial ,  315.1, 296.3, 130, 13) 
      // capa1/3 TON GABINETE 
      //ctx.fillText("3 TON GABINETE ", 315.1, 305.3);

      // capa1/999
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$-"+this.articulos[2].precio, 314.8, 385.3);

      // capa1/99
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
     // ctx.fillText("99", 344.6, 381.6);

      // capa1/HYNA36000GB23 
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
     // ctx.fillText("HYNA36000GB23 ", 313.7, 312.6);

      // capa1/AIRE ACONDICIONADO
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
      //ctx.fillText("AIRE ACONDICIONADO", 32.8, 538.2);
      this.wrapText(ctx, this.articulos[8].Dcomercial ,  32.8, 538.2, 130, 13) 
      // capa1/DE VENTANA 5000 BTU
     // ctx.fillText("DE VENTANA 5000 BTU", 32.8, 547.2);

      // capa1/145
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$-"+this.articulos[8].precio, 32.1, 626.8);
    
      // capa1/00
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("00", 59.5, 623.1);

      // capa1/HYNAV5000P20
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
      //ctx.fillText("HYNAV5000P20", 31.5, 554.8);

      // capa1/AIRE ACONDICIONADO
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
     // ctx.fillText("AIRE ACONDICIONADO", 314.6, 538.3);
      this.wrapText(ctx, this.articulos[10].Dcomercial , 314.6, 538.3 , 130, 13) 
      // capa1/DE VENTANA 8000 BTU 
     // ctx.fillText("DE VENTANA 8000 BTU ", 314.6, 547.4);

      // capa1/200
      ctx.font = "11px 'Roboto'";
      ctx.fillText( "$-"+this.articulos[10].precio, 314.3, 626.8);

      // capa1/00
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("00", 345.1, 623.1);

      // capa1/DA08BWWAC23
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
     // ctx.fillText("DA08BWWAC23", 313.7, 554.8);

      // capa1/AIRE ACONDICIONADO
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
      this.wrapText(ctx, this.articulos[12].Dcomercial ,  33.0, 658.5, 127, 13);

      // capa1/DE VENTANA 12000 BTU
      //ctx.fillText("DE VENTANA 12000 BTU", 33.0, 667.5);

      // capa1/269
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$"+this.articulos[12].precio, 32.4, 747.5);

      // capa1/99
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("99", 62.0, 743.8);

      // capa1/HYNAV12500D20
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
      //ctx.fillText("HYNAV12500D20", 31.7, 675.2);

      // capa1/AIRE ACONDICIONADO
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
      this.wrapText(ctx, this.articulos[15].Dcomercial , 466.2, 658.8, 130, 13);

      // capa1/DE VENTANA 12000 BTU 
      //ctx.fillText("DE VENTANA 12000 BTU ", 466.2, 667.9);

      // capa1/249
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$"+this.articulos[15].precio, 543.0, 747.5);

      // capa1/99
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("99", 572.6, 743.8);

      // capa1/DA12BW2WAC23
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
     // ctx.fillText("DA12BW2WAC23", 465.3, 675.2);

      // capa1/CAFETERA 
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
      this.wrapText(ctx, this.articulos[7].Dcomercial , 465.6, 417.5, 130, 13);

      // capa1/12 TZAS
      //ctx.fillText("12 TZAS", 465.6, 426.5);

      // capa1/25
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$-"+this.articulos[7].precio, 549.9, 505.9);

      // capa1/00
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("00", 572.5, 502.2);

      // capa1/49631
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
     // ctx.fillText("49631", 465.5, 433.7);

      // capa1/COCINA ELECTRICA
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
      this.wrapText(ctx, this.articulos[9].Dcomercial , 182.1, 538.3, 130, 13);

      // capa1/1 HORNILLA
     // ctx.fillText("1 HORNILLA", 182.1, 547.4);

      // capa1/12
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$-"+this.articulos[9].precio, 270.8, 626.8);

      // capa1/99
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("99", 291.1, 623.1);

      // capa1/34106
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
     // ctx.fillText("34106", 182.8, 554.8);

      // capa1/CONGELADOR HORIZONTAL
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
      this.wrapText(ctx, this.articulos[9].Dcomercial , 465.5, 538.3, 130, 13);

      // capa1/CBLANCO
      //ctx.fillText("C/BLANCO", 465.5, 547.4);

      // capa1/209
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$-"+this.articulos[9].precio, 543.3, 626.2);

      // capa1/99
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("99", 573.4, 622.5);

      // capa1/HYN05FH23
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
      //ctx.fillText("HYN05FH23", 465.1, 554.8);

      // capa1/CONGELADOR HORIZONTAL
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
      this.wrapText(ctx, this.articulos[13].Dcomercial , 183.5, 658.8, 130, 13);

      // capa1/CGRIS
      //ctx.fillText("C/GRIS", 183.5, 667.9);

      // capa1/274
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$-"+this.articulos[13].precio, 262.3, 747.5);

      // capa1/99
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("99", 290.8, 743.8);

      // capa1/HYNFH2060S 
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
      //ctx.fillText("HYNFH2060S ", 182.3, 675.1);

      // capa1/AIRE ACONDICIONADO
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
      this.wrapText(ctx, this.articulos[4].Dcomercial ,33.0, 417.4, 127, 13);

      // capa1/12000 BTU SPLIT
      //ctx.fillText("12000 BTU SPLIT", 33.0, 426.4);

      // capa1/279
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$-"+this.articulos[4].precio, 32.7, 505.9);

      // capa1/99
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("99", 61.5, 502.3);

      // capa1/DA12BWSAC23
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
      //ctx.fillText("DA12BWSAC23", 31.8, 433.7);

      // capa1/AIRE ACONDICIONADO
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
      this.wrapText(ctx, this.articulos[6].Dcomercial , 314.2, 417.4, 130, 13);

      // capa1/12000 BTU SPLIT
      //ctx.fillText("12000 BTU SPLIT", 314.2, 426.4);

      // capa1/274
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$"+this.articulos[6].precio, 314.5, 506.0);

      // capa1/99
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("99", 343.1, 502.3);

      // capa1/HYNA12000SP24SE
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
      //ctx.fillText("HYNA12000SP24SE", 313.5, 433.5);

      // capa1/AIRE ACONDICIONADO
      ctx.font =  "7px 'Roboto'";;
      ctx.fillStyle = "rgb(14, 75, 154)";
      this.wrapText(ctx, this.articulos[14].Dcomercial , 315.2, 658.8, 130, 13);

      // capa1/24000 BTU SPLIT
      //ctx.fillText("24000 BTU SPLIT", 315.2, 667.8);

      // capa1/529
      ctx.font = "11px 'Roboto'";
      ctx.fillText("$"+this.articulos[14].precio, 314.4, 747.8);

      // capa1/99
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("99", 343.5, 744.1);

      // capa1/DA24BWSAC23
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
      //ctx.fillText("DA24BWSAC23", 313.7, 675.1);

      // capa1/Trazado
      ctx.beginPath();
      ctx.moveTo(4.4, 269.3);
      ctx.lineTo(616.4, 269.3);
      ctx.lineTo(616.4, 0.0);
      ctx.lineTo(4.4, 0.0);
      ctx.lineTo(4.4, 269.3);
      ctx.closePath();
      ctx.fillStyle = "rgb(255, 220, 13)";
      ctx.fill();

      // capa1/Trazado
      ctx.beginPath();
      ctx.moveTo(4.4, 272.4);
      ctx.lineTo(385.6, 272.4);
      ctx.lineTo(385.6, 267.4);
      ctx.lineTo(4.4, 267.4);
      ctx.lineTo(4.4, 272.4);
      ctx.closePath();
      ctx.fillStyle = "rgb(14, 75, 154)";
      ctx.fill();

      // capa1/Recortar grupo

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(4.4, 0.0);
      ctx.lineTo(616.4, 0.0);
      ctx.lineTo(616.4, 852.8);
      ctx.lineTo(4.4, 852.8);
      ctx.lineTo(4.4, 0.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(362.3, 256.9);
      ctx.lineTo(372.3, 271.8);
      ctx.bezierCurveTo(372.5, 272.2, 373.0, 272.4, 373.5, 272.4);
      ctx.lineTo(619.4, 272.4);
      ctx.lineTo(619.4, 252.4);
      ctx.lineTo(365.9, 252.4);
      ctx.bezierCurveTo(362.9, 252.4, 360.9, 254.8, 362.3, 256.9);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(565.4, 781.0);
      ctx.lineTo(560.8, 785.5);
      ctx.bezierCurveTo(558.0, 787.5, 554.4, 788.6, 550.6, 788.6);
      ctx.lineTo(4.4, 788.6);
      ctx.lineTo(4.4, 852.8);
      ctx.lineTo(619.4, 852.8);
      ctx.lineTo(619.4, 781.0);
      ctx.lineTo(565.4, 781.0);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(619.4, 839.6);
      ctx.lineTo(108.4, 839.6);
      ctx.bezierCurveTo(97.5, 839.6, 87.8, 837.8, 84.3, 835.0);
      ctx.lineTo(52.0, 809.7);
      ctx.bezierCurveTo(46.4, 805.3, 58.6, 800.8, 76.0, 800.8);
      ctx.lineTo(619.4, 800.8);
      ctx.lineTo(619.4, 839.6);
      ctx.closePath();
      ctx.fillStyle = "rgb(255, 220, 13)";
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(156.4, 305.2);
      ctx.lineTo(156.4, 351.5);
      ctx.bezierCurveTo(156.4, 353.6, 158.1, 355.4, 160.2, 355.4);
      ctx.lineTo(163.9, 355.4);
      ctx.lineTo(163.9, 362.1);
      ctx.bezierCurveTo(163.9, 364.9, 163.0, 367.6, 161.3, 369.4);
      ctx.bezierCurveTo(155.2, 376.1, 147.5, 384.6, 142.2, 390.5);
      ctx.bezierCurveTo(140.6, 392.2, 138.5, 393.2, 136.4, 393.2);
      ctx.lineTo(28.1, 393.2);
      ctx.lineTo(28.1, 283.4);
      ctx.lineTo(163.9, 283.4);
      ctx.lineTo(163.9, 301.4);
      ctx.lineTo(160.2, 301.4);
      ctx.bezierCurveTo(158.1, 301.4, 156.4, 303.1, 156.4, 305.2);
      ctx.closePath();
      ctx.strokeStyle = "rgb(14, 75, 154)";
      ctx.stroke();

      // capa1/AIRE ACONDICIONADO
      ctx.restore();
      ctx.font =  "7px 'Roboto'";;
     // ctx.fillText("AIRE ACONDICIONADO", 32.9, 296.4);

      // capa1/5TON PISO TECHO
      //ctx.fillText("5TON PISO TECHO", );
      this.wrapText(ctx, this.articulos[0].Dcomercial , 32.9, 296.4, 130, 13) 
      // capa1/HYNA60000PT19
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 3)";
      //ctx.fillText("HYNA60000PT19", 32.5, 312.6);

      // capa1/1350
      ctx.font = "11px 'Roboto'";
      ctx.fillStyle = "rgb(14, 75, 154)";
      ctx.fillText('$'+this.articulos[0].precio, 32.0, 385.3);

      // capa1/00
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("00", 68.2, 381.6);

      // capa1/Texto
      //ctx.fillText(" ", 76.8, 381.6);

      // capa1/Recortar grupo

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(4.4, 0.0);
      ctx.lineTo(616.4, 0.0);
      ctx.lineTo(616.4, 852.8);
      ctx.lineTo(4.4, 852.8);
      ctx.lineTo(4.4, 0.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(163.9, 304.1);
      ctx.lineTo(163.9, 352.7);
      ctx.lineTo(161.2, 352.7);
      ctx.bezierCurveTo(159.7, 352.7, 158.4, 351.1, 158.4, 349.2);
      ctx.lineTo(158.4, 307.6);
      ctx.bezierCurveTo(158.4, 305.6, 159.7, 304.1, 161.2, 304.1);
      ctx.lineTo(163.9, 304.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(438.0, 305.2);
      ctx.lineTo(438.0, 351.5);
      ctx.bezierCurveTo(438.0, 353.6, 439.8, 355.4, 441.9, 355.4);
      ctx.lineTo(445.6, 355.4);
      ctx.lineTo(445.6, 362.1);
      ctx.bezierCurveTo(445.6, 364.9, 444.6, 367.6, 443.0, 369.4);
      ctx.bezierCurveTo(436.9, 376.1, 429.2, 384.6, 423.9, 390.5);
      ctx.bezierCurveTo(422.3, 392.2, 420.2, 393.2, 418.1, 393.2);
      ctx.lineTo(309.8, 393.2);
      ctx.lineTo(309.8, 283.4);
      ctx.lineTo(445.6, 283.4);
      ctx.lineTo(445.6, 301.4);
      ctx.lineTo(441.9, 301.4);
      ctx.bezierCurveTo(439.8, 301.4, 438.0, 303.1, 438.0, 305.2);
      ctx.closePath();
      ctx.strokeStyle = "rgb(14, 75, 154)";
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(445.6, 304.1);
      ctx.lineTo(445.6, 352.7);
      ctx.lineTo(442.9, 352.7);
      ctx.bezierCurveTo(441.4, 352.7, 440.1, 351.1, 440.1, 349.2);
      ctx.lineTo(440.1, 307.6);
      ctx.bezierCurveTo(440.1, 305.6, 441.4, 304.1, 442.9, 304.1);
      ctx.lineTo(445.6, 304.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(179.0, 305.2);
      ctx.lineTo(179.0, 351.5);
      ctx.bezierCurveTo(179.0, 353.6, 177.3, 355.4, 175.1, 355.4);
      ctx.lineTo(171.4, 355.4);
      ctx.lineTo(171.4, 362.1);
      ctx.bezierCurveTo(171.4, 364.9, 172.4, 367.6, 174.1, 369.4);
      ctx.bezierCurveTo(180.1, 376.1, 187.8, 384.6, 193.2, 390.5);
      ctx.bezierCurveTo(194.8, 392.2, 196.8, 393.2, 198.9, 393.2);
      ctx.lineTo(307.3, 393.2);
      ctx.lineTo(307.3, 283.4);
      ctx.lineTo(171.4, 283.4);
      ctx.lineTo(171.4, 301.4);
      ctx.lineTo(175.1, 301.4);
      ctx.bezierCurveTo(177.3, 301.4, 179.0, 303.1, 179.0, 305.2);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(171.5, 304.1);
      ctx.lineTo(171.5, 352.7);
      ctx.lineTo(174.1, 352.7);
      ctx.bezierCurveTo(175.7, 352.7, 176.9, 351.1, 176.9, 349.2);
      ctx.lineTo(176.9, 307.6);
      ctx.bezierCurveTo(176.9, 305.6, 175.7, 304.1, 174.1, 304.1);
      ctx.lineTo(171.5, 304.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(461.9, 305.2);
      ctx.lineTo(461.9, 351.5);
      ctx.bezierCurveTo(461.9, 353.6, 460.2, 355.4, 458.0, 355.4);
      ctx.lineTo(454.3, 355.4);
      ctx.lineTo(454.3, 362.1);
      ctx.bezierCurveTo(454.3, 364.9, 455.3, 367.6, 457.0, 369.4);
      ctx.bezierCurveTo(463.0, 376.1, 470.7, 384.6, 476.1, 390.5);
      ctx.bezierCurveTo(477.7, 392.2, 479.7, 393.2, 481.8, 393.2);
      ctx.lineTo(590.2, 393.2);
      ctx.lineTo(590.2, 283.4);
      ctx.lineTo(454.3, 283.4);
      ctx.lineTo(454.3, 301.4);
      ctx.lineTo(458.0, 301.4);
      ctx.bezierCurveTo(460.2, 301.4, 461.9, 303.1, 461.9, 305.2);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(454.3, 304.1);
      ctx.lineTo(454.3, 352.7);
      ctx.lineTo(457.0, 352.7);
      ctx.bezierCurveTo(458.6, 352.7, 459.8, 351.1, 459.8, 349.2);
      ctx.lineTo(459.8, 307.6);
      ctx.bezierCurveTo(459.8, 305.6, 458.6, 304.1, 457.0, 304.1);
      ctx.lineTo(454.3, 304.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(156.4, 426.1);
      ctx.lineTo(156.4, 472.3);
      ctx.bezierCurveTo(156.4, 474.5, 158.1, 476.2, 160.2, 476.2);
      ctx.lineTo(163.9, 476.2);
      ctx.lineTo(163.9, 482.9);
      ctx.bezierCurveTo(163.9, 485.7, 163.0, 488.4, 161.3, 490.2);
      ctx.bezierCurveTo(155.2, 496.9, 147.5, 505.4, 142.2, 511.3);
      ctx.bezierCurveTo(140.6, 513.1, 138.5, 514.0, 136.4, 514.0);
      ctx.lineTo(28.1, 514.0);
      ctx.lineTo(28.1, 404.2);
      ctx.lineTo(163.9, 404.2);
      ctx.lineTo(163.9, 422.2);
      ctx.lineTo(160.2, 422.2);
      ctx.bezierCurveTo(158.1, 422.2, 156.4, 423.9, 156.4, 426.1);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(163.9, 424.9);
      ctx.lineTo(163.9, 473.5);
      ctx.lineTo(161.2, 473.5);
      ctx.bezierCurveTo(159.7, 473.5, 158.4, 471.9, 158.4, 470.0);
      ctx.lineTo(158.4, 428.4);
      ctx.bezierCurveTo(158.4, 426.5, 159.7, 424.9, 161.2, 424.9);
      ctx.lineTo(163.9, 424.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(438.0, 426.1);
      ctx.lineTo(438.0, 472.3);
      ctx.bezierCurveTo(438.0, 474.5, 439.8, 476.2, 441.9, 476.2);
      ctx.lineTo(445.6, 476.2);
      ctx.lineTo(445.6, 482.9);
      ctx.bezierCurveTo(445.6, 485.7, 444.6, 488.4, 443.0, 490.2);
      ctx.bezierCurveTo(436.9, 496.9, 429.2, 505.4, 423.9, 511.3);
      ctx.bezierCurveTo(422.3, 513.1, 420.2, 514.0, 418.1, 514.0);
      ctx.lineTo(309.8, 514.0);
      ctx.lineTo(309.8, 404.2);
      ctx.lineTo(445.6, 404.2);
      ctx.lineTo(445.6, 422.2);
      ctx.lineTo(441.9, 422.2);
      ctx.bezierCurveTo(439.8, 422.2, 438.0, 423.9, 438.0, 426.1);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(445.6, 424.9);
      ctx.lineTo(445.6, 473.5);
      ctx.lineTo(442.9, 473.5);
      ctx.bezierCurveTo(441.4, 473.5, 440.1, 471.9, 440.1, 470.0);
      ctx.lineTo(440.1, 428.4);
      ctx.bezierCurveTo(440.1, 426.5, 441.4, 424.9, 442.9, 424.9);
      ctx.lineTo(445.6, 424.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(179.0, 426.1);
      ctx.lineTo(179.0, 472.3);
      ctx.bezierCurveTo(179.0, 474.5, 177.3, 476.2, 175.1, 476.2);
      ctx.lineTo(171.4, 476.2);
      ctx.lineTo(171.4, 482.9);
      ctx.bezierCurveTo(171.4, 485.7, 172.4, 488.4, 174.1, 490.2);
      ctx.bezierCurveTo(180.1, 496.9, 187.8, 505.4, 193.2, 511.3);
      ctx.bezierCurveTo(194.8, 513.1, 196.8, 514.0, 198.9, 514.0);
      ctx.lineTo(307.3, 514.0);
      ctx.lineTo(307.3, 404.2);
      ctx.lineTo(171.4, 404.2);
      ctx.lineTo(171.4, 422.2);
      ctx.lineTo(175.1, 422.2);
      ctx.bezierCurveTo(177.3, 422.2, 179.0, 423.9, 179.0, 426.1);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(171.5, 424.9);
      ctx.lineTo(171.5, 473.5);
      ctx.lineTo(174.1, 473.5);
      ctx.bezierCurveTo(175.7, 473.5, 176.9, 471.9, 176.9, 470.0);
      ctx.lineTo(176.9, 428.4);
      ctx.bezierCurveTo(176.9, 426.5, 175.7, 424.9, 174.1, 424.9);
      ctx.lineTo(171.5, 424.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(461.9, 426.1);
      ctx.lineTo(461.9, 472.3);
      ctx.bezierCurveTo(461.9, 474.5, 460.2, 476.2, 458.0, 476.2);
      ctx.lineTo(454.3, 476.2);
      ctx.lineTo(454.3, 482.9);
      ctx.bezierCurveTo(454.3, 485.7, 455.3, 488.4, 457.0, 490.2);
      ctx.bezierCurveTo(463.0, 496.9, 470.7, 505.4, 476.1, 511.3);
      ctx.bezierCurveTo(477.7, 513.1, 479.7, 514.0, 481.8, 514.0);
      ctx.lineTo(590.2, 514.0);
      ctx.lineTo(590.2, 404.2);
      ctx.lineTo(454.3, 404.2);
      ctx.lineTo(454.3, 422.2);
      ctx.lineTo(458.0, 422.2);
      ctx.bezierCurveTo(460.2, 422.2, 461.9, 423.9, 461.9, 426.1);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(454.3, 424.9);
      ctx.lineTo(454.3, 473.5);
      ctx.lineTo(457.0, 473.5);
      ctx.bezierCurveTo(458.6, 473.5, 459.8, 471.9, 459.8, 470.0);
      ctx.lineTo(459.8, 428.4);
      ctx.bezierCurveTo(459.8, 426.5, 458.6, 424.9, 457.0, 424.9);
      ctx.lineTo(454.3, 424.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(156.4, 546.9);
      ctx.lineTo(156.4, 593.1);
      ctx.bezierCurveTo(156.4, 595.3, 158.1, 597.0, 160.2, 597.0);
      ctx.lineTo(163.9, 597.0);
      ctx.lineTo(163.9, 603.7);
      ctx.bezierCurveTo(163.9, 606.5, 163.0, 609.2, 161.3, 611.1);
      ctx.bezierCurveTo(155.2, 617.7, 147.5, 626.2, 142.2, 632.1);
      ctx.bezierCurveTo(140.6, 633.9, 138.5, 634.8, 136.4, 634.8);
      ctx.lineTo(28.1, 634.8);
      ctx.lineTo(28.1, 525.0);
      ctx.lineTo(163.9, 525.0);
      ctx.lineTo(163.9, 543.0);
      ctx.lineTo(160.2, 543.0);
      ctx.bezierCurveTo(158.1, 543.0, 156.4, 544.7, 156.4, 546.9);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(163.9, 545.7);
      ctx.lineTo(163.9, 594.3);
      ctx.lineTo(161.2, 594.3);
      ctx.bezierCurveTo(159.7, 594.3, 158.4, 592.7, 158.4, 590.8);
      ctx.lineTo(158.4, 549.2);
      ctx.bezierCurveTo(158.4, 547.3, 159.7, 545.7, 161.2, 545.7);
      ctx.lineTo(163.9, 545.7);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(438.0, 546.9);
      ctx.lineTo(438.0, 593.1);
      ctx.bezierCurveTo(438.0, 595.3, 439.8, 597.0, 441.9, 597.0);
      ctx.lineTo(445.6, 597.0);
      ctx.lineTo(445.6, 603.7);
      ctx.bezierCurveTo(445.6, 606.5, 444.6, 609.2, 443.0, 611.1);
      ctx.bezierCurveTo(436.9, 617.7, 429.2, 626.2, 423.9, 632.1);
      ctx.bezierCurveTo(422.3, 633.9, 420.2, 634.8, 418.1, 634.8);
      ctx.lineTo(309.8, 634.8);
      ctx.lineTo(309.8, 525.0);
      ctx.lineTo(445.6, 525.0);
      ctx.lineTo(445.6, 543.0);
      ctx.lineTo(441.9, 543.0);
      ctx.bezierCurveTo(439.8, 543.0, 438.0, 544.7, 438.0, 546.9);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(445.6, 545.7);
      ctx.lineTo(445.6, 594.3);
      ctx.lineTo(442.9, 594.3);
      ctx.bezierCurveTo(441.4, 594.3, 440.1, 592.7, 440.1, 590.8);
      ctx.lineTo(440.1, 549.2);
      ctx.bezierCurveTo(440.1, 547.3, 441.4, 545.7, 442.9, 545.7);
      ctx.lineTo(445.6, 545.7);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(179.0, 546.9);
      ctx.lineTo(179.0, 593.1);
      ctx.bezierCurveTo(179.0, 595.3, 177.3, 597.0, 175.1, 597.0);
      ctx.lineTo(171.4, 597.0);
      ctx.lineTo(171.4, 603.7);
      ctx.bezierCurveTo(171.4, 606.5, 172.4, 609.2, 174.1, 611.1);
      ctx.bezierCurveTo(180.1, 617.7, 187.8, 626.2, 193.2, 632.1);
      ctx.bezierCurveTo(194.8, 633.9, 196.8, 634.8, 198.9, 634.8);
      ctx.lineTo(307.3, 634.8);
      ctx.lineTo(307.3, 525.0);
      ctx.lineTo(171.4, 525.0);
      ctx.lineTo(171.4, 543.0);
      ctx.lineTo(175.1, 543.0);
      ctx.bezierCurveTo(177.3, 543.0, 179.0, 544.7, 179.0, 546.9);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(171.5, 545.7);
      ctx.lineTo(171.5, 594.3);
      ctx.lineTo(174.1, 594.3);
      ctx.bezierCurveTo(175.7, 594.3, 176.9, 592.7, 176.9, 590.8);
      ctx.lineTo(176.9, 549.2);
      ctx.bezierCurveTo(176.9, 547.3, 175.7, 545.7, 174.1, 545.7);
      ctx.lineTo(171.5, 545.7);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(461.9, 546.9);
      ctx.lineTo(461.9, 593.1);
      ctx.bezierCurveTo(461.9, 595.3, 460.2, 597.0, 458.0, 597.0);
      ctx.lineTo(454.3, 597.0);
      ctx.lineTo(454.3, 603.7);
      ctx.bezierCurveTo(454.3, 606.5, 455.3, 609.2, 457.0, 611.1);
      ctx.bezierCurveTo(463.0, 617.7, 470.7, 626.2, 476.1, 632.1);
      ctx.bezierCurveTo(477.7, 633.9, 479.7, 634.8, 481.8, 634.8);
      ctx.lineTo(590.2, 634.8);
      ctx.lineTo(590.2, 525.0);
      ctx.lineTo(454.3, 525.0);
      ctx.lineTo(454.3, 543.0);
      ctx.lineTo(458.0, 543.0);
      ctx.bezierCurveTo(460.2, 543.0, 461.9, 544.7, 461.9, 546.9);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(454.3, 545.7);
      ctx.lineTo(454.3, 594.3);
      ctx.lineTo(457.0, 594.3);
      ctx.bezierCurveTo(458.6, 594.3, 459.8, 592.7, 459.8, 590.8);
      ctx.lineTo(459.8, 549.2);
      ctx.bezierCurveTo(459.8, 547.3, 458.6, 545.7, 457.0, 545.7);
      ctx.lineTo(454.3, 545.7);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(156.4, 667.7);
      ctx.lineTo(156.4, 714.0);
      ctx.bezierCurveTo(156.4, 716.1, 158.1, 717.8, 160.2, 717.8);
      ctx.lineTo(163.9, 717.8);
      ctx.lineTo(163.9, 724.5);
      ctx.bezierCurveTo(163.9, 727.3, 163.0, 730.0, 161.3, 731.9);
      ctx.bezierCurveTo(155.2, 738.6, 147.5, 747.0, 142.2, 752.9);
      ctx.bezierCurveTo(140.6, 754.7, 138.5, 755.7, 136.4, 755.7);
      ctx.lineTo(28.1, 755.7);
      ctx.lineTo(28.1, 645.8);
      ctx.lineTo(163.9, 645.8);
      ctx.lineTo(163.9, 663.8);
      ctx.lineTo(160.2, 663.8);
      ctx.bezierCurveTo(158.1, 663.8, 156.4, 665.6, 156.4, 667.7);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(163.9, 666.5);
      ctx.lineTo(163.9, 715.1);
      ctx.lineTo(161.2, 715.1);
      ctx.bezierCurveTo(159.7, 715.1, 158.4, 713.6, 158.4, 711.6);
      ctx.lineTo(158.4, 670.0);
      ctx.bezierCurveTo(158.4, 668.1, 159.7, 666.5, 161.2, 666.5);
      ctx.lineTo(163.9, 666.5);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(438.0, 667.7);
      ctx.lineTo(438.0, 714.0);
      ctx.bezierCurveTo(438.0, 716.1, 439.8, 717.8, 441.9, 717.8);
      ctx.lineTo(445.6, 717.8);
      ctx.lineTo(445.6, 724.5);
      ctx.bezierCurveTo(445.6, 727.3, 444.6, 730.0, 443.0, 731.9);
      ctx.bezierCurveTo(436.9, 738.6, 429.2, 747.0, 423.9, 752.9);
      ctx.bezierCurveTo(422.3, 754.7, 420.2, 755.7, 418.1, 755.7);
      ctx.lineTo(309.8, 755.7);
      ctx.lineTo(309.8, 645.8);
      ctx.lineTo(445.6, 645.8);
      ctx.lineTo(445.6, 663.8);
      ctx.lineTo(441.9, 663.8);
      ctx.bezierCurveTo(439.8, 663.8, 438.0, 665.6, 438.0, 667.7);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(445.6, 666.5);
      ctx.lineTo(445.6, 715.1);
      ctx.lineTo(442.9, 715.1);
      ctx.bezierCurveTo(441.4, 715.1, 440.1, 713.6, 440.1, 711.6);
      ctx.lineTo(440.1, 670.0);
      ctx.bezierCurveTo(440.1, 668.1, 441.4, 666.5, 442.9, 666.5);
      ctx.lineTo(445.6, 666.5);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(179.0, 667.7);
      ctx.lineTo(179.0, 714.0);
      ctx.bezierCurveTo(179.0, 716.1, 177.3, 717.8, 175.1, 717.8);
      ctx.lineTo(171.4, 717.8);
      ctx.lineTo(171.4, 724.5);
      ctx.bezierCurveTo(171.4, 727.3, 172.4, 730.0, 174.1, 731.9);
      ctx.bezierCurveTo(180.1, 738.6, 187.8, 747.0, 193.2, 752.9);
      ctx.bezierCurveTo(194.8, 754.7, 196.8, 755.7, 198.9, 755.7);
      ctx.lineTo(307.3, 755.7);
      ctx.lineTo(307.3, 645.8);
      ctx.lineTo(171.4, 645.8);
      ctx.lineTo(171.4, 663.8);
      ctx.lineTo(175.1, 663.8);
      ctx.bezierCurveTo(177.3, 663.8, 179.0, 665.6, 179.0, 667.7);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(171.5, 666.5);
      ctx.lineTo(171.5, 715.1);
      ctx.lineTo(174.1, 715.1);
      ctx.bezierCurveTo(175.7, 715.1, 176.9, 713.6, 176.9, 711.6);
      ctx.lineTo(176.9, 670.0);
      ctx.bezierCurveTo(176.9, 668.1, 175.7, 666.5, 174.1, 666.5);
      ctx.lineTo(171.5, 666.5);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(461.9, 667.7);
      ctx.lineTo(461.9, 714.0);
      ctx.bezierCurveTo(461.9, 716.1, 460.2, 717.8, 458.0, 717.8);
      ctx.lineTo(454.3, 717.8);
      ctx.lineTo(454.3, 724.5);
      ctx.bezierCurveTo(454.3, 727.3, 455.3, 730.0, 457.0, 731.9);
      ctx.bezierCurveTo(463.0, 738.6, 470.7, 747.0, 476.1, 752.9);
      ctx.bezierCurveTo(477.7, 754.7, 479.7, 755.7, 481.8, 755.7);
      ctx.lineTo(590.2, 755.7);
      ctx.lineTo(590.2, 645.8);
      ctx.lineTo(454.3, 645.8);
      ctx.lineTo(454.3, 663.8);
      ctx.lineTo(458.0, 663.8);
      ctx.bezierCurveTo(460.2, 663.8, 461.9, 665.6, 461.9, 667.7);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(454.3, 666.5);
      ctx.lineTo(454.3, 715.1);
      ctx.lineTo(457.0, 715.1);
      ctx.bezierCurveTo(458.6, 715.1, 459.8, 713.6, 459.8, 711.6);
      ctx.lineTo(459.8, 670.0);
      ctx.bezierCurveTo(459.8, 668.1, 458.6, 666.5, 457.0, 666.5);
      ctx.lineTo(454.3, 666.5);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(614.5, 213.8);
      ctx.lineTo(0.0, 213.8);
      ctx.lineTo(0.0, 33.8);
      ctx.lineTo(614.5, 33.8);
      ctx.lineTo(614.5, 213.8);
      ctx.closePath();
      ctx.fillStyle = "rgb(255, 220, 13)";
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(304.4, 193.0);
      ctx.lineTo(49.8, 193.0);
      ctx.lineTo(49.8, 170.3);
      ctx.lineTo(304.4, 170.3);
      ctx.lineTo(304.4, 193.0);
      ctx.closePath();
      ctx.fillStyle = "rgb(25, 64, 141)";
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(304.4, 170.3);
      ctx.lineTo(49.8, 170.3);
      ctx.lineTo(49.8, 164.8);
      ctx.lineTo(304.4, 164.8);
      ctx.lineTo(304.4, 170.3);
      ctx.closePath();
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(126.0, 88.5);
      ctx.bezierCurveTo(121.8, 59.0, 100.8, 56.9, 100.8, 56.9);
      ctx.lineTo(63.2, 56.8);
      ctx.lineTo(63.2, 60.7);
      ctx.lineTo(69.4, 60.7);
      ctx.lineTo(69.5, 156.5);
      ctx.lineTo(63.5, 156.5);
      ctx.lineTo(63.5, 160.0);
      ctx.lineTo(101.7, 160.0);
      ctx.bezierCurveTo(101.7, 160.0, 117.2, 157.5, 123.2, 138.7);
      ctx.bezierCurveTo(128.8, 121.1, 127.0, 96.0, 126.0, 88.5);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(102.7, 147.4);
      ctx.bezierCurveTo(102.7, 147.4, 102.6, 149.8, 101.3, 151.9);
      ctx.bezierCurveTo(99.7, 154.5, 98.4, 155.1, 98.4, 155.1);
      ctx.lineTo(92.0, 155.1);
      ctx.lineTo(92.0, 60.7);
      ctx.lineTo(98.1, 60.7);
      ctx.bezierCurveTo(98.1, 60.7, 99.4, 61.0, 100.9, 62.9);
      ctx.bezierCurveTo(102.3, 64.6, 102.7, 67.1, 102.7, 67.1);
      ctx.lineTo(102.7, 147.4);
      ctx.closePath();
      ctx.fillStyle = "rgb(25, 64, 141)";
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(179.5, 95.1);
      ctx.bezierCurveTo(179.5, 95.1, 177.7, 83.5, 163.6, 83.3);
      ctx.bezierCurveTo(154.7, 83.2, 151.0, 83.4, 151.0, 83.4);
      ctx.bezierCurveTo(151.0, 83.4, 134.9, 84.2, 134.3, 96.2);
      ctx.bezierCurveTo(133.8, 106.9, 138.7, 109.9, 140.6, 110.9);
      ctx.bezierCurveTo(143.0, 112.0, 152.5, 111.2, 154.1, 105.0);
      ctx.bezierCurveTo(155.7, 98.9, 153.9, 95.4, 152.9, 92.6);
      ctx.bezierCurveTo(151.9, 89.9, 152.3, 87.6, 154.9, 87.5);
      ctx.bezierCurveTo(158.6, 87.3, 160.6, 89.4, 160.6, 90.5);
      ctx.lineTo(160.7, 115.8);
      ctx.bezierCurveTo(160.7, 115.8, 158.8, 115.6, 156.1, 115.8);
      ctx.bezierCurveTo(132.8, 116.7, 128.5, 134.7, 131.4, 147.8);
      ctx.bezierCurveTo(134.4, 161.0, 144.7, 159.8, 146.1, 159.8);
      ctx.bezierCurveTo(156.5, 159.5, 160.0, 148.2, 160.0, 148.2);
      ctx.lineTo(161.1, 148.2);
      ctx.bezierCurveTo(161.1, 148.2, 161.1, 150.5, 161.3, 151.7);
      ctx.bezierCurveTo(162.3, 159.0, 168.8, 159.5, 170.6, 159.6);
      ctx.bezierCurveTo(174.5, 160.0, 179.6, 159.8, 179.6, 159.8);
      ctx.lineTo(179.5, 95.1);
      ctx.closePath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(160.8, 142.9);
      ctx.bezierCurveTo(160.6, 145.1, 158.3, 149.7, 154.9, 149.1);
      ctx.bezierCurveTo(152.4, 148.7, 151.7, 144.8, 151.7, 142.2);
      ctx.bezierCurveTo(151.7, 138.9, 152.6, 125.0, 152.6, 125.0);
      ctx.bezierCurveTo(152.6, 125.0, 152.8, 118.6, 160.8, 118.7);
      ctx.lineTo(160.8, 141.8);
      ctx.bezierCurveTo(160.8, 141.8, 160.8, 142.7, 160.8, 142.9);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(290.8, 95.1);
      ctx.bezierCurveTo(290.8, 95.1, 289.0, 83.5, 275.0, 83.3);
      ctx.bezierCurveTo(266.1, 83.2, 262.4, 83.4, 262.4, 83.4);
      ctx.bezierCurveTo(262.4, 83.4, 246.2, 84.2, 245.7, 96.2);
      ctx.bezierCurveTo(245.2, 106.9, 250.0, 109.9, 251.9, 110.9);
      ctx.bezierCurveTo(254.3, 112.0, 263.8, 111.2, 265.4, 105.0);
      ctx.bezierCurveTo(267.0, 98.9, 265.2, 95.4, 264.3, 92.6);
      ctx.bezierCurveTo(263.3, 89.9, 263.7, 87.6, 266.2, 87.5);
      ctx.bezierCurveTo(269.9, 87.3, 272.0, 89.4, 272.0, 90.5);
      ctx.lineTo(272.0, 115.8);
      ctx.bezierCurveTo(272.0, 115.8, 270.2, 115.6, 267.5, 115.8);
      ctx.bezierCurveTo(244.2, 116.7, 239.8, 134.7, 242.8, 147.8);
      ctx.bezierCurveTo(245.8, 161.0, 256.0, 159.8, 257.5, 159.8);
      ctx.bezierCurveTo(267.9, 159.5, 271.3, 148.2, 271.3, 148.2);
      ctx.lineTo(272.4, 148.2);
      ctx.bezierCurveTo(272.4, 148.2, 272.5, 150.5, 272.7, 151.7);
      ctx.bezierCurveTo(273.7, 159.0, 280.2, 159.5, 281.9, 159.6);
      ctx.bezierCurveTo(285.9, 160.0, 291.0, 159.8, 291.0, 159.8);
      ctx.lineTo(290.8, 95.1);
      ctx.closePath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(272.2, 142.9);
      ctx.bezierCurveTo(272.0, 145.1, 269.6, 149.7, 266.3, 149.1);
      ctx.bezierCurveTo(263.8, 148.7, 263.1, 144.8, 263.1, 142.2);
      ctx.bezierCurveTo(263.0, 138.9, 264.0, 125.0, 264.0, 125.0);
      ctx.bezierCurveTo(264.0, 125.0, 264.1, 118.6, 272.2, 118.7);
      ctx.lineTo(272.2, 141.8);
      ctx.bezierCurveTo(272.2, 141.8, 272.2, 142.7, 272.2, 142.9);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(180.6, 54.6);
      ctx.lineTo(204.7, 54.6);
      ctx.lineTo(204.7, 114.5);
      ctx.lineTo(221.5, 88.5);
      ctx.lineTo(214.9, 88.5);
      ctx.lineTo(214.9, 84.6);
      ctx.lineTo(238.8, 84.6);
      ctx.lineTo(238.8, 88.5);
      ctx.lineTo(232.5, 88.5);
      ctx.lineTo(216.7, 110.9);
      ctx.lineTo(239.9, 160.3);
      ctx.lineTo(220.2, 160.3);
      ctx.lineTo(207.1, 125.9);
      ctx.lineTo(204.5, 128.0);
      ctx.lineTo(204.5, 156.9);
      ctx.lineTo(209.1, 156.9);
      ctx.lineTo(209.1, 160.3);
      ctx.lineTo(184.7, 160.3);
      ctx.lineTo(184.7, 58.5);
      ctx.lineTo(180.6, 58.5);
      ctx.lineTo(180.6, 54.6);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(371.3, 136.4);
      ctx.bezierCurveTo(373.9, 135.5, 376.5, 134.9, 379.0, 134.3);
      ctx.bezierCurveTo(385.8, 132.8, 388.3, 132.6, 388.9, 133.1);
      ctx.bezierCurveTo(389.3, 133.5, 389.2, 133.6, 388.7, 133.7);
      ctx.lineTo(379.7, 136.2);
      ctx.lineTo(373.3, 138.1);
      ctx.bezierCurveTo(374.6, 139.7, 375.4, 141.7, 375.4, 144.2);
      ctx.bezierCurveTo(375.4, 152.9, 364.0, 159.3, 353.5, 161.0);
      ctx.bezierCurveTo(352.5, 161.2, 351.4, 161.3, 350.2, 161.3);
      ctx.bezierCurveTo(346.1, 161.3, 341.9, 160.0, 341.9, 155.6);
      ctx.bezierCurveTo(342.0, 153.3, 343.5, 151.0, 346.0, 148.8);
      ctx.bezierCurveTo(351.3, 144.0, 359.7, 140.1, 368.6, 137.2);
      ctx.bezierCurveTo(364.3, 134.5, 357.4, 133.5, 352.3, 132.8);
      ctx.bezierCurveTo(345.2, 131.8, 336.7, 129.8, 334.8, 123.6);
      ctx.bezierCurveTo(334.2, 122.1, 334.0, 120.5, 334.0, 119.1);
      ctx.bezierCurveTo(334.0, 111.3, 340.2, 104.4, 347.0, 99.8);
      ctx.bezierCurveTo(352.5, 96.1, 359.3, 93.5, 365.5, 93.5);
      ctx.bezierCurveTo(369.2, 93.5, 372.6, 94.4, 375.3, 96.6);
      ctx.bezierCurveTo(377.1, 98.5, 377.9, 100.4, 377.9, 102.6);
      ctx.bezierCurveTo(377.9, 105.4, 376.6, 108.5, 374.9, 111.9);
      ctx.bezierCurveTo(373.7, 114.3, 371.8, 115.0, 372.5, 113.1);
      ctx.bezierCurveTo(374.2, 109.6, 375.4, 106.0, 375.4, 102.9);
      ctx.bezierCurveTo(375.4, 100.9, 374.9, 99.1, 373.6, 97.9);
      ctx.bezierCurveTo(371.9, 96.5, 369.7, 96.0, 367.2, 96.0);
      ctx.bezierCurveTo(361.0, 96.0, 353.3, 99.5, 349.1, 102.3);
      ctx.bezierCurveTo(341.6, 107.5, 336.5, 113.5, 336.5, 120.0);
      ctx.bezierCurveTo(336.5, 121.1, 336.7, 122.2, 337.0, 123.3);
      ctx.bezierCurveTo(338.2, 127.9, 345.6, 129.9, 352.0, 130.8);
      ctx.bezierCurveTo(357.0, 131.5, 366.1, 132.4, 371.3, 136.4);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(370.8, 138.9);
      ctx.bezierCurveTo(359.7, 142.6, 352.5, 146.5, 348.2, 150.4);
      ctx.bezierCurveTo(345.2, 153.0, 344.0, 155.0, 344.0, 156.5);
      ctx.bezierCurveTo(344.0, 158.5, 346.0, 159.5, 349.1, 159.5);
      ctx.bezierCurveTo(350.3, 159.5, 351.6, 159.3, 353.1, 159.0);
      ctx.bezierCurveTo(361.2, 157.4, 372.3, 152.0, 372.7, 143.8);
      ctx.bezierCurveTo(372.7, 141.8, 372.0, 140.2, 370.8, 138.9);
      ctx.fillStyle = "rgb(26, 63, 141)";
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(350.2, 161.6);
      ctx.bezierCurveTo(344.7, 161.6, 341.6, 159.4, 341.6, 155.6);
      ctx.bezierCurveTo(341.7, 153.3, 343.2, 150.9, 345.8, 148.6);
      ctx.bezierCurveTo(351.8, 143.2, 361.0, 139.4, 367.9, 137.1);
      ctx.bezierCurveTo(363.7, 134.7, 357.3, 133.8, 352.5, 133.1);
      ctx.lineTo(352.3, 133.1);
      ctx.bezierCurveTo(345.6, 132.2, 336.5, 130.2, 334.5, 123.7);
      ctx.bezierCurveTo(334.0, 122.2, 333.7, 120.7, 333.7, 119.1);
      ctx.bezierCurveTo(333.7, 109.4, 342.9, 102.2, 346.8, 99.5);
      ctx.bezierCurveTo(352.9, 95.5, 359.8, 93.2, 365.5, 93.2);
      ctx.bezierCurveTo(369.4, 93.2, 372.9, 94.3, 375.5, 96.4);
      ctx.bezierCurveTo(377.3, 98.2, 378.2, 100.2, 378.2, 102.6);
      ctx.bezierCurveTo(378.2, 105.7, 376.7, 109.1, 375.2, 112.0);
      ctx.bezierCurveTo(374.4, 113.7, 373.1, 114.7, 372.4, 114.4);
      ctx.bezierCurveTo(372.2, 114.3, 371.8, 114.0, 372.2, 113.0);
      ctx.bezierCurveTo(374.1, 109.1, 375.1, 105.6, 375.1, 102.9);
      ctx.bezierCurveTo(375.1, 100.8, 374.6, 99.2, 373.4, 98.1);
      ctx.bezierCurveTo(371.9, 96.9, 369.8, 96.3, 367.2, 96.3);
      ctx.bezierCurveTo(360.8, 96.3, 353.0, 100.0, 349.3, 102.6);
      ctx.bezierCurveTo(341.1, 108.2, 336.8, 114.2, 336.8, 120.0);
      ctx.bezierCurveTo(336.8, 121.1, 336.9, 122.1, 337.2, 123.2);
      ctx.bezierCurveTo(338.2, 126.8, 343.3, 129.3, 352.1, 130.5);
      ctx.bezierCurveTo(352.6, 130.6, 353.2, 130.7, 353.8, 130.7);
      ctx.bezierCurveTo(358.9, 131.4, 366.6, 132.5, 371.4, 136.0);
      ctx.bezierCurveTo(373.7, 135.3, 376.1, 134.7, 379.0, 134.0);
      ctx.bezierCurveTo(386.4, 132.3, 388.4, 132.4, 389.1, 132.9);
      ctx.bezierCurveTo(389.3, 133.1, 389.5, 133.3, 389.4, 133.6);
      ctx.bezierCurveTo(389.3, 133.8, 389.1, 133.9, 388.8, 134.0);
      ctx.lineTo(379.8, 136.5);
      ctx.lineTo(373.8, 138.3);
      ctx.bezierCurveTo(375.1, 140.0, 375.7, 141.9, 375.7, 144.2);
      ctx.bezierCurveTo(375.7, 153.0, 364.6, 159.5, 353.5, 161.3);
      ctx.bezierCurveTo(352.4, 161.5, 351.4, 161.6, 350.2, 161.6);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(365.5, 93.8);
      ctx.bezierCurveTo(359.9, 93.8, 353.2, 96.0, 347.1, 100.0);
      ctx.bezierCurveTo(343.3, 102.6, 334.3, 109.7, 334.3, 119.1);
      ctx.bezierCurveTo(334.3, 120.6, 334.6, 122.1, 335.0, 123.5);
      ctx.bezierCurveTo(337.0, 129.7, 345.8, 131.6, 352.4, 132.5);
      ctx.lineTo(352.6, 132.5);
      ctx.bezierCurveTo(357.6, 133.2, 364.5, 134.2, 368.8, 136.9);
      ctx.lineTo(369.3, 137.2);
      ctx.lineTo(368.7, 137.4);
      ctx.bezierCurveTo(361.8, 139.7, 352.3, 143.6, 346.2, 149.0);
      ctx.bezierCurveTo(343.7, 151.2, 342.3, 153.5, 342.2, 155.6);
      ctx.bezierCurveTo(342.2, 160.5, 347.8, 161.0, 350.2, 161.0);
      ctx.bezierCurveTo(351.3, 161.0, 352.4, 160.9, 353.5, 160.7);
      ctx.bezierCurveTo(364.0, 159.0, 375.1, 152.6, 375.1, 144.2);
      ctx.bezierCurveTo(375.1, 141.9, 374.5, 140.0, 373.0, 138.3);
      ctx.lineTo(372.7, 138.0);
      ctx.lineTo(379.6, 135.9);
      ctx.lineTo(388.6, 133.4);
      ctx.bezierCurveTo(388.7, 133.4, 388.7, 133.4, 388.7, 133.4);
      ctx.bezierCurveTo(388.7, 133.4, 388.7, 133.4, 388.7, 133.3);
      ctx.bezierCurveTo(387.8, 132.6, 381.2, 134.1, 379.1, 134.6);
      ctx.bezierCurveTo(376.2, 135.3, 373.7, 135.9, 371.4, 136.6);
      ctx.lineTo(371.3, 136.7);
      ctx.lineTo(371.2, 136.6);
      ctx.bezierCurveTo(366.5, 133.1, 358.8, 132.0, 353.7, 131.3);
      ctx.bezierCurveTo(353.1, 131.2, 352.5, 131.2, 352.0, 131.1);
      ctx.bezierCurveTo(342.9, 129.8, 337.7, 127.2, 336.7, 123.3);
      ctx.bezierCurveTo(336.4, 122.2, 336.2, 121.1, 336.2, 120.0);
      ctx.bezierCurveTo(336.2, 114.0, 340.6, 107.8, 348.9, 102.1);
      ctx.bezierCurveTo(352.7, 99.5, 360.7, 95.7, 367.2, 95.7);
      ctx.bezierCurveTo(369.9, 95.7, 372.1, 96.3, 373.8, 97.6);
      ctx.bezierCurveTo(375.1, 98.9, 375.7, 100.6, 375.7, 102.9);
      ctx.bezierCurveTo(375.7, 106.4, 374.1, 110.5, 372.8, 113.2);
      ctx.bezierCurveTo(372.6, 113.7, 372.6, 113.9, 372.7, 113.9);
      ctx.bezierCurveTo(372.9, 114.0, 373.9, 113.4, 374.7, 111.8);
      ctx.bezierCurveTo(376.0, 109.1, 377.6, 105.6, 377.6, 102.6);
      ctx.bezierCurveTo(377.6, 100.4, 376.8, 98.5, 375.1, 96.8);
      ctx.bezierCurveTo(372.6, 94.8, 369.3, 93.8, 365.5, 93.8);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(349.1, 159.8);
      ctx.bezierCurveTo(345.7, 159.8, 343.7, 158.6, 343.7, 156.5);
      ctx.bezierCurveTo(343.7, 154.8, 345.1, 152.7, 348.0, 150.2);
      ctx.bezierCurveTo(352.7, 146.0, 360.3, 142.1, 370.7, 138.6);
      ctx.lineTo(370.9, 138.6);
      ctx.lineTo(371.1, 138.7);
      ctx.bezierCurveTo(372.4, 140.2, 373.0, 141.9, 373.0, 143.8);
      ctx.bezierCurveTo(372.6, 152.4, 360.9, 157.8, 353.1, 159.3);
      ctx.bezierCurveTo(351.6, 159.6, 350.3, 159.8, 349.1, 159.8);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(370.7, 139.3);
      ctx.bezierCurveTo(360.5, 142.7, 353.0, 146.5, 348.3, 150.6);
      ctx.bezierCurveTo(345.7, 153.0, 344.3, 155.0, 344.3, 156.5);
      ctx.bezierCurveTo(344.3, 158.2, 346.1, 159.2, 349.1, 159.2);
      ctx.bezierCurveTo(350.2, 159.2, 351.6, 159.0, 353.0, 158.7);
      ctx.bezierCurveTo(360.6, 157.3, 372.0, 152.1, 372.4, 143.8);
      ctx.bezierCurveTo(372.4, 142.1, 371.9, 140.6, 370.7, 139.3);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(386.1, 134.6);
      ctx.bezierCurveTo(385.9, 134.0, 385.8, 133.3, 385.8, 132.5);
      ctx.bezierCurveTo(385.8, 129.3, 388.0, 126.0, 391.5, 125.9);
      ctx.bezierCurveTo(393.8, 125.9, 395.9, 128.1, 395.1, 130.2);
      ctx.bezierCurveTo(394.2, 132.5, 391.0, 134.3, 388.5, 134.3);
      ctx.bezierCurveTo(388.7, 135.7, 391.3, 138.0, 393.8, 138.0);
      ctx.bezierCurveTo(400.7, 138.0, 405.8, 132.9, 408.9, 129.7);
      ctx.bezierCurveTo(410.6, 127.9, 410.3, 129.6, 409.3, 131.6);
      ctx.bezierCurveTo(407.2, 135.9, 402.5, 139.5, 397.5, 139.8);
      ctx.bezierCurveTo(393.2, 140.0, 387.6, 139.2, 386.1, 134.6);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(388.4, 132.5);
      ctx.bezierCurveTo(391.5, 131.1, 393.5, 129.2, 392.7, 128.3);
      ctx.bezierCurveTo(391.2, 126.8, 388.3, 130.7, 388.4, 132.5);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(389.7, 122.5);
      ctx.bezierCurveTo(390.5, 121.5, 394.2, 119.4, 395.4, 118.4);
      ctx.bezierCurveTo(396.1, 117.9, 398.5, 119.3, 397.8, 120.3);
      ctx.bezierCurveTo(392.9, 123.3, 391.0, 124.5, 389.9, 123.7);
      ctx.bezierCurveTo(389.2, 123.3, 389.4, 122.7, 389.7, 122.5);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(396.2, 140.1);
      ctx.bezierCurveTo(392.5, 140.1, 387.3, 139.2, 385.9, 134.7);
      ctx.bezierCurveTo(385.6, 134.0, 385.5, 133.2, 385.5, 132.5);
      ctx.bezierCurveTo(385.5, 129.2, 387.7, 125.7, 391.5, 125.6);
      ctx.lineTo(391.5, 125.6);
      ctx.bezierCurveTo(392.9, 125.6, 394.2, 126.3, 395.0, 127.4);
      ctx.bezierCurveTo(395.6, 128.3, 395.8, 129.3, 395.4, 130.3);
      ctx.bezierCurveTo(394.4, 132.7, 391.3, 134.4, 388.9, 134.6);
      ctx.bezierCurveTo(389.4, 135.8, 391.6, 137.7, 393.8, 137.7);
      ctx.bezierCurveTo(400.8, 137.7, 405.9, 132.3, 408.7, 129.5);
      ctx.bezierCurveTo(409.2, 128.9, 409.8, 128.4, 410.2, 128.7);
      ctx.bezierCurveTo(410.7, 129.1, 410.1, 130.6, 409.5, 131.8);
      ctx.bezierCurveTo(407.3, 136.4, 402.4, 139.8, 397.5, 140.1);
      ctx.bezierCurveTo(397.1, 140.1, 396.7, 140.1, 396.2, 140.1);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(391.5, 126.2);
      ctx.bezierCurveTo(388.1, 126.3, 386.1, 129.5, 386.1, 132.5);
      ctx.bezierCurveTo(386.1, 133.2, 386.2, 133.9, 386.4, 134.5);
      ctx.lineTo(386.4, 134.6);
      ctx.bezierCurveTo(387.9, 139.2, 394.0, 139.6, 397.5, 139.5);
      ctx.bezierCurveTo(402.1, 139.2, 406.9, 135.9, 409.0, 131.5);
      ctx.bezierCurveTo(409.6, 130.3, 409.8, 129.6, 409.8, 129.3);
      ctx.bezierCurveTo(409.7, 129.3, 409.5, 129.5, 409.1, 129.9);
      ctx.bezierCurveTo(406.5, 132.6, 401.1, 138.3, 393.8, 138.3);
      ctx.bezierCurveTo(391.1, 138.3, 388.4, 135.9, 388.2, 134.3);
      ctx.lineTo(388.1, 134.0);
      ctx.lineTo(388.5, 134.0);
      ctx.bezierCurveTo(391.1, 134.0, 394.0, 132.2, 394.9, 130.1);
      ctx.bezierCurveTo(395.1, 129.3, 395.0, 128.5, 394.5, 127.7);
      ctx.bezierCurveTo(393.9, 126.8, 392.7, 126.2, 391.5, 126.2);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(388.1, 133.0);
      ctx.lineTo(388.1, 132.5);
      ctx.bezierCurveTo(388.0, 131.0, 389.7, 128.5, 391.1, 127.9);
      ctx.bezierCurveTo(391.8, 127.6, 392.5, 127.7, 392.9, 128.1);
      ctx.bezierCurveTo(393.1, 128.4, 393.2, 128.6, 393.2, 129.0);
      ctx.bezierCurveTo(393.0, 130.1, 391.1, 131.6, 388.5, 132.8);
      ctx.lineTo(388.1, 133.0);
      ctx.closePath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(391.9, 128.3);
      ctx.bezierCurveTo(391.7, 128.3, 391.6, 128.3, 391.4, 128.4);
      ctx.bezierCurveTo(390.2, 128.9, 389.0, 130.8, 388.7, 132.0);
      ctx.bezierCurveTo(391.1, 130.9, 392.5, 129.6, 392.6, 128.9);
      ctx.bezierCurveTo(392.6, 128.7, 392.6, 128.6, 392.5, 128.6);
      ctx.bezierCurveTo(392.3, 128.4, 392.1, 128.3, 391.9, 128.3);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(390.7, 124.3);
      ctx.bezierCurveTo(390.3, 124.3, 390.0, 124.2, 389.8, 124.0);
      ctx.bezierCurveTo(389.3, 123.7, 389.2, 123.3, 389.2, 123.1);
      ctx.bezierCurveTo(389.1, 122.7, 389.3, 122.4, 389.5, 122.3);
      ctx.bezierCurveTo(390.0, 121.6, 391.5, 120.7, 393.0, 119.7);
      ctx.bezierCurveTo(393.9, 119.1, 394.8, 118.6, 395.2, 118.2);
      ctx.bezierCurveTo(395.8, 117.7, 397.1, 118.3, 397.7, 118.9);
      ctx.bezierCurveTo(398.3, 119.4, 398.4, 120.0, 398.1, 120.5);
      ctx.lineTo(398.0, 120.6);
      ctx.lineTo(397.1, 121.1);
      ctx.bezierCurveTo(393.6, 123.2, 391.8, 124.3, 390.7, 124.3);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(395.8, 118.6);
      ctx.bezierCurveTo(395.7, 118.6, 395.6, 118.6, 395.6, 118.6);
      ctx.bezierCurveTo(395.1, 119.0, 394.2, 119.6, 393.3, 120.2);
      ctx.bezierCurveTo(391.9, 121.1, 390.4, 122.1, 390.0, 122.7);
      ctx.lineTo(389.9, 122.7);
      ctx.bezierCurveTo(389.8, 122.8, 389.7, 122.9, 389.7, 123.1);
      ctx.bezierCurveTo(389.8, 123.2, 389.9, 123.4, 390.1, 123.5);
      ctx.bezierCurveTo(390.9, 124.1, 392.8, 123.0, 396.8, 120.6);
      ctx.lineTo(397.6, 120.1);
      ctx.bezierCurveTo(397.8, 119.8, 397.4, 119.4, 397.3, 119.3);
      ctx.bezierCurveTo(396.8, 118.8, 396.1, 118.6, 395.8, 118.6);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(431.0, 102.2);
      ctx.bezierCurveTo(437.1, 99.6, 447.7, 95.7, 457.3, 92.7);
      ctx.bezierCurveTo(457.5, 91.1, 457.8, 89.9, 458.2, 89.2);
      ctx.bezierCurveTo(458.6, 88.9, 459.2, 88.9, 460.0, 89.5);
      ctx.bezierCurveTo(460.8, 89.9, 461.1, 90.6, 460.9, 90.9);
      ctx.bezierCurveTo(460.8, 91.1, 460.6, 91.3, 460.5, 91.6);
      ctx.bezierCurveTo(464.9, 90.3, 469.0, 89.2, 472.0, 88.4);
      ctx.bezierCurveTo(476.5, 87.3, 482.6, 86.3, 488.2, 86.3);
      ctx.bezierCurveTo(494.9, 86.3, 500.8, 87.7, 501.9, 92.1);
      ctx.bezierCurveTo(502.0, 93.0, 501.3, 93.1, 501.1, 92.7);
      ctx.bezierCurveTo(499.3, 89.7, 495.0, 88.4, 489.2, 88.4);
      ctx.bezierCurveTo(484.5, 88.4, 478.7, 89.2, 472.3, 90.8);
      ctx.bezierCurveTo(469.1, 91.7, 464.9, 92.9, 460.0, 94.4);
      ctx.bezierCurveTo(458.9, 108.0, 458.9, 116.7, 458.9, 127.2);
      ctx.bezierCurveTo(463.1, 127.1, 471.8, 127.1, 476.7, 127.1);
      ctx.lineTo(482.3, 127.1);
      ctx.bezierCurveTo(482.9, 127.1, 483.7, 127.6, 484.1, 128.2);
      ctx.bezierCurveTo(484.7, 128.8, 484.4, 129.3, 483.8, 129.3);
      ctx.bezierCurveTo(480.9, 129.3, 478.2, 129.2, 475.6, 129.2);
      ctx.bezierCurveTo(471.2, 129.2, 462.8, 129.3, 458.9, 129.4);
      ctx.lineTo(459.2, 147.0);
      ctx.bezierCurveTo(460.3, 148.8, 460.8, 152.5, 460.8, 155.6);
      ctx.bezierCurveTo(460.8, 158.5, 460.3, 161.1, 459.6, 161.2);
      ctx.bezierCurveTo(459.0, 161.2, 458.2, 160.5, 457.8, 159.9);
      ctx.bezierCurveTo(457.9, 159.8, 457.8, 159.8, 457.8, 159.7);
      ctx.bezierCurveTo(457.3, 158.2, 456.7, 147.7, 456.7, 145.9);
      ctx.bezierCurveTo(456.2, 145.1, 455.9, 144.3, 455.4, 143.7);
      ctx.bezierCurveTo(451.6, 137.3, 444.5, 132.3, 438.9, 130.7);
      ctx.lineTo(438.7, 130.7);
      ctx.bezierCurveTo(438.4, 130.9, 437.8, 130.6, 437.2, 130.3);
      ctx.bezierCurveTo(437.2, 130.3, 437.1, 130.2, 437.1, 130.1);
      ctx.bezierCurveTo(436.9, 130.0, 436.8, 129.9, 436.8, 129.8);
      ctx.bezierCurveTo(436.2, 129.2, 436.4, 128.7, 436.8, 128.6);
      ctx.bezierCurveTo(444.0, 127.9, 450.2, 127.5, 456.5, 127.3);
      ctx.bezierCurveTo(456.4, 123.7, 456.4, 120.5, 456.4, 117.5);
      ctx.bezierCurveTo(456.4, 109.0, 456.7, 102.2, 457.2, 95.3);
      ctx.bezierCurveTo(447.4, 98.4, 436.4, 102.3, 429.1, 105.7);
      ctx.bezierCurveTo(428.3, 106.0, 426.9, 104.7, 427.7, 103.5);
      ctx.lineTo(431.0, 102.2);
      ctx.closePath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(456.6, 141.8);
      ctx.lineTo(456.4, 129.5);
      ctx.bezierCurveTo(452.1, 129.7, 447.3, 130.0, 442.6, 130.4);
      ctx.bezierCurveTo(448.6, 133.4, 453.7, 137.8, 456.6, 141.8);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(459.5, 161.5);
      ctx.bezierCurveTo(458.8, 161.5, 458.0, 160.7, 457.6, 160.1);
      ctx.lineTo(457.5, 159.9);
      ctx.lineTo(457.5, 159.8);
      ctx.bezierCurveTo(457.5, 159.8, 457.5, 159.8, 457.5, 159.8);
      ctx.bezierCurveTo(456.9, 158.1, 456.5, 147.9, 456.4, 146.0);
      ctx.bezierCurveTo(456.2, 145.6, 456.0, 145.2, 455.8, 144.9);
      ctx.bezierCurveTo(455.6, 144.5, 455.4, 144.2, 455.2, 143.9);
      ctx.bezierCurveTo(451.3, 137.3, 444.0, 132.4, 438.8, 131.0);
      ctx.lineTo(438.8, 131.0);
      ctx.bezierCurveTo(438.3, 131.2, 437.6, 130.8, 437.0, 130.5);
      ctx.lineTo(437.0, 130.5);
      ctx.bezierCurveTo(437.0, 130.5, 436.9, 130.4, 436.9, 130.3);
      ctx.bezierCurveTo(436.7, 130.2, 436.6, 130.1, 436.5, 129.9);
      ctx.bezierCurveTo(436.2, 129.5, 436.1, 129.1, 436.2, 128.8);
      ctx.bezierCurveTo(436.3, 128.5, 436.5, 128.4, 436.8, 128.3);
      ctx.bezierCurveTo(444.3, 127.6, 450.3, 127.2, 456.2, 127.0);
      ctx.bezierCurveTo(456.1, 123.5, 456.1, 120.5, 456.1, 117.5);
      ctx.bezierCurveTo(456.1, 109.1, 456.4, 102.4, 456.8, 95.7);
      ctx.bezierCurveTo(446.0, 99.2, 435.7, 103.0, 429.2, 106.0);
      ctx.bezierCurveTo(428.7, 106.2, 428.0, 105.9, 427.5, 105.3);
      ctx.bezierCurveTo(427.1, 104.7, 427.0, 104.0, 427.4, 103.3);
      ctx.lineTo(427.5, 103.3);
      ctx.lineTo(430.9, 101.9);
      ctx.bezierCurveTo(437.1, 99.3, 447.8, 95.4, 457.1, 92.4);
      ctx.bezierCurveTo(457.3, 90.8, 457.5, 89.7, 457.9, 89.0);
      ctx.lineTo(458.0, 88.9);
      ctx.lineTo(458.0, 88.9);
      ctx.bezierCurveTo(458.4, 88.7, 459.1, 88.6, 460.2, 89.3);
      ctx.bezierCurveTo(461.0, 89.7, 461.4, 90.6, 461.2, 91.0);
      ctx.lineTo(461.1, 91.1);
      ctx.bezierCurveTo(461.1, 91.1, 461.1, 91.2, 461.1, 91.2);
      ctx.bezierCurveTo(465.2, 89.9, 469.0, 88.8, 471.9, 88.1);
      ctx.lineTo(472.0, 88.1);
      ctx.bezierCurveTo(477.2, 86.8, 483.3, 86.0, 488.2, 86.0);
      ctx.bezierCurveTo(496.4, 86.0, 501.2, 88.1, 502.2, 92.0);
      ctx.bezierCurveTo(502.3, 92.7, 502.0, 93.1, 501.7, 93.2);
      ctx.bezierCurveTo(501.3, 93.3, 501.0, 93.1, 500.8, 92.8);
      ctx.bezierCurveTo(499.1, 90.1, 495.1, 88.6, 489.2, 88.6);
      ctx.bezierCurveTo(484.6, 88.6, 478.8, 89.5, 472.4, 91.1);
      ctx.bezierCurveTo(468.8, 92.1, 464.9, 93.2, 460.3, 94.6);
      ctx.bezierCurveTo(459.3, 107.4, 459.2, 115.8, 459.2, 125.5);
      ctx.lineTo(459.2, 126.9);
      ctx.bezierCurveTo(463.6, 126.8, 472.0, 126.8, 476.7, 126.8);
      ctx.lineTo(482.3, 126.8);
      ctx.bezierCurveTo(483.0, 126.8, 483.9, 127.3, 484.3, 128.1);
      ctx.bezierCurveTo(484.8, 128.5, 484.7, 128.9, 484.7, 129.1);
      ctx.bezierCurveTo(484.5, 129.4, 484.2, 129.6, 483.8, 129.6);
      ctx.bezierCurveTo(482.3, 129.6, 480.8, 129.5, 479.4, 129.5);
      ctx.bezierCurveTo(478.1, 129.5, 476.9, 129.5, 475.6, 129.5);
      ctx.bezierCurveTo(471.2, 129.5, 463.1, 129.6, 459.2, 129.7);
      ctx.lineTo(459.4, 147.0);
      ctx.bezierCurveTo(460.6, 148.9, 461.1, 152.8, 461.1, 155.6);
      ctx.bezierCurveTo(461.1, 156.6, 461.0, 161.3, 459.6, 161.5);
      ctx.bezierCurveTo(459.6, 161.5, 459.5, 161.5, 459.5, 161.5);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(458.2, 159.9);
      ctx.bezierCurveTo(458.5, 160.4, 459.2, 160.9, 459.6, 160.9);
      ctx.bezierCurveTo(459.9, 160.8, 460.5, 159.0, 460.5, 155.6);
      ctx.bezierCurveTo(460.5, 152.9, 460.1, 149.0, 458.9, 147.2);
      ctx.lineTo(458.9, 147.1);
      ctx.lineTo(458.6, 129.1);
      ctx.lineTo(458.9, 129.1);
      ctx.bezierCurveTo(462.7, 129.0, 471.1, 128.9, 475.6, 128.9);
      ctx.bezierCurveTo(476.9, 128.9, 478.1, 128.9, 479.4, 128.9);
      ctx.bezierCurveTo(480.8, 128.9, 482.3, 129.0, 483.8, 129.0);
      ctx.bezierCurveTo(484.0, 129.0, 484.1, 128.9, 484.1, 128.9);
      ctx.bezierCurveTo(484.1, 128.8, 484.1, 128.7, 483.9, 128.4);
      ctx.bezierCurveTo(483.5, 127.8, 482.8, 127.4, 482.3, 127.4);
      ctx.lineTo(476.7, 127.4);
      ctx.bezierCurveTo(471.9, 127.4, 463.2, 127.4, 458.9, 127.5);
      ctx.lineTo(458.6, 127.5);
      ctx.lineTo(458.6, 125.5);
      ctx.bezierCurveTo(458.6, 115.7, 458.7, 107.3, 459.7, 94.3);
      ctx.lineTo(459.8, 94.1);
      ctx.lineTo(459.9, 94.1);
      ctx.bezierCurveTo(464.6, 92.7, 468.6, 91.6, 472.2, 90.6);
      ctx.bezierCurveTo(478.7, 88.9, 484.6, 88.1, 489.2, 88.1);
      ctx.bezierCurveTo(495.3, 88.1, 499.5, 89.6, 501.3, 92.5);
      ctx.bezierCurveTo(501.4, 92.6, 501.4, 92.6, 501.5, 92.6);
      ctx.bezierCurveTo(501.6, 92.6, 501.6, 92.4, 501.6, 92.1);
      ctx.bezierCurveTo(500.4, 87.6, 493.7, 86.6, 488.2, 86.6);
      ctx.bezierCurveTo(483.3, 86.6, 477.3, 87.4, 472.1, 88.6);
      ctx.lineTo(472.0, 88.7);
      ctx.bezierCurveTo(469.1, 89.5, 465.0, 90.6, 460.6, 91.9);
      ctx.lineTo(460.2, 92.1);
      ctx.lineTo(460.3, 91.6);
      ctx.bezierCurveTo(460.3, 91.2, 460.5, 91.0, 460.6, 90.8);
      ctx.bezierCurveTo(460.7, 90.6, 460.5, 90.1, 459.9, 89.8);
      ctx.bezierCurveTo(459.3, 89.4, 458.8, 89.2, 458.4, 89.4);
      ctx.bezierCurveTo(458.0, 90.1, 457.8, 91.2, 457.6, 92.7);
      ctx.lineTo(457.6, 92.9);
      ctx.lineTo(457.4, 93.0);
      ctx.bezierCurveTo(448.1, 95.9, 437.3, 99.8, 431.1, 102.5);
      ctx.lineTo(431.1, 102.5);
      ctx.lineTo(427.9, 103.7);
      ctx.bezierCurveTo(427.6, 104.3, 427.9, 104.8, 428.0, 105.0);
      ctx.bezierCurveTo(428.3, 105.3, 428.7, 105.5, 429.0, 105.4);
      ctx.bezierCurveTo(435.6, 102.4, 446.1, 98.5, 457.1, 95.0);
      ctx.lineTo(457.5, 94.9);
      ctx.lineTo(457.5, 95.3);
      ctx.bezierCurveTo(457.0, 102.1, 456.7, 108.9, 456.7, 117.5);
      ctx.bezierCurveTo(456.7, 120.5, 456.7, 123.7, 456.8, 127.3);
      ctx.lineTo(456.8, 127.6);
      ctx.lineTo(456.5, 127.6);
      ctx.bezierCurveTo(450.6, 127.8, 444.5, 128.2, 436.9, 128.9);
      ctx.bezierCurveTo(436.8, 128.9, 436.8, 129.0, 436.7, 129.0);
      ctx.bezierCurveTo(436.7, 129.1, 436.7, 129.3, 437.0, 129.6);
      ctx.lineTo(437.0, 129.6);
      ctx.bezierCurveTo(437.1, 129.7, 437.1, 129.8, 437.3, 129.9);
      ctx.lineTo(437.4, 130.0);
      ctx.lineTo(437.4, 130.1);
      ctx.bezierCurveTo(438.0, 130.4, 438.5, 130.5, 438.6, 130.4);
      ctx.lineTo(438.7, 130.4);
      ctx.lineTo(439.0, 130.4);
      ctx.bezierCurveTo(445.2, 132.1, 452.1, 137.5, 455.7, 143.5);
      ctx.bezierCurveTo(455.9, 143.8, 456.1, 144.2, 456.3, 144.6);
      ctx.bezierCurveTo(456.5, 144.9, 456.7, 145.3, 457.0, 145.7);
      ctx.lineTo(457.0, 145.8);
      ctx.lineTo(457.0, 145.9);
      ctx.bezierCurveTo(457.0, 147.8, 457.6, 158.2, 458.1, 159.6);
      ctx.lineTo(458.1, 159.7);
      ctx.bezierCurveTo(458.2, 159.8, 458.2, 159.8, 458.2, 159.9);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(456.9, 142.8);
      ctx.lineTo(456.4, 142.0);
      ctx.bezierCurveTo(453.1, 137.6, 447.9, 133.4, 442.5, 130.7);
      ctx.lineTo(441.5, 130.2);
      ctx.lineTo(442.6, 130.1);
      ctx.bezierCurveTo(447.1, 129.7, 451.9, 129.4, 456.4, 129.3);
      ctx.lineTo(456.7, 129.2);
      ctx.lineTo(456.9, 142.8);
      ctx.closePath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(443.7, 130.6);
      ctx.bezierCurveTo(448.6, 133.2, 453.2, 137.0, 456.3, 140.9);
      ctx.lineTo(456.2, 129.9);
      ctx.bezierCurveTo(452.1, 130.0, 447.8, 130.3, 443.7, 130.6);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(489.4, 136.3);
      ctx.bezierCurveTo(489.2, 135.6, 489.0, 134.9, 489.0, 134.2);
      ctx.bezierCurveTo(489.0, 130.9, 491.2, 127.6, 494.8, 127.5);
      ctx.bezierCurveTo(497.1, 127.5, 499.2, 129.7, 498.4, 131.8);
      ctx.bezierCurveTo(497.4, 134.2, 494.3, 135.9, 491.7, 135.9);
      ctx.bezierCurveTo(491.9, 137.3, 494.5, 139.6, 497.1, 139.6);
      ctx.bezierCurveTo(503.9, 139.6, 509.1, 134.5, 512.1, 131.3);
      ctx.bezierCurveTo(513.8, 129.5, 513.5, 131.2, 512.5, 133.3);
      ctx.bezierCurveTo(510.4, 137.5, 505.8, 141.1, 500.7, 141.4);
      ctx.bezierCurveTo(496.4, 141.6, 490.8, 140.8, 489.4, 136.3);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(491.6, 134.2);
      ctx.bezierCurveTo(494.7, 132.8, 496.8, 130.8, 496.0, 130.0);
      ctx.bezierCurveTo(494.4, 128.5, 491.6, 132.3, 491.6, 134.2);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(499.4, 141.7);
      ctx.bezierCurveTo(495.8, 141.7, 490.5, 140.9, 489.1, 136.4);
      ctx.bezierCurveTo(488.8, 135.6, 488.7, 134.9, 488.7, 134.2);
      ctx.bezierCurveTo(488.7, 130.9, 491.0, 127.4, 494.8, 127.2);
      ctx.bezierCurveTo(496.1, 127.2, 497.5, 127.9, 498.2, 129.0);
      ctx.bezierCurveTo(498.9, 129.9, 499.0, 131.0, 498.6, 131.9);
      ctx.bezierCurveTo(497.7, 134.4, 494.6, 136.0, 492.1, 136.2);
      ctx.bezierCurveTo(492.6, 137.4, 494.8, 139.4, 497.1, 139.4);
      ctx.bezierCurveTo(504.0, 139.4, 509.2, 134.0, 511.9, 131.1);
      ctx.bezierCurveTo(512.4, 130.6, 513.0, 130.1, 513.4, 130.4);
      ctx.bezierCurveTo(513.9, 130.7, 513.4, 132.2, 512.8, 133.4);
      ctx.bezierCurveTo(510.5, 138.0, 505.6, 141.4, 500.7, 141.7);
      ctx.bezierCurveTo(500.3, 141.7, 499.9, 141.7, 499.4, 141.7);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(494.8, 127.8);
      ctx.bezierCurveTo(491.4, 127.9, 489.3, 131.1, 489.3, 134.2);
      ctx.bezierCurveTo(489.3, 134.8, 489.4, 135.5, 489.7, 136.2);
      ctx.lineTo(489.7, 136.2);
      ctx.bezierCurveTo(491.2, 140.9, 497.2, 141.3, 500.7, 141.1);
      ctx.bezierCurveTo(505.4, 140.8, 510.1, 137.6, 512.2, 133.2);
      ctx.bezierCurveTo(512.8, 131.9, 513.0, 131.2, 513.0, 130.9);
      ctx.bezierCurveTo(512.9, 131.0, 512.7, 131.1, 512.3, 131.5);
      ctx.bezierCurveTo(509.7, 134.2, 504.3, 139.9, 497.1, 139.9);
      ctx.bezierCurveTo(494.3, 139.9, 491.7, 137.5, 491.4, 136.0);
      ctx.lineTo(491.4, 135.6);
      ctx.lineTo(491.7, 135.6);
      ctx.bezierCurveTo(494.3, 135.6, 497.2, 133.8, 498.1, 131.7);
      ctx.bezierCurveTo(498.4, 130.9, 498.3, 130.1, 497.7, 129.4);
      ctx.bezierCurveTo(497.1, 128.4, 495.9, 127.8, 494.8, 127.8);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(491.4, 134.6);
      ctx.lineTo(491.3, 134.2);
      ctx.bezierCurveTo(491.3, 132.6, 492.9, 130.2, 494.4, 129.5);
      ctx.bezierCurveTo(495.1, 129.2, 495.7, 129.3, 496.2, 129.8);
      ctx.bezierCurveTo(496.4, 130.0, 496.5, 130.3, 496.4, 130.6);
      ctx.bezierCurveTo(496.2, 131.7, 494.3, 133.3, 491.8, 134.4);
      ctx.lineTo(491.4, 134.6);
      ctx.closePath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(495.1, 129.9);
      ctx.bezierCurveTo(495.0, 129.9, 494.8, 130.0, 494.6, 130.1);
      ctx.bezierCurveTo(493.4, 130.6, 492.2, 132.4, 492.0, 133.7);
      ctx.bezierCurveTo(494.3, 132.5, 495.7, 131.2, 495.8, 130.5);
      ctx.bezierCurveTo(495.9, 130.3, 495.8, 130.3, 495.7, 130.2);
      ctx.bezierCurveTo(495.6, 130.0, 495.4, 129.9, 495.1, 129.9);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(513.0, 141.7);
      ctx.bezierCurveTo(511.6, 139.5, 511.1, 134.3, 511.1, 128.2);
      ctx.bezierCurveTo(511.1, 116.1, 513.2, 100.4, 514.1, 97.3);
      ctx.bezierCurveTo(514.2, 96.8, 514.6, 96.8, 515.3, 97.1);
      ctx.bezierCurveTo(516.1, 97.4, 516.7, 98.0, 516.7, 98.4);
      ctx.bezierCurveTo(516.2, 99.8, 514.1, 117.3, 514.1, 130.0);
      ctx.bezierCurveTo(514.1, 136.5, 514.7, 141.7, 516.3, 142.8);
      ctx.bezierCurveTo(520.1, 145.1, 529.0, 133.2, 530.1, 131.8);
      ctx.bezierCurveTo(530.8, 130.8, 530.9, 132.6, 530.6, 133.5);
      ctx.bezierCurveTo(529.3, 137.2, 523.5, 145.1, 518.9, 145.1);
      ctx.bezierCurveTo(516.5, 145.1, 514.5, 143.7, 513.0, 141.7);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(518.9, 145.4);
      ctx.bezierCurveTo(516.5, 145.4, 514.4, 144.1, 512.8, 141.9);
      ctx.lineTo(512.8, 141.9);
      ctx.bezierCurveTo(511.5, 139.8, 510.8, 135.2, 510.8, 128.2);
      ctx.bezierCurveTo(510.8, 116.1, 512.8, 100.4, 513.8, 97.2);
      ctx.bezierCurveTo(513.9, 96.9, 514.0, 96.8, 514.2, 96.7);
      ctx.bezierCurveTo(514.5, 96.5, 514.9, 96.6, 515.5, 96.8);
      ctx.bezierCurveTo(516.2, 97.2, 517.0, 97.8, 517.0, 98.4);
      ctx.lineTo(516.9, 98.5);
      ctx.bezierCurveTo(516.6, 99.7, 514.4, 117.1, 514.4, 130.0);
      ctx.bezierCurveTo(514.4, 139.7, 515.7, 142.0, 516.5, 142.5);
      ctx.bezierCurveTo(517.7, 143.3, 521.1, 143.0, 529.5, 132.0);
      ctx.lineTo(529.8, 131.6);
      ctx.bezierCurveTo(530.2, 131.2, 530.5, 131.2, 530.6, 131.3);
      ctx.bezierCurveTo(531.2, 131.5, 531.1, 133.0, 530.9, 133.6);
      ctx.bezierCurveTo(529.6, 137.2, 523.7, 145.4, 518.9, 145.4);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(513.3, 141.5);
      ctx.bezierCurveTo(514.7, 143.6, 516.7, 144.8, 518.9, 144.8);
      ctx.bezierCurveTo(523.1, 144.8, 529.0, 137.3, 530.4, 133.4);
      ctx.bezierCurveTo(530.5, 132.9, 530.5, 132.1, 530.4, 131.9);
      ctx.bezierCurveTo(530.4, 131.9, 530.3, 131.9, 530.3, 132.0);
      ctx.lineTo(530.0, 132.4);
      ctx.bezierCurveTo(523.3, 141.0, 518.7, 144.6, 516.1, 143.0);
      ctx.bezierCurveTo(514.6, 142.0, 513.8, 137.6, 513.8, 130.0);
      ctx.bezierCurveTo(513.8, 117.7, 515.9, 100.2, 516.4, 98.3);
      ctx.bezierCurveTo(516.3, 98.2, 515.9, 97.7, 515.2, 97.3);
      ctx.bezierCurveTo(514.8, 97.2, 514.6, 97.2, 514.5, 97.2);
      ctx.bezierCurveTo(514.4, 97.2, 514.4, 97.2, 514.4, 97.3);
      ctx.bezierCurveTo(513.5, 100.2, 511.4, 116.0, 511.4, 128.2);
      ctx.bezierCurveTo(511.4, 135.0, 512.0, 139.6, 513.3, 141.5);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(529.0, 132.8);
      ctx.bezierCurveTo(529.0, 130.5, 529.4, 128.2, 530.2, 127.0);
      ctx.bezierCurveTo(530.3, 126.6, 531.0, 126.5, 531.9, 126.8);
      ctx.bezierCurveTo(532.7, 127.1, 533.1, 127.6, 533.1, 128.0);
      ctx.bezierCurveTo(532.5, 128.6, 531.0, 136.9, 532.1, 137.8);
      ctx.bezierCurveTo(532.7, 138.3, 533.4, 138.5, 534.2, 138.5);
      ctx.bezierCurveTo(538.8, 138.5, 546.5, 132.6, 548.7, 130.4);
      ctx.bezierCurveTo(549.0, 130.1, 549.7, 130.6, 548.9, 132.2);
      ctx.bezierCurveTo(547.5, 134.7, 540.8, 140.5, 535.8, 140.7);
      ctx.bezierCurveTo(533.9, 140.8, 532.0, 140.4, 530.6, 138.8);
      ctx.bezierCurveTo(529.5, 137.7, 529.0, 135.2, 529.0, 132.8);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(531.2, 120.6);
      ctx.bezierCurveTo(531.3, 120.4, 531.8, 118.9, 532.0, 118.6);
      ctx.lineTo(532.1, 117.5);
      ctx.bezierCurveTo(532.1, 117.0, 532.9, 116.9, 533.6, 117.2);
      ctx.bezierCurveTo(534.6, 117.4, 535.2, 118.0, 535.0, 118.4);
      ctx.bezierCurveTo(535.0, 118.6, 535.0, 119.2, 534.8, 119.6);
      ctx.bezierCurveTo(534.7, 120.0, 534.1, 121.6, 533.9, 121.9);
      ctx.bezierCurveTo(533.6, 122.2, 532.8, 122.2, 532.1, 121.9);
      ctx.bezierCurveTo(531.2, 121.6, 530.8, 120.9, 531.2, 120.6);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(535.4, 141.0);
      ctx.bezierCurveTo(533.8, 141.0, 531.8, 140.7, 530.3, 139.0);
      ctx.bezierCurveTo(529.3, 137.9, 528.7, 135.6, 528.7, 132.8);
      ctx.bezierCurveTo(528.7, 130.4, 529.1, 128.1, 529.9, 126.9);
      ctx.bezierCurveTo(530.0, 126.7, 530.1, 126.6, 530.2, 126.5);
      ctx.bezierCurveTo(530.7, 126.2, 531.6, 126.4, 532.0, 126.5);
      ctx.bezierCurveTo(532.9, 126.8, 533.5, 127.5, 533.3, 128.1);
      ctx.lineTo(533.3, 128.2);
      ctx.lineTo(533.3, 128.2);
      ctx.bezierCurveTo(532.7, 128.8, 531.4, 136.8, 532.3, 137.6);
      ctx.bezierCurveTo(532.8, 138.0, 533.5, 138.2, 534.2, 138.2);
      ctx.bezierCurveTo(538.6, 138.2, 546.3, 132.4, 548.5, 130.2);
      ctx.bezierCurveTo(548.7, 130.0, 549.0, 130.0, 549.3, 130.2);
      ctx.bezierCurveTo(549.4, 130.3, 549.9, 130.8, 549.1, 132.3);
      ctx.bezierCurveTo(547.6, 135.1, 540.8, 140.8, 535.8, 141.0);
      ctx.bezierCurveTo(535.7, 141.0, 535.5, 141.0, 535.4, 141.0);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(531.0, 126.9);
      ctx.bezierCurveTo(530.7, 126.9, 530.5, 127.0, 530.5, 127.0);
      ctx.lineTo(530.5, 127.1);
      ctx.bezierCurveTo(529.7, 128.3, 529.3, 130.4, 529.3, 132.8);
      ctx.bezierCurveTo(529.3, 135.4, 529.8, 137.6, 530.8, 138.6);
      ctx.bezierCurveTo(532.2, 140.2, 534.3, 140.5, 535.8, 140.4);
      ctx.bezierCurveTo(540.9, 140.2, 547.3, 134.4, 548.6, 132.0);
      ctx.bezierCurveTo(549.1, 131.2, 549.0, 130.8, 549.0, 130.7);
      ctx.bezierCurveTo(548.9, 130.7, 548.9, 130.6, 548.9, 130.6);
      ctx.bezierCurveTo(546.6, 133.0, 538.8, 138.8, 534.2, 138.8);
      ctx.bezierCurveTo(533.3, 138.8, 532.6, 138.5, 531.9, 138.1);
      ctx.bezierCurveTo(531.6, 137.8, 531.5, 137.2, 531.4, 136.3);
      ctx.bezierCurveTo(531.3, 133.7, 532.2, 128.8, 532.8, 127.9);
      ctx.bezierCurveTo(532.7, 127.7, 532.4, 127.3, 531.8, 127.0);
      ctx.bezierCurveTo(531.5, 127.0, 531.2, 126.9, 531.0, 126.9);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(533.2, 122.4);
      ctx.bezierCurveTo(532.8, 122.4, 532.3, 122.3, 532.0, 122.1);
      ctx.bezierCurveTo(531.3, 121.9, 530.8, 121.5, 530.7, 121.0);
      ctx.bezierCurveTo(530.7, 120.8, 530.8, 120.6, 530.9, 120.4);
      ctx.bezierCurveTo(531.0, 120.2, 531.3, 119.5, 531.5, 119.0);
      ctx.bezierCurveTo(531.5, 118.8, 531.6, 118.6, 531.7, 118.5);
      ctx.lineTo(531.8, 117.4);
      ctx.bezierCurveTo(531.8, 117.3, 531.9, 117.1, 532.1, 116.9);
      ctx.bezierCurveTo(532.5, 116.7, 533.1, 116.7, 533.8, 116.9);
      ctx.bezierCurveTo(534.4, 117.1, 535.0, 117.4, 535.3, 117.9);
      ctx.bezierCurveTo(535.4, 118.1, 535.4, 118.3, 535.3, 118.4);
      ctx.bezierCurveTo(535.3, 118.7, 535.3, 119.3, 535.1, 119.7);
      ctx.bezierCurveTo(535.1, 119.8, 535.0, 119.9, 534.9, 120.1);
      ctx.bezierCurveTo(534.6, 121.0, 534.3, 121.8, 534.1, 122.1);
      ctx.bezierCurveTo(533.9, 122.3, 533.6, 122.4, 533.2, 122.4);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(532.9, 117.3);
      ctx.bezierCurveTo(532.7, 117.3, 532.5, 117.4, 532.4, 117.4);
      ctx.bezierCurveTo(532.4, 117.5, 532.4, 117.5, 532.4, 117.5);
      ctx.lineTo(532.2, 118.7);
      ctx.bezierCurveTo(532.2, 118.8, 532.1, 119.0, 532.0, 119.2);
      ctx.bezierCurveTo(531.7, 120.2, 531.5, 120.6, 531.4, 120.8);
      ctx.lineTo(531.3, 120.9);
      ctx.bezierCurveTo(531.3, 120.9, 531.3, 120.9, 531.3, 120.9);
      ctx.bezierCurveTo(531.4, 121.1, 531.6, 121.4, 532.2, 121.6);
      ctx.bezierCurveTo(532.8, 121.9, 533.5, 121.9, 533.6, 121.8);
      ctx.bezierCurveTo(533.8, 121.5, 534.2, 120.5, 534.4, 119.9);
      ctx.bezierCurveTo(534.4, 119.7, 534.5, 119.6, 534.5, 119.5);
      ctx.bezierCurveTo(534.7, 119.1, 534.7, 118.6, 534.7, 118.4);
      ctx.lineTo(534.8, 118.2);
      ctx.bezierCurveTo(534.8, 118.2, 534.8, 118.2, 534.7, 118.1);
      ctx.bezierCurveTo(534.6, 117.9, 534.2, 117.6, 533.6, 117.5);
      ctx.bezierCurveTo(533.3, 117.4, 533.1, 117.3, 532.9, 117.3);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(548.6, 140.4);
      ctx.bezierCurveTo(548.5, 140.4, 548.3, 140.4, 548.1, 140.3);
      ctx.bezierCurveTo(548.0, 140.3, 547.5, 140.1, 547.2, 139.5);
      ctx.bezierCurveTo(546.9, 138.8, 547.1, 138.5, 547.2, 138.3);
      ctx.bezierCurveTo(547.2, 138.3, 547.3, 138.2, 547.4, 138.2);
      ctx.lineTo(547.5, 138.1);
      ctx.bezierCurveTo(550.5, 136.4, 554.6, 134.2, 557.6, 131.6);
      ctx.lineTo(558.1, 131.2);
      ctx.lineTo(554.9, 131.6);
      ctx.bezierCurveTo(552.5, 131.9, 550.3, 132.1, 548.1, 132.2);
      ctx.bezierCurveTo(547.5, 132.2, 547.0, 131.7, 546.7, 131.2);
      ctx.bezierCurveTo(546.4, 130.5, 546.6, 130.0, 547.2, 130.0);
      ctx.bezierCurveTo(551.5, 129.8, 556.2, 129.1, 560.9, 128.6);
      ctx.bezierCurveTo(561.9, 128.5, 563.0, 129.8, 562.5, 130.5);
      ctx.bezierCurveTo(560.2, 133.4, 556.5, 135.8, 553.1, 137.7);
      ctx.lineTo(553.0, 137.8);
      ctx.lineTo(553.7, 137.8);
      ctx.bezierCurveTo(554.9, 137.7, 556.2, 137.7, 557.5, 137.7);
      ctx.bezierCurveTo(559.5, 137.7, 561.4, 137.8, 563.2, 138.2);
      ctx.bezierCurveTo(563.9, 138.3, 564.4, 138.9, 564.6, 139.5);
      ctx.bezierCurveTo(564.7, 140.1, 564.3, 140.5, 563.6, 140.4);
      ctx.bezierCurveTo(562.1, 140.0, 560.0, 139.9, 558.1, 139.9);
      ctx.bezierCurveTo(556.9, 139.9, 555.7, 139.9, 554.7, 140.0);
      ctx.lineTo(550.7, 140.2);
      ctx.bezierCurveTo(550.1, 140.3, 549.8, 140.4, 549.4, 140.4);
      ctx.lineTo(548.6, 140.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(563.8, 140.7);
      ctx.bezierCurveTo(563.7, 140.7, 563.7, 140.7, 563.6, 140.7);
      ctx.bezierCurveTo(562.2, 140.3, 560.2, 140.2, 558.1, 140.2);
      ctx.bezierCurveTo(556.9, 140.2, 555.8, 140.2, 554.7, 140.3);
      ctx.lineTo(550.7, 140.5);
      ctx.bezierCurveTo(550.5, 140.5, 550.4, 140.6, 550.3, 140.6);
      ctx.bezierCurveTo(549.9, 140.6, 549.7, 140.7, 549.4, 140.7);
      ctx.lineTo(548.6, 140.7);
      ctx.bezierCurveTo(548.5, 140.7, 548.3, 140.7, 548.1, 140.6);
      ctx.bezierCurveTo(547.8, 140.6, 547.3, 140.2, 546.9, 139.7);
      ctx.bezierCurveTo(546.6, 138.9, 546.8, 138.4, 546.9, 138.2);
      ctx.bezierCurveTo(546.9, 138.1, 547.1, 138.0, 547.2, 137.9);
      ctx.lineTo(547.3, 137.9);
      ctx.bezierCurveTo(547.9, 137.5, 548.5, 137.2, 549.1, 136.8);
      ctx.bezierCurveTo(551.8, 135.3, 554.7, 133.6, 557.1, 131.6);
      ctx.lineTo(554.9, 131.9);
      ctx.bezierCurveTo(552.2, 132.2, 550.1, 132.4, 548.1, 132.5);
      ctx.bezierCurveTo(547.4, 132.5, 546.7, 132.0, 546.5, 131.3);
      ctx.bezierCurveTo(546.3, 130.8, 546.2, 130.4, 546.4, 130.1);
      ctx.bezierCurveTo(546.6, 129.8, 546.8, 129.7, 547.2, 129.7);
      ctx.bezierCurveTo(550.2, 129.6, 553.4, 129.2, 556.8, 128.8);
      ctx.bezierCurveTo(558.1, 128.6, 559.5, 128.5, 560.8, 128.3);
      ctx.bezierCurveTo(561.6, 128.2, 562.3, 128.7, 562.7, 129.3);
      ctx.bezierCurveTo(563.0, 129.8, 563.0, 130.3, 562.7, 130.7);
      ctx.bezierCurveTo(560.9, 132.9, 558.1, 135.2, 554.1, 137.5);
      ctx.bezierCurveTo(555.2, 137.4, 556.4, 137.4, 557.5, 137.4);
      ctx.bezierCurveTo(559.3, 137.4, 561.4, 137.5, 563.3, 137.9);
      ctx.bezierCurveTo(564.2, 138.1, 564.7, 138.8, 564.9, 139.4);
      ctx.bezierCurveTo(564.9, 139.8, 564.8, 140.2, 564.6, 140.4);
      ctx.bezierCurveTo(564.5, 140.5, 564.2, 140.7, 563.8, 140.7);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(558.1, 139.6);
      ctx.bezierCurveTo(560.3, 139.6, 562.3, 139.8, 563.7, 140.1);
      ctx.bezierCurveTo(563.9, 140.1, 564.1, 140.1, 564.2, 140.0);
      ctx.bezierCurveTo(564.3, 139.8, 564.3, 139.7, 564.3, 139.5);
      ctx.bezierCurveTo(564.2, 139.1, 563.8, 138.6, 563.1, 138.5);
      ctx.bezierCurveTo(561.3, 138.1, 559.3, 138.0, 557.5, 138.0);
      ctx.bezierCurveTo(556.2, 138.0, 554.9, 138.0, 553.7, 138.1);
      ctx.lineTo(551.7, 138.1);
      ctx.lineTo(553.0, 137.5);
      ctx.bezierCurveTo(557.3, 135.0, 560.4, 132.6, 562.2, 130.3);
      ctx.bezierCurveTo(562.4, 130.1, 562.2, 129.7, 562.1, 129.6);
      ctx.bezierCurveTo(561.9, 129.2, 561.4, 128.8, 560.9, 128.9);
      ctx.bezierCurveTo(559.5, 129.0, 558.2, 129.2, 556.8, 129.4);
      ctx.bezierCurveTo(553.5, 129.8, 550.3, 130.2, 547.2, 130.3);
      ctx.bezierCurveTo(547.1, 130.3, 547.0, 130.3, 546.9, 130.4);
      ctx.bezierCurveTo(546.9, 130.5, 546.9, 130.7, 547.0, 131.0);
      ctx.bezierCurveTo(547.2, 131.5, 547.7, 131.9, 548.1, 131.9);
      ctx.bezierCurveTo(550.0, 131.8, 552.2, 131.6, 554.8, 131.3);
      ctx.lineTo(559.0, 130.8);
      ctx.lineTo(557.8, 131.8);
      ctx.bezierCurveTo(555.3, 134.0, 552.2, 135.8, 549.4, 137.3);
      ctx.bezierCurveTo(548.8, 137.7, 548.2, 138.0, 547.7, 138.3);
      ctx.lineTo(547.5, 138.5);
      ctx.lineTo(547.4, 138.5);
      ctx.bezierCurveTo(547.4, 138.6, 547.2, 138.9, 547.4, 139.4);
      ctx.bezierCurveTo(547.7, 139.8, 548.1, 140.0, 548.1, 140.0);
      ctx.lineTo(548.2, 140.0);
      ctx.bezierCurveTo(548.4, 140.1, 548.5, 140.1, 548.6, 140.1);
      ctx.lineTo(549.4, 140.1);
      ctx.bezierCurveTo(549.7, 140.1, 549.9, 140.0, 550.2, 140.0);
      ctx.bezierCurveTo(550.3, 140.0, 550.5, 140.0, 550.7, 139.9);
      ctx.lineTo(554.7, 139.7);
      ctx.bezierCurveTo(555.8, 139.6, 556.9, 139.6, 558.1, 139.6);
      ctx.fill();

      // capa1/CATLOGO 2024
      ctx.restore();
      ctx.font = "UltraItalic 22.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(25, 64, 141)";
      ctx.fillText("CATALOGO 2024", 52.0, 234.7);

      // capa1/Recortar grupo

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(4.4, 0.0);
      ctx.lineTo(616.4, 0.0);
      ctx.lineTo(616.4, 852.8);
      ctx.lineTo(4.4, 852.8);
      ctx.lineTo(4.4, 0.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(245.7, 234.0);
      ctx.lineTo(616.4, 234.0);
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = "rgb(14, 75, 154)";
      ctx.stroke();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(376.1, 821.7);
      ctx.bezierCurveTo(376.2, 821.8, 376.2, 821.8, 376.3, 821.8);
      ctx.bezierCurveTo(376.9, 821.8, 377.5, 821.8, 378.0, 821.8);
      ctx.bezierCurveTo(378.1, 821.8, 378.1, 821.8, 378.2, 821.8);
      ctx.lineTo(378.2, 820.2);
      ctx.lineTo(376.0, 820.2);
      ctx.bezierCurveTo(376.0, 820.7, 376.1, 821.2, 376.1, 821.7);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(376.5, 815.6);
      ctx.lineTo(378.2, 815.6);
      ctx.lineTo(378.2, 812.9);
      ctx.bezierCurveTo(377.3, 813.6, 376.9, 814.6, 376.5, 815.6);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(378.2, 825.9);
      ctx.lineTo(378.2, 823.3);
      ctx.lineTo(376.6, 823.3);
      ctx.bezierCurveTo(376.7, 824.1, 377.7, 825.7, 378.2, 825.9);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(374.7, 817.0);
      ctx.bezierCurveTo(374.0, 817.0, 373.4, 817.0, 372.7, 817.0);
      ctx.bezierCurveTo(372.7, 817.0, 372.6, 817.1, 372.6, 817.1);
      ctx.bezierCurveTo(372.4, 817.6, 372.3, 818.1, 372.2, 818.7);
      ctx.lineTo(374.5, 818.7);
      ctx.bezierCurveTo(374.6, 818.1, 374.6, 817.6, 374.7, 817.0);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(374.7, 821.8);
      ctx.bezierCurveTo(374.6, 821.3, 374.6, 820.7, 374.5, 820.2);
      ctx.lineTo(372.2, 820.2);
      ctx.bezierCurveTo(372.3, 820.7, 372.5, 821.2, 372.6, 821.7);
      ctx.bezierCurveTo(372.6, 821.8, 372.7, 821.8, 372.8, 821.8);
      ctx.bezierCurveTo(373.4, 821.8, 373.9, 821.8, 374.5, 821.8);
      ctx.bezierCurveTo(374.5, 821.8, 374.6, 821.8, 374.7, 821.8);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(383.2, 817.0);
      ctx.bezierCurveTo(383.2, 817.6, 383.3, 818.1, 383.3, 818.7);
      ctx.lineTo(385.6, 818.7);
      ctx.bezierCurveTo(385.5, 818.2, 385.4, 817.7, 385.2, 817.2);
      ctx.bezierCurveTo(385.2, 817.0, 385.1, 817.0, 385.0, 817.0);
      ctx.bezierCurveTo(384.5, 817.0, 383.9, 817.0, 383.3, 817.0);
      ctx.bezierCurveTo(383.3, 817.0, 383.2, 817.0, 383.2, 817.0);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(373.4, 815.5);
      ctx.bezierCurveTo(373.5, 815.6, 373.5, 815.6, 373.5, 815.6);
      ctx.bezierCurveTo(373.8, 815.6, 374.1, 815.6, 374.4, 815.6);
      ctx.bezierCurveTo(374.6, 815.6, 374.8, 815.6, 375.0, 815.5);
      ctx.bezierCurveTo(375.1, 815.5, 375.1, 815.2, 375.2, 815.0);
      ctx.bezierCurveTo(375.4, 814.5, 375.6, 814.0, 375.8, 813.5);
      ctx.bezierCurveTo(374.9, 814.0, 374.1, 814.7, 373.4, 815.5);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(374.9, 823.3);
      ctx.bezierCurveTo(374.4, 823.3, 373.9, 823.3, 373.4, 823.3);
      ctx.bezierCurveTo(374.1, 824.2, 374.9, 824.9, 375.8, 825.4);
      ctx.bezierCurveTo(375.5, 824.7, 375.3, 824.1, 375.0, 823.4);
      ctx.bezierCurveTo(375.0, 823.4, 375.0, 823.3, 374.9, 823.3);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(376.3, 817.0);
      ctx.bezierCurveTo(376.2, 817.0, 376.2, 817.1, 376.2, 817.1);
      ctx.bezierCurveTo(376.1, 817.6, 376.0, 818.1, 376.0, 818.7);
      ctx.lineTo(378.2, 818.7);
      ctx.lineTo(378.2, 817.0);
      ctx.bezierCurveTo(377.5, 817.0, 376.9, 817.0, 376.3, 817.0);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(379.7, 821.8);
      ctx.bezierCurveTo(379.7, 821.8, 379.7, 821.8, 379.7, 821.8);
      ctx.bezierCurveTo(380.3, 821.8, 380.9, 821.8, 381.6, 821.8);
      ctx.bezierCurveTo(381.6, 821.8, 381.7, 821.8, 381.7, 821.8);
      ctx.bezierCurveTo(381.7, 821.2, 381.8, 820.7, 381.9, 820.2);
      ctx.lineTo(379.7, 820.2);
      ctx.lineTo(379.7, 821.8);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(382.9, 823.3);
      ctx.bezierCurveTo(382.9, 823.3, 382.8, 823.4, 382.8, 823.4);
      ctx.bezierCurveTo(382.7, 823.6, 382.7, 823.8, 382.6, 823.9);
      ctx.bezierCurveTo(382.4, 824.4, 382.2, 824.9, 382.0, 825.4);
      ctx.bezierCurveTo(383.0, 824.9, 383.8, 824.2, 384.4, 823.3);
      ctx.bezierCurveTo(383.9, 823.3, 383.4, 823.3, 382.9, 823.3);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(378.9, 808.5);
      ctx.bezierCurveTo(372.9, 808.5, 368.0, 813.4, 368.0, 819.4);
      ctx.bezierCurveTo(368.0, 825.5, 372.9, 830.4, 378.9, 830.4);
      ctx.bezierCurveTo(385.0, 830.4, 389.9, 825.5, 389.9, 819.4);
      ctx.bezierCurveTo(389.9, 813.4, 385.0, 808.5, 378.9, 808.5);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(378.9, 827.6);
      ctx.bezierCurveTo(374.4, 827.6, 370.7, 823.9, 370.7, 819.4);
      ctx.bezierCurveTo(370.7, 814.9, 374.4, 811.2, 378.9, 811.2);
      ctx.bezierCurveTo(383.4, 811.3, 387.1, 814.9, 387.1, 819.4);
      ctx.bezierCurveTo(387.1, 824.0, 383.4, 827.6, 378.9, 827.6);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(382.9, 815.6);
      ctx.bezierCurveTo(383.4, 815.6, 383.9, 815.6, 384.4, 815.6);
      ctx.bezierCurveTo(383.8, 814.7, 383.0, 814.0, 382.1, 813.5);
      ctx.bezierCurveTo(382.3, 814.1, 382.5, 814.8, 382.8, 815.5);
      ctx.bezierCurveTo(382.8, 815.5, 382.9, 815.6, 382.9, 815.6);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(383.2, 821.8);
      ctx.lineTo(384.9, 821.8);
      ctx.bezierCurveTo(385.2, 821.8, 385.2, 821.8, 385.3, 821.5);
      ctx.bezierCurveTo(385.4, 821.1, 385.5, 820.6, 385.6, 820.2);
      ctx.lineTo(383.3, 820.2);
      ctx.bezierCurveTo(383.3, 820.7, 383.2, 821.3, 383.2, 821.8);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(379.7, 817.0);
      ctx.lineTo(379.7, 818.7);
      ctx.lineTo(381.9, 818.7);
      ctx.bezierCurveTo(381.8, 818.3, 381.8, 817.8, 381.7, 817.4);
      ctx.bezierCurveTo(381.7, 817.0, 381.7, 817.0, 381.3, 817.0);
      ctx.lineTo(379.7, 817.0);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(379.7, 825.9);
      ctx.bezierCurveTo(380.5, 825.2, 381.0, 824.3, 381.3, 823.3);
      ctx.lineTo(379.7, 823.3);
      ctx.lineTo(379.7, 825.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(379.7, 812.9);
      ctx.lineTo(379.7, 815.6);
      ctx.lineTo(381.3, 815.6);
      ctx.bezierCurveTo(380.9, 814.6, 380.5, 813.6, 379.7, 812.9);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(139.8, 810.1);
      ctx.lineTo(141.2, 810.1);
      ctx.bezierCurveTo(141.2, 810.1, 141.3, 810.1, 141.3, 810.1);
      ctx.bezierCurveTo(143.0, 810.2, 144.5, 810.7, 145.9, 811.5);
      ctx.bezierCurveTo(149.2, 813.6, 151.0, 816.6, 151.2, 820.5);
      ctx.bezierCurveTo(151.3, 822.5, 150.7, 824.4, 149.7, 826.2);
      ctx.bezierCurveTo(148.0, 828.9, 145.6, 830.6, 142.4, 831.2);
      ctx.bezierCurveTo(142.0, 831.3, 141.6, 831.3, 141.2, 831.4);
      ctx.lineTo(139.8, 831.4);
      ctx.bezierCurveTo(139.6, 831.4, 139.3, 831.3, 139.1, 831.3);
      ctx.bezierCurveTo(136.9, 831.0, 135.1, 830.2, 133.5, 828.7);
      ctx.bezierCurveTo(131.6, 827.1, 130.5, 825.0, 130.0, 822.6);
      ctx.bezierCurveTo(129.9, 822.2, 129.9, 821.8, 129.9, 821.4);
      ctx.lineTo(129.9, 820.1);
      ctx.bezierCurveTo(129.9, 819.8, 129.9, 819.6, 130.0, 819.3);
      ctx.bezierCurveTo(130.3, 817.0, 131.3, 815.0, 132.9, 813.3);
      ctx.bezierCurveTo(134.5, 811.7, 136.4, 810.6, 138.7, 810.2);
      ctx.bezierCurveTo(139.1, 810.2, 139.5, 810.1, 139.8, 810.1);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(143.3, 817.1);
      ctx.lineTo(143.3, 815.0);
      ctx.bezierCurveTo(143.3, 814.9, 143.3, 814.9, 143.3, 814.9);
      ctx.bezierCurveTo(142.5, 814.9, 141.7, 814.9, 141.0, 815.0);
      ctx.bezierCurveTo(140.0, 815.0, 139.3, 815.6, 139.0, 816.5);
      ctx.bezierCurveTo(138.9, 816.8, 138.9, 817.2, 138.9, 817.6);
      ctx.bezierCurveTo(138.8, 818.0, 138.9, 818.5, 138.9, 818.9);
      ctx.lineTo(137.7, 818.9);
      ctx.lineTo(137.7, 821.1);
      ctx.lineTo(138.9, 821.1);
      ctx.lineTo(138.9, 827.3);
      ctx.lineTo(141.4, 827.3);
      ctx.lineTo(141.4, 821.1);
      ctx.lineTo(143.2, 821.1);
      ctx.bezierCurveTo(143.2, 820.4, 143.3, 819.7, 143.4, 818.9);
      ctx.lineTo(141.5, 818.9);
      ctx.bezierCurveTo(141.4, 818.9, 141.4, 818.9, 141.4, 818.9);
      ctx.bezierCurveTo(141.4, 818.5, 141.4, 818.1, 141.4, 817.8);
      ctx.bezierCurveTo(141.4, 817.2, 141.6, 817.1, 142.2, 817.1);
      ctx.bezierCurveTo(142.5, 817.1, 142.9, 817.1, 143.3, 817.1);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(113.7, 810.1);
      ctx.lineTo(115.0, 810.1);
      ctx.bezierCurveTo(115.1, 810.1, 115.1, 810.1, 115.2, 810.1);
      ctx.bezierCurveTo(116.8, 810.2, 118.4, 810.7, 119.8, 811.6);
      ctx.bezierCurveTo(122.5, 813.3, 124.2, 815.7, 124.8, 818.9);
      ctx.bezierCurveTo(124.9, 819.3, 124.9, 819.7, 125.0, 820.1);
      ctx.lineTo(125.0, 821.4);
      ctx.bezierCurveTo(125.0, 821.5, 125.0, 821.7, 124.9, 821.8);
      ctx.bezierCurveTo(124.7, 823.9, 123.9, 825.8, 122.6, 827.5);
      ctx.bezierCurveTo(120.9, 829.5, 118.8, 830.8, 116.2, 831.2);
      ctx.bezierCurveTo(115.8, 831.3, 115.4, 831.3, 115.0, 831.4);
      ctx.lineTo(113.7, 831.4);
      ctx.bezierCurveTo(113.4, 831.4, 113.1, 831.3, 112.9, 831.3);
      ctx.bezierCurveTo(110.9, 831.0, 109.2, 830.3, 107.6, 829.0);
      ctx.bezierCurveTo(105.6, 827.3, 104.3, 825.2, 103.8, 822.6);
      ctx.bezierCurveTo(103.8, 822.2, 103.7, 821.8, 103.7, 821.4);
      ctx.lineTo(103.7, 820.1);
      ctx.bezierCurveTo(103.7, 819.9, 103.7, 819.8, 103.7, 819.7);
      ctx.bezierCurveTo(104.0, 817.4, 104.8, 815.4, 106.3, 813.7);
      ctx.bezierCurveTo(108.0, 811.8, 110.0, 810.7, 112.5, 810.2);
      ctx.bezierCurveTo(112.9, 810.2, 113.3, 810.1, 113.7, 810.1);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(114.4, 814.6);
      ctx.bezierCurveTo(114.4, 814.6, 114.3, 814.6, 114.3, 814.7);
      ctx.bezierCurveTo(113.5, 814.7, 112.6, 814.6, 111.7, 814.7);
      ctx.bezierCurveTo(111.0, 814.7, 110.3, 814.8, 109.7, 815.3);
      ctx.bezierCurveTo(108.7, 815.9, 108.3, 816.9, 108.3, 818.1);
      ctx.bezierCurveTo(108.2, 819.9, 108.2, 821.6, 108.3, 823.4);
      ctx.bezierCurveTo(108.3, 824.1, 108.4, 824.8, 108.8, 825.4);
      ctx.bezierCurveTo(109.5, 826.4, 110.5, 826.8, 111.7, 826.8);
      ctx.bezierCurveTo(113.4, 826.8, 115.2, 826.8, 117.0, 826.8);
      ctx.bezierCurveTo(118.0, 826.8, 118.8, 826.5, 119.5, 825.7);
      ctx.bezierCurveTo(120.1, 825.1, 120.4, 824.2, 120.4, 823.4);
      ctx.bezierCurveTo(120.4, 821.9, 120.4, 820.4, 120.4, 819.0);
      ctx.bezierCurveTo(120.4, 818.6, 120.4, 818.1, 120.4, 817.7);
      ctx.bezierCurveTo(120.2, 816.0, 119.0, 814.8, 117.4, 814.7);
      ctx.bezierCurveTo(116.4, 814.6, 115.4, 814.6, 114.4, 814.6);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(114.3, 825.8);
      ctx.bezierCurveTo(113.4, 825.8, 112.5, 825.8, 111.6, 825.7);
      ctx.bezierCurveTo(110.3, 825.6, 109.4, 824.8, 109.4, 823.5);
      ctx.bezierCurveTo(109.3, 821.6, 109.3, 819.8, 109.4, 817.9);
      ctx.bezierCurveTo(109.4, 817.1, 109.8, 816.5, 110.5, 816.1);
      ctx.bezierCurveTo(110.9, 815.8, 111.4, 815.8, 111.9, 815.8);
      ctx.bezierCurveTo(113.6, 815.8, 115.4, 815.7, 117.1, 815.8);
      ctx.bezierCurveTo(118.4, 815.8, 119.2, 816.7, 119.3, 818.0);
      ctx.bezierCurveTo(119.3, 819.8, 119.3, 821.7, 119.3, 823.5);
      ctx.bezierCurveTo(119.2, 824.8, 118.4, 825.6, 117.1, 825.7);
      ctx.bezierCurveTo(116.7, 825.7, 116.2, 825.7, 115.7, 825.8);
      ctx.bezierCurveTo(115.3, 825.8, 114.8, 825.8, 114.3, 825.8);
      ctx.bezierCurveTo(114.3, 825.8, 114.3, 825.8, 114.3, 825.8);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(117.5, 820.7);
      ctx.bezierCurveTo(117.5, 819.0, 116.1, 817.6, 114.3, 817.6);
      ctx.bezierCurveTo(112.6, 817.6, 111.2, 819.0, 111.2, 820.7);
      ctx.bezierCurveTo(111.2, 822.5, 112.6, 823.9, 114.3, 823.9);
      ctx.bezierCurveTo(116.1, 823.9, 117.5, 822.5, 117.5, 820.7);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(118.3, 817.5);
      ctx.bezierCurveTo(118.3, 817.1, 118.0, 816.7, 117.6, 816.7);
      ctx.bezierCurveTo(117.2, 816.7, 116.9, 817.1, 116.9, 817.5);
      ctx.bezierCurveTo(116.9, 817.9, 117.2, 818.2, 117.6, 818.2);
      ctx.bezierCurveTo(118.0, 818.2, 118.3, 817.9, 118.3, 817.5);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(114.3, 818.7);
      ctx.bezierCurveTo(115.5, 818.7, 116.4, 819.6, 116.4, 820.7);
      ctx.bezierCurveTo(116.4, 821.9, 115.5, 822.8, 114.3, 822.8);
      ctx.bezierCurveTo(113.2, 822.8, 112.3, 821.9, 112.3, 820.7);
      ctx.bezierCurveTo(112.3, 819.6, 113.2, 818.7, 114.3, 818.7);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(193.8, 831.7);
      ctx.lineTo(192.0, 831.7);
      ctx.bezierCurveTo(191.5, 831.7, 191.1, 831.6, 190.7, 831.5);
      ctx.bezierCurveTo(185.3, 830.4, 181.6, 825.2, 182.3, 819.7);
      ctx.bezierCurveTo(182.6, 817.4, 183.5, 815.4, 185.2, 813.7);
      ctx.bezierCurveTo(187.9, 810.9, 191.2, 809.8, 195.1, 810.7);
      ctx.bezierCurveTo(199.1, 811.5, 201.8, 814.0, 203.1, 818.0);
      ctx.bezierCurveTo(203.3, 818.7, 203.4, 819.4, 203.5, 820.2);
      ctx.lineTo(203.5, 822.0);
      ctx.bezierCurveTo(203.5, 822.3, 203.5, 822.7, 203.4, 823.0);
      ctx.bezierCurveTo(202.5, 827.3, 199.9, 830.0, 195.7, 831.4);
      ctx.bezierCurveTo(195.1, 831.6, 194.5, 831.6, 193.8, 831.7);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(193.2, 819.4);
      ctx.lineTo(193.2, 819.4);
      ctx.bezierCurveTo(193.2, 820.7, 193.2, 822.0, 193.2, 823.3);
      ctx.bezierCurveTo(193.2, 823.4, 193.2, 823.6, 193.2, 823.7);
      ctx.bezierCurveTo(193.0, 824.6, 192.2, 825.2, 191.2, 825.2);
      ctx.bezierCurveTo(190.4, 825.2, 189.6, 824.4, 189.6, 823.6);
      ctx.bezierCurveTo(189.5, 822.7, 190.1, 821.8, 191.0, 821.6);
      ctx.bezierCurveTo(191.2, 821.6, 191.4, 821.5, 191.7, 821.6);
      ctx.bezierCurveTo(191.8, 821.6, 191.9, 821.6, 191.9, 821.4);
      ctx.bezierCurveTo(191.9, 820.9, 191.9, 820.4, 191.9, 819.9);
      ctx.bezierCurveTo(191.9, 819.7, 191.8, 819.7, 191.7, 819.7);
      ctx.bezierCurveTo(191.4, 819.7, 191.1, 819.7, 190.7, 819.7);
      ctx.bezierCurveTo(188.7, 820.0, 187.4, 821.9, 187.6, 823.9);
      ctx.bezierCurveTo(187.9, 825.9, 189.8, 827.4, 192.0, 827.1);
      ctx.bezierCurveTo(193.9, 826.8, 195.2, 825.1, 195.1, 823.3);
      ctx.bezierCurveTo(195.1, 822.0, 195.1, 820.6, 195.1, 819.3);
      ctx.bezierCurveTo(195.1, 819.2, 195.1, 819.2, 195.1, 819.1);
      ctx.bezierCurveTo(195.1, 819.0, 195.2, 819.0, 195.3, 819.0);
      ctx.bezierCurveTo(195.3, 819.1, 195.4, 819.1, 195.4, 819.1);
      ctx.bezierCurveTo(196.2, 819.6, 197.0, 819.9, 197.9, 820.0);
      ctx.bezierCurveTo(198.1, 820.0, 198.2, 819.9, 198.2, 819.7);
      ctx.bezierCurveTo(198.2, 819.3, 198.2, 818.9, 198.2, 818.5);
      ctx.bezierCurveTo(198.2, 818.1, 198.2, 818.1, 197.8, 818.0);
      ctx.bezierCurveTo(197.8, 818.0, 197.8, 818.0, 197.8, 818.0);
      ctx.bezierCurveTo(196.3, 817.8, 195.4, 816.8, 195.1, 815.2);
      ctx.bezierCurveTo(195.1, 815.1, 195.1, 815.0, 194.9, 815.0);
      ctx.bezierCurveTo(194.4, 815.0, 193.9, 815.0, 193.5, 815.0);
      ctx.bezierCurveTo(193.2, 815.0, 193.2, 815.0, 193.2, 815.3);
      ctx.bezierCurveTo(193.2, 816.7, 193.2, 818.0, 193.2, 819.4);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(161.9, 815.4);
      ctx.lineTo(169.8, 826.0);
      ctx.lineTo(171.6, 826.0);
      ctx.lineTo(163.6, 815.4);
      ctx.lineTo(161.9, 815.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(166.7, 810.1);
      ctx.bezierCurveTo(160.8, 810.1, 156.1, 814.9, 156.1, 820.7);
      ctx.bezierCurveTo(156.1, 826.6, 160.8, 831.4, 166.7, 831.4);
      ctx.bezierCurveTo(172.6, 831.4, 177.3, 826.6, 177.3, 820.7);
      ctx.bezierCurveTo(177.3, 814.9, 172.6, 810.1, 166.7, 810.1);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(169.4, 826.9);
      ctx.lineTo(165.7, 822.1);
      ctx.lineTo(161.3, 826.9);
      ctx.lineTo(160.1, 826.9);
      ctx.lineTo(165.2, 821.4);
      ctx.lineTo(160.2, 814.6);
      ctx.lineTo(164.1, 814.6);
      ctx.lineTo(167.4, 819.0);
      ctx.lineTo(171.5, 814.6);
      ctx.lineTo(172.7, 814.6);
      ctx.lineTo(167.9, 819.7);
      ctx.lineTo(173.3, 826.9);
      ctx.lineTo(169.4, 826.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(171.6, 826.0);
      ctx.lineTo(169.8, 826.0);
      ctx.lineTo(161.9, 815.4);
      ctx.lineTo(163.6, 815.4);
      ctx.lineTo(171.6, 826.0);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(220.9, 815.4);
      ctx.bezierCurveTo(220.2, 814.7, 219.3, 814.2, 218.4, 813.9);
      ctx.bezierCurveTo(217.5, 813.5, 216.5, 813.3, 215.4, 813.3);
      ctx.bezierCurveTo(214.3, 813.3, 213.3, 813.5, 212.4, 813.9);
      ctx.bezierCurveTo(211.5, 814.3, 210.6, 814.9, 209.9, 815.6);
      ctx.bezierCurveTo(209.3, 816.3, 208.7, 817.1, 208.3, 818.0);
      ctx.bezierCurveTo(207.9, 818.9, 207.7, 820.0, 207.7, 821.0);
      ctx.bezierCurveTo(207.7, 822.0, 207.9, 823.0, 208.3, 824.0);
      ctx.bezierCurveTo(208.7, 824.9, 209.2, 825.7, 209.9, 826.4);
      ctx.bezierCurveTo(210.6, 827.1, 211.5, 827.7, 212.4, 828.1);
      ctx.bezierCurveTo(213.4, 828.5, 214.4, 828.7, 215.6, 828.7);
      ctx.bezierCurveTo(216.5, 828.7, 217.3, 828.5, 218.1, 828.3);
      ctx.bezierCurveTo(218.8, 828.1, 219.5, 827.8, 220.2, 827.3);
      ctx.lineTo(220.3, 827.3);
      ctx.lineTo(219.9, 826.6);
      ctx.lineTo(219.8, 826.7);
      ctx.bezierCurveTo(219.1, 827.1, 218.5, 827.3, 217.8, 827.5);
      ctx.bezierCurveTo(217.2, 827.7, 216.4, 827.8, 215.6, 827.8);
      ctx.bezierCurveTo(214.5, 827.8, 213.6, 827.6, 212.7, 827.3);
      ctx.bezierCurveTo(211.9, 826.9, 211.2, 826.4, 210.5, 825.8);
      ctx.bezierCurveTo(209.9, 825.2, 209.4, 824.5, 209.1, 823.7);
      ctx.bezierCurveTo(208.8, 822.8, 208.6, 821.9, 208.6, 821.0);
      ctx.bezierCurveTo(208.6, 820.1, 208.8, 819.2, 209.1, 818.3);
      ctx.bezierCurveTo(209.4, 817.5, 209.9, 816.8, 210.5, 816.2);
      ctx.bezierCurveTo(211.1, 815.5, 211.9, 815.0, 212.7, 814.7);
      ctx.bezierCurveTo(213.5, 814.3, 214.4, 814.1, 215.4, 814.1);
      ctx.bezierCurveTo(216.4, 814.1, 217.3, 814.3, 218.1, 814.7);
      ctx.bezierCurveTo(218.9, 815.0, 219.7, 815.5, 220.3, 816.1);
      ctx.bezierCurveTo(220.9, 816.6, 221.3, 817.3, 221.7, 818.0);
      ctx.bezierCurveTo(222.0, 818.7, 222.2, 819.5, 222.2, 820.3);
      ctx.bezierCurveTo(222.2, 820.9, 222.1, 821.4, 222.0, 821.8);
      ctx.bezierCurveTo(221.9, 822.3, 221.7, 822.6, 221.4, 822.9);
      ctx.bezierCurveTo(221.2, 823.2, 221.0, 823.4, 220.7, 823.5);
      ctx.bezierCurveTo(220.4, 823.6, 220.1, 823.7, 219.9, 823.7);
      ctx.bezierCurveTo(219.4, 823.7, 219.1, 823.6, 218.8, 823.4);
      ctx.bezierCurveTo(218.6, 823.1, 218.5, 822.8, 218.5, 822.3);
      ctx.bezierCurveTo(218.5, 822.2, 218.5, 821.9, 218.6, 821.1);
      ctx.lineTo(219.3, 817.3);
      ctx.lineTo(218.2, 817.2);
      ctx.lineTo(218.0, 818.3);
      ctx.bezierCurveTo(217.9, 818.2, 217.8, 818.1, 217.8, 818.0);
      ctx.bezierCurveTo(217.6, 817.8, 217.4, 817.6, 217.2, 817.5);
      ctx.bezierCurveTo(217.0, 817.3, 216.7, 817.2, 216.4, 817.1);
      ctx.bezierCurveTo(216.2, 817.0, 215.8, 817.0, 215.5, 817.0);
      ctx.bezierCurveTo(215.0, 817.0, 214.5, 817.1, 214.0, 817.3);
      ctx.bezierCurveTo(213.5, 817.5, 213.0, 817.8, 212.6, 818.2);
      ctx.bezierCurveTo(212.2, 818.6, 211.9, 819.1, 211.7, 819.6);
      ctx.bezierCurveTo(211.4, 820.2, 211.3, 820.8, 211.3, 821.4);
      ctx.bezierCurveTo(211.3, 821.9, 211.4, 822.3, 211.6, 822.7);
      ctx.bezierCurveTo(211.7, 823.1, 212.0, 823.4, 212.2, 823.7);
      ctx.bezierCurveTo(212.5, 824.0, 212.9, 824.2, 213.3, 824.4);
      ctx.bezierCurveTo(214.0, 824.7, 214.8, 824.7, 215.5, 824.5);
      ctx.bezierCurveTo(215.8, 824.4, 216.0, 824.3, 216.3, 824.1);
      ctx.bezierCurveTo(216.5, 824.0, 216.8, 823.8, 217.0, 823.6);
      ctx.bezierCurveTo(217.1, 823.4, 217.3, 823.3, 217.4, 823.2);
      ctx.bezierCurveTo(217.6, 823.6, 217.8, 823.9, 218.2, 824.2);
      ctx.bezierCurveTo(218.6, 824.5, 219.2, 824.6, 219.8, 824.6);
      ctx.bezierCurveTo(220.2, 824.6, 220.6, 824.5, 221.0, 824.4);
      ctx.bezierCurveTo(221.4, 824.2, 221.7, 823.9, 222.0, 823.6);
      ctx.bezierCurveTo(222.3, 823.2, 222.6, 822.8, 222.8, 822.2);
      ctx.bezierCurveTo(223.0, 821.7, 223.1, 821.0, 223.1, 820.3);
      ctx.bezierCurveTo(223.1, 819.3, 222.9, 818.5, 222.5, 817.6);
      ctx.bezierCurveTo(222.1, 816.8, 221.5, 816.0, 220.9, 815.4);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(217.6, 820.3);
      ctx.bezierCurveTo(217.6, 820.7, 217.5, 821.1, 217.4, 821.5);
      ctx.bezierCurveTo(217.2, 821.9, 217.0, 822.2, 216.7, 822.5);
      ctx.bezierCurveTo(216.4, 822.8, 216.1, 823.1, 215.7, 823.2);
      ctx.bezierCurveTo(215.4, 823.4, 215.0, 823.5, 214.6, 823.5);
      ctx.bezierCurveTo(214.0, 823.5, 213.5, 823.3, 213.1, 822.9);
      ctx.bezierCurveTo(212.7, 822.6, 212.5, 822.0, 212.5, 821.3);
      ctx.bezierCurveTo(212.5, 820.9, 212.6, 820.4, 212.7, 820.0);
      ctx.bezierCurveTo(212.9, 819.6, 213.1, 819.3, 213.4, 819.0);
      ctx.bezierCurveTo(213.7, 818.7, 214.0, 818.5, 214.4, 818.3);
      ctx.bezierCurveTo(214.7, 818.2, 215.1, 818.1, 215.5, 818.1);
      ctx.bezierCurveTo(215.8, 818.1, 216.1, 818.1, 216.3, 818.2);
      ctx.bezierCurveTo(216.6, 818.4, 216.8, 818.5, 217.0, 818.7);
      ctx.bezierCurveTo(217.2, 818.9, 217.3, 819.2, 217.4, 819.4);
      ctx.bezierCurveTo(217.5, 819.7, 217.6, 820.0, 217.6, 820.3);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(224.6, 814.6);
      ctx.lineTo(228.8, 814.6);
      ctx.lineTo(228.8, 825.9);
      ctx.lineTo(230.0, 825.9);
      ctx.lineTo(230.0, 814.6);
      ctx.lineTo(234.2, 814.6);
      ctx.lineTo(234.2, 813.5);
      ctx.lineTo(224.6, 813.5);
      ctx.lineTo(224.6, 814.6);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(235.8, 814.8);
      ctx.lineTo(237.1, 814.8);
      ctx.lineTo(237.1, 813.3);
      ctx.lineTo(235.8, 813.3);
      ctx.lineTo(235.8, 814.8);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(235.9, 825.9);
      ctx.lineTo(237.0, 825.9);
      ctx.lineTo(237.0, 816.8);
      ctx.lineTo(235.9, 816.8);
      ctx.lineTo(235.9, 825.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(246.9, 818.0);
      ctx.bezierCurveTo(246.5, 817.5, 246.0, 817.2, 245.5, 816.9);
      ctx.bezierCurveTo(245.0, 816.7, 244.4, 816.6, 243.8, 816.6);
      ctx.bezierCurveTo(243.2, 816.6, 242.6, 816.7, 242.1, 817.0);
      ctx.bezierCurveTo(241.6, 817.2, 241.1, 817.5, 240.7, 818.0);
      ctx.bezierCurveTo(240.3, 818.4, 240.0, 818.9, 239.8, 819.5);
      ctx.bezierCurveTo(239.6, 820.0, 239.5, 820.7, 239.5, 821.3);
      ctx.bezierCurveTo(239.5, 822.0, 239.6, 822.7, 239.8, 823.3);
      ctx.bezierCurveTo(240.1, 823.9, 240.4, 824.4, 240.8, 824.8);
      ctx.bezierCurveTo(241.2, 825.2, 241.7, 825.5, 242.2, 825.7);
      ctx.bezierCurveTo(242.8, 826.0, 243.4, 826.1, 243.9, 826.1);
      ctx.bezierCurveTo(244.8, 826.1, 245.5, 825.9, 246.1, 825.6);
      ctx.bezierCurveTo(246.7, 825.3, 247.2, 824.9, 247.7, 824.4);
      ctx.lineTo(247.8, 824.2);
      ctx.lineTo(247.0, 823.5);
      ctx.lineTo(246.9, 823.6);
      ctx.bezierCurveTo(246.5, 824.0, 246.1, 824.3, 245.7, 824.6);
      ctx.bezierCurveTo(245.2, 824.8, 244.6, 825.0, 244.0, 825.0);
      ctx.bezierCurveTo(243.6, 825.0, 243.2, 824.9, 242.8, 824.8);
      ctx.bezierCurveTo(242.4, 824.6, 242.1, 824.4, 241.8, 824.1);
      ctx.bezierCurveTo(241.5, 823.8, 241.2, 823.5, 241.0, 823.1);
      ctx.bezierCurveTo(240.8, 822.7, 240.7, 822.3, 240.7, 821.8);
      ctx.lineTo(247.9, 821.8);
      ctx.lineTo(248.0, 821.7);
      ctx.bezierCurveTo(248.0, 821.6, 248.0, 821.6, 248.0, 821.5);
      ctx.lineTo(248.0, 821.3);
      ctx.bezierCurveTo(248.0, 820.7, 247.9, 820.0, 247.7, 819.5);
      ctx.bezierCurveTo(247.5, 818.9, 247.2, 818.4, 246.9, 818.0);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(246.8, 820.8);
      ctx.lineTo(240.7, 820.8);
      ctx.bezierCurveTo(240.7, 820.4, 240.8, 820.0, 241.0, 819.6);
      ctx.bezierCurveTo(241.2, 819.2, 241.4, 818.9, 241.7, 818.6);
      ctx.bezierCurveTo(241.9, 818.3, 242.2, 818.1, 242.6, 817.9);
      ctx.bezierCurveTo(243.0, 817.7, 243.4, 817.6, 243.8, 817.6);
      ctx.bezierCurveTo(244.3, 817.6, 244.7, 817.7, 245.0, 817.9);
      ctx.bezierCurveTo(245.4, 818.1, 245.7, 818.3, 246.0, 818.6);
      ctx.bezierCurveTo(246.2, 818.9, 246.4, 819.3, 246.5, 819.7);
      ctx.bezierCurveTo(246.7, 820.0, 246.7, 820.4, 246.8, 820.8);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(257.0, 817.6);
      ctx.bezierCurveTo(256.7, 817.3, 256.3, 817.0, 255.9, 816.9);
      ctx.bezierCurveTo(255.4, 816.7, 254.9, 816.6, 254.3, 816.6);
      ctx.bezierCurveTo(253.5, 816.6, 252.8, 816.8, 252.3, 817.1);
      ctx.bezierCurveTo(251.9, 817.4, 251.6, 817.7, 251.3, 818.1);
      ctx.lineTo(251.3, 816.8);
      ctx.lineTo(250.2, 816.8);
      ctx.lineTo(250.2, 825.9);
      ctx.lineTo(251.3, 825.9);
      ctx.lineTo(251.3, 820.6);
      ctx.bezierCurveTo(251.3, 820.2, 251.4, 819.8, 251.5, 819.4);
      ctx.bezierCurveTo(251.7, 819.1, 251.9, 818.7, 252.1, 818.5);
      ctx.bezierCurveTo(252.4, 818.2, 252.7, 818.0, 253.0, 817.9);
      ctx.bezierCurveTo(253.4, 817.7, 253.8, 817.6, 254.2, 817.6);
      ctx.bezierCurveTo(255.0, 817.6, 255.7, 817.9, 256.2, 818.4);
      ctx.bezierCurveTo(256.6, 818.9, 256.8, 819.6, 256.8, 820.5);
      ctx.lineTo(256.8, 825.9);
      ctx.lineTo(258.0, 825.9);
      ctx.lineTo(258.0, 820.3);
      ctx.bezierCurveTo(258.0, 819.8, 257.9, 819.3, 257.7, 818.8);
      ctx.bezierCurveTo(257.6, 818.4, 257.3, 818.0, 257.0, 817.6);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(268.1, 818.4);
      ctx.bezierCurveTo(267.9, 818.2, 267.8, 818.1, 267.7, 817.9);
      ctx.bezierCurveTo(267.4, 817.7, 267.2, 817.4, 266.9, 817.2);
      ctx.bezierCurveTo(266.6, 817.0, 266.2, 816.9, 265.8, 816.8);
      ctx.bezierCurveTo(265.0, 816.5, 263.9, 816.5, 263.0, 816.9);
      ctx.bezierCurveTo(262.4, 817.1, 262.0, 817.4, 261.5, 817.9);
      ctx.bezierCurveTo(261.1, 818.3, 260.8, 818.8, 260.5, 819.3);
      ctx.bezierCurveTo(260.3, 819.9, 260.2, 820.6, 260.2, 821.4);
      ctx.bezierCurveTo(260.2, 822.1, 260.3, 822.8, 260.5, 823.3);
      ctx.bezierCurveTo(260.8, 823.9, 261.1, 824.4, 261.5, 824.8);
      ctx.bezierCurveTo(262.0, 825.2, 262.4, 825.5, 263.0, 825.8);
      ctx.bezierCurveTo(263.5, 826.0, 264.0, 826.1, 264.6, 826.1);
      ctx.bezierCurveTo(265.0, 826.1, 265.4, 826.0, 265.8, 825.9);
      ctx.bezierCurveTo(266.2, 825.8, 266.5, 825.6, 266.8, 825.4);
      ctx.bezierCurveTo(267.1, 825.2, 267.4, 825.0, 267.7, 824.7);
      ctx.bezierCurveTo(267.8, 824.5, 267.9, 824.4, 268.1, 824.2);
      ctx.lineTo(268.1, 825.9);
      ctx.lineTo(269.2, 825.9);
      ctx.lineTo(269.2, 813.0);
      ctx.lineTo(268.1, 813.0);
      ctx.lineTo(268.1, 818.4);
      ctx.closePath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(267.0, 818.7);
      ctx.bezierCurveTo(267.4, 819.0, 267.6, 819.4, 267.8, 819.8);
      ctx.bezierCurveTo(268.0, 820.3, 268.1, 820.8, 268.1, 821.3);
      ctx.lineTo(268.1, 821.3);
      ctx.bezierCurveTo(268.1, 821.9, 268.0, 822.4, 267.8, 822.8);
      ctx.bezierCurveTo(267.6, 823.3, 267.4, 823.6, 267.0, 824.0);
      ctx.bezierCurveTo(266.7, 824.3, 266.4, 824.5, 265.9, 824.7);
      ctx.bezierCurveTo(265.1, 825.1, 264.2, 825.1, 263.4, 824.7);
      ctx.bezierCurveTo(263.0, 824.6, 262.6, 824.3, 262.3, 824.0);
      ctx.bezierCurveTo(262.0, 823.7, 261.8, 823.3, 261.6, 822.8);
      ctx.bezierCurveTo(261.4, 822.4, 261.3, 821.9, 261.3, 821.3);
      ctx.bezierCurveTo(261.3, 820.7, 261.4, 820.2, 261.6, 819.8);
      ctx.bezierCurveTo(261.8, 819.3, 262.0, 818.9, 262.3, 818.6);
      ctx.bezierCurveTo(262.6, 818.3, 263.0, 818.1, 263.4, 817.9);
      ctx.bezierCurveTo(263.8, 817.8, 264.2, 817.7, 264.7, 817.7);
      ctx.bezierCurveTo(265.1, 817.7, 265.5, 817.8, 265.9, 817.9);
      ctx.bezierCurveTo(266.4, 818.1, 266.7, 818.4, 267.0, 818.7);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(275.4, 816.6);
      ctx.bezierCurveTo(274.8, 816.6, 274.3, 816.7, 273.8, 816.9);
      ctx.bezierCurveTo(273.3, 817.0, 272.8, 817.2, 272.3, 817.4);
      ctx.lineTo(272.1, 817.5);
      ctx.lineTo(272.6, 818.5);
      ctx.lineTo(272.7, 818.4);
      ctx.bezierCurveTo(273.1, 818.2, 273.5, 818.1, 274.0, 817.9);
      ctx.bezierCurveTo(274.4, 817.8, 274.9, 817.7, 275.4, 817.7);
      ctx.bezierCurveTo(276.3, 817.7, 276.9, 818.0, 277.4, 818.4);
      ctx.bezierCurveTo(277.9, 818.8, 278.1, 819.4, 278.1, 820.3);
      ctx.lineTo(278.1, 820.5);
      ctx.bezierCurveTo(277.8, 820.4, 277.4, 820.3, 277.0, 820.2);
      ctx.bezierCurveTo(276.6, 820.2, 276.0, 820.1, 275.4, 820.1);
      ctx.bezierCurveTo(274.8, 820.1, 274.3, 820.2, 273.8, 820.3);
      ctx.bezierCurveTo(273.3, 820.5, 272.9, 820.6, 272.5, 820.9);
      ctx.bezierCurveTo(272.2, 821.2, 271.9, 821.5, 271.7, 821.8);
      ctx.bezierCurveTo(271.5, 822.2, 271.4, 822.7, 271.4, 823.2);
      ctx.bezierCurveTo(271.4, 823.7, 271.5, 824.1, 271.7, 824.5);
      ctx.bezierCurveTo(271.9, 824.8, 272.2, 825.1, 272.5, 825.4);
      ctx.bezierCurveTo(272.9, 825.6, 273.2, 825.8, 273.7, 825.9);
      ctx.bezierCurveTo(274.1, 826.0, 274.5, 826.1, 274.9, 826.1);
      ctx.bezierCurveTo(275.4, 826.1, 275.8, 826.0, 276.1, 825.9);
      ctx.bezierCurveTo(276.5, 825.8, 276.8, 825.7, 277.1, 825.5);
      ctx.bezierCurveTo(277.4, 825.4, 277.6, 825.2, 277.8, 825.0);
      ctx.bezierCurveTo(278.0, 824.9, 278.1, 824.8, 278.1, 824.7);
      ctx.lineTo(278.1, 825.9);
      ctx.lineTo(279.3, 825.9);
      ctx.lineTo(279.3, 820.2);
      ctx.bezierCurveTo(279.3, 819.1, 278.9, 818.1, 278.2, 817.5);
      ctx.bezierCurveTo(277.6, 816.9, 276.6, 816.6, 275.4, 816.6);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(278.2, 821.5);
      ctx.lineTo(278.2, 822.4);
      ctx.bezierCurveTo(278.2, 822.8, 278.1, 823.1, 277.9, 823.5);
      ctx.bezierCurveTo(277.7, 823.8, 277.5, 824.0, 277.2, 824.3);
      ctx.bezierCurveTo(276.9, 824.5, 276.6, 824.7, 276.2, 824.8);
      ctx.bezierCurveTo(275.5, 825.0, 274.8, 825.1, 274.1, 824.8);
      ctx.bezierCurveTo(273.8, 824.8, 273.5, 824.6, 273.3, 824.5);
      ctx.bezierCurveTo(273.1, 824.3, 272.9, 824.1, 272.8, 823.9);
      ctx.bezierCurveTo(272.6, 823.7, 272.6, 823.4, 272.6, 823.1);
      ctx.bezierCurveTo(272.6, 822.5, 272.8, 822.1, 273.3, 821.7);
      ctx.bezierCurveTo(273.7, 821.4, 274.4, 821.2, 275.3, 821.2);
      ctx.bezierCurveTo(275.9, 821.2, 276.5, 821.2, 277.0, 821.3);
      ctx.bezierCurveTo(277.4, 821.4, 277.8, 821.5, 278.2, 821.5);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(287.2, 821.5);
      ctx.bezierCurveTo(286.9, 821.3, 286.6, 821.2, 286.2, 821.0);
      ctx.bezierCurveTo(285.9, 820.9, 285.5, 820.8, 285.2, 820.7);
      ctx.bezierCurveTo(284.9, 820.6, 284.6, 820.5, 284.3, 820.4);
      ctx.bezierCurveTo(284.0, 820.3, 283.7, 820.2, 283.5, 820.1);
      ctx.bezierCurveTo(283.3, 820.0, 283.1, 819.8, 283.0, 819.7);
      ctx.bezierCurveTo(282.9, 819.5, 282.8, 819.3, 282.8, 819.1);
      ctx.bezierCurveTo(282.8, 818.7, 283.0, 818.4, 283.3, 818.1);
      ctx.bezierCurveTo(283.7, 817.8, 284.1, 817.7, 284.7, 817.7);
      ctx.bezierCurveTo(285.1, 817.7, 285.6, 817.8, 286.0, 817.9);
      ctx.bezierCurveTo(286.5, 818.1, 286.9, 818.3, 287.3, 818.6);
      ctx.lineTo(287.4, 818.6);
      ctx.lineTo(288.0, 817.7);
      ctx.lineTo(287.9, 817.6);
      ctx.bezierCurveTo(287.5, 817.3, 287.0, 817.1, 286.4, 816.9);
      ctx.bezierCurveTo(285.4, 816.6, 284.3, 816.5, 283.5, 816.8);
      ctx.bezierCurveTo(283.1, 816.9, 282.8, 817.1, 282.5, 817.3);
      ctx.bezierCurveTo(282.3, 817.6, 282.1, 817.8, 281.9, 818.1);
      ctx.bezierCurveTo(281.8, 818.5, 281.7, 818.8, 281.7, 819.2);
      ctx.bezierCurveTo(281.7, 819.6, 281.8, 820.0, 282.0, 820.3);
      ctx.bezierCurveTo(282.2, 820.6, 282.4, 820.8, 282.7, 821.0);
      ctx.bezierCurveTo(283.0, 821.2, 283.4, 821.3, 283.7, 821.4);
      ctx.bezierCurveTo(284.1, 821.6, 284.4, 821.7, 284.8, 821.8);
      ctx.bezierCurveTo(285.1, 821.9, 285.4, 821.9, 285.7, 822.0);
      ctx.bezierCurveTo(285.9, 822.1, 286.2, 822.2, 286.4, 822.4);
      ctx.bezierCurveTo(286.6, 822.5, 286.8, 822.6, 286.9, 822.8);
      ctx.bezierCurveTo(287.0, 823.0, 287.0, 823.2, 287.0, 823.4);
      ctx.bezierCurveTo(287.0, 823.9, 286.8, 824.3, 286.5, 824.5);
      ctx.bezierCurveTo(286.1, 824.8, 285.6, 824.9, 285.1, 824.9);
      ctx.bezierCurveTo(284.5, 824.9, 284.0, 824.8, 283.5, 824.7);
      ctx.bezierCurveTo(283.0, 824.5, 282.5, 824.2, 282.0, 823.8);
      ctx.lineTo(281.9, 823.7);
      ctx.lineTo(281.2, 824.6);
      ctx.lineTo(281.3, 824.7);
      ctx.bezierCurveTo(281.8, 825.1, 282.4, 825.4, 283.0, 825.7);
      ctx.bezierCurveTo(283.7, 825.9, 284.3, 826.0, 285.0, 826.0);
      ctx.bezierCurveTo(285.4, 826.0, 285.9, 826.0, 286.2, 825.9);
      ctx.bezierCurveTo(286.6, 825.7, 287.0, 825.5, 287.2, 825.3);
      ctx.bezierCurveTo(287.5, 825.1, 287.8, 824.8, 287.9, 824.5);
      ctx.bezierCurveTo(288.1, 824.1, 288.2, 823.7, 288.2, 823.3);
      ctx.bezierCurveTo(288.2, 822.9, 288.1, 822.5, 287.9, 822.2);
      ctx.bezierCurveTo(287.7, 822.0, 287.5, 821.7, 287.2, 821.5);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(299.7, 815.3);
      ctx.bezierCurveTo(299.1, 814.7, 298.4, 814.3, 297.6, 814.0);
      ctx.bezierCurveTo(296.8, 813.7, 295.9, 813.5, 294.9, 813.5);
      ctx.lineTo(290.8, 813.5);
      ctx.lineTo(290.8, 825.9);
      ctx.lineTo(294.9, 825.9);
      ctx.bezierCurveTo(295.9, 825.9, 296.8, 825.7, 297.6, 825.4);
      ctx.bezierCurveTo(298.4, 825.1, 299.1, 824.6, 299.7, 824.1);
      ctx.bezierCurveTo(300.2, 823.5, 300.7, 822.9, 301.0, 822.1);
      ctx.bezierCurveTo(301.3, 821.4, 301.5, 820.6, 301.5, 819.7);
      ctx.bezierCurveTo(301.5, 818.8, 301.3, 818.0, 301.0, 817.2);
      ctx.bezierCurveTo(300.7, 816.5, 300.2, 815.8, 299.7, 815.3);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(300.3, 819.7);
      ctx.lineTo(300.3, 819.7);
      ctx.bezierCurveTo(300.3, 820.4, 300.1, 821.1, 299.9, 821.7);
      ctx.bezierCurveTo(299.6, 822.3, 299.3, 822.8, 298.8, 823.3);
      ctx.bezierCurveTo(298.4, 823.7, 297.8, 824.1, 297.2, 824.4);
      ctx.bezierCurveTo(296.5, 824.6, 295.7, 824.8, 294.9, 824.8);
      ctx.lineTo(292.0, 824.8);
      ctx.lineTo(292.0, 814.6);
      ctx.lineTo(294.9, 814.6);
      ctx.bezierCurveTo(295.7, 814.6, 296.5, 814.7, 297.2, 815.0);
      ctx.bezierCurveTo(297.8, 815.3, 298.4, 815.6, 298.8, 816.1);
      ctx.bezierCurveTo(299.3, 816.6, 299.6, 817.1, 299.9, 817.7);
      ctx.bezierCurveTo(300.1, 818.3, 300.3, 819.0, 300.3, 819.7);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(307.4, 816.6);
      ctx.bezierCurveTo(306.8, 816.6, 306.2, 816.7, 305.7, 816.9);
      ctx.bezierCurveTo(305.2, 817.0, 304.7, 817.2, 304.2, 817.4);
      ctx.lineTo(304.1, 817.5);
      ctx.lineTo(304.5, 818.5);
      ctx.lineTo(304.7, 818.4);
      ctx.bezierCurveTo(305.1, 818.2, 305.5, 818.1, 305.9, 817.9);
      ctx.bezierCurveTo(306.3, 817.8, 306.8, 817.7, 307.4, 817.7);
      ctx.bezierCurveTo(308.2, 817.7, 308.9, 818.0, 309.4, 818.4);
      ctx.bezierCurveTo(309.9, 818.8, 310.1, 819.4, 310.1, 820.3);
      ctx.lineTo(310.1, 820.5);
      ctx.bezierCurveTo(309.7, 820.4, 309.3, 820.3, 309.0, 820.2);
      ctx.bezierCurveTo(308.5, 820.2, 308.0, 820.1, 307.3, 820.1);
      ctx.bezierCurveTo(306.7, 820.1, 306.2, 820.2, 305.7, 820.3);
      ctx.bezierCurveTo(305.2, 820.5, 304.8, 820.6, 304.5, 820.9);
      ctx.bezierCurveTo(304.1, 821.2, 303.8, 821.5, 303.6, 821.8);
      ctx.bezierCurveTo(303.4, 822.2, 303.3, 822.7, 303.3, 823.2);
      ctx.bezierCurveTo(303.3, 823.7, 303.5, 824.1, 303.7, 824.5);
      ctx.bezierCurveTo(303.9, 824.8, 304.2, 825.1, 304.5, 825.4);
      ctx.bezierCurveTo(304.8, 825.6, 305.2, 825.8, 305.6, 825.9);
      ctx.bezierCurveTo(306.0, 826.0, 306.5, 826.1, 306.9, 826.1);
      ctx.bezierCurveTo(307.3, 826.1, 307.7, 826.0, 308.1, 825.9);
      ctx.bezierCurveTo(308.4, 825.8, 308.8, 825.7, 309.0, 825.5);
      ctx.bezierCurveTo(309.3, 825.4, 309.6, 825.2, 309.8, 825.0);
      ctx.bezierCurveTo(309.9, 824.9, 310.0, 824.8, 310.1, 824.7);
      ctx.lineTo(310.1, 825.9);
      ctx.lineTo(311.2, 825.9);
      ctx.lineTo(311.2, 820.2);
      ctx.bezierCurveTo(311.2, 819.1, 310.9, 818.1, 310.2, 817.5);
      ctx.bezierCurveTo(309.5, 816.9, 308.6, 816.6, 307.4, 816.6);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(310.1, 821.5);
      ctx.lineTo(310.1, 822.4);
      ctx.bezierCurveTo(310.1, 822.8, 310.0, 823.1, 309.9, 823.5);
      ctx.bezierCurveTo(309.7, 823.8, 309.5, 824.0, 309.2, 824.3);
      ctx.bezierCurveTo(308.9, 824.5, 308.6, 824.7, 308.2, 824.8);
      ctx.bezierCurveTo(307.5, 825.0, 306.7, 825.1, 306.0, 824.8);
      ctx.bezierCurveTo(305.7, 824.8, 305.5, 824.6, 305.2, 824.5);
      ctx.bezierCurveTo(305.0, 824.3, 304.8, 824.1, 304.7, 823.9);
      ctx.bezierCurveTo(304.6, 823.7, 304.5, 823.4, 304.5, 823.1);
      ctx.bezierCurveTo(304.5, 822.5, 304.8, 822.1, 305.2, 821.7);
      ctx.bezierCurveTo(305.7, 821.4, 306.4, 821.2, 307.3, 821.2);
      ctx.bezierCurveTo(307.9, 821.2, 308.5, 821.2, 308.9, 821.3);
      ctx.bezierCurveTo(309.4, 821.4, 309.8, 821.5, 310.1, 821.5);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(321.9, 816.8);
      ctx.lineTo(320.3, 816.8);
      ctx.lineTo(315.1, 822.2);
      ctx.lineTo(315.1, 813.0);
      ctx.lineTo(314.0, 813.0);
      ctx.lineTo(314.0, 825.9);
      ctx.lineTo(315.1, 825.9);
      ctx.lineTo(315.1, 823.6);
      ctx.lineTo(317.1, 821.6);
      ctx.lineTo(320.5, 825.8);
      ctx.lineTo(320.5, 825.9);
      ctx.lineTo(322.0, 825.9);
      ctx.lineTo(317.9, 820.8);
      ctx.lineTo(321.9, 816.8);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(329.6, 817.5);
      ctx.bezierCurveTo(328.9, 816.9, 328.0, 816.6, 326.8, 816.6);
      ctx.bezierCurveTo(326.2, 816.6, 325.6, 816.7, 325.1, 816.9);
      ctx.bezierCurveTo(324.6, 817.0, 324.1, 817.2, 323.6, 817.4);
      ctx.lineTo(323.5, 817.5);
      ctx.lineTo(323.9, 818.5);
      ctx.lineTo(324.0, 818.4);
      ctx.bezierCurveTo(324.4, 818.2, 324.9, 818.1, 325.3, 817.9);
      ctx.bezierCurveTo(325.7, 817.8, 326.2, 817.7, 326.7, 817.7);
      ctx.bezierCurveTo(327.6, 817.7, 328.3, 818.0, 328.8, 818.4);
      ctx.bezierCurveTo(329.2, 818.8, 329.5, 819.4, 329.5, 820.3);
      ctx.lineTo(329.5, 820.5);
      ctx.bezierCurveTo(329.1, 820.4, 328.7, 820.3, 328.3, 820.2);
      ctx.bezierCurveTo(327.9, 820.2, 327.3, 820.1, 326.7, 820.1);
      ctx.bezierCurveTo(326.1, 820.1, 325.6, 820.2, 325.1, 820.3);
      ctx.bezierCurveTo(324.6, 820.5, 324.2, 820.6, 323.9, 820.9);
      ctx.bezierCurveTo(323.5, 821.2, 323.2, 821.5, 323.0, 821.8);
      ctx.bezierCurveTo(322.8, 822.2, 322.7, 822.7, 322.7, 823.2);
      ctx.bezierCurveTo(322.7, 823.7, 322.8, 824.1, 323.0, 824.5);
      ctx.bezierCurveTo(323.3, 824.8, 323.5, 825.1, 323.9, 825.4);
      ctx.bezierCurveTo(324.2, 825.6, 324.6, 825.8, 325.0, 825.9);
      ctx.bezierCurveTo(325.4, 826.0, 325.8, 826.1, 326.3, 826.1);
      ctx.bezierCurveTo(326.7, 826.1, 327.1, 826.0, 327.5, 825.9);
      ctx.bezierCurveTo(327.8, 825.8, 328.1, 825.7, 328.4, 825.5);
      ctx.bezierCurveTo(328.7, 825.4, 329.0, 825.2, 329.2, 825.0);
      ctx.bezierCurveTo(329.3, 824.9, 329.4, 824.8, 329.5, 824.7);
      ctx.lineTo(329.5, 825.9);
      ctx.lineTo(330.6, 825.9);
      ctx.lineTo(330.6, 820.2);
      ctx.bezierCurveTo(330.6, 819.1, 330.3, 818.1, 329.6, 817.5);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(329.5, 821.5);
      ctx.lineTo(329.5, 822.4);
      ctx.bezierCurveTo(329.5, 822.8, 329.4, 823.1, 329.3, 823.5);
      ctx.bezierCurveTo(329.1, 823.8, 328.9, 824.0, 328.6, 824.3);
      ctx.bezierCurveTo(328.3, 824.5, 327.9, 824.7, 327.6, 824.8);
      ctx.bezierCurveTo(326.9, 825.0, 326.1, 825.0, 325.4, 824.8);
      ctx.bezierCurveTo(325.1, 824.8, 324.8, 824.6, 324.6, 824.5);
      ctx.bezierCurveTo(324.4, 824.3, 324.2, 824.1, 324.1, 823.9);
      ctx.bezierCurveTo(324.0, 823.7, 323.9, 823.4, 323.9, 823.1);
      ctx.bezierCurveTo(323.9, 822.5, 324.1, 822.1, 324.6, 821.7);
      ctx.bezierCurveTo(325.1, 821.4, 325.8, 821.2, 326.7, 821.2);
      ctx.bezierCurveTo(327.3, 821.2, 327.8, 821.2, 328.3, 821.3);
      ctx.bezierCurveTo(328.8, 821.4, 329.2, 821.5, 329.5, 821.5);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(406.2, 823.4);
      ctx.lineTo(408.6, 816.1);
      ctx.lineTo(410.0, 816.1);
      ctx.lineTo(406.8, 825.3);
      ctx.lineTo(405.6, 825.3);
      ctx.lineTo(403.2, 818.1);
      ctx.lineTo(400.7, 825.3);
      ctx.lineTo(399.5, 825.3);
      ctx.lineTo(396.3, 816.1);
      ctx.lineTo(397.7, 816.1);
      ctx.lineTo(400.1, 823.4);
      ctx.lineTo(402.6, 816.1);
      ctx.lineTo(403.7, 816.1);
      ctx.lineTo(406.2, 823.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(421.2, 823.4);
      ctx.lineTo(423.6, 816.1);
      ctx.lineTo(425.0, 816.1);
      ctx.lineTo(421.8, 825.3);
      ctx.lineTo(420.6, 825.3);
      ctx.lineTo(418.2, 818.1);
      ctx.lineTo(415.7, 825.3);
      ctx.lineTo(414.5, 825.3);
      ctx.lineTo(411.3, 816.1);
      ctx.lineTo(412.7, 816.1);
      ctx.lineTo(415.1, 823.4);
      ctx.lineTo(417.6, 816.1);
      ctx.lineTo(418.7, 816.1);
      ctx.lineTo(421.2, 823.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(436.2, 823.4);
      ctx.lineTo(438.6, 816.1);
      ctx.lineTo(440.0, 816.1);
      ctx.lineTo(436.8, 825.3);
      ctx.lineTo(435.6, 825.3);
      ctx.lineTo(433.2, 818.1);
      ctx.lineTo(430.7, 825.3);
      ctx.lineTo(429.5, 825.3);
      ctx.lineTo(426.3, 816.1);
      ctx.lineTo(427.8, 816.1);
      ctx.lineTo(430.2, 823.4);
      ctx.lineTo(432.6, 816.1);
      ctx.lineTo(433.7, 816.1);
      ctx.lineTo(436.2, 823.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(440.9, 823.4);
      ctx.lineTo(442.5, 823.4);
      ctx.lineTo(442.5, 825.2);
      ctx.lineTo(440.9, 825.2);
      ctx.lineTo(440.9, 823.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(446.8, 822.6);
      ctx.bezierCurveTo(446.8, 823.2, 446.9, 823.6, 447.2, 823.8);
      ctx.bezierCurveTo(447.5, 824.0, 447.8, 824.2, 448.3, 824.2);
      ctx.bezierCurveTo(448.5, 824.2, 448.7, 824.1, 449.0, 824.1);
      ctx.bezierCurveTo(449.2, 824.0, 449.4, 824.0, 449.6, 823.8);
      ctx.lineTo(449.6, 825.0);
      ctx.bezierCurveTo(449.4, 825.1, 449.1, 825.2, 448.9, 825.3);
      ctx.bezierCurveTo(448.6, 825.4, 448.3, 825.4, 448.0, 825.4);
      ctx.bezierCurveTo(447.6, 825.4, 447.3, 825.3, 446.9, 825.2);
      ctx.bezierCurveTo(446.6, 825.2, 446.4, 825.0, 446.1, 824.8);
      ctx.bezierCurveTo(445.9, 824.6, 445.7, 824.3, 445.6, 824.0);
      ctx.bezierCurveTo(445.5, 823.7, 445.4, 823.3, 445.4, 822.8);
      ctx.lineTo(445.4, 817.3);
      ctx.lineTo(444.1, 817.3);
      ctx.lineTo(444.1, 816.1);
      ctx.lineTo(445.4, 816.1);
      ctx.lineTo(445.4, 813.4);
      ctx.lineTo(446.8, 813.4);
      ctx.lineTo(446.8, 816.1);
      ctx.lineTo(449.6, 816.1);
      ctx.lineTo(449.6, 817.3);
      ctx.lineTo(446.8, 817.3);
      ctx.lineTo(446.8, 822.6);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(452.1, 812.6);
      ctx.lineTo(453.6, 812.6);
      ctx.lineTo(453.6, 814.1);
      ctx.lineTo(452.1, 814.1);
      ctx.lineTo(452.1, 812.6);
      ctx.closePath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(452.2, 816.1);
      ctx.lineTo(453.5, 816.1);
      ctx.lineTo(453.5, 825.2);
      ctx.lineTo(452.2, 825.2);
      ctx.lineTo(452.2, 816.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(457.9, 822.5);
      ctx.bezierCurveTo(458.1, 822.9, 458.3, 823.2, 458.6, 823.5);
      ctx.bezierCurveTo(458.9, 823.7, 459.2, 823.9, 459.6, 824.1);
      ctx.bezierCurveTo(459.9, 824.2, 460.3, 824.3, 460.7, 824.3);
      ctx.bezierCurveTo(461.4, 824.3, 461.9, 824.1, 462.4, 823.9);
      ctx.bezierCurveTo(462.8, 823.7, 463.2, 823.4, 463.6, 823.0);
      ctx.lineTo(464.4, 823.7);
      ctx.bezierCurveTo(464.0, 824.2, 463.5, 824.7, 462.9, 825.0);
      ctx.bezierCurveTo(462.3, 825.3, 461.6, 825.4, 460.7, 825.4);
      ctx.bezierCurveTo(460.1, 825.4, 459.5, 825.3, 458.9, 825.1);
      ctx.bezierCurveTo(458.4, 824.9, 457.9, 824.5, 457.5, 824.1);
      ctx.bezierCurveTo(457.1, 823.7, 456.7, 823.2, 456.5, 822.6);
      ctx.bezierCurveTo(456.2, 822.0, 456.1, 821.4, 456.1, 820.7);
      ctx.bezierCurveTo(456.1, 820.0, 456.2, 819.4, 456.4, 818.8);
      ctx.bezierCurveTo(456.7, 818.2, 457.0, 817.7, 457.4, 817.3);
      ctx.bezierCurveTo(457.7, 816.9, 458.2, 816.5, 458.7, 816.3);
      ctx.bezierCurveTo(459.3, 816.0, 459.9, 815.9, 460.5, 815.9);
      ctx.bezierCurveTo(461.2, 815.9, 461.8, 816.0, 462.3, 816.3);
      ctx.bezierCurveTo(462.8, 816.5, 463.3, 816.9, 463.6, 817.3);
      ctx.bezierCurveTo(464.0, 817.8, 464.3, 818.3, 464.5, 818.9);
      ctx.bezierCurveTo(464.7, 819.4, 464.7, 820.1, 464.7, 820.7);
      ctx.lineTo(464.7, 820.9);
      ctx.bezierCurveTo(464.7, 821.0, 464.7, 821.1, 464.7, 821.2);
      ctx.lineTo(457.5, 821.2);
      ctx.bezierCurveTo(457.6, 821.7, 457.7, 822.1, 457.9, 822.5);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(463.4, 820.2);
      ctx.bezierCurveTo(463.3, 819.8, 463.2, 819.4, 463.1, 819.0);
      ctx.bezierCurveTo(463.0, 818.6, 462.8, 818.3, 462.5, 818.0);
      ctx.bezierCurveTo(462.3, 817.7, 462.0, 817.5, 461.7, 817.3);
      ctx.bezierCurveTo(461.3, 817.1, 460.9, 817.1, 460.5, 817.1);
      ctx.bezierCurveTo(460.1, 817.1, 459.7, 817.1, 459.4, 817.3);
      ctx.bezierCurveTo(459.0, 817.5, 458.7, 817.7, 458.5, 818.0);
      ctx.bezierCurveTo(458.2, 818.2, 458.0, 818.6, 457.8, 818.9);
      ctx.bezierCurveTo(457.7, 819.3, 457.6, 819.7, 457.5, 820.2);
      ctx.lineTo(463.4, 820.2);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(468.5, 825.2);
      ctx.lineTo(467.1, 825.2);
      ctx.lineTo(467.1, 816.1);
      ctx.lineTo(468.5, 816.1);
      ctx.lineTo(468.5, 817.7);
      ctx.bezierCurveTo(468.8, 817.2, 469.2, 816.8, 469.7, 816.4);
      ctx.bezierCurveTo(470.2, 816.1, 470.8, 815.9, 471.6, 815.9);
      ctx.bezierCurveTo(472.2, 815.9, 472.6, 816.0, 473.1, 816.2);
      ctx.bezierCurveTo(473.5, 816.4, 473.9, 816.6, 474.2, 816.9);
      ctx.bezierCurveTo(474.5, 817.3, 474.7, 817.6, 474.9, 818.1);
      ctx.bezierCurveTo(475.0, 818.5, 475.1, 819.0, 475.1, 819.6);
      ctx.lineTo(475.1, 825.2);
      ctx.lineTo(473.7, 825.2);
      ctx.lineTo(473.7, 819.9);
      ctx.bezierCurveTo(473.7, 819.1, 473.5, 818.4, 473.1, 817.9);
      ctx.bezierCurveTo(472.7, 817.4, 472.0, 817.1, 471.2, 817.1);
      ctx.bezierCurveTo(470.8, 817.1, 470.5, 817.2, 470.1, 817.4);
      ctx.bezierCurveTo(469.8, 817.5, 469.5, 817.7, 469.3, 817.9);
      ctx.bezierCurveTo(469.0, 818.2, 468.8, 818.5, 468.7, 818.8);
      ctx.bezierCurveTo(468.6, 819.2, 468.5, 819.6, 468.5, 820.0);
      ctx.lineTo(468.5, 825.2);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(485.3, 825.2);
      ctx.lineTo(485.3, 823.4);
      ctx.bezierCurveTo(485.1, 823.7, 484.9, 823.9, 484.7, 824.2);
      ctx.bezierCurveTo(484.5, 824.4, 484.2, 824.6, 483.9, 824.8);
      ctx.bezierCurveTo(483.6, 825.0, 483.3, 825.2, 483.0, 825.3);
      ctx.bezierCurveTo(482.6, 825.4, 482.2, 825.4, 481.8, 825.4);
      ctx.bezierCurveTo(481.3, 825.4, 480.7, 825.3, 480.2, 825.1);
      ctx.bezierCurveTo(479.7, 824.9, 479.2, 824.6, 478.8, 824.2);
      ctx.bezierCurveTo(478.4, 823.8, 478.1, 823.3, 477.8, 822.7);
      ctx.bezierCurveTo(477.6, 822.1, 477.5, 821.4, 477.5, 820.7);
      ctx.bezierCurveTo(477.5, 819.9, 477.6, 819.3, 477.8, 818.7);
      ctx.bezierCurveTo(478.1, 818.1, 478.4, 817.6, 478.8, 817.2);
      ctx.bezierCurveTo(479.2, 816.8, 479.7, 816.5, 480.2, 816.2);
      ctx.bezierCurveTo(480.7, 816.0, 481.3, 815.9, 481.8, 815.9);
      ctx.bezierCurveTo(482.2, 815.9, 482.6, 816.0, 483.0, 816.1);
      ctx.bezierCurveTo(483.3, 816.2, 483.7, 816.3, 483.9, 816.5);
      ctx.bezierCurveTo(484.2, 816.7, 484.5, 816.9, 484.7, 817.1);
      ctx.bezierCurveTo(484.9, 817.3, 485.1, 817.6, 485.3, 817.9);
      ctx.lineTo(485.3, 812.4);
      ctx.lineTo(486.7, 812.4);
      ctx.lineTo(486.7, 825.2);
      ctx.lineTo(485.3, 825.2);
      ctx.closePath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(485.1, 819.2);
      ctx.bezierCurveTo(484.9, 818.8, 484.7, 818.4, 484.3, 818.1);
      ctx.bezierCurveTo(484.0, 817.8, 483.7, 817.6, 483.3, 817.4);
      ctx.bezierCurveTo(482.9, 817.2, 482.5, 817.1, 482.1, 817.1);
      ctx.bezierCurveTo(481.6, 817.1, 481.2, 817.2, 480.8, 817.4);
      ctx.bezierCurveTo(480.4, 817.5, 480.1, 817.8, 479.8, 818.1);
      ctx.bezierCurveTo(479.5, 818.4, 479.3, 818.7, 479.1, 819.2);
      ctx.bezierCurveTo(478.9, 819.6, 478.9, 820.1, 478.9, 820.7);
      ctx.bezierCurveTo(478.9, 821.2, 478.9, 821.7, 479.1, 822.1);
      ctx.bezierCurveTo(479.3, 822.5, 479.5, 822.9, 479.8, 823.2);
      ctx.bezierCurveTo(480.1, 823.5, 480.4, 823.8, 480.8, 823.9);
      ctx.bezierCurveTo(481.2, 824.1, 481.6, 824.2, 482.1, 824.2);
      ctx.bezierCurveTo(482.5, 824.2, 482.9, 824.1, 483.3, 823.9);
      ctx.bezierCurveTo(483.7, 823.8, 484.0, 823.5, 484.3, 823.2);
      ctx.bezierCurveTo(484.7, 822.9, 484.9, 822.5, 485.1, 822.1);
      ctx.bezierCurveTo(485.3, 821.7, 485.4, 821.2, 485.4, 820.7);
      ctx.bezierCurveTo(485.4, 820.1, 485.3, 819.7, 485.1, 819.2);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(491.5, 817.4);
      ctx.bezierCurveTo(491.1, 817.5, 490.7, 817.7, 490.2, 817.9);
      ctx.lineTo(489.8, 816.7);
      ctx.bezierCurveTo(490.3, 816.5, 490.8, 816.3, 491.4, 816.2);
      ctx.bezierCurveTo(491.9, 816.1, 492.5, 816.0, 493.1, 816.0);
      ctx.bezierCurveTo(494.4, 816.0, 495.3, 816.3, 496.0, 816.9);
      ctx.bezierCurveTo(496.7, 817.5, 497.0, 818.4, 497.0, 819.7);
      ctx.lineTo(497.0, 825.2);
      ctx.lineTo(495.7, 825.2);
      ctx.lineTo(495.7, 823.9);
      ctx.bezierCurveTo(495.4, 824.3, 495.0, 824.6, 494.4, 824.9);
      ctx.bezierCurveTo(493.9, 825.3, 493.2, 825.4, 492.4, 825.4);
      ctx.bezierCurveTo(492.0, 825.4, 491.6, 825.4, 491.2, 825.2);
      ctx.bezierCurveTo(490.8, 825.1, 490.4, 824.9, 490.1, 824.7);
      ctx.bezierCurveTo(489.8, 824.5, 489.5, 824.2, 489.3, 823.8);
      ctx.bezierCurveTo(489.1, 823.5, 489.0, 823.0, 489.0, 822.6);
      ctx.bezierCurveTo(489.0, 822.1, 489.1, 821.7, 489.3, 821.3);
      ctx.bezierCurveTo(489.5, 820.9, 489.8, 820.6, 490.1, 820.4);
      ctx.bezierCurveTo(490.4, 820.1, 490.9, 819.9, 491.3, 819.8);
      ctx.bezierCurveTo(491.8, 819.7, 492.3, 819.6, 492.9, 819.6);
      ctx.bezierCurveTo(493.5, 819.6, 494.0, 819.6, 494.4, 819.7);
      ctx.bezierCurveTo(494.9, 819.8, 495.3, 819.9, 495.7, 820.0);
      ctx.lineTo(495.7, 819.7);
      ctx.bezierCurveTo(495.7, 818.8, 495.5, 818.2, 495.0, 817.8);
      ctx.bezierCurveTo(494.5, 817.4, 493.9, 817.2, 493.0, 817.2);
      ctx.bezierCurveTo(492.5, 817.2, 492.0, 817.2, 491.5, 817.4);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(491.1, 821.1);
      ctx.bezierCurveTo(490.6, 821.5, 490.4, 821.9, 490.4, 822.5);
      ctx.bezierCurveTo(490.4, 822.8, 490.5, 823.1, 490.6, 823.3);
      ctx.bezierCurveTo(490.7, 823.5, 490.9, 823.7, 491.1, 823.9);
      ctx.bezierCurveTo(491.3, 824.0, 491.5, 824.1, 491.8, 824.2);
      ctx.bezierCurveTo(492.1, 824.3, 492.4, 824.3, 492.7, 824.3);
      ctx.bezierCurveTo(493.1, 824.3, 493.5, 824.3, 493.9, 824.2);
      ctx.bezierCurveTo(494.2, 824.0, 494.6, 823.9, 494.8, 823.6);
      ctx.bezierCurveTo(495.1, 823.4, 495.3, 823.2, 495.5, 822.9);
      ctx.bezierCurveTo(495.7, 822.6, 495.7, 822.2, 495.7, 821.9);
      ctx.lineTo(495.7, 821.0);
      ctx.bezierCurveTo(495.4, 820.9, 495.0, 820.8, 494.6, 820.7);
      ctx.bezierCurveTo(494.1, 820.6, 493.6, 820.6, 493.1, 820.6);
      ctx.bezierCurveTo(492.2, 820.6, 491.5, 820.8, 491.1, 821.1);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(505.9, 823.8);
      ctx.bezierCurveTo(505.7, 824.2, 505.5, 824.4, 505.2, 824.7);
      ctx.bezierCurveTo(504.9, 824.9, 504.6, 825.1, 504.2, 825.2);
      ctx.bezierCurveTo(503.8, 825.3, 503.4, 825.4, 502.9, 825.4);
      ctx.bezierCurveTo(502.3, 825.4, 501.6, 825.3, 500.9, 825.0);
      ctx.bezierCurveTo(500.3, 824.8, 499.7, 824.5, 499.2, 824.1);
      ctx.lineTo(499.8, 823.1);
      ctx.bezierCurveTo(500.3, 823.5, 500.9, 823.8, 501.4, 824.0);
      ctx.bezierCurveTo(501.9, 824.2, 502.5, 824.3, 503.0, 824.3);
      ctx.bezierCurveTo(503.6, 824.3, 504.0, 824.1, 504.4, 823.9);
      ctx.bezierCurveTo(504.7, 823.6, 504.9, 823.3, 504.9, 822.8);
      ctx.lineTo(504.9, 822.8);
      ctx.bezierCurveTo(504.9, 822.6, 504.8, 822.4, 504.7, 822.2);
      ctx.bezierCurveTo(504.6, 822.0, 504.4, 821.9, 504.2, 821.8);
      ctx.bezierCurveTo(504.0, 821.6, 503.7, 821.5, 503.5, 821.4);
      ctx.bezierCurveTo(503.2, 821.3, 502.9, 821.3, 502.6, 821.2);
      ctx.bezierCurveTo(502.3, 821.1, 501.9, 820.9, 501.5, 820.8);
      ctx.bezierCurveTo(501.2, 820.7, 500.9, 820.5, 500.6, 820.4);
      ctx.bezierCurveTo(500.3, 820.2, 500.1, 819.9, 499.9, 819.7);
      ctx.bezierCurveTo(499.7, 819.4, 499.6, 819.0, 499.6, 818.6);
      ctx.lineTo(499.6, 818.6);
      ctx.bezierCurveTo(499.6, 818.2, 499.7, 817.8, 499.8, 817.5);
      ctx.bezierCurveTo(500.0, 817.2, 500.2, 816.9, 500.5, 816.7);
      ctx.bezierCurveTo(500.7, 816.4, 501.1, 816.3, 501.5, 816.1);
      ctx.bezierCurveTo(501.8, 816.0, 502.3, 815.9, 502.7, 815.9);
      ctx.bezierCurveTo(503.3, 815.9, 503.8, 816.0, 504.4, 816.2);
      ctx.bezierCurveTo(505.0, 816.4, 505.5, 816.6, 506.0, 817.0);
      ctx.lineTo(505.4, 818.0);
      ctx.bezierCurveTo(504.9, 817.7, 504.5, 817.5, 504.0, 817.3);
      ctx.bezierCurveTo(503.6, 817.2, 503.1, 817.1, 502.7, 817.1);
      ctx.bezierCurveTo(502.1, 817.1, 501.7, 817.2, 501.4, 817.5);
      ctx.bezierCurveTo(501.1, 817.7, 500.9, 818.0, 500.9, 818.4);
      ctx.lineTo(500.9, 818.5);
      ctx.bezierCurveTo(500.9, 818.7, 501.0, 818.9, 501.1, 819.0);
      ctx.bezierCurveTo(501.2, 819.2, 501.4, 819.3, 501.6, 819.4);
      ctx.bezierCurveTo(501.8, 819.5, 502.1, 819.6, 502.4, 819.7);
      ctx.bezierCurveTo(502.6, 819.8, 502.9, 819.9, 503.2, 820.0);
      ctx.bezierCurveTo(503.6, 820.1, 503.9, 820.2, 504.3, 820.4);
      ctx.bezierCurveTo(504.6, 820.5, 505.0, 820.7, 505.2, 820.9);
      ctx.bezierCurveTo(505.5, 821.1, 505.7, 821.3, 505.9, 821.6);
      ctx.bezierCurveTo(506.1, 821.9, 506.2, 822.2, 506.2, 822.6);
      ctx.lineTo(506.2, 822.7);
      ctx.bezierCurveTo(506.2, 823.1, 506.1, 823.5, 505.9, 823.8);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(516.0, 825.2);
      ctx.lineTo(516.0, 823.4);
      ctx.bezierCurveTo(515.8, 823.7, 515.6, 823.9, 515.4, 824.2);
      ctx.bezierCurveTo(515.2, 824.4, 514.9, 824.6, 514.6, 824.8);
      ctx.bezierCurveTo(514.3, 825.0, 514.0, 825.2, 513.7, 825.3);
      ctx.bezierCurveTo(513.3, 825.4, 512.9, 825.4, 512.5, 825.4);
      ctx.bezierCurveTo(512.0, 825.4, 511.4, 825.3, 510.9, 825.1);
      ctx.bezierCurveTo(510.4, 824.9, 509.9, 824.6, 509.5, 824.2);
      ctx.bezierCurveTo(509.1, 823.8, 508.8, 823.3, 508.5, 822.7);
      ctx.bezierCurveTo(508.3, 822.1, 508.2, 821.4, 508.2, 820.7);
      ctx.bezierCurveTo(508.2, 819.9, 508.3, 819.3, 508.5, 818.7);
      ctx.bezierCurveTo(508.8, 818.1, 509.1, 817.6, 509.5, 817.2);
      ctx.bezierCurveTo(509.9, 816.8, 510.4, 816.5, 510.9, 816.2);
      ctx.bezierCurveTo(511.4, 816.0, 512.0, 815.9, 512.5, 815.9);
      ctx.bezierCurveTo(512.9, 815.9, 513.3, 816.0, 513.7, 816.1);
      ctx.bezierCurveTo(514.0, 816.2, 514.4, 816.3, 514.6, 816.5);
      ctx.bezierCurveTo(514.9, 816.7, 515.2, 816.9, 515.4, 817.1);
      ctx.bezierCurveTo(515.6, 817.3, 515.8, 817.6, 516.0, 817.9);
      ctx.lineTo(516.0, 812.4);
      ctx.lineTo(517.4, 812.4);
      ctx.lineTo(517.4, 825.2);
      ctx.lineTo(516.0, 825.2);
      ctx.closePath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(515.8, 819.2);
      ctx.bezierCurveTo(515.6, 818.8, 515.4, 818.4, 515.1, 818.1);
      ctx.bezierCurveTo(514.7, 817.8, 514.4, 817.6, 514.0, 817.4);
      ctx.bezierCurveTo(513.6, 817.2, 513.2, 817.1, 512.8, 817.1);
      ctx.bezierCurveTo(512.3, 817.1, 511.9, 817.2, 511.5, 817.4);
      ctx.bezierCurveTo(511.1, 817.5, 510.8, 817.8, 510.5, 818.1);
      ctx.bezierCurveTo(510.2, 818.4, 510.0, 818.7, 509.8, 819.2);
      ctx.bezierCurveTo(509.6, 819.6, 509.6, 820.1, 509.6, 820.7);
      ctx.bezierCurveTo(509.6, 821.2, 509.6, 821.7, 509.8, 822.1);
      ctx.bezierCurveTo(510.0, 822.5, 510.2, 822.9, 510.5, 823.2);
      ctx.bezierCurveTo(510.8, 823.5, 511.1, 823.8, 511.5, 823.9);
      ctx.bezierCurveTo(511.9, 824.1, 512.3, 824.2, 512.8, 824.2);
      ctx.bezierCurveTo(513.2, 824.2, 513.6, 824.1, 514.0, 823.9);
      ctx.bezierCurveTo(514.4, 823.8, 514.7, 823.5, 515.1, 823.2);
      ctx.bezierCurveTo(515.4, 822.9, 515.6, 822.5, 515.8, 822.1);
      ctx.bezierCurveTo(516.0, 821.7, 516.1, 821.2, 516.1, 820.7);
      ctx.bezierCurveTo(516.1, 820.1, 516.0, 819.7, 515.8, 819.2);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(522.2, 817.4);
      ctx.bezierCurveTo(521.8, 817.5, 521.4, 817.7, 520.9, 817.9);
      ctx.lineTo(520.5, 816.7);
      ctx.bezierCurveTo(521.0, 816.5, 521.5, 816.3, 522.1, 816.2);
      ctx.bezierCurveTo(522.6, 816.1, 523.2, 816.0, 523.8, 816.0);
      ctx.bezierCurveTo(525.1, 816.0, 526.1, 816.3, 526.7, 816.9);
      ctx.bezierCurveTo(527.4, 817.5, 527.7, 818.4, 527.7, 819.7);
      ctx.lineTo(527.7, 825.2);
      ctx.lineTo(526.4, 825.2);
      ctx.lineTo(526.4, 823.9);
      ctx.bezierCurveTo(526.1, 824.3, 525.7, 824.6, 525.1, 824.9);
      ctx.bezierCurveTo(524.6, 825.3, 523.9, 825.4, 523.1, 825.4);
      ctx.bezierCurveTo(522.7, 825.4, 522.3, 825.4, 521.9, 825.2);
      ctx.bezierCurveTo(521.5, 825.1, 521.1, 824.9, 520.8, 824.7);
      ctx.bezierCurveTo(520.5, 824.5, 520.2, 824.2, 520.0, 823.8);
      ctx.bezierCurveTo(519.8, 823.5, 519.7, 823.0, 519.7, 822.6);
      ctx.bezierCurveTo(519.7, 822.1, 519.8, 821.7, 520.0, 821.3);
      ctx.bezierCurveTo(520.2, 820.9, 520.5, 820.6, 520.8, 820.4);
      ctx.bezierCurveTo(521.2, 820.1, 521.6, 819.9, 522.0, 819.8);
      ctx.bezierCurveTo(522.5, 819.7, 523.0, 819.6, 523.6, 819.6);
      ctx.bezierCurveTo(524.2, 819.6, 524.7, 819.6, 525.2, 819.7);
      ctx.bezierCurveTo(525.6, 819.8, 526.0, 819.9, 526.4, 820.0);
      ctx.lineTo(526.4, 819.7);
      ctx.bezierCurveTo(526.4, 818.8, 526.2, 818.2, 525.7, 817.8);
      ctx.bezierCurveTo(525.2, 817.4, 524.6, 817.2, 523.7, 817.2);
      ctx.bezierCurveTo(523.2, 817.2, 522.7, 817.2, 522.2, 817.4);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(521.8, 821.1);
      ctx.bezierCurveTo(521.3, 821.5, 521.1, 821.9, 521.1, 822.5);
      ctx.bezierCurveTo(521.1, 822.8, 521.2, 823.1, 521.3, 823.3);
      ctx.bezierCurveTo(521.4, 823.5, 521.6, 823.7, 521.8, 823.9);
      ctx.bezierCurveTo(522.0, 824.0, 522.3, 824.1, 522.5, 824.2);
      ctx.bezierCurveTo(522.8, 824.3, 523.1, 824.3, 523.4, 824.3);
      ctx.bezierCurveTo(523.8, 824.3, 524.2, 824.3, 524.6, 824.2);
      ctx.bezierCurveTo(525.0, 824.0, 525.3, 823.9, 525.6, 823.6);
      ctx.bezierCurveTo(525.8, 823.4, 526.0, 823.2, 526.2, 822.9);
      ctx.bezierCurveTo(526.4, 822.6, 526.4, 822.2, 526.4, 821.9);
      ctx.lineTo(526.4, 821.0);
      ctx.bezierCurveTo(526.1, 820.9, 525.7, 820.8, 525.3, 820.7);
      ctx.bezierCurveTo(524.8, 820.6, 524.3, 820.6, 523.8, 820.6);
      ctx.bezierCurveTo(522.9, 820.6, 522.3, 820.8, 521.8, 821.1);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(538.7, 825.2);
      ctx.lineTo(537.1, 825.2);
      ctx.lineTo(533.8, 821.0);
      ctx.lineTo(532.0, 822.8);
      ctx.lineTo(532.0, 825.2);
      ctx.lineTo(530.6, 825.2);
      ctx.lineTo(530.6, 812.4);
      ctx.lineTo(532.0, 812.4);
      ctx.lineTo(532.0, 821.2);
      ctx.lineTo(536.9, 816.1);
      ctx.lineTo(538.6, 816.1);
      ctx.lineTo(534.8, 820.0);
      ctx.lineTo(538.7, 825.2);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(542.3, 817.4);
      ctx.bezierCurveTo(541.9, 817.5, 541.4, 817.7, 541.0, 817.9);
      ctx.lineTo(540.6, 816.7);
      ctx.bezierCurveTo(541.1, 816.5, 541.6, 816.3, 542.1, 816.2);
      ctx.bezierCurveTo(542.7, 816.1, 543.2, 816.0, 543.9, 816.0);
      ctx.bezierCurveTo(545.2, 816.0, 546.1, 816.3, 546.8, 816.9);
      ctx.bezierCurveTo(547.5, 817.5, 547.8, 818.4, 547.8, 819.7);
      ctx.lineTo(547.8, 825.2);
      ctx.lineTo(546.5, 825.2);
      ctx.lineTo(546.5, 823.9);
      ctx.bezierCurveTo(546.2, 824.3, 545.8, 824.6, 545.2, 824.9);
      ctx.bezierCurveTo(544.7, 825.3, 544.0, 825.4, 543.2, 825.4);
      ctx.bezierCurveTo(542.8, 825.4, 542.4, 825.4, 542.0, 825.2);
      ctx.bezierCurveTo(541.5, 825.1, 541.2, 824.9, 540.9, 824.7);
      ctx.bezierCurveTo(540.5, 824.5, 540.3, 824.2, 540.1, 823.8);
      ctx.bezierCurveTo(539.9, 823.5, 539.8, 823.0, 539.8, 822.6);
      ctx.bezierCurveTo(539.8, 822.1, 539.9, 821.7, 540.1, 821.3);
      ctx.bezierCurveTo(540.3, 820.9, 540.5, 820.6, 540.9, 820.4);
      ctx.bezierCurveTo(541.2, 820.1, 541.6, 819.9, 542.1, 819.8);
      ctx.bezierCurveTo(542.6, 819.7, 543.1, 819.6, 543.7, 819.6);
      ctx.bezierCurveTo(544.3, 819.6, 544.8, 819.6, 545.2, 819.7);
      ctx.bezierCurveTo(545.7, 819.8, 546.1, 819.9, 546.5, 820.0);
      ctx.lineTo(546.5, 819.7);
      ctx.bezierCurveTo(546.5, 818.8, 546.3, 818.2, 545.8, 817.8);
      ctx.bezierCurveTo(545.3, 817.4, 544.6, 817.2, 543.8, 817.2);
      ctx.bezierCurveTo(543.2, 817.2, 542.7, 817.2, 542.3, 817.4);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(541.9, 821.1);
      ctx.bezierCurveTo(541.4, 821.5, 541.2, 821.9, 541.2, 822.5);
      ctx.bezierCurveTo(541.2, 822.8, 541.2, 823.1, 541.4, 823.3);
      ctx.bezierCurveTo(541.5, 823.5, 541.7, 823.7, 541.9, 823.9);
      ctx.bezierCurveTo(542.1, 824.0, 542.3, 824.1, 542.6, 824.2);
      ctx.bezierCurveTo(542.9, 824.3, 543.2, 824.3, 543.5, 824.3);
      ctx.bezierCurveTo(543.9, 824.3, 544.3, 824.3, 544.7, 824.2);
      ctx.bezierCurveTo(545.0, 824.0, 545.3, 823.9, 545.6, 823.6);
      ctx.bezierCurveTo(545.9, 823.4, 546.1, 823.2, 546.3, 822.9);
      ctx.bezierCurveTo(546.4, 822.6, 546.5, 822.2, 546.5, 821.9);
      ctx.lineTo(546.5, 821.0);
      ctx.bezierCurveTo(546.2, 820.9, 545.8, 820.8, 545.3, 820.7);
      ctx.bezierCurveTo(544.9, 820.6, 544.4, 820.6, 543.8, 820.6);
      ctx.bezierCurveTo(543.0, 820.6, 542.3, 820.8, 541.9, 821.1);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(550.5, 823.4);
      ctx.lineTo(552.2, 823.4);
      ctx.lineTo(552.2, 825.2);
      ctx.lineTo(550.5, 825.2);
      ctx.lineTo(550.5, 823.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(560.9, 824.9);
      ctx.bezierCurveTo(560.3, 825.3, 559.6, 825.4, 558.8, 825.4);
      ctx.bezierCurveTo(558.1, 825.4, 557.5, 825.3, 556.9, 825.1);
      ctx.bezierCurveTo(556.3, 824.8, 555.8, 824.5, 555.4, 824.0);
      ctx.bezierCurveTo(555.0, 823.6, 554.7, 823.1, 554.4, 822.5);
      ctx.bezierCurveTo(554.2, 822.0, 554.1, 821.3, 554.1, 820.7);
      ctx.bezierCurveTo(554.1, 820.0, 554.2, 819.4, 554.4, 818.9);
      ctx.bezierCurveTo(554.7, 818.3, 555.0, 817.8, 555.4, 817.3);
      ctx.bezierCurveTo(555.8, 816.9, 556.3, 816.5, 556.9, 816.3);
      ctx.bezierCurveTo(557.5, 816.0, 558.1, 815.9, 558.8, 815.9);
      ctx.bezierCurveTo(559.2, 815.9, 559.6, 816.0, 560.0, 816.0);
      ctx.bezierCurveTo(560.3, 816.1, 560.6, 816.2, 560.9, 816.4);
      ctx.bezierCurveTo(561.2, 816.5, 561.5, 816.7, 561.7, 816.9);
      ctx.bezierCurveTo(562.0, 817.1, 562.2, 817.3, 562.4, 817.5);
      ctx.lineTo(561.5, 818.5);
      ctx.bezierCurveTo(561.2, 818.1, 560.8, 817.8, 560.3, 817.5);
      ctx.bezierCurveTo(559.9, 817.2, 559.4, 817.1, 558.8, 817.1);
      ctx.bezierCurveTo(558.3, 817.1, 557.9, 817.2, 557.5, 817.4);
      ctx.bezierCurveTo(557.1, 817.6, 556.7, 817.8, 556.4, 818.1);
      ctx.bezierCurveTo(556.1, 818.5, 555.9, 818.8, 555.7, 819.3);
      ctx.bezierCurveTo(555.6, 819.7, 555.5, 820.2, 555.5, 820.6);
      ctx.bezierCurveTo(555.5, 821.1, 555.6, 821.6, 555.7, 822.0);
      ctx.bezierCurveTo(555.9, 822.5, 556.2, 822.9, 556.5, 823.2);
      ctx.bezierCurveTo(556.8, 823.5, 557.1, 823.7, 557.5, 823.9);
      ctx.bezierCurveTo(557.9, 824.1, 558.4, 824.2, 558.8, 824.2);
      ctx.bezierCurveTo(559.4, 824.2, 559.9, 824.1, 560.4, 823.8);
      ctx.bezierCurveTo(560.9, 823.6, 561.3, 823.2, 561.6, 822.8);
      ctx.lineTo(562.5, 823.7);
      ctx.bezierCurveTo(562.0, 824.2, 561.5, 824.6, 560.9, 824.9);
      ctx.fill();

      // capa1/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(573.0, 822.5);
      ctx.bezierCurveTo(572.8, 823.1, 572.5, 823.6, 572.1, 824.0);
      ctx.bezierCurveTo(571.6, 824.5, 571.1, 824.8, 570.5, 825.1);
      ctx.bezierCurveTo(569.9, 825.3, 569.3, 825.4, 568.6, 825.4);
      ctx.bezierCurveTo(567.9, 825.4, 567.3, 825.3, 566.7, 825.1);
      ctx.bezierCurveTo(566.2, 824.8, 565.7, 824.5, 565.2, 824.0);
      ctx.bezierCurveTo(564.8, 823.6, 564.5, 823.1, 564.3, 822.5);
      ctx.bezierCurveTo(564.0, 822.0, 563.9, 821.3, 563.9, 820.7);
      ctx.bezierCurveTo(563.9, 820.0, 564.0, 819.4, 564.3, 818.9);
      ctx.bezierCurveTo(564.5, 818.3, 564.8, 817.8, 565.2, 817.3);
      ctx.bezierCurveTo(565.7, 816.9, 566.2, 816.5, 566.8, 816.3);
      ctx.bezierCurveTo(567.3, 816.0, 568.0, 815.9, 568.7, 815.9);
      ctx.bezierCurveTo(569.3, 815.9, 570.0, 816.0, 570.6, 816.3);
      ctx.bezierCurveTo(571.1, 816.5, 571.6, 816.9, 572.1, 817.3);
      ctx.bezierCurveTo(572.5, 817.7, 572.8, 818.2, 573.1, 818.8);
      ctx.bezierCurveTo(573.3, 819.4, 573.4, 820.0, 573.4, 820.7);
      ctx.bezierCurveTo(573.4, 821.3, 573.3, 821.9, 573.0, 822.5);

      // capa1/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(571.8, 819.3);
      ctx.bezierCurveTo(571.6, 818.9, 571.4, 818.5, 571.0, 818.2);
      ctx.bezierCurveTo(570.7, 817.8, 570.4, 817.6, 570.0, 817.4);
      ctx.bezierCurveTo(569.6, 817.2, 569.1, 817.1, 568.6, 817.1);
      ctx.bezierCurveTo(568.1, 817.1, 567.7, 817.2, 567.3, 817.4);
      ctx.bezierCurveTo(566.9, 817.6, 566.5, 817.8, 566.2, 818.1);
      ctx.bezierCurveTo(565.9, 818.5, 565.7, 818.8, 565.5, 819.3);
      ctx.bezierCurveTo(565.4, 819.7, 565.3, 820.2, 565.3, 820.6);
      ctx.bezierCurveTo(565.3, 821.1, 565.4, 821.6, 565.6, 822.0);
      ctx.bezierCurveTo(565.7, 822.5, 566.0, 822.8, 566.3, 823.2);
      ctx.bezierCurveTo(566.6, 823.5, 566.9, 823.7, 567.3, 823.9);
      ctx.bezierCurveTo(567.7, 824.1, 568.2, 824.2, 568.7, 824.2);
      ctx.bezierCurveTo(569.2, 824.2, 569.6, 824.1, 570.0, 823.9);
      ctx.bezierCurveTo(570.4, 823.7, 570.8, 823.5, 571.1, 823.2);
      ctx.bezierCurveTo(571.4, 822.9, 571.6, 822.5, 571.8, 822.1);
      ctx.bezierCurveTo(571.9, 821.6, 572.0, 821.2, 572.0, 820.7);
      ctx.bezierCurveTo(572.0, 820.2, 571.9, 819.7, 571.8, 819.3);
      ctx.fill();

      // capa1/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(583.6, 817.0);
      ctx.bezierCurveTo(583.9, 816.8, 584.1, 816.6, 584.3, 816.4);
      ctx.bezierCurveTo(584.6, 816.3, 584.9, 816.1, 585.2, 816.1);
      ctx.bezierCurveTo(585.5, 816.0, 585.9, 815.9, 586.3, 815.9);
      ctx.bezierCurveTo(587.4, 815.9, 588.2, 816.2, 588.8, 816.9);
      ctx.bezierCurveTo(589.4, 817.5, 589.7, 818.4, 589.7, 819.6);
      ctx.lineTo(589.7, 825.2);
      ctx.lineTo(588.3, 825.2);
      ctx.lineTo(588.3, 819.9);
      ctx.bezierCurveTo(588.3, 819.0, 588.1, 818.3, 587.7, 817.9);
      ctx.bezierCurveTo(587.3, 817.4, 586.7, 817.1, 586.0, 817.1);
      ctx.bezierCurveTo(585.6, 817.1, 585.3, 817.2, 585.0, 817.3);
      ctx.bezierCurveTo(584.7, 817.5, 584.4, 817.6, 584.2, 817.9);
      ctx.bezierCurveTo(584.0, 818.1, 583.8, 818.4, 583.6, 818.8);
      ctx.bezierCurveTo(583.5, 819.1, 583.4, 819.5, 583.4, 820.0);
      ctx.lineTo(583.4, 825.2);
      ctx.lineTo(582.1, 825.2);
      ctx.lineTo(582.1, 819.9);
      ctx.bezierCurveTo(582.1, 819.0, 581.9, 818.3, 581.5, 817.9);
      ctx.bezierCurveTo(581.1, 817.4, 580.5, 817.1, 579.8, 817.1);
      ctx.bezierCurveTo(579.4, 817.1, 579.1, 817.2, 578.8, 817.4);
      ctx.bezierCurveTo(578.4, 817.5, 578.2, 817.7, 578.0, 818.0);
      ctx.bezierCurveTo(577.7, 818.2, 577.5, 818.5, 577.4, 818.9);
      ctx.bezierCurveTo(577.3, 819.2, 577.2, 819.6, 577.2, 820.0);
      ctx.lineTo(577.2, 825.2);
      ctx.lineTo(575.9, 825.2);
      ctx.lineTo(575.9, 816.1);
      ctx.lineTo(577.2, 816.1);
      ctx.lineTo(577.2, 817.6);
      ctx.bezierCurveTo(577.4, 817.4, 577.5, 817.2, 577.7, 817.0);
      ctx.bezierCurveTo(577.9, 816.8, 578.1, 816.6, 578.3, 816.4);
      ctx.bezierCurveTo(578.6, 816.3, 578.8, 816.1, 579.1, 816.1);
      ctx.bezierCurveTo(579.4, 816.0, 579.8, 815.9, 580.2, 815.9);
      ctx.bezierCurveTo(580.9, 815.9, 581.5, 816.1, 582.0, 816.4);
      ctx.bezierCurveTo(582.5, 816.8, 582.8, 817.2, 583.1, 817.7);
      ctx.bezierCurveTo(583.3, 817.5, 583.4, 817.2, 583.6, 817.0);
      ctx.fill();
      ctx.restore();
      ctx.restore();
    },
    hoja(ctx,articulos) {

      // capa1/Recortar grupo
      ctx.save();

      // capa1/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0.0, 852.8);
      ctx.lineTo(612.0, 852.8);
      ctx.lineTo(612.0, 0.0);
      ctx.lineTo(0.0, 0.0);
      ctx.lineTo(0.0, 852.8);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/300
       ctx.font = "11px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
     //precio 24
     if(articulos[23].precio){
      ctx.fillText('$'+articulos[23].precio, 544.5, 747.8);
     }else{
      ctx.fillText('', 544.5, 747.8);
     }
    

  
      // capa1/Recortar grupo/HORNO ELECT 65 CM 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[23].Dcomercial ,  462.2, 658.4, 125, 13);

      // capa1/Recortar grupo/ACERO INOX TOUCH
      //this.wrapText(ctx,articulos[1].Dcomercial ,  462.2, 667.5, 125, 13);

      // capa1/Recortar grupo/259
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[22].precio, 310.4, 748.0);

      // capa1/Recortar grupo/99
     
   
      // capa1/Recortar grupo/LAVADORA 10 KG 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[22].Dcomercial , 310.2, 658.4, 125, 13);

      // capa1/Recortar grupo/SEMIAUTOMATICA
      //ctx.fillText("SEMIAUTOMATICA", 310.2, 667.5);

      // capa1/Recortar grupo/185
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[21].precio, 264.9, 747.8);

    
     
      // capa1/Recortar grupo/LAVADORA 07 KG 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[21].Dcomercial , 178.5, 658.4, 125, 13);

      // capa1/Recortar grupo/SEMIAUTOMATICA
      //ctx.fillText("SEMIAUTOMATICA", 178.5, 667.5);

      // capa1/Recortar grupo/394
       ctx.font = "11px 'Roboto'";
      // precio 21
      ctx.fillText('$'+articulos[20].precio, 27.8, 747.8);

     
      
      // capa1/Recortar grupo/LAVADORA 16 KG 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[20].Dcomercial , 27.8, 658.4, 125, 13);

      // capa1/Recortar grupo/SEMIAUTOMATICA
      //ctx.fillText("SEMIAUTOMATICA", 27.8, 667.5);

      // capa1/Recortar grupo/269
       ctx.font = "11px 'Roboto'";
      ctx.fillText(articulos[19].precio, 544.9, 626.9);

   

      // capa1/Recortar grupo/AIRE ACONDICIONADO
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[19].Dcomercial , 462.0, 537.7, 125, 13);

 
      // capa1/Recortar grupo/22
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[18].precio, 309.8, 626.9);

      // capa1/Recortar grupo/PROTECTOR DE VOLTAJE 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[18].Dcomercial ,309.8, 537.9, 125, 13);

      // capa1/Recortar grupo/PARA EQUIPOS DE
      //ctx.fillText("PARA EQUIPOS DE", 309.8, 546.9);

      // capa1/Recortar grupo/REFRIGERACIN 
      //ctx.fillText("REFRIGERACI�N ", 309.8, 555.9);

      // capa1/Recortar grupo/79
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[17].precio, 269.7, 626.9);

      // capa1/Recortar grupo/99
      
   
      // capa1/Recortar grupo/EXTRACTOR DE JUGO 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[17].Dcomercial , 178.7, 537.9, 125, 13);

      // capa1/Recortar grupo/CSILVER
      //ctx.fillText("C/SILVER", 178.7, 546.9);

      // capa1/Recortar grupo/20
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[16].precio, 27.8, 626.9);

      // capa1/Recortar grupo/00


      // capa1/Recortar grupo/PLANCHA A VAPOR 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,'$'+articulos[16].Dcomercial , 28.4, 537.7, 125, 13);

      // capa1/Recortar grupo/INALAMBRICA
      //ctx.fillText("INALAMBRICA", 28.4, 546.7);

      // capa1/Recortar grupo/69
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[15].precio, 551.7, 506.0);

      // capa1/Recortar grupo/EXTRACTOR DE JUGO 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[15].Dcomercial , 461.3, 416.6, 125, 13);

      // capa1/Recortar grupo/CSILVER
      //ctx.fillText("C/SILVER", 461.3, 425.6);

      // capa1/Recortar grupo/15
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[14].precio, 309.4, 506.0);

      // capa1/Recortar grupo/00
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("00", 329.7, 502.4);

      // capa1/Recortar grupo/17291PS
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 2)";
      //ctx.fillText("17291PS", 309.8, 423.4);

      // capa1/Recortar grupo/PLANCHA A VAPOR 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[14].Dcomercial , 310.2, 416.6, 125, 13);

      // capa1/Recortar grupo/79
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[13].precio, 269.8, 506.0);

      
      // capa1/Recortar grupo/REFRIGERADOR 20 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[13].Dcomercial , 178.9, 416.8, 125, 13);

      // capa1/Recortar grupo/PIE EJECUTIVO
      //ctx.fillText("PIE EJECUTIVO", 178.9, 425.8);

      // capa1/Recortar grupo/64
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[12].precio, 28.1, 506.0);

      // capa1/Recortar grupo/99
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("99", 51.7, 502.4);

      // capa1/Recortar grupo/DA04FN
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 2)";
     // ctx.fillText("DA04FN", 27.8, 433.5);

      // capa1/Recortar grupo/FREIDORA DE AIRE 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[12].Dcomercial , 27.4, 416.8, 125, 13);

      // capa1/Recortar grupo/MANUAL 35L
      //ctx.fillText("MANUAL 3.5L", 27.4, 425.8);

      // capa1/Recortar grupo/60
      ctx.fillText('$'+articulos[11].precio, 554.0, 385.3);


      // capa1/Recortar grupo/EXTRACTOR DE JUGO 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[11].Dcomercial , 461.3, 295.8, 125, 13);

      // capa1/Recortar grupo/CNEGRO
      //ctx.fillText("C/NEGRO", 461.3, 304.8);

      // capa1/Recortar grupo/99
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[10].precio, 309.4, 385.3);


      // capa1/Recortar grupo/DISPENSADOR DE AGUA 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[10].Dcomercial , 309.8, 296.0, 125, 13);

      // capa1/Recortar grupo/CBLANCO
      //ctx.fillText("C/BLANCO", 309.8, 305.0);

      // capa1/Recortar grupo/139
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[9].precio, 265.3, 385.3);


      // capa1/Recortar grupo/DISPENSADOR DE AGUA 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[9].Dcomercial , 178.5, 295.8, 125, 13);

      // capa1/Recortar grupo/CPLATA
      //ctx.fillText("C/PLATA", 178.5, 304.8);

      // capa1/Recortar grupo/25
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[8].precio, 27.8, 385.3);

      
      // capa1/Recortar grupo/COTUFERA ELECTRICA 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[8].Dcomercial , 27.6, 295.8, 125, 13);

      // capa1/Recortar grupo/10 TZAS 
      //ctx.fillText("10 TZAS ", 27.6, 304.8);

      // capa1/Recortar grupo/109
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[9].precio, 546.7, 264.1);


      // capa1/Recortar grupo/DISPENSADOR DE AGUA 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[9].Dcomercial ,461.3, 176.6, 125, 13);

      // capa1/Recortar grupo/CBLANCO
      //ctx.fillText("C/BLANCO", 461.3, 185.7);

      // capa1/Recortar grupo/30
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[8].precio, 310.3, 264.4);

   

      // capa1/Recortar grupo/COTUFERA ELECTRICA 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[8].Dcomercial , 309.7, 176.6, 125, 13);

      // capa1/Recortar grupo/16 TZAS
      //ctx.fillText("16 TZAS", 309.7, 185.7);

      // capa1/Recortar grupo/30
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[5].precio, 268.9, 264.2);

     
      // capa1/Recortar grupo/COTUFERA ELECTRICA 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[5].Dcomercial ,179.1, 176.8, 125, 13);

      // capa1/Recortar grupo/16 TZAS
     // ctx.fillText("16 TZAS", 179.1, 185.8);

      // capa1/Recortar grupo/25
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[4].precio, 28.3, 264.8);


      // capa1/Recortar grupo/COTUFERA ELECTRICA
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[4].Dcomercial , 27.8, 176.9, 125, 13);

      // capa1/Recortar grupo/10 TZAS
      //ctx.fillText("10 TZAS", 27.8, 186.0);

      // capa1/Recortar grupo/40
       ctx.font = "11px 'Roboto'";
      ctx.fillText('$'+articulos[3].precio, 550.5, 143.1);

      

      // capa1/Recortar grupo/COTUFERA  ELECTRICA 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      this.wrapText(ctx,articulos[3].Dcomercial , 461.3, 56.1, 125, 13);
     
      // capa1/Recortar grupo/CBOWL 16 TZAS
     // ctx.fillText("C/BOWL 16 TZAS", 461.3, 65.1);

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(488.7, 737.1);
      ctx.lineTo(554.5, 737.1);
      ctx.lineTo(554.5, 677.1);
      ctx.lineTo(488.7, 677.1);
      ctx.lineTo(488.7, 737.1);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[23].sap), 488.7, 677.1,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(345.0, 739.7);
      ctx.lineTo(405.5, 739.7);
      ctx.lineTo(405.5, 671.7);
      ctx.lineTo(345.0, 671.7);
      ctx.lineTo(345.0, 739.7);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(345.0, 739.7);
      ctx.lineTo(405.5, 739.7);
      ctx.lineTo(405.5, 671.7);
      ctx.lineTo(345.0, 671.7);
      ctx.lineTo(345.0, 739.7);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[22].sap), 345.0, 671.7,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(204.3, 750.8);
      ctx.lineTo(258.8, 750.8);
      ctx.lineTo(258.8, 677.0);
      ctx.lineTo(204.3, 677.0);
      ctx.lineTo(204.3, 750.8);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(204.3, 750.8);
      ctx.lineTo(258.8, 750.8);
      ctx.lineTo(258.8, 677.0);
      ctx.lineTo(204.3, 677.0);
      ctx.lineTo(204.3, 750.8);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[21].sap), 204.3, 687.0,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(59.7, 737.8);
      ctx.lineTo(121.4, 737.8);
      ctx.lineTo(121.4, 672.6);
      ctx.lineTo(59.7, 672.6);
      ctx.lineTo(59.7, 737.8);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(59.7, 737.8);
      ctx.lineTo(121.4, 737.8);
      ctx.lineTo(121.4, 672.6);
      ctx.lineTo(59.7, 672.6);
      ctx.lineTo(59.7, 737.8);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[20].sap), 69.7, 682.6,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(483.5, 615.4);
      ctx.lineTo(553.7, 615.4);
      ctx.lineTo(553.7, 565.7);
      ctx.lineTo(483.5, 565.7);
      ctx.lineTo(483.5, 615.4);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(483.5, 615.4);
      ctx.lineTo(553.7, 615.4);
      ctx.lineTo(553.7, 565.7);
      ctx.lineTo(483.5, 565.7);
      ctx.lineTo(483.5, 615.4);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[19].sap), 483.5, 565.7,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(346.3, 631.9);
      ctx.lineTo(401.2, 631.9);
      ctx.lineTo(401.2, 557.7);
      ctx.lineTo(346.3, 557.7);
      ctx.lineTo(346.3, 631.9);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[18].sap), 346.3, 557.7,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(205.5, 622.2);
      ctx.lineTo(278.2, 622.2);
      ctx.lineTo(278.2, 549.6);
      ctx.lineTo(205.5, 549.6);
      ctx.lineTo(205.5, 622.2);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[17].sap), 205.5, 559.6,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(49.0, 640.9);
      ctx.lineTo(144.0, 640.9);
      ctx.lineTo(144.0, 544.1);
      ctx.lineTo(49.0, 544.1);
      ctx.lineTo(49.0, 640.9);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[16].sap), 49.0, 564.1,54,69);
      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(490.3, 507.1);
      ctx.lineTo(539.2, 507.1);
      ctx.lineTo(539.2, 423.2);
      ctx.lineTo(490.3, 423.2);
      ctx.lineTo(490.3, 507.1);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[15].sap), 490.3, 443.2,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(317.5, 488.4);
      ctx.lineTo(424.3, 488.4);
      ctx.lineTo(424.3, 421.5);
      ctx.lineTo(317.5, 421.5);
      ctx.lineTo(317.5, 488.4);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(317.5, 488.4);
      ctx.lineTo(424.3, 488.4);
      ctx.lineTo(424.3, 421.5);
      ctx.lineTo(317.5, 421.5);
      ctx.lineTo(317.5, 488.4);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[14].sap), 317.5, 431.5,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(204.2, 499.0);
      ctx.lineTo(270.9, 499.0);
      ctx.lineTo(270.9, 435.0);
      ctx.lineTo(204.2, 435.0);
      ctx.lineTo(204.2, 499.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[13].sap), 204.2, 435.0,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(65.8, 504.6);
      ctx.lineTo(123.5, 504.6);
      ctx.lineTo(123.5, 427.9);
      ctx.lineTo(65.8, 427.9);
      ctx.lineTo(65.8, 504.6);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(65.8, 504.6);
      ctx.lineTo(123.5, 504.6);
      ctx.lineTo(123.5, 427.9);
      ctx.lineTo(65.8, 427.9);
      ctx.lineTo(65.8, 504.6);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[12].sap), 65.8, 437.9,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(470.2, 398.6);
      ctx.lineTo(547.1, 398.6);
      ctx.lineTo(547.1, 295.7);
      ctx.lineTo(470.2, 295.7);
      ctx.lineTo(470.2, 398.6);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[11].sap), 470.2, 320.7,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(367.4, 386.4);
      ctx.lineTo(403.5, 386.4);
      ctx.lineTo(403.5, 304.1);
      ctx.lineTo(367.4, 304.1);
      ctx.lineTo(367.4, 386.4);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[10].sap), 367.4, 310,54,69);
      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(217.1, 390.2);
      ctx.lineTo(254.3, 390.2);
      ctx.lineTo(254.3, 300.3);
      ctx.lineTo(217.1, 300.3);
      ctx.lineTo(217.1, 390.2);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[9].sap), 217.1, 310.3,54,69);
      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(63.1, 386.4);
      ctx.lineTo(121.0, 386.4);
      ctx.lineTo(121.0, 301.4);
      ctx.lineTo(63.1, 301.4);
      ctx.lineTo(63.1, 386.4);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[8].sap), 80.1, 311.4,64,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(506.4, 264.2);
      ctx.lineTo(531.5, 264.2);
      ctx.lineTo(531.5, 189.1);
      
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[7].sap),476.4, 189.1,100,120);
console.log(articulos[7].sap)
      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(356.8, 262.1);
      ctx.lineTo(407.7, 262.1);
      ctx.lineTo(407.7, 182.9);
      ctx.lineTo(356.8, 182.9);
      ctx.lineTo(356.8, 262.1);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      ctx.drawImage(document.getElementById("image-"+articulos[6].sap), 360.8, 192.9,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(210.6, 264.2);
      ctx.lineTo(260.9, 264.2);
      ctx.lineTo(260.9, 185.3);
      ctx.lineTo(210.6, 185.3);
      ctx.lineTo(210.6, 264.2);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      //imagen  6 
      ctx.drawImage(document.getElementById("image-"+articulos[5].sap), 194, 205.3,54,69);
console.log(articulos[5])
      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(67.6, 265.0);
      ctx.lineTo(124.8, 265.0);
      ctx.lineTo(124.8, 180.1);
      ctx.lineTo(67.6, 180.1);
      ctx.lineTo(67.6, 265.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Imagen
      //imagen 5
      ctx.drawImage(document.getElementById("image-"+articulos[4].sap), 67.6, 190.1,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(482.8, 137.9);
      ctx.lineTo(552.0, 137.9);
      ctx.lineTo(552.0, 67.2);
      ctx.lineTo(482.8, 67.2);
      ctx.lineTo(482.8, 137.9);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(482.8, 137.9);
      ctx.lineTo(552.0, 137.9);
      ctx.lineTo(552.0, 67.2);
      ctx.lineTo(482.8, 67.2);
      ctx.lineTo(482.8, 137.9);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Imagen
      //imagen 4
      ctx.drawImage(document.getElementById("image-"+articulos[3].sap), 482.8, 90.2,54,69);
      
     

      // capa1/Recortar grupo/25
      ctx.restore();
      ctx.restore();
       ctx.font = "11px 'Roboto'";
      //Precio 3
      ctx.fillText('$'+articulos[2].precio,309.9, 143.2);
      
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
     // NOMBRE 3
      this.wrapText(ctx,articulos[2].Dcomercial ,  309.6, 56.0, 125, 13);
      
       ctx.font = "11px 'Roboto'";
      //ctx.fillText("$134.", 264.9, 143.1);
      //PRECIO 2
      ctx.fillText('$'+articulos[1].precio,264.9, 143.1);
      //PRECIO 1
      ctx.fillText('$'+articulos[0].precio, 27.7, 143.1);
      // capa1/Recortar grupo/99
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("99", 292.0, 139.4);

      // capa1/Recortar grupo/DA610P
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 2)";
      //ctx.fillText(" DA610P", 175.8, 81.4);

      // capa1/Recortar grupo/PARTY SPEAKER 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      //ctx.fillText("PARTY SPEAKER ", );
      this.wrapText(ctx,articulos[2].Dcomercial , 178.5, 56.2, 125, 13);
      // capa1/Recortar grupo/CBLUETOOTH
     // ctx.fillText("C/BLUETOOTH", 178.5, 65.2);

      // capa1/Recortar grupo/DE 65 PULG
     // ctx.fillText("DE 6.5 PULG.", 178.5, 74.2);

      // capa1/Recortar grupo/15
       ctx.font = "11px 'Roboto'";
     // ctx.fillText("$15.", 27.7, 143.1);
     //ctx.fillText('$3'+articulos[15].precio, 27.7, 143.1);
      // capa1/Recortar grupo/00
      ctx.font = "UltraItalic 6.4px 'Myriad Pro'";
      //ctx.fillText("00", 48.0, 139.4);

      // capa1/Recortar grupo/62507PS
      ctx.font = "Light 6.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(1, 2, 2)";
     // ctx.fillText(" 62507PS", 25.4, 72.8);

      // capa1/Recortar grupo/BATIDORA DE MANO 
      ctx.font = "7px 'Roboto'";
      ctx.fillStyle = "rgb(12, 74, 153)";
      //ctx.fillText("BATIDORA DE MANO ", );
      //titulo 1
      this.wrapText(ctx,articulos[0].Dcomercial , 28.1, 56.1, 125, 13);

      // capa1/Recortar grupo/5 VELOCIDADES
      //ctx.fillText("5 VELOCIDADES", 28.1, 65.1);

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(359.0, 144.3);
      ctx.lineTo(413.7, 144.3);
      ctx.lineTo(413.7, 59.6);
      ctx.lineTo(359.0, 59.6);
      ctx.lineTo(359.0, 144.3);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(359.0, 144.3);
      ctx.lineTo(413.7, 144.3);
      ctx.lineTo(413.7, 59.6);
      ctx.lineTo(359.0, 59.6);
      ctx.lineTo(359.0, 144.3);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Imagen
      //ctx.drawImage(document.getElementById("image-"+articulos[2].sap), 359.0, 59.6,54,69);
      //imagen 3
      ctx.drawImage(document.getElementById("image-"+articulos[2].sap), 359.0, 79.6,54,69);
      //ctx.drawImage(document.getElementById("image2"), 482.8, 90.2,54,69);
      // capa1/Recortar grupo/Trazado
      ctx.restore();
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(0.0, 30.6);
      ctx.lineTo(380.9, 30.6);
      ctx.lineTo(380.9, 25.6);
      ctx.lineTo(0.0, 25.6);
      ctx.lineTo(0.0, 30.6);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0.0, 0.0);
      ctx.lineTo(612.0, 0.0);
      ctx.lineTo(612.0, 852.8);
      ctx.lineTo(0.0, 852.8);
      ctx.lineTo(0.0, 0.0);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(357.6, 15.1);
      ctx.lineTo(367.5, 30.0);
      ctx.bezierCurveTo(367.7, 30.4, 368.2, 30.6, 368.7, 30.6);
      ctx.lineTo(612.0, 30.6);
      ctx.lineTo(612.0, 10.6);
      ctx.lineTo(361.2, 10.6);
      ctx.bezierCurveTo(358.2, 10.6, 356.2, 13.0, 357.6, 15.1);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(558.3, 781.0);
      ctx.lineTo(553.8, 785.5);
      ctx.bezierCurveTo(550.9, 787.5, 547.3, 788.6, 543.6, 788.6);
      ctx.lineTo(0.0, 788.6);
      ctx.lineTo(0.0, 852.8);
      ctx.lineTo(612.0, 852.8);
      ctx.lineTo(612.0, 781.0);
      ctx.lineTo(558.3, 781.0);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(615.0, 839.6);
      ctx.lineTo(104.0, 839.6);
      ctx.bezierCurveTo(93.1, 839.6, 83.4, 837.8, 79.9, 835.0);
      ctx.lineTo(47.6, 809.7);
      ctx.bezierCurveTo(42.0, 805.3, 54.2, 800.8, 71.6, 800.8);
      ctx.lineTo(615.0, 800.8);
      ctx.lineTo(615.0, 839.6);
      ctx.closePath();
      ctx.fillStyle = "rgb(254, 219, 10)";
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(371.7, 821.7);
      ctx.bezierCurveTo(371.7, 821.8, 371.8, 821.8, 371.9, 821.8);
      ctx.bezierCurveTo(372.5, 821.8, 373.1, 821.8, 373.6, 821.8);
      ctx.bezierCurveTo(373.7, 821.8, 373.7, 821.8, 373.8, 821.8);
      ctx.lineTo(373.8, 820.2);
      ctx.lineTo(371.6, 820.2);
      ctx.bezierCurveTo(371.6, 820.7, 371.7, 821.2, 371.7, 821.7);
      ctx.fillStyle = "rgb(26, 64, 141)";
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(372.1, 815.6);
      ctx.lineTo(373.8, 815.6);
      ctx.lineTo(373.8, 812.9);
      ctx.bezierCurveTo(372.9, 813.6, 372.5, 814.6, 372.1, 815.6);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(373.8, 825.9);
      ctx.lineTo(373.8, 823.3);
      ctx.lineTo(372.1, 823.3);
      ctx.bezierCurveTo(372.3, 824.1, 373.2, 825.7, 373.8, 825.9);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(370.3, 817.0);
      ctx.bezierCurveTo(369.6, 817.0, 369.0, 817.0, 368.3, 817.0);
      ctx.bezierCurveTo(368.3, 817.0, 368.2, 817.1, 368.2, 817.1);
      ctx.bezierCurveTo(368.0, 817.6, 367.9, 818.1, 367.8, 818.7);
      ctx.lineTo(370.1, 818.7);
      ctx.bezierCurveTo(370.2, 818.1, 370.2, 817.6, 370.3, 817.0);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(370.3, 821.8);
      ctx.bezierCurveTo(370.2, 821.3, 370.1, 820.7, 370.1, 820.2);
      ctx.lineTo(367.8, 820.2);
      ctx.bezierCurveTo(367.9, 820.7, 368.1, 821.2, 368.2, 821.7);
      ctx.bezierCurveTo(368.2, 821.8, 368.3, 821.8, 368.4, 821.8);
      ctx.bezierCurveTo(369.0, 821.8, 369.5, 821.8, 370.1, 821.8);
      ctx.bezierCurveTo(370.1, 821.8, 370.2, 821.8, 370.3, 821.8);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(378.8, 817.0);
      ctx.bezierCurveTo(378.8, 817.6, 378.9, 818.1, 378.9, 818.7);
      ctx.lineTo(381.2, 818.7);
      ctx.bezierCurveTo(381.1, 818.2, 381.0, 817.7, 380.8, 817.2);
      ctx.bezierCurveTo(380.8, 817.0, 380.7, 817.0, 380.6, 817.0);
      ctx.bezierCurveTo(380.1, 817.0, 379.5, 817.0, 378.9, 817.0);
      ctx.bezierCurveTo(378.8, 817.0, 378.8, 817.0, 378.8, 817.0);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(369.0, 815.5);
      ctx.bezierCurveTo(369.1, 815.6, 369.1, 815.6, 369.1, 815.6);
      ctx.bezierCurveTo(369.4, 815.6, 369.7, 815.6, 370.0, 815.6);
      ctx.bezierCurveTo(370.2, 815.6, 370.4, 815.6, 370.6, 815.5);
      ctx.bezierCurveTo(370.7, 815.5, 370.7, 815.2, 370.8, 815.0);
      ctx.bezierCurveTo(371.0, 814.5, 371.2, 814.0, 371.4, 813.5);
      ctx.bezierCurveTo(370.4, 814.0, 369.7, 814.7, 369.0, 815.5);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(370.5, 823.3);
      ctx.bezierCurveTo(370.0, 823.3, 369.5, 823.3, 369.0, 823.3);
      ctx.bezierCurveTo(369.7, 824.2, 370.4, 824.9, 371.4, 825.4);
      ctx.bezierCurveTo(371.1, 824.7, 370.9, 824.1, 370.6, 823.4);
      ctx.bezierCurveTo(370.6, 823.4, 370.5, 823.3, 370.5, 823.3);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(371.9, 817.0);
      ctx.bezierCurveTo(371.8, 817.0, 371.8, 817.1, 371.8, 817.1);
      ctx.bezierCurveTo(371.7, 817.6, 371.6, 818.1, 371.6, 818.7);
      ctx.lineTo(373.8, 818.7);
      ctx.lineTo(373.8, 817.0);
      ctx.bezierCurveTo(373.1, 817.0, 372.5, 817.0, 371.9, 817.0);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(375.2, 821.8);
      ctx.bezierCurveTo(375.3, 821.8, 375.3, 821.8, 375.3, 821.8);
      ctx.bezierCurveTo(375.9, 821.8, 376.5, 821.8, 377.2, 821.8);
      ctx.bezierCurveTo(377.2, 821.8, 377.3, 821.8, 377.3, 821.8);
      ctx.bezierCurveTo(377.3, 821.2, 377.4, 820.7, 377.5, 820.2);
      ctx.lineTo(375.2, 820.2);
      ctx.lineTo(375.2, 821.8);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(378.5, 823.3);
      ctx.bezierCurveTo(378.5, 823.3, 378.4, 823.4, 378.4, 823.4);
      ctx.bezierCurveTo(378.3, 823.6, 378.3, 823.8, 378.2, 823.9);
      ctx.bezierCurveTo(378.0, 824.4, 377.8, 824.9, 377.6, 825.4);
      ctx.bezierCurveTo(378.6, 824.9, 379.4, 824.2, 380.0, 823.3);
      ctx.bezierCurveTo(379.5, 823.3, 379.0, 823.3, 378.5, 823.3);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(374.5, 808.5);
      ctx.bezierCurveTo(368.5, 808.5, 363.6, 813.4, 363.6, 819.4);
      ctx.bezierCurveTo(363.6, 825.5, 368.5, 830.4, 374.5, 830.4);
      ctx.bezierCurveTo(380.6, 830.4, 385.5, 825.5, 385.5, 819.4);
      ctx.bezierCurveTo(385.5, 813.4, 380.6, 808.5, 374.5, 808.5);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(374.5, 827.6);
      ctx.bezierCurveTo(370.0, 827.6, 366.3, 823.9, 366.3, 819.4);
      ctx.bezierCurveTo(366.3, 814.9, 370.0, 811.2, 374.5, 811.2);
      ctx.bezierCurveTo(379.0, 811.3, 382.7, 814.9, 382.7, 819.4);
      ctx.bezierCurveTo(382.7, 824.0, 379.0, 827.6, 374.5, 827.6);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(378.5, 815.6);
      ctx.bezierCurveTo(379.0, 815.6, 379.5, 815.6, 380.0, 815.6);
      ctx.bezierCurveTo(379.4, 814.7, 378.6, 814.0, 377.7, 813.5);
      ctx.bezierCurveTo(377.9, 814.1, 378.1, 814.8, 378.4, 815.5);
      ctx.bezierCurveTo(378.4, 815.5, 378.5, 815.6, 378.5, 815.6);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(378.8, 821.8);
      ctx.lineTo(380.4, 821.8);
      ctx.bezierCurveTo(380.8, 821.8, 380.8, 821.8, 380.9, 821.5);
      ctx.bezierCurveTo(381.0, 821.1, 381.1, 820.6, 381.2, 820.2);
      ctx.lineTo(378.9, 820.2);
      ctx.bezierCurveTo(378.9, 820.7, 378.8, 821.3, 378.8, 821.8);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(375.3, 817.0);
      ctx.lineTo(375.3, 818.7);
      ctx.lineTo(377.5, 818.7);
      ctx.bezierCurveTo(377.4, 818.3, 377.4, 817.8, 377.3, 817.4);
      ctx.bezierCurveTo(377.3, 817.0, 377.3, 817.0, 376.9, 817.0);
      ctx.lineTo(375.3, 817.0);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(375.2, 825.9);
      ctx.bezierCurveTo(376.1, 825.2, 376.5, 824.3, 376.9, 823.3);
      ctx.lineTo(375.2, 823.3);
      ctx.lineTo(375.2, 825.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(375.3, 812.9);
      ctx.lineTo(375.3, 815.6);
      ctx.lineTo(376.9, 815.6);
      ctx.bezierCurveTo(376.5, 814.6, 376.1, 813.6, 375.3, 812.9);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(135.4, 810.1);
      ctx.lineTo(136.8, 810.1);
      ctx.bezierCurveTo(136.8, 810.1, 136.9, 810.1, 136.9, 810.1);
      ctx.bezierCurveTo(138.6, 810.2, 140.1, 810.7, 141.5, 811.5);
      ctx.bezierCurveTo(144.8, 813.6, 146.6, 816.6, 146.8, 820.5);
      ctx.bezierCurveTo(146.8, 822.5, 146.3, 824.4, 145.3, 826.2);
      ctx.bezierCurveTo(143.6, 828.9, 141.1, 830.6, 137.9, 831.2);
      ctx.bezierCurveTo(137.6, 831.3, 137.2, 831.3, 136.8, 831.4);
      ctx.lineTo(135.4, 831.4);
      ctx.bezierCurveTo(135.2, 831.4, 134.9, 831.3, 134.7, 831.3);
      ctx.bezierCurveTo(132.5, 831.0, 130.7, 830.2, 129.1, 828.7);
      ctx.bezierCurveTo(127.2, 827.1, 126.1, 825.0, 125.6, 822.6);
      ctx.bezierCurveTo(125.5, 822.2, 125.5, 821.8, 125.4, 821.4);
      ctx.lineTo(125.4, 820.1);
      ctx.bezierCurveTo(125.5, 819.8, 125.5, 819.6, 125.5, 819.3);
      ctx.bezierCurveTo(125.9, 817.0, 126.9, 815.0, 128.5, 813.3);
      ctx.bezierCurveTo(130.1, 811.7, 132.0, 810.6, 134.3, 810.2);
      ctx.bezierCurveTo(134.7, 810.2, 135.1, 810.1, 135.4, 810.1);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(138.9, 817.1);
      ctx.lineTo(138.9, 815.0);
      ctx.bezierCurveTo(138.9, 814.9, 138.9, 814.9, 138.9, 814.9);
      ctx.bezierCurveTo(138.1, 814.9, 137.3, 814.9, 136.6, 815.0);
      ctx.bezierCurveTo(135.6, 815.0, 134.9, 815.6, 134.6, 816.5);
      ctx.bezierCurveTo(134.5, 816.8, 134.5, 817.2, 134.5, 817.6);
      ctx.bezierCurveTo(134.4, 818.0, 134.5, 818.5, 134.5, 818.9);
      ctx.lineTo(133.2, 818.9);
      ctx.lineTo(133.2, 821.1);
      ctx.lineTo(134.5, 821.1);
      ctx.lineTo(134.5, 827.3);
      ctx.lineTo(137.0, 827.3);
      ctx.lineTo(137.0, 821.1);
      ctx.lineTo(138.8, 821.1);
      ctx.bezierCurveTo(138.8, 820.4, 138.9, 819.7, 139.0, 818.9);
      ctx.lineTo(137.1, 818.9);
      ctx.bezierCurveTo(137.0, 818.9, 137.0, 818.9, 137.0, 818.9);
      ctx.bezierCurveTo(137.0, 818.5, 137.0, 818.1, 137.0, 817.8);
      ctx.bezierCurveTo(137.0, 817.2, 137.2, 817.1, 137.7, 817.1);
      ctx.bezierCurveTo(138.1, 817.1, 138.5, 817.1, 138.9, 817.1);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(109.3, 810.1);
      ctx.lineTo(110.6, 810.1);
      ctx.bezierCurveTo(110.6, 810.1, 110.7, 810.1, 110.8, 810.1);
      ctx.bezierCurveTo(112.4, 810.2, 114.0, 810.7, 115.4, 811.6);
      ctx.bezierCurveTo(118.1, 813.3, 119.8, 815.7, 120.4, 818.9);
      ctx.bezierCurveTo(120.5, 819.3, 120.5, 819.7, 120.6, 820.1);
      ctx.lineTo(120.6, 821.4);
      ctx.bezierCurveTo(120.6, 821.5, 120.6, 821.7, 120.5, 821.8);
      ctx.bezierCurveTo(120.3, 823.9, 119.5, 825.8, 118.2, 827.5);
      ctx.bezierCurveTo(116.5, 829.5, 114.4, 830.8, 111.8, 831.2);
      ctx.bezierCurveTo(111.4, 831.3, 111.0, 831.3, 110.6, 831.4);
      ctx.lineTo(109.3, 831.4);
      ctx.bezierCurveTo(109.0, 831.4, 108.7, 831.3, 108.5, 831.3);
      ctx.bezierCurveTo(106.5, 831.0, 104.7, 830.3, 103.2, 829.0);
      ctx.bezierCurveTo(101.2, 827.3, 99.9, 825.2, 99.4, 822.6);
      ctx.bezierCurveTo(99.4, 822.2, 99.3, 821.8, 99.3, 821.4);
      ctx.lineTo(99.3, 820.1);
      ctx.bezierCurveTo(99.3, 819.9, 99.3, 819.8, 99.3, 819.7);
      ctx.bezierCurveTo(99.6, 817.4, 100.4, 815.4, 101.9, 813.7);
      ctx.bezierCurveTo(103.6, 811.8, 105.6, 810.7, 108.1, 810.2);
      ctx.bezierCurveTo(108.5, 810.2, 108.9, 810.1, 109.3, 810.1);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(109.9, 814.6);
      ctx.bezierCurveTo(109.9, 814.6, 109.9, 814.6, 109.9, 814.7);
      ctx.bezierCurveTo(109.1, 814.7, 108.2, 814.6, 107.3, 814.7);
      ctx.bezierCurveTo(106.6, 814.7, 105.9, 814.8, 105.3, 815.3);
      ctx.bezierCurveTo(104.3, 815.9, 103.9, 816.9, 103.9, 818.1);
      ctx.bezierCurveTo(103.8, 819.9, 103.8, 821.6, 103.9, 823.4);
      ctx.bezierCurveTo(103.9, 824.1, 104.0, 824.8, 104.4, 825.4);
      ctx.bezierCurveTo(105.1, 826.4, 106.1, 826.8, 107.3, 826.8);
      ctx.bezierCurveTo(109.0, 826.8, 110.8, 826.8, 112.6, 826.8);
      ctx.bezierCurveTo(113.6, 826.8, 114.4, 826.5, 115.1, 825.7);
      ctx.bezierCurveTo(115.7, 825.1, 116.0, 824.2, 116.0, 823.4);
      ctx.bezierCurveTo(116.0, 821.9, 116.0, 820.4, 116.0, 819.0);
      ctx.bezierCurveTo(116.0, 818.6, 116.0, 818.1, 116.0, 817.7);
      ctx.bezierCurveTo(115.8, 816.0, 114.6, 814.8, 113.0, 814.7);
      ctx.bezierCurveTo(112.0, 814.6, 111.0, 814.6, 109.9, 814.6);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(109.9, 825.8);
      ctx.bezierCurveTo(109.0, 825.8, 108.1, 825.8, 107.2, 825.7);
      ctx.bezierCurveTo(105.9, 825.6, 105.0, 824.8, 105.0, 823.5);
      ctx.bezierCurveTo(104.9, 821.6, 104.9, 819.8, 105.0, 817.9);
      ctx.bezierCurveTo(105.0, 817.1, 105.4, 816.5, 106.1, 816.1);
      ctx.bezierCurveTo(106.5, 815.8, 107.0, 815.8, 107.5, 815.8);
      ctx.bezierCurveTo(109.2, 815.8, 111.0, 815.7, 112.7, 815.8);
      ctx.bezierCurveTo(114.0, 815.8, 114.8, 816.7, 114.9, 818.0);
      ctx.bezierCurveTo(114.9, 819.8, 114.9, 821.7, 114.9, 823.5);
      ctx.bezierCurveTo(114.8, 824.8, 114.0, 825.6, 112.7, 825.7);
      ctx.bezierCurveTo(112.3, 825.7, 111.8, 825.7, 111.3, 825.8);
      ctx.bezierCurveTo(110.9, 825.8, 110.4, 825.8, 109.9, 825.8);
      ctx.bezierCurveTo(109.9, 825.8, 109.9, 825.8, 109.9, 825.8);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(113.1, 820.7);
      ctx.bezierCurveTo(113.1, 819.0, 111.7, 817.6, 109.9, 817.6);
      ctx.bezierCurveTo(108.2, 817.6, 106.8, 819.0, 106.8, 820.7);
      ctx.bezierCurveTo(106.8, 822.5, 108.2, 823.9, 109.9, 823.9);
      ctx.bezierCurveTo(111.7, 823.9, 113.1, 822.5, 113.1, 820.7);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(113.9, 817.5);
      ctx.bezierCurveTo(113.9, 817.1, 113.6, 816.7, 113.2, 816.7);
      ctx.bezierCurveTo(112.8, 816.7, 112.5, 817.1, 112.5, 817.5);
      ctx.bezierCurveTo(112.5, 817.9, 112.8, 818.2, 113.2, 818.2);
      ctx.bezierCurveTo(113.6, 818.2, 113.9, 817.9, 113.9, 817.5);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(109.9, 818.7);
      ctx.bezierCurveTo(111.0, 818.7, 112.0, 819.6, 112.0, 820.7);
      ctx.bezierCurveTo(112.0, 821.9, 111.0, 822.8, 109.9, 822.8);
      ctx.bezierCurveTo(108.8, 822.8, 107.9, 821.9, 107.9, 820.7);
      ctx.bezierCurveTo(107.9, 819.6, 108.8, 818.7, 109.9, 818.7);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(189.4, 831.7);
      ctx.lineTo(187.6, 831.7);
      ctx.bezierCurveTo(187.1, 831.7, 186.7, 831.6, 186.3, 831.5);
      ctx.bezierCurveTo(180.9, 830.4, 177.2, 825.2, 177.9, 819.7);
      ctx.bezierCurveTo(178.2, 817.4, 179.1, 815.4, 180.8, 813.7);
      ctx.bezierCurveTo(183.5, 810.9, 186.8, 809.8, 190.6, 810.7);
      ctx.bezierCurveTo(194.7, 811.5, 197.4, 814.0, 198.7, 818.0);
      ctx.bezierCurveTo(198.9, 818.7, 199.0, 819.4, 199.1, 820.2);
      ctx.lineTo(199.1, 822.0);
      ctx.bezierCurveTo(199.1, 822.3, 199.1, 822.7, 199.0, 823.0);
      ctx.bezierCurveTo(198.1, 827.3, 195.5, 830.0, 191.3, 831.4);
      ctx.bezierCurveTo(190.7, 831.6, 190.1, 831.6, 189.4, 831.7);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(188.8, 819.4);
      ctx.lineTo(188.8, 819.4);
      ctx.bezierCurveTo(188.8, 820.7, 188.8, 822.0, 188.8, 823.3);
      ctx.bezierCurveTo(188.8, 823.4, 188.8, 823.6, 188.8, 823.7);
      ctx.bezierCurveTo(188.6, 824.6, 187.8, 825.2, 186.8, 825.2);
      ctx.bezierCurveTo(186.0, 825.2, 185.2, 824.4, 185.2, 823.6);
      ctx.bezierCurveTo(185.1, 822.7, 185.6, 821.8, 186.6, 821.6);
      ctx.bezierCurveTo(186.8, 821.6, 187.0, 821.5, 187.3, 821.6);
      ctx.bezierCurveTo(187.4, 821.6, 187.5, 821.6, 187.5, 821.4);
      ctx.bezierCurveTo(187.5, 820.9, 187.5, 820.4, 187.5, 819.9);
      ctx.bezierCurveTo(187.5, 819.7, 187.4, 819.7, 187.3, 819.7);
      ctx.bezierCurveTo(187.0, 819.7, 186.6, 819.7, 186.3, 819.7);
      ctx.bezierCurveTo(184.3, 820.0, 183.0, 821.9, 183.2, 823.9);
      ctx.bezierCurveTo(183.5, 825.9, 185.4, 827.4, 187.6, 827.1);
      ctx.bezierCurveTo(189.5, 826.8, 190.8, 825.1, 190.7, 823.3);
      ctx.bezierCurveTo(190.7, 822.0, 190.7, 820.6, 190.7, 819.3);
      ctx.bezierCurveTo(190.7, 819.2, 190.7, 819.2, 190.7, 819.1);
      ctx.bezierCurveTo(190.7, 819.0, 190.8, 819.0, 190.9, 819.0);
      ctx.bezierCurveTo(190.9, 819.1, 191.0, 819.1, 191.0, 819.1);
      ctx.bezierCurveTo(191.8, 819.6, 192.6, 819.9, 193.5, 820.0);
      ctx.bezierCurveTo(193.7, 820.0, 193.8, 819.9, 193.8, 819.7);
      ctx.bezierCurveTo(193.8, 819.3, 193.8, 818.9, 193.8, 818.5);
      ctx.bezierCurveTo(193.8, 818.1, 193.8, 818.1, 193.4, 818.0);
      ctx.bezierCurveTo(193.4, 818.0, 193.4, 818.0, 193.4, 818.0);
      ctx.bezierCurveTo(191.9, 817.8, 190.9, 816.8, 190.7, 815.2);
      ctx.bezierCurveTo(190.7, 815.1, 190.7, 815.0, 190.5, 815.0);
      ctx.bezierCurveTo(190.0, 815.0, 189.5, 815.0, 189.1, 815.0);
      ctx.bezierCurveTo(188.8, 815.0, 188.8, 815.0, 188.8, 815.3);
      ctx.bezierCurveTo(188.8, 816.7, 188.8, 818.0, 188.8, 819.4);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(157.4, 815.4);
      ctx.lineTo(165.4, 826.0);
      ctx.lineTo(167.2, 826.0);
      ctx.lineTo(159.2, 815.4);
      ctx.lineTo(157.4, 815.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(162.3, 810.1);
      ctx.bezierCurveTo(156.4, 810.1, 151.7, 814.9, 151.7, 820.7);
      ctx.bezierCurveTo(151.7, 826.6, 156.4, 831.4, 162.3, 831.4);
      ctx.bezierCurveTo(168.2, 831.4, 172.9, 826.6, 172.9, 820.7);
      ctx.bezierCurveTo(172.9, 814.9, 168.2, 810.1, 162.3, 810.1);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(165.0, 826.9);
      ctx.lineTo(161.3, 822.1);
      ctx.lineTo(156.9, 826.9);
      ctx.lineTo(155.7, 826.9);
      ctx.lineTo(160.8, 821.4);
      ctx.lineTo(155.8, 814.6);
      ctx.lineTo(159.7, 814.6);
      ctx.lineTo(163.0, 819.0);
      ctx.lineTo(167.1, 814.6);
      ctx.lineTo(168.3, 814.6);
      ctx.lineTo(163.5, 819.7);
      ctx.lineTo(168.9, 826.9);
      ctx.lineTo(165.0, 826.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(167.2, 826.0);
      ctx.lineTo(165.4, 826.0);
      ctx.lineTo(157.4, 815.4);
      ctx.lineTo(159.2, 815.4);
      ctx.lineTo(167.2, 826.0);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(216.5, 815.4);
      ctx.bezierCurveTo(215.8, 814.7, 214.9, 814.2, 214.0, 813.9);
      ctx.bezierCurveTo(213.1, 813.5, 212.1, 813.3, 211.0, 813.3);
      ctx.bezierCurveTo(209.9, 813.3, 208.9, 813.5, 208.0, 813.9);
      ctx.bezierCurveTo(207.1, 814.3, 206.2, 814.9, 205.5, 815.6);
      ctx.bezierCurveTo(204.9, 816.3, 204.3, 817.1, 203.9, 818.0);
      ctx.bezierCurveTo(203.5, 818.9, 203.3, 820.0, 203.3, 821.0);
      ctx.bezierCurveTo(203.3, 822.0, 203.5, 823.0, 203.9, 824.0);
      ctx.bezierCurveTo(204.3, 824.9, 204.8, 825.7, 205.5, 826.4);
      ctx.bezierCurveTo(206.2, 827.1, 207.1, 827.7, 208.0, 828.1);
      ctx.bezierCurveTo(209.0, 828.5, 210.0, 828.7, 211.1, 828.7);
      ctx.bezierCurveTo(212.1, 828.7, 212.9, 828.5, 213.6, 828.3);
      ctx.bezierCurveTo(214.4, 828.1, 215.1, 827.8, 215.8, 827.3);
      ctx.lineTo(215.9, 827.3);
      ctx.lineTo(215.5, 826.6);
      ctx.lineTo(215.4, 826.7);
      ctx.bezierCurveTo(214.7, 827.1, 214.1, 827.3, 213.4, 827.5);
      ctx.bezierCurveTo(212.8, 827.7, 212.0, 827.8, 211.1, 827.8);
      ctx.bezierCurveTo(210.1, 827.8, 209.2, 827.6, 208.3, 827.3);
      ctx.bezierCurveTo(207.5, 826.9, 206.7, 826.4, 206.1, 825.8);
      ctx.bezierCurveTo(205.5, 825.2, 205.0, 824.5, 204.7, 823.7);
      ctx.bezierCurveTo(204.4, 822.8, 204.2, 821.9, 204.2, 821.0);
      ctx.bezierCurveTo(204.2, 820.1, 204.4, 819.2, 204.7, 818.3);
      ctx.bezierCurveTo(205.0, 817.5, 205.5, 816.8, 206.1, 816.2);
      ctx.bezierCurveTo(206.7, 815.5, 207.5, 815.0, 208.3, 814.7);
      ctx.bezierCurveTo(209.1, 814.3, 210.0, 814.1, 211.0, 814.1);
      ctx.bezierCurveTo(212.0, 814.1, 212.9, 814.3, 213.7, 814.7);
      ctx.bezierCurveTo(214.5, 815.0, 215.3, 815.5, 215.9, 816.1);
      ctx.bezierCurveTo(216.5, 816.6, 216.9, 817.3, 217.3, 818.0);
      ctx.bezierCurveTo(217.6, 818.7, 217.8, 819.5, 217.8, 820.3);
      ctx.bezierCurveTo(217.8, 820.9, 217.7, 821.4, 217.6, 821.8);
      ctx.bezierCurveTo(217.4, 822.3, 217.3, 822.6, 217.0, 822.9);
      ctx.bezierCurveTo(216.8, 823.2, 216.6, 823.4, 216.3, 823.5);
      ctx.bezierCurveTo(216.0, 823.6, 215.7, 823.7, 215.5, 823.7);
      ctx.bezierCurveTo(215.0, 823.7, 214.7, 823.6, 214.4, 823.4);
      ctx.bezierCurveTo(214.2, 823.1, 214.1, 822.8, 214.1, 822.3);
      ctx.bezierCurveTo(214.1, 822.2, 214.1, 821.9, 214.2, 821.1);
      ctx.lineTo(214.9, 817.3);
      ctx.lineTo(213.8, 817.2);
      ctx.lineTo(213.6, 818.3);
      ctx.bezierCurveTo(213.5, 818.2, 213.4, 818.1, 213.4, 818.0);
      ctx.bezierCurveTo(213.2, 817.8, 213.0, 817.6, 212.8, 817.5);
      ctx.bezierCurveTo(212.6, 817.3, 212.3, 817.2, 212.0, 817.1);
      ctx.bezierCurveTo(211.7, 817.0, 211.4, 817.0, 211.1, 817.0);
      ctx.bezierCurveTo(210.6, 817.0, 210.1, 817.1, 209.6, 817.3);
      ctx.bezierCurveTo(209.1, 817.5, 208.6, 817.8, 208.2, 818.2);
      ctx.bezierCurveTo(207.8, 818.6, 207.5, 819.1, 207.3, 819.6);
      ctx.bezierCurveTo(207.0, 820.2, 206.9, 820.8, 206.9, 821.4);
      ctx.bezierCurveTo(206.9, 821.9, 207.0, 822.3, 207.1, 822.7);
      ctx.bezierCurveTo(207.3, 823.1, 207.5, 823.4, 207.8, 823.7);
      ctx.bezierCurveTo(208.1, 824.0, 208.5, 824.2, 208.9, 824.4);
      ctx.bezierCurveTo(209.6, 824.7, 210.4, 824.7, 211.1, 824.5);
      ctx.bezierCurveTo(211.4, 824.4, 211.6, 824.3, 211.9, 824.1);
      ctx.bezierCurveTo(212.1, 824.0, 212.4, 823.8, 212.6, 823.6);
      ctx.bezierCurveTo(212.7, 823.4, 212.9, 823.3, 213.0, 823.2);
      ctx.bezierCurveTo(213.2, 823.6, 213.4, 823.9, 213.8, 824.2);
      ctx.bezierCurveTo(214.2, 824.5, 214.8, 824.6, 215.4, 824.6);
      ctx.bezierCurveTo(215.8, 824.6, 216.2, 824.5, 216.6, 824.4);
      ctx.bezierCurveTo(216.9, 824.2, 217.3, 823.9, 217.6, 823.6);
      ctx.bezierCurveTo(217.9, 823.2, 218.2, 822.8, 218.4, 822.2);
      ctx.bezierCurveTo(218.6, 821.7, 218.7, 821.0, 218.7, 820.3);
      ctx.bezierCurveTo(218.7, 819.3, 218.5, 818.5, 218.1, 817.6);
      ctx.bezierCurveTo(217.7, 816.8, 217.1, 816.0, 216.5, 815.4);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(213.2, 820.3);
      ctx.bezierCurveTo(213.2, 820.7, 213.1, 821.1, 212.9, 821.5);
      ctx.bezierCurveTo(212.8, 821.9, 212.6, 822.2, 212.3, 822.5);
      ctx.bezierCurveTo(212.0, 822.8, 211.7, 823.1, 211.3, 823.2);
      ctx.bezierCurveTo(211.0, 823.4, 210.6, 823.5, 210.2, 823.5);
      ctx.bezierCurveTo(209.6, 823.5, 209.1, 823.3, 208.7, 822.9);
      ctx.bezierCurveTo(208.3, 822.6, 208.1, 822.0, 208.1, 821.3);
      ctx.bezierCurveTo(208.1, 820.9, 208.2, 820.4, 208.3, 820.0);
      ctx.bezierCurveTo(208.5, 819.6, 208.7, 819.3, 209.0, 819.0);
      ctx.bezierCurveTo(209.3, 818.7, 209.6, 818.5, 210.0, 818.3);
      ctx.bezierCurveTo(210.3, 818.2, 210.7, 818.1, 211.1, 818.1);
      ctx.bezierCurveTo(211.4, 818.1, 211.6, 818.1, 211.9, 818.2);
      ctx.bezierCurveTo(212.2, 818.4, 212.4, 818.5, 212.6, 818.7);
      ctx.bezierCurveTo(212.8, 818.9, 212.9, 819.2, 213.0, 819.4);
      ctx.bezierCurveTo(213.1, 819.7, 213.2, 820.0, 213.2, 820.3);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(220.2, 814.6);
      ctx.lineTo(224.4, 814.6);
      ctx.lineTo(224.4, 825.9);
      ctx.lineTo(225.6, 825.9);
      ctx.lineTo(225.6, 814.6);
      ctx.lineTo(229.8, 814.6);
      ctx.lineTo(229.8, 813.5);
      ctx.lineTo(220.2, 813.5);
      ctx.lineTo(220.2, 814.6);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(231.4, 814.8);
      ctx.lineTo(232.7, 814.8);
      ctx.lineTo(232.7, 813.3);
      ctx.lineTo(231.4, 813.3);
      ctx.lineTo(231.4, 814.8);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(231.5, 825.9);
      ctx.lineTo(232.6, 825.9);
      ctx.lineTo(232.6, 816.8);
      ctx.lineTo(231.5, 816.8);
      ctx.lineTo(231.5, 825.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(242.4, 818.0);
      ctx.bezierCurveTo(242.1, 817.5, 241.6, 817.2, 241.1, 816.9);
      ctx.bezierCurveTo(240.6, 816.7, 240.0, 816.6, 239.4, 816.6);
      ctx.bezierCurveTo(238.8, 816.6, 238.2, 816.7, 237.7, 817.0);
      ctx.bezierCurveTo(237.2, 817.2, 236.7, 817.5, 236.3, 818.0);
      ctx.bezierCurveTo(235.9, 818.4, 235.6, 818.9, 235.4, 819.5);
      ctx.bezierCurveTo(235.2, 820.0, 235.1, 820.7, 235.1, 821.3);
      ctx.bezierCurveTo(235.1, 822.0, 235.2, 822.7, 235.4, 823.3);
      ctx.bezierCurveTo(235.7, 823.9, 236.0, 824.4, 236.4, 824.8);
      ctx.bezierCurveTo(236.8, 825.2, 237.3, 825.5, 237.8, 825.7);
      ctx.bezierCurveTo(238.4, 826.0, 239.0, 826.1, 239.5, 826.1);
      ctx.bezierCurveTo(240.4, 826.1, 241.1, 825.9, 241.7, 825.6);
      ctx.bezierCurveTo(242.3, 825.3, 242.8, 824.9, 243.3, 824.4);
      ctx.lineTo(243.4, 824.2);
      ctx.lineTo(242.6, 823.5);
      ctx.lineTo(242.5, 823.6);
      ctx.bezierCurveTo(242.1, 824.0, 241.7, 824.3, 241.3, 824.6);
      ctx.bezierCurveTo(240.8, 824.8, 240.2, 825.0, 239.6, 825.0);
      ctx.bezierCurveTo(239.2, 825.0, 238.8, 824.9, 238.4, 824.8);
      ctx.bezierCurveTo(238.0, 824.6, 237.7, 824.4, 237.4, 824.1);
      ctx.bezierCurveTo(237.1, 823.8, 236.8, 823.5, 236.6, 823.1);
      ctx.bezierCurveTo(236.4, 822.7, 236.3, 822.3, 236.3, 821.8);
      ctx.lineTo(243.5, 821.8);
      ctx.lineTo(243.6, 821.7);
      ctx.bezierCurveTo(243.6, 821.6, 243.6, 821.6, 243.6, 821.5);
      ctx.lineTo(243.6, 821.3);
      ctx.bezierCurveTo(243.6, 820.7, 243.5, 820.0, 243.3, 819.5);
      ctx.bezierCurveTo(243.1, 818.9, 242.8, 818.4, 242.4, 818.0);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(242.4, 820.8);
      ctx.lineTo(236.3, 820.8);
      ctx.bezierCurveTo(236.3, 820.4, 236.4, 820.0, 236.6, 819.6);
      ctx.bezierCurveTo(236.8, 819.2, 237.0, 818.9, 237.3, 818.6);
      ctx.bezierCurveTo(237.5, 818.3, 237.8, 818.1, 238.2, 817.9);
      ctx.bezierCurveTo(238.6, 817.7, 239.0, 817.6, 239.4, 817.6);
      ctx.bezierCurveTo(239.9, 817.6, 240.3, 817.7, 240.6, 817.9);
      ctx.bezierCurveTo(241.0, 818.1, 241.3, 818.3, 241.5, 818.6);
      ctx.bezierCurveTo(241.8, 818.9, 242.0, 819.3, 242.1, 819.7);
      ctx.bezierCurveTo(242.3, 820.0, 242.3, 820.4, 242.4, 820.8);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(252.6, 817.6);
      ctx.bezierCurveTo(252.3, 817.3, 251.9, 817.0, 251.5, 816.9);
      ctx.bezierCurveTo(251.0, 816.7, 250.5, 816.6, 249.9, 816.6);
      ctx.bezierCurveTo(249.1, 816.6, 248.4, 816.8, 247.9, 817.1);
      ctx.bezierCurveTo(247.5, 817.4, 247.2, 817.7, 246.9, 818.1);
      ctx.lineTo(246.9, 816.8);
      ctx.lineTo(245.8, 816.8);
      ctx.lineTo(245.8, 825.9);
      ctx.lineTo(246.9, 825.9);
      ctx.lineTo(246.9, 820.6);
      ctx.bezierCurveTo(246.9, 820.2, 247.0, 819.8, 247.1, 819.4);
      ctx.bezierCurveTo(247.3, 819.1, 247.5, 818.7, 247.7, 818.5);
      ctx.bezierCurveTo(248.0, 818.2, 248.3, 818.0, 248.6, 817.9);
      ctx.bezierCurveTo(249.0, 817.7, 249.4, 817.6, 249.8, 817.6);
      ctx.bezierCurveTo(250.6, 817.6, 251.3, 817.9, 251.8, 818.4);
      ctx.bezierCurveTo(252.2, 818.9, 252.4, 819.6, 252.4, 820.5);
      ctx.lineTo(252.4, 825.9);
      ctx.lineTo(253.6, 825.9);
      ctx.lineTo(253.6, 820.3);
      ctx.bezierCurveTo(253.6, 819.8, 253.5, 819.3, 253.3, 818.8);
      ctx.bezierCurveTo(253.2, 818.4, 252.9, 818.0, 252.6, 817.6);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(263.7, 818.4);
      ctx.bezierCurveTo(263.5, 818.2, 263.4, 818.1, 263.3, 817.9);
      ctx.bezierCurveTo(263.0, 817.7, 262.8, 817.4, 262.5, 817.2);
      ctx.bezierCurveTo(262.1, 817.0, 261.8, 816.9, 261.4, 816.8);
      ctx.bezierCurveTo(260.6, 816.5, 259.5, 816.5, 258.6, 816.9);
      ctx.bezierCurveTo(258.0, 817.1, 257.6, 817.4, 257.1, 817.9);
      ctx.bezierCurveTo(256.7, 818.3, 256.4, 818.8, 256.1, 819.3);
      ctx.bezierCurveTo(255.9, 819.9, 255.8, 820.6, 255.8, 821.4);
      ctx.bezierCurveTo(255.8, 822.1, 255.9, 822.8, 256.1, 823.3);
      ctx.bezierCurveTo(256.4, 823.9, 256.7, 824.4, 257.1, 824.8);
      ctx.bezierCurveTo(257.6, 825.2, 258.0, 825.5, 258.6, 825.8);
      ctx.bezierCurveTo(259.1, 826.0, 259.6, 826.1, 260.2, 826.1);
      ctx.bezierCurveTo(260.6, 826.1, 261.0, 826.0, 261.4, 825.9);
      ctx.bezierCurveTo(261.8, 825.8, 262.1, 825.6, 262.4, 825.4);
      ctx.bezierCurveTo(262.7, 825.2, 263.0, 825.0, 263.3, 824.7);
      ctx.bezierCurveTo(263.4, 824.5, 263.5, 824.4, 263.7, 824.2);
      ctx.lineTo(263.7, 825.9);
      ctx.lineTo(264.8, 825.9);
      ctx.lineTo(264.8, 813.0);
      ctx.lineTo(263.7, 813.0);
      ctx.lineTo(263.7, 818.4);
      ctx.closePath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(262.6, 818.7);
      ctx.bezierCurveTo(263.0, 819.0, 263.2, 819.4, 263.4, 819.8);
      ctx.bezierCurveTo(263.6, 820.3, 263.7, 820.8, 263.7, 821.3);
      ctx.lineTo(263.7, 821.3);
      ctx.bezierCurveTo(263.7, 821.9, 263.6, 822.4, 263.4, 822.8);
      ctx.bezierCurveTo(263.2, 823.3, 263.0, 823.6, 262.6, 824.0);
      ctx.bezierCurveTo(262.3, 824.3, 261.9, 824.5, 261.5, 824.7);
      ctx.bezierCurveTo(260.7, 825.1, 259.8, 825.1, 259.0, 824.7);
      ctx.bezierCurveTo(258.6, 824.6, 258.2, 824.3, 257.9, 824.0);
      ctx.bezierCurveTo(257.6, 823.7, 257.4, 823.3, 257.2, 822.8);
      ctx.bezierCurveTo(257.0, 822.4, 256.9, 821.9, 256.9, 821.3);
      ctx.bezierCurveTo(256.9, 820.7, 257.0, 820.2, 257.2, 819.8);
      ctx.bezierCurveTo(257.4, 819.3, 257.6, 818.9, 257.9, 818.6);
      ctx.bezierCurveTo(258.2, 818.3, 258.6, 818.1, 259.0, 817.9);
      ctx.bezierCurveTo(259.4, 817.8, 259.8, 817.7, 260.3, 817.7);
      ctx.bezierCurveTo(260.7, 817.7, 261.1, 817.8, 261.5, 817.9);
      ctx.bezierCurveTo(261.9, 818.1, 262.3, 818.4, 262.6, 818.7);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(271.0, 816.6);
      ctx.bezierCurveTo(270.4, 816.6, 269.9, 816.7, 269.3, 816.9);
      ctx.bezierCurveTo(268.8, 817.0, 268.3, 817.2, 267.9, 817.4);
      ctx.lineTo(267.7, 817.5);
      ctx.lineTo(268.2, 818.5);
      ctx.lineTo(268.3, 818.4);
      ctx.bezierCurveTo(268.7, 818.2, 269.1, 818.1, 269.5, 817.9);
      ctx.bezierCurveTo(270.0, 817.8, 270.5, 817.7, 271.0, 817.7);
      ctx.bezierCurveTo(271.9, 817.7, 272.5, 818.0, 273.0, 818.4);
      ctx.bezierCurveTo(273.5, 818.8, 273.7, 819.4, 273.7, 820.3);
      ctx.lineTo(273.7, 820.5);
      ctx.bezierCurveTo(273.4, 820.4, 273.0, 820.3, 272.6, 820.2);
      ctx.bezierCurveTo(272.1, 820.2, 271.6, 820.1, 271.0, 820.1);
      ctx.bezierCurveTo(270.4, 820.1, 269.8, 820.2, 269.4, 820.3);
      ctx.bezierCurveTo(268.9, 820.5, 268.5, 820.6, 268.1, 820.9);
      ctx.bezierCurveTo(267.8, 821.2, 267.5, 821.5, 267.3, 821.8);
      ctx.bezierCurveTo(267.1, 822.2, 267.0, 822.7, 267.0, 823.2);
      ctx.bezierCurveTo(267.0, 823.7, 267.1, 824.1, 267.3, 824.5);
      ctx.bezierCurveTo(267.5, 824.8, 267.8, 825.1, 268.1, 825.4);
      ctx.bezierCurveTo(268.5, 825.6, 268.8, 825.8, 269.3, 825.9);
      ctx.bezierCurveTo(269.7, 826.0, 270.1, 826.1, 270.5, 826.1);
      ctx.bezierCurveTo(270.9, 826.1, 271.3, 826.0, 271.7, 825.9);
      ctx.bezierCurveTo(272.1, 825.8, 272.4, 825.7, 272.7, 825.5);
      ctx.bezierCurveTo(273.0, 825.4, 273.2, 825.2, 273.4, 825.0);
      ctx.bezierCurveTo(273.5, 824.9, 273.6, 824.8, 273.7, 824.7);
      ctx.lineTo(273.7, 825.9);
      ctx.lineTo(274.9, 825.9);
      ctx.lineTo(274.9, 820.2);
      ctx.bezierCurveTo(274.9, 819.1, 274.5, 818.1, 273.8, 817.5);
      ctx.bezierCurveTo(273.1, 816.9, 272.2, 816.6, 271.0, 816.6);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(273.8, 821.5);
      ctx.lineTo(273.8, 822.4);
      ctx.bezierCurveTo(273.8, 822.8, 273.7, 823.1, 273.5, 823.5);
      ctx.bezierCurveTo(273.3, 823.8, 273.1, 824.0, 272.8, 824.3);
      ctx.bezierCurveTo(272.5, 824.5, 272.2, 824.7, 271.8, 824.8);
      ctx.bezierCurveTo(271.1, 825.0, 270.3, 825.1, 269.7, 824.8);
      ctx.bezierCurveTo(269.4, 824.8, 269.1, 824.6, 268.9, 824.5);
      ctx.bezierCurveTo(268.7, 824.3, 268.5, 824.1, 268.4, 823.9);
      ctx.bezierCurveTo(268.2, 823.7, 268.2, 823.4, 268.2, 823.1);
      ctx.bezierCurveTo(268.2, 822.5, 268.4, 822.1, 268.9, 821.7);
      ctx.bezierCurveTo(269.3, 821.4, 270.0, 821.2, 270.9, 821.2);
      ctx.bezierCurveTo(271.5, 821.2, 272.1, 821.2, 272.6, 821.3);
      ctx.bezierCurveTo(273.0, 821.4, 273.4, 821.5, 273.8, 821.5);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(282.8, 821.5);
      ctx.bezierCurveTo(282.5, 821.3, 282.2, 821.2, 281.8, 821.0);
      ctx.bezierCurveTo(281.5, 820.9, 281.1, 820.8, 280.8, 820.7);
      ctx.bezierCurveTo(280.5, 820.6, 280.2, 820.5, 279.9, 820.4);
      ctx.bezierCurveTo(279.6, 820.3, 279.3, 820.2, 279.1, 820.1);
      ctx.bezierCurveTo(278.9, 820.0, 278.7, 819.8, 278.6, 819.7);
      ctx.bezierCurveTo(278.5, 819.5, 278.4, 819.3, 278.4, 819.1);
      ctx.bezierCurveTo(278.4, 818.7, 278.6, 818.4, 278.9, 818.1);
      ctx.bezierCurveTo(279.3, 817.8, 279.7, 817.7, 280.3, 817.7);
      ctx.bezierCurveTo(280.7, 817.7, 281.2, 817.8, 281.6, 817.9);
      ctx.bezierCurveTo(282.1, 818.1, 282.5, 818.3, 282.9, 818.6);
      ctx.lineTo(283.0, 818.6);
      ctx.lineTo(283.6, 817.7);
      ctx.lineTo(283.5, 817.6);
      ctx.bezierCurveTo(283.1, 817.3, 282.6, 817.1, 282.0, 816.9);
      ctx.bezierCurveTo(281.0, 816.6, 279.9, 816.5, 279.1, 816.8);
      ctx.bezierCurveTo(278.7, 816.9, 278.4, 817.1, 278.1, 817.3);
      ctx.bezierCurveTo(277.9, 817.6, 277.7, 817.8, 277.5, 818.1);
      ctx.bezierCurveTo(277.4, 818.5, 277.3, 818.8, 277.3, 819.2);
      ctx.bezierCurveTo(277.3, 819.6, 277.4, 820.0, 277.6, 820.3);
      ctx.bezierCurveTo(277.8, 820.6, 278.0, 820.8, 278.3, 821.0);
      ctx.bezierCurveTo(278.6, 821.2, 278.9, 821.3, 279.3, 821.4);
      ctx.bezierCurveTo(279.7, 821.6, 280.0, 821.7, 280.4, 821.8);
      ctx.bezierCurveTo(280.7, 821.9, 281.0, 821.9, 281.3, 822.0);
      ctx.bezierCurveTo(281.5, 822.1, 281.8, 822.2, 282.0, 822.4);
      ctx.bezierCurveTo(282.2, 822.5, 282.3, 822.6, 282.5, 822.8);
      ctx.bezierCurveTo(282.6, 823.0, 282.6, 823.2, 282.6, 823.4);
      ctx.bezierCurveTo(282.6, 823.9, 282.4, 824.3, 282.1, 824.5);
      ctx.bezierCurveTo(281.7, 824.8, 281.2, 824.9, 280.6, 824.9);
      ctx.bezierCurveTo(280.1, 824.9, 279.6, 824.8, 279.1, 824.7);
      ctx.bezierCurveTo(278.5, 824.5, 278.0, 824.2, 277.6, 823.8);
      ctx.lineTo(277.5, 823.7);
      ctx.lineTo(276.8, 824.6);
      ctx.lineTo(276.9, 824.7);
      ctx.bezierCurveTo(277.4, 825.1, 278.0, 825.4, 278.6, 825.7);
      ctx.bezierCurveTo(279.3, 825.9, 279.9, 826.0, 280.6, 826.0);
      ctx.bezierCurveTo(281.0, 826.0, 281.4, 826.0, 281.8, 825.9);
      ctx.bezierCurveTo(282.2, 825.7, 282.6, 825.5, 282.8, 825.3);
      ctx.bezierCurveTo(283.1, 825.1, 283.4, 824.8, 283.5, 824.5);
      ctx.bezierCurveTo(283.7, 824.1, 283.8, 823.7, 283.8, 823.3);
      ctx.bezierCurveTo(283.8, 822.9, 283.7, 822.5, 283.5, 822.2);
      ctx.bezierCurveTo(283.3, 822.0, 283.1, 821.7, 282.8, 821.5);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(295.3, 815.3);
      ctx.bezierCurveTo(294.7, 814.7, 294.0, 814.3, 293.2, 814.0);
      ctx.bezierCurveTo(292.4, 813.7, 291.5, 813.5, 290.5, 813.5);
      ctx.lineTo(286.4, 813.5);
      ctx.lineTo(286.4, 825.9);
      ctx.lineTo(290.5, 825.9);
      ctx.bezierCurveTo(291.5, 825.9, 292.4, 825.7, 293.2, 825.4);
      ctx.bezierCurveTo(294.0, 825.1, 294.7, 824.6, 295.3, 824.1);
      ctx.bezierCurveTo(295.8, 823.5, 296.3, 822.9, 296.6, 822.1);
      ctx.bezierCurveTo(296.9, 821.4, 297.1, 820.6, 297.1, 819.7);
      ctx.bezierCurveTo(297.1, 818.8, 296.9, 818.0, 296.6, 817.2);
      ctx.bezierCurveTo(296.3, 816.5, 295.8, 815.8, 295.3, 815.3);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(295.9, 819.7);
      ctx.lineTo(295.9, 819.7);
      ctx.bezierCurveTo(295.9, 820.4, 295.7, 821.1, 295.5, 821.7);
      ctx.bezierCurveTo(295.2, 822.3, 294.9, 822.8, 294.4, 823.3);
      ctx.bezierCurveTo(294.0, 823.7, 293.4, 824.1, 292.8, 824.4);
      ctx.bezierCurveTo(292.1, 824.6, 291.3, 824.8, 290.5, 824.8);
      ctx.lineTo(287.6, 824.8);
      ctx.lineTo(287.6, 814.6);
      ctx.lineTo(290.5, 814.6);
      ctx.bezierCurveTo(291.3, 814.6, 292.1, 814.7, 292.8, 815.0);
      ctx.bezierCurveTo(293.4, 815.3, 294.0, 815.6, 294.4, 816.1);
      ctx.bezierCurveTo(294.9, 816.6, 295.2, 817.1, 295.5, 817.7);
      ctx.bezierCurveTo(295.7, 818.3, 295.9, 819.0, 295.9, 819.7);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(303.0, 816.6);
      ctx.bezierCurveTo(302.4, 816.6, 301.8, 816.7, 301.3, 816.9);
      ctx.bezierCurveTo(300.8, 817.0, 300.3, 817.2, 299.8, 817.4);
      ctx.lineTo(299.7, 817.5);
      ctx.lineTo(300.1, 818.5);
      ctx.lineTo(300.3, 818.4);
      ctx.bezierCurveTo(300.6, 818.2, 301.1, 818.1, 301.5, 817.9);
      ctx.bezierCurveTo(301.9, 817.8, 302.4, 817.7, 302.9, 817.7);
      ctx.bezierCurveTo(303.8, 817.7, 304.5, 818.0, 305.0, 818.4);
      ctx.bezierCurveTo(305.5, 818.8, 305.7, 819.4, 305.7, 820.3);
      ctx.lineTo(305.7, 820.5);
      ctx.bezierCurveTo(305.3, 820.4, 304.9, 820.3, 304.6, 820.2);
      ctx.bezierCurveTo(304.1, 820.2, 303.6, 820.1, 302.9, 820.1);
      ctx.bezierCurveTo(302.3, 820.1, 301.8, 820.2, 301.3, 820.3);
      ctx.bezierCurveTo(300.8, 820.5, 300.4, 820.6, 300.1, 820.9);
      ctx.bezierCurveTo(299.7, 821.2, 299.4, 821.5, 299.2, 821.8);
      ctx.bezierCurveTo(299.0, 822.2, 298.9, 822.7, 298.9, 823.2);
      ctx.bezierCurveTo(298.9, 823.7, 299.0, 824.1, 299.3, 824.5);
      ctx.bezierCurveTo(299.5, 824.8, 299.7, 825.1, 300.1, 825.4);
      ctx.bezierCurveTo(300.4, 825.6, 300.8, 825.8, 301.2, 825.9);
      ctx.bezierCurveTo(301.6, 826.0, 302.1, 826.1, 302.5, 826.1);
      ctx.bezierCurveTo(302.9, 826.1, 303.3, 826.0, 303.7, 825.9);
      ctx.bezierCurveTo(304.0, 825.8, 304.4, 825.7, 304.6, 825.5);
      ctx.bezierCurveTo(304.9, 825.4, 305.2, 825.2, 305.4, 825.0);
      ctx.bezierCurveTo(305.5, 824.9, 305.6, 824.8, 305.7, 824.7);
      ctx.lineTo(305.7, 825.9);
      ctx.lineTo(306.8, 825.9);
      ctx.lineTo(306.8, 820.2);
      ctx.bezierCurveTo(306.8, 819.1, 306.5, 818.1, 305.8, 817.5);
      ctx.bezierCurveTo(305.1, 816.9, 304.2, 816.6, 303.0, 816.6);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(305.7, 821.5);
      ctx.lineTo(305.7, 822.4);
      ctx.bezierCurveTo(305.7, 822.8, 305.6, 823.1, 305.5, 823.5);
      ctx.bezierCurveTo(305.3, 823.8, 305.1, 824.0, 304.8, 824.3);
      ctx.bezierCurveTo(304.5, 824.5, 304.1, 824.7, 303.8, 824.8);
      ctx.bezierCurveTo(303.1, 825.0, 302.3, 825.1, 301.6, 824.8);
      ctx.bezierCurveTo(301.3, 824.8, 301.1, 824.6, 300.8, 824.5);
      ctx.bezierCurveTo(300.6, 824.3, 300.4, 824.1, 300.3, 823.9);
      ctx.bezierCurveTo(300.2, 823.7, 300.1, 823.4, 300.1, 823.1);
      ctx.bezierCurveTo(300.1, 822.5, 300.4, 822.1, 300.8, 821.7);
      ctx.bezierCurveTo(301.3, 821.4, 302.0, 821.2, 302.9, 821.2);
      ctx.bezierCurveTo(303.5, 821.2, 304.1, 821.2, 304.5, 821.3);
      ctx.bezierCurveTo(305.0, 821.4, 305.4, 821.5, 305.7, 821.5);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(317.5, 816.8);
      ctx.lineTo(315.9, 816.8);
      ctx.lineTo(310.7, 822.2);
      ctx.lineTo(310.7, 813.0);
      ctx.lineTo(309.6, 813.0);
      ctx.lineTo(309.6, 825.9);
      ctx.lineTo(310.7, 825.9);
      ctx.lineTo(310.7, 823.6);
      ctx.lineTo(312.7, 821.6);
      ctx.lineTo(316.1, 825.8);
      ctx.lineTo(316.1, 825.9);
      ctx.lineTo(317.5, 825.9);
      ctx.lineTo(313.5, 820.8);
      ctx.lineTo(317.5, 816.8);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(325.2, 817.5);
      ctx.bezierCurveTo(324.5, 816.9, 323.6, 816.6, 322.4, 816.6);
      ctx.bezierCurveTo(321.8, 816.6, 321.2, 816.7, 320.7, 816.9);
      ctx.bezierCurveTo(320.2, 817.0, 319.7, 817.2, 319.2, 817.4);
      ctx.lineTo(319.1, 817.5);
      ctx.lineTo(319.5, 818.5);
      ctx.lineTo(319.6, 818.4);
      ctx.bezierCurveTo(320.0, 818.2, 320.5, 818.1, 320.9, 817.9);
      ctx.bezierCurveTo(321.3, 817.8, 321.8, 817.7, 322.3, 817.7);
      ctx.bezierCurveTo(323.2, 817.7, 323.9, 818.0, 324.4, 818.4);
      ctx.bezierCurveTo(324.8, 818.8, 325.1, 819.4, 325.1, 820.3);
      ctx.lineTo(325.1, 820.5);
      ctx.bezierCurveTo(324.7, 820.4, 324.3, 820.3, 323.9, 820.2);
      ctx.bezierCurveTo(323.5, 820.2, 322.9, 820.1, 322.3, 820.1);
      ctx.bezierCurveTo(321.7, 820.1, 321.2, 820.2, 320.7, 820.3);
      ctx.bezierCurveTo(320.2, 820.5, 319.8, 820.6, 319.4, 820.9);
      ctx.bezierCurveTo(319.1, 821.2, 318.8, 821.5, 318.6, 821.8);
      ctx.bezierCurveTo(318.4, 822.2, 318.3, 822.7, 318.3, 823.2);
      ctx.bezierCurveTo(318.3, 823.7, 318.4, 824.1, 318.6, 824.5);
      ctx.bezierCurveTo(318.9, 824.8, 319.1, 825.1, 319.5, 825.4);
      ctx.bezierCurveTo(319.8, 825.6, 320.2, 825.8, 320.6, 825.9);
      ctx.bezierCurveTo(321.0, 826.0, 321.4, 826.1, 321.9, 826.1);
      ctx.bezierCurveTo(322.3, 826.1, 322.7, 826.0, 323.0, 825.9);
      ctx.bezierCurveTo(323.4, 825.8, 323.7, 825.7, 324.0, 825.5);
      ctx.bezierCurveTo(324.3, 825.4, 324.6, 825.2, 324.8, 825.0);
      ctx.bezierCurveTo(324.9, 824.9, 325.0, 824.8, 325.1, 824.7);
      ctx.lineTo(325.1, 825.9);
      ctx.lineTo(326.2, 825.9);
      ctx.lineTo(326.2, 820.2);
      ctx.bezierCurveTo(326.2, 819.1, 325.9, 818.1, 325.2, 817.5);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(325.1, 821.5);
      ctx.lineTo(325.1, 822.4);
      ctx.bezierCurveTo(325.1, 822.8, 325.0, 823.1, 324.8, 823.5);
      ctx.bezierCurveTo(324.7, 823.8, 324.5, 824.0, 324.2, 824.3);
      ctx.bezierCurveTo(323.9, 824.5, 323.5, 824.7, 323.1, 824.8);
      ctx.bezierCurveTo(322.5, 825.0, 321.7, 825.0, 321.0, 824.8);
      ctx.bezierCurveTo(320.7, 824.8, 320.4, 824.6, 320.2, 824.5);
      ctx.bezierCurveTo(320.0, 824.3, 319.8, 824.1, 319.7, 823.9);
      ctx.bezierCurveTo(319.6, 823.7, 319.5, 823.4, 319.5, 823.1);
      ctx.bezierCurveTo(319.5, 822.5, 319.7, 822.1, 320.2, 821.7);
      ctx.bezierCurveTo(320.7, 821.4, 321.4, 821.2, 322.3, 821.2);
      ctx.bezierCurveTo(322.9, 821.2, 323.4, 821.2, 323.9, 821.3);
      ctx.bezierCurveTo(324.4, 821.4, 324.8, 821.5, 325.1, 821.5);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(401.8, 823.4);
      ctx.lineTo(404.2, 816.1);
      ctx.lineTo(405.6, 816.1);
      ctx.lineTo(402.4, 825.3);
      ctx.lineTo(401.2, 825.3);
      ctx.lineTo(398.8, 818.1);
      ctx.lineTo(396.3, 825.3);
      ctx.lineTo(395.1, 825.3);
      ctx.lineTo(391.9, 816.1);
      ctx.lineTo(393.3, 816.1);
      ctx.lineTo(395.7, 823.4);
      ctx.lineTo(398.2, 816.1);
      ctx.lineTo(399.3, 816.1);
      ctx.lineTo(401.8, 823.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(416.8, 823.4);
      ctx.lineTo(419.2, 816.1);
      ctx.lineTo(420.6, 816.1);
      ctx.lineTo(417.4, 825.3);
      ctx.lineTo(416.2, 825.3);
      ctx.lineTo(413.8, 818.1);
      ctx.lineTo(411.3, 825.3);
      ctx.lineTo(410.1, 825.3);
      ctx.lineTo(406.9, 816.1);
      ctx.lineTo(408.3, 816.1);
      ctx.lineTo(410.7, 823.4);
      ctx.lineTo(413.2, 816.1);
      ctx.lineTo(414.3, 816.1);
      ctx.lineTo(416.8, 823.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(431.8, 823.4);
      ctx.lineTo(434.2, 816.1);
      ctx.lineTo(435.6, 816.1);
      ctx.lineTo(432.4, 825.3);
      ctx.lineTo(431.2, 825.3);
      ctx.lineTo(428.8, 818.1);
      ctx.lineTo(426.3, 825.3);
      ctx.lineTo(425.1, 825.3);
      ctx.lineTo(421.9, 816.1);
      ctx.lineTo(423.4, 816.1);
      ctx.lineTo(425.8, 823.4);
      ctx.lineTo(428.2, 816.1);
      ctx.lineTo(429.3, 816.1);
      ctx.lineTo(431.8, 823.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(436.5, 823.4);
      ctx.lineTo(438.1, 823.4);
      ctx.lineTo(438.1, 825.2);
      ctx.lineTo(436.5, 825.2);
      ctx.lineTo(436.5, 823.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(442.3, 822.6);
      ctx.bezierCurveTo(442.3, 823.2, 442.5, 823.6, 442.8, 823.8);
      ctx.bezierCurveTo(443.1, 824.0, 443.4, 824.2, 443.9, 824.2);
      ctx.bezierCurveTo(444.1, 824.2, 444.3, 824.1, 444.5, 824.1);
      ctx.bezierCurveTo(444.8, 824.0, 445.0, 824.0, 445.2, 823.8);
      ctx.lineTo(445.2, 825.0);
      ctx.bezierCurveTo(445.0, 825.1, 444.7, 825.2, 444.5, 825.3);
      ctx.bezierCurveTo(444.2, 825.4, 443.9, 825.4, 443.6, 825.4);
      ctx.bezierCurveTo(443.2, 825.4, 442.9, 825.3, 442.5, 825.2);
      ctx.bezierCurveTo(442.2, 825.2, 442.0, 825.0, 441.7, 824.8);
      ctx.bezierCurveTo(441.5, 824.6, 441.3, 824.3, 441.2, 824.0);
      ctx.bezierCurveTo(441.1, 823.7, 441.0, 823.3, 441.0, 822.8);
      ctx.lineTo(441.0, 817.3);
      ctx.lineTo(439.7, 817.3);
      ctx.lineTo(439.7, 816.1);
      ctx.lineTo(441.0, 816.1);
      ctx.lineTo(441.0, 813.4);
      ctx.lineTo(442.3, 813.4);
      ctx.lineTo(442.3, 816.1);
      ctx.lineTo(445.2, 816.1);
      ctx.lineTo(445.2, 817.3);
      ctx.lineTo(442.3, 817.3);
      ctx.lineTo(442.3, 822.6);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(447.7, 812.6);
      ctx.lineTo(449.2, 812.6);
      ctx.lineTo(449.2, 814.1);
      ctx.lineTo(447.7, 814.1);
      ctx.lineTo(447.7, 812.6);
      ctx.closePath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(447.8, 816.1);
      ctx.lineTo(449.1, 816.1);
      ctx.lineTo(449.1, 825.2);
      ctx.lineTo(447.8, 825.2);
      ctx.lineTo(447.8, 816.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(453.5, 822.5);
      ctx.bezierCurveTo(453.6, 822.9, 453.9, 823.2, 454.2, 823.5);
      ctx.bezierCurveTo(454.5, 823.7, 454.8, 823.9, 455.2, 824.1);
      ctx.bezierCurveTo(455.5, 824.2, 455.9, 824.3, 456.3, 824.3);
      ctx.bezierCurveTo(457.0, 824.3, 457.5, 824.1, 457.9, 823.9);
      ctx.bezierCurveTo(458.4, 823.7, 458.8, 823.4, 459.2, 823.0);
      ctx.lineTo(460.0, 823.7);
      ctx.bezierCurveTo(459.6, 824.2, 459.1, 824.7, 458.5, 825.0);
      ctx.bezierCurveTo(457.9, 825.3, 457.2, 825.4, 456.3, 825.4);
      ctx.bezierCurveTo(455.7, 825.4, 455.1, 825.3, 454.5, 825.1);
      ctx.bezierCurveTo(454.0, 824.9, 453.5, 824.5, 453.1, 824.1);
      ctx.bezierCurveTo(452.7, 823.7, 452.3, 823.2, 452.1, 822.6);
      ctx.bezierCurveTo(451.8, 822.0, 451.7, 821.4, 451.7, 820.7);
      ctx.bezierCurveTo(451.7, 820.0, 451.8, 819.4, 452.0, 818.8);
      ctx.bezierCurveTo(452.3, 818.2, 452.6, 817.7, 452.9, 817.3);
      ctx.bezierCurveTo(453.3, 816.9, 453.8, 816.5, 454.3, 816.3);
      ctx.bezierCurveTo(454.9, 816.0, 455.5, 815.9, 456.1, 815.9);
      ctx.bezierCurveTo(456.8, 815.9, 457.4, 816.0, 457.9, 816.3);
      ctx.bezierCurveTo(458.4, 816.5, 458.9, 816.9, 459.2, 817.3);
      ctx.bezierCurveTo(459.6, 817.8, 459.9, 818.3, 460.1, 818.9);
      ctx.bezierCurveTo(460.2, 819.4, 460.3, 820.1, 460.3, 820.7);
      ctx.lineTo(460.3, 820.9);
      ctx.bezierCurveTo(460.3, 821.0, 460.3, 821.1, 460.3, 821.2);
      ctx.lineTo(453.1, 821.2);
      ctx.bezierCurveTo(453.2, 821.7, 453.3, 822.1, 453.5, 822.5);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(458.9, 820.2);
      ctx.bezierCurveTo(458.9, 819.8, 458.8, 819.4, 458.7, 819.0);
      ctx.bezierCurveTo(458.6, 818.6, 458.4, 818.3, 458.1, 818.0);
      ctx.bezierCurveTo(457.9, 817.7, 457.6, 817.5, 457.3, 817.3);
      ctx.bezierCurveTo(456.9, 817.1, 456.5, 817.1, 456.1, 817.1);
      ctx.bezierCurveTo(455.7, 817.1, 455.3, 817.1, 454.9, 817.3);
      ctx.bezierCurveTo(454.6, 817.5, 454.3, 817.7, 454.1, 818.0);
      ctx.bezierCurveTo(453.8, 818.2, 453.6, 818.6, 453.4, 818.9);
      ctx.bezierCurveTo(453.3, 819.3, 453.2, 819.7, 453.1, 820.2);
      ctx.lineTo(458.9, 820.2);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(464.1, 825.2);
      ctx.lineTo(462.7, 825.2);
      ctx.lineTo(462.7, 816.1);
      ctx.lineTo(464.1, 816.1);
      ctx.lineTo(464.1, 817.7);
      ctx.bezierCurveTo(464.4, 817.2, 464.8, 816.8, 465.3, 816.4);
      ctx.bezierCurveTo(465.8, 816.1, 466.4, 815.9, 467.2, 815.9);
      ctx.bezierCurveTo(467.8, 815.9, 468.2, 816.0, 468.7, 816.2);
      ctx.bezierCurveTo(469.1, 816.4, 469.5, 816.6, 469.8, 816.9);
      ctx.bezierCurveTo(470.1, 817.3, 470.3, 817.6, 470.5, 818.1);
      ctx.bezierCurveTo(470.6, 818.5, 470.7, 819.0, 470.7, 819.6);
      ctx.lineTo(470.7, 825.2);
      ctx.lineTo(469.3, 825.2);
      ctx.lineTo(469.3, 819.9);
      ctx.bezierCurveTo(469.3, 819.1, 469.1, 818.4, 468.7, 817.9);
      ctx.bezierCurveTo(468.2, 817.4, 467.6, 817.1, 466.8, 817.1);
      ctx.bezierCurveTo(466.4, 817.1, 466.1, 817.2, 465.7, 817.4);
      ctx.bezierCurveTo(465.4, 817.5, 465.1, 817.7, 464.9, 817.9);
      ctx.bezierCurveTo(464.6, 818.2, 464.4, 818.5, 464.3, 818.8);
      ctx.bezierCurveTo(464.1, 819.2, 464.1, 819.6, 464.1, 820.0);
      ctx.lineTo(464.1, 825.2);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(480.9, 825.2);
      ctx.lineTo(480.9, 823.4);
      ctx.bezierCurveTo(480.7, 823.7, 480.5, 823.9, 480.3, 824.2);
      ctx.bezierCurveTo(480.0, 824.4, 479.8, 824.6, 479.5, 824.8);
      ctx.bezierCurveTo(479.2, 825.0, 478.9, 825.2, 478.6, 825.3);
      ctx.bezierCurveTo(478.2, 825.4, 477.8, 825.4, 477.4, 825.4);
      ctx.bezierCurveTo(476.9, 825.4, 476.3, 825.3, 475.8, 825.1);
      ctx.bezierCurveTo(475.3, 824.9, 474.8, 824.6, 474.4, 824.2);
      ctx.bezierCurveTo(474.0, 823.8, 473.7, 823.3, 473.4, 822.7);
      ctx.bezierCurveTo(473.2, 822.1, 473.1, 821.4, 473.1, 820.7);
      ctx.bezierCurveTo(473.1, 819.9, 473.2, 819.3, 473.4, 818.7);
      ctx.bezierCurveTo(473.7, 818.1, 474.0, 817.6, 474.4, 817.2);
      ctx.bezierCurveTo(474.8, 816.8, 475.3, 816.5, 475.8, 816.2);
      ctx.bezierCurveTo(476.3, 816.0, 476.9, 815.9, 477.4, 815.9);
      ctx.bezierCurveTo(477.8, 815.9, 478.2, 816.0, 478.6, 816.1);
      ctx.bezierCurveTo(478.9, 816.2, 479.2, 816.3, 479.5, 816.5);
      ctx.bezierCurveTo(479.8, 816.7, 480.1, 816.9, 480.3, 817.1);
      ctx.bezierCurveTo(480.5, 817.3, 480.7, 817.6, 480.9, 817.9);
      ctx.lineTo(480.9, 812.4);
      ctx.lineTo(482.3, 812.4);
      ctx.lineTo(482.3, 825.2);
      ctx.lineTo(480.9, 825.2);
      ctx.closePath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(480.7, 819.2);
      ctx.bezierCurveTo(480.5, 818.8, 480.3, 818.4, 479.9, 818.1);
      ctx.bezierCurveTo(479.6, 817.8, 479.3, 817.6, 478.9, 817.4);
      ctx.bezierCurveTo(478.5, 817.2, 478.1, 817.1, 477.7, 817.1);
      ctx.bezierCurveTo(477.2, 817.1, 476.8, 817.2, 476.4, 817.4);
      ctx.bezierCurveTo(476.0, 817.5, 475.7, 817.8, 475.4, 818.1);
      ctx.bezierCurveTo(475.1, 818.4, 474.9, 818.7, 474.7, 819.2);
      ctx.bezierCurveTo(474.5, 819.6, 474.4, 820.1, 474.4, 820.7);
      ctx.bezierCurveTo(474.4, 821.2, 474.5, 821.7, 474.7, 822.1);
      ctx.bezierCurveTo(474.9, 822.5, 475.1, 822.9, 475.4, 823.2);
      ctx.bezierCurveTo(475.7, 823.5, 476.0, 823.8, 476.4, 823.9);
      ctx.bezierCurveTo(476.8, 824.1, 477.2, 824.2, 477.7, 824.2);
      ctx.bezierCurveTo(478.1, 824.2, 478.5, 824.1, 478.9, 823.9);
      ctx.bezierCurveTo(479.3, 823.8, 479.6, 823.5, 479.9, 823.2);
      ctx.bezierCurveTo(480.3, 822.9, 480.5, 822.5, 480.7, 822.1);
      ctx.bezierCurveTo(480.9, 821.7, 481.0, 821.2, 481.0, 820.7);
      ctx.bezierCurveTo(481.0, 820.1, 480.9, 819.7, 480.7, 819.2);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(487.1, 817.4);
      ctx.bezierCurveTo(486.7, 817.5, 486.2, 817.7, 485.8, 817.9);
      ctx.lineTo(485.4, 816.7);
      ctx.bezierCurveTo(485.9, 816.5, 486.4, 816.3, 487.0, 816.2);
      ctx.bezierCurveTo(487.5, 816.1, 488.1, 816.0, 488.7, 816.0);
      ctx.bezierCurveTo(490.0, 816.0, 490.9, 816.3, 491.6, 816.9);
      ctx.bezierCurveTo(492.3, 817.5, 492.6, 818.4, 492.6, 819.7);
      ctx.lineTo(492.6, 825.2);
      ctx.lineTo(491.3, 825.2);
      ctx.lineTo(491.3, 823.9);
      ctx.bezierCurveTo(491.0, 824.3, 490.6, 824.6, 490.0, 824.9);
      ctx.bezierCurveTo(489.5, 825.3, 488.8, 825.4, 488.0, 825.4);
      ctx.bezierCurveTo(487.6, 825.4, 487.2, 825.4, 486.8, 825.2);
      ctx.bezierCurveTo(486.4, 825.1, 486.0, 824.9, 485.7, 824.7);
      ctx.bezierCurveTo(485.4, 824.5, 485.1, 824.2, 484.9, 823.8);
      ctx.bezierCurveTo(484.7, 823.5, 484.6, 823.0, 484.6, 822.6);
      ctx.bezierCurveTo(484.6, 822.1, 484.7, 821.7, 484.9, 821.3);
      ctx.bezierCurveTo(485.1, 820.9, 485.3, 820.6, 485.7, 820.4);
      ctx.bezierCurveTo(486.0, 820.1, 486.5, 819.9, 486.9, 819.8);
      ctx.bezierCurveTo(487.4, 819.7, 487.9, 819.6, 488.5, 819.6);
      ctx.bezierCurveTo(489.1, 819.6, 489.6, 819.6, 490.0, 819.7);
      ctx.bezierCurveTo(490.5, 819.8, 490.9, 819.9, 491.3, 820.0);
      ctx.lineTo(491.3, 819.7);
      ctx.bezierCurveTo(491.3, 818.8, 491.1, 818.2, 490.6, 817.8);
      ctx.bezierCurveTo(490.1, 817.4, 489.5, 817.2, 488.6, 817.2);
      ctx.bezierCurveTo(488.1, 817.2, 487.6, 817.2, 487.1, 817.4);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(486.7, 821.1);
      ctx.bezierCurveTo(486.2, 821.5, 486.0, 821.9, 486.0, 822.5);
      ctx.bezierCurveTo(486.0, 822.8, 486.1, 823.1, 486.2, 823.3);
      ctx.bezierCurveTo(486.3, 823.5, 486.5, 823.7, 486.7, 823.9);
      ctx.bezierCurveTo(486.9, 824.0, 487.1, 824.1, 487.4, 824.2);
      ctx.bezierCurveTo(487.7, 824.3, 488.0, 824.3, 488.3, 824.3);
      ctx.bezierCurveTo(488.7, 824.3, 489.1, 824.3, 489.5, 824.2);
      ctx.bezierCurveTo(489.8, 824.0, 490.2, 823.9, 490.4, 823.6);
      ctx.bezierCurveTo(490.7, 823.4, 490.9, 823.2, 491.1, 822.9);
      ctx.bezierCurveTo(491.3, 822.6, 491.3, 822.2, 491.3, 821.9);
      ctx.lineTo(491.3, 821.0);
      ctx.bezierCurveTo(491.0, 820.9, 490.6, 820.8, 490.2, 820.7);
      ctx.bezierCurveTo(489.7, 820.6, 489.2, 820.6, 488.7, 820.6);
      ctx.bezierCurveTo(487.8, 820.6, 487.1, 820.8, 486.7, 821.1);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(501.5, 823.8);
      ctx.bezierCurveTo(501.3, 824.2, 501.1, 824.4, 500.8, 824.7);
      ctx.bezierCurveTo(500.5, 824.9, 500.2, 825.1, 499.8, 825.2);
      ctx.bezierCurveTo(499.4, 825.3, 499.0, 825.4, 498.5, 825.4);
      ctx.bezierCurveTo(497.9, 825.4, 497.2, 825.3, 496.5, 825.0);
      ctx.bezierCurveTo(495.9, 824.8, 495.3, 824.5, 494.8, 824.1);
      ctx.lineTo(495.4, 823.1);
      ctx.bezierCurveTo(495.9, 823.5, 496.4, 823.8, 497.0, 824.0);
      ctx.bezierCurveTo(497.5, 824.2, 498.1, 824.3, 498.6, 824.3);
      ctx.bezierCurveTo(499.1, 824.3, 499.6, 824.1, 500.0, 823.9);
      ctx.bezierCurveTo(500.3, 823.6, 500.5, 823.3, 500.5, 822.8);
      ctx.lineTo(500.5, 822.8);
      ctx.bezierCurveTo(500.5, 822.6, 500.4, 822.4, 500.3, 822.2);
      ctx.bezierCurveTo(500.2, 822.0, 500.0, 821.9, 499.8, 821.8);
      ctx.bezierCurveTo(499.6, 821.6, 499.3, 821.5, 499.1, 821.4);
      ctx.bezierCurveTo(498.8, 821.3, 498.5, 821.3, 498.2, 821.2);
      ctx.bezierCurveTo(497.9, 821.1, 497.5, 820.9, 497.1, 820.8);
      ctx.bezierCurveTo(496.8, 820.7, 496.5, 820.5, 496.2, 820.4);
      ctx.bezierCurveTo(495.9, 820.2, 495.6, 819.9, 495.5, 819.7);
      ctx.bezierCurveTo(495.3, 819.4, 495.2, 819.0, 495.2, 818.6);
      ctx.lineTo(495.2, 818.6);
      ctx.bezierCurveTo(495.2, 818.2, 495.3, 817.8, 495.4, 817.5);
      ctx.bezierCurveTo(495.6, 817.2, 495.8, 816.9, 496.1, 816.7);
      ctx.bezierCurveTo(496.3, 816.4, 496.7, 816.3, 497.1, 816.1);
      ctx.bezierCurveTo(497.4, 816.0, 497.8, 815.9, 498.3, 815.9);
      ctx.bezierCurveTo(498.9, 815.9, 499.4, 816.0, 500.0, 816.2);
      ctx.bezierCurveTo(500.6, 816.4, 501.1, 816.6, 501.6, 817.0);
      ctx.lineTo(501.0, 818.0);
      ctx.bezierCurveTo(500.5, 817.7, 500.1, 817.5, 499.6, 817.3);
      ctx.bezierCurveTo(499.2, 817.2, 498.7, 817.1, 498.3, 817.1);
      ctx.bezierCurveTo(497.7, 817.1, 497.3, 817.2, 497.0, 817.5);
      ctx.bezierCurveTo(496.7, 817.7, 496.5, 818.0, 496.5, 818.4);
      ctx.lineTo(496.5, 818.5);
      ctx.bezierCurveTo(496.5, 818.7, 496.6, 818.9, 496.7, 819.0);
      ctx.bezierCurveTo(496.8, 819.2, 497.0, 819.3, 497.2, 819.4);
      ctx.bezierCurveTo(497.4, 819.5, 497.7, 819.6, 498.0, 819.7);
      ctx.bezierCurveTo(498.2, 819.8, 498.5, 819.9, 498.8, 820.0);
      ctx.bezierCurveTo(499.2, 820.1, 499.5, 820.2, 499.9, 820.4);
      ctx.bezierCurveTo(500.2, 820.5, 500.6, 820.7, 500.8, 820.9);
      ctx.bezierCurveTo(501.1, 821.1, 501.3, 821.3, 501.5, 821.6);
      ctx.bezierCurveTo(501.7, 821.9, 501.8, 822.2, 501.8, 822.6);
      ctx.lineTo(501.8, 822.7);
      ctx.bezierCurveTo(501.8, 823.1, 501.7, 823.5, 501.5, 823.8);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(511.6, 825.2);
      ctx.lineTo(511.6, 823.4);
      ctx.bezierCurveTo(511.4, 823.7, 511.2, 823.9, 511.0, 824.2);
      ctx.bezierCurveTo(510.8, 824.4, 510.5, 824.6, 510.2, 824.8);
      ctx.bezierCurveTo(509.9, 825.0, 509.6, 825.2, 509.3, 825.3);
      ctx.bezierCurveTo(508.9, 825.4, 508.5, 825.4, 508.1, 825.4);
      ctx.bezierCurveTo(507.6, 825.4, 507.0, 825.3, 506.5, 825.1);
      ctx.bezierCurveTo(506.0, 824.9, 505.5, 824.6, 505.1, 824.2);
      ctx.bezierCurveTo(504.7, 823.8, 504.4, 823.3, 504.1, 822.7);
      ctx.bezierCurveTo(503.9, 822.1, 503.8, 821.4, 503.8, 820.7);
      ctx.bezierCurveTo(503.8, 819.9, 503.9, 819.3, 504.1, 818.7);
      ctx.bezierCurveTo(504.4, 818.1, 504.7, 817.6, 505.1, 817.2);
      ctx.bezierCurveTo(505.5, 816.8, 506.0, 816.5, 506.5, 816.2);
      ctx.bezierCurveTo(507.0, 816.0, 507.6, 815.9, 508.1, 815.9);
      ctx.bezierCurveTo(508.5, 815.9, 508.9, 816.0, 509.3, 816.1);
      ctx.bezierCurveTo(509.6, 816.2, 510.0, 816.3, 510.2, 816.5);
      ctx.bezierCurveTo(510.5, 816.7, 510.8, 816.9, 511.0, 817.1);
      ctx.bezierCurveTo(511.2, 817.3, 511.4, 817.6, 511.6, 817.9);
      ctx.lineTo(511.6, 812.4);
      ctx.lineTo(513.0, 812.4);
      ctx.lineTo(513.0, 825.2);
      ctx.lineTo(511.6, 825.2);
      ctx.closePath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(511.4, 819.2);
      ctx.bezierCurveTo(511.2, 818.8, 511.0, 818.4, 510.7, 818.1);
      ctx.bezierCurveTo(510.3, 817.8, 510.0, 817.6, 509.6, 817.4);
      ctx.bezierCurveTo(509.2, 817.2, 508.8, 817.1, 508.4, 817.1);
      ctx.bezierCurveTo(507.9, 817.1, 507.5, 817.2, 507.1, 817.4);
      ctx.bezierCurveTo(506.7, 817.5, 506.4, 817.8, 506.1, 818.1);
      ctx.bezierCurveTo(505.8, 818.4, 505.6, 818.7, 505.4, 819.2);
      ctx.bezierCurveTo(505.2, 819.6, 505.2, 820.1, 505.2, 820.7);
      ctx.bezierCurveTo(505.2, 821.2, 505.2, 821.7, 505.4, 822.1);
      ctx.bezierCurveTo(505.6, 822.5, 505.8, 822.9, 506.1, 823.2);
      ctx.bezierCurveTo(506.4, 823.5, 506.7, 823.8, 507.1, 823.9);
      ctx.bezierCurveTo(507.5, 824.1, 507.9, 824.2, 508.4, 824.2);
      ctx.bezierCurveTo(508.8, 824.2, 509.2, 824.1, 509.6, 823.9);
      ctx.bezierCurveTo(510.0, 823.8, 510.3, 823.5, 510.7, 823.2);
      ctx.bezierCurveTo(511.0, 822.9, 511.2, 822.5, 511.4, 822.1);
      ctx.bezierCurveTo(511.6, 821.7, 511.7, 821.2, 511.7, 820.7);
      ctx.bezierCurveTo(511.7, 820.1, 511.6, 819.7, 511.4, 819.2);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(517.8, 817.4);
      ctx.bezierCurveTo(517.4, 817.5, 517.0, 817.7, 516.5, 817.9);
      ctx.lineTo(516.1, 816.7);
      ctx.bezierCurveTo(516.6, 816.5, 517.1, 816.3, 517.7, 816.2);
      ctx.bezierCurveTo(518.2, 816.1, 518.8, 816.0, 519.4, 816.0);
      ctx.bezierCurveTo(520.7, 816.0, 521.6, 816.3, 522.3, 816.9);
      ctx.bezierCurveTo(523.0, 817.5, 523.3, 818.4, 523.3, 819.7);
      ctx.lineTo(523.3, 825.2);
      ctx.lineTo(522.0, 825.2);
      ctx.lineTo(522.0, 823.9);
      ctx.bezierCurveTo(521.7, 824.3, 521.3, 824.6, 520.7, 824.9);
      ctx.bezierCurveTo(520.2, 825.3, 519.5, 825.4, 518.7, 825.4);
      ctx.bezierCurveTo(518.3, 825.4, 517.9, 825.4, 517.5, 825.2);
      ctx.bezierCurveTo(517.1, 825.1, 516.7, 824.9, 516.4, 824.7);
      ctx.bezierCurveTo(516.1, 824.5, 515.8, 824.2, 515.6, 823.8);
      ctx.bezierCurveTo(515.4, 823.5, 515.3, 823.0, 515.3, 822.6);
      ctx.bezierCurveTo(515.3, 822.1, 515.4, 821.7, 515.6, 821.3);
      ctx.bezierCurveTo(515.8, 820.9, 516.1, 820.6, 516.4, 820.4);
      ctx.bezierCurveTo(516.7, 820.1, 517.2, 819.9, 517.6, 819.8);
      ctx.bezierCurveTo(518.1, 819.7, 518.6, 819.6, 519.2, 819.6);
      ctx.bezierCurveTo(519.8, 819.6, 520.3, 819.6, 520.7, 819.7);
      ctx.bezierCurveTo(521.2, 819.8, 521.6, 819.9, 522.0, 820.0);
      ctx.lineTo(522.0, 819.7);
      ctx.bezierCurveTo(522.0, 818.8, 521.8, 818.2, 521.3, 817.8);
      ctx.bezierCurveTo(520.8, 817.4, 520.2, 817.2, 519.3, 817.2);
      ctx.bezierCurveTo(518.8, 817.2, 518.3, 817.2, 517.8, 817.4);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(517.4, 821.1);
      ctx.bezierCurveTo(516.9, 821.5, 516.7, 821.9, 516.7, 822.5);
      ctx.bezierCurveTo(516.7, 822.8, 516.8, 823.1, 516.9, 823.3);
      ctx.bezierCurveTo(517.0, 823.5, 517.2, 823.7, 517.4, 823.9);
      ctx.bezierCurveTo(517.6, 824.0, 517.8, 824.1, 518.1, 824.2);
      ctx.bezierCurveTo(518.4, 824.3, 518.7, 824.3, 519.0, 824.3);
      ctx.bezierCurveTo(519.4, 824.3, 519.8, 824.3, 520.2, 824.2);
      ctx.bezierCurveTo(520.5, 824.0, 520.9, 823.9, 521.1, 823.6);
      ctx.bezierCurveTo(521.4, 823.4, 521.6, 823.2, 521.8, 822.9);
      ctx.bezierCurveTo(522.0, 822.6, 522.0, 822.2, 522.0, 821.9);
      ctx.lineTo(522.0, 821.0);
      ctx.bezierCurveTo(521.7, 820.9, 521.3, 820.8, 520.9, 820.7);
      ctx.bezierCurveTo(520.4, 820.6, 519.9, 820.6, 519.4, 820.6);
      ctx.bezierCurveTo(518.5, 820.6, 517.9, 820.8, 517.4, 821.1);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(534.3, 825.2);
      ctx.lineTo(532.7, 825.2);
      ctx.lineTo(529.4, 821.0);
      ctx.lineTo(527.6, 822.8);
      ctx.lineTo(527.6, 825.2);
      ctx.lineTo(526.2, 825.2);
      ctx.lineTo(526.2, 812.4);
      ctx.lineTo(527.6, 812.4);
      ctx.lineTo(527.6, 821.2);
      ctx.lineTo(532.5, 816.1);
      ctx.lineTo(534.2, 816.1);
      ctx.lineTo(530.4, 820.0);
      ctx.lineTo(534.3, 825.2);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(537.9, 817.4);
      ctx.bezierCurveTo(537.5, 817.5, 537.0, 817.7, 536.6, 817.9);
      ctx.lineTo(536.2, 816.7);
      ctx.bezierCurveTo(536.7, 816.5, 537.2, 816.3, 537.7, 816.2);
      ctx.bezierCurveTo(538.3, 816.1, 538.8, 816.0, 539.5, 816.0);
      ctx.bezierCurveTo(540.8, 816.0, 541.7, 816.3, 542.4, 816.9);
      ctx.bezierCurveTo(543.1, 817.5, 543.4, 818.4, 543.4, 819.7);
      ctx.lineTo(543.4, 825.2);
      ctx.lineTo(542.1, 825.2);
      ctx.lineTo(542.1, 823.9);
      ctx.bezierCurveTo(541.8, 824.3, 541.3, 824.6, 540.8, 824.9);
      ctx.bezierCurveTo(540.3, 825.3, 539.6, 825.4, 538.8, 825.4);
      ctx.bezierCurveTo(538.4, 825.4, 538.0, 825.4, 537.5, 825.2);
      ctx.bezierCurveTo(537.1, 825.1, 536.8, 824.9, 536.5, 824.7);
      ctx.bezierCurveTo(536.1, 824.5, 535.9, 824.2, 535.7, 823.8);
      ctx.bezierCurveTo(535.5, 823.5, 535.4, 823.0, 535.4, 822.6);
      ctx.bezierCurveTo(535.4, 822.1, 535.5, 821.7, 535.7, 821.3);
      ctx.bezierCurveTo(535.9, 820.9, 536.1, 820.6, 536.5, 820.4);
      ctx.bezierCurveTo(536.8, 820.1, 537.2, 819.9, 537.7, 819.8);
      ctx.bezierCurveTo(538.2, 819.7, 538.7, 819.6, 539.3, 819.6);
      ctx.bezierCurveTo(539.9, 819.6, 540.4, 819.6, 540.8, 819.7);
      ctx.bezierCurveTo(541.3, 819.8, 541.7, 819.9, 542.1, 820.0);
      ctx.lineTo(542.1, 819.7);
      ctx.bezierCurveTo(542.1, 818.8, 541.9, 818.2, 541.4, 817.8);
      ctx.bezierCurveTo(540.9, 817.4, 540.2, 817.2, 539.4, 817.2);
      ctx.bezierCurveTo(538.8, 817.2, 538.3, 817.2, 537.9, 817.4);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(537.5, 821.1);
      ctx.bezierCurveTo(537.0, 821.5, 536.8, 821.9, 536.8, 822.5);
      ctx.bezierCurveTo(536.8, 822.8, 536.8, 823.1, 537.0, 823.3);
      ctx.bezierCurveTo(537.1, 823.5, 537.3, 823.7, 537.5, 823.9);
      ctx.bezierCurveTo(537.7, 824.0, 537.9, 824.1, 538.2, 824.2);
      ctx.bezierCurveTo(538.5, 824.3, 538.8, 824.3, 539.1, 824.3);
      ctx.bezierCurveTo(539.5, 824.3, 539.9, 824.3, 540.3, 824.2);
      ctx.bezierCurveTo(540.6, 824.0, 540.9, 823.9, 541.2, 823.6);
      ctx.bezierCurveTo(541.5, 823.4, 541.7, 823.2, 541.9, 822.9);
      ctx.bezierCurveTo(542.0, 822.6, 542.1, 822.2, 542.1, 821.9);
      ctx.lineTo(542.1, 821.0);
      ctx.bezierCurveTo(541.8, 820.9, 541.4, 820.8, 540.9, 820.7);
      ctx.bezierCurveTo(540.5, 820.6, 540.0, 820.6, 539.4, 820.6);
      ctx.bezierCurveTo(538.6, 820.6, 537.9, 820.8, 537.5, 821.1);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(546.1, 823.4);
      ctx.lineTo(547.8, 823.4);
      ctx.lineTo(547.8, 825.2);
      ctx.lineTo(546.1, 825.2);
      ctx.lineTo(546.1, 823.4);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(556.5, 824.9);
      ctx.bezierCurveTo(555.9, 825.3, 555.2, 825.4, 554.4, 825.4);
      ctx.bezierCurveTo(553.7, 825.4, 553.1, 825.3, 552.5, 825.1);
      ctx.bezierCurveTo(551.9, 824.8, 551.4, 824.5, 551.0, 824.0);
      ctx.bezierCurveTo(550.6, 823.6, 550.3, 823.1, 550.0, 822.5);
      ctx.bezierCurveTo(549.8, 822.0, 549.7, 821.3, 549.7, 820.7);
      ctx.bezierCurveTo(549.7, 820.0, 549.8, 819.4, 550.0, 818.9);
      ctx.bezierCurveTo(550.3, 818.3, 550.6, 817.8, 551.0, 817.3);
      ctx.bezierCurveTo(551.4, 816.9, 551.9, 816.5, 552.5, 816.3);
      ctx.bezierCurveTo(553.1, 816.0, 553.7, 815.9, 554.4, 815.9);
      ctx.bezierCurveTo(554.8, 815.9, 555.2, 816.0, 555.5, 816.0);
      ctx.bezierCurveTo(555.9, 816.1, 556.2, 816.2, 556.5, 816.4);
      ctx.bezierCurveTo(556.8, 816.5, 557.1, 816.7, 557.3, 816.9);
      ctx.bezierCurveTo(557.6, 817.1, 557.8, 817.3, 558.0, 817.5);
      ctx.lineTo(557.1, 818.5);
      ctx.bezierCurveTo(556.8, 818.1, 556.4, 817.8, 555.9, 817.5);
      ctx.bezierCurveTo(555.5, 817.2, 555.0, 817.1, 554.3, 817.1);
      ctx.bezierCurveTo(553.9, 817.1, 553.5, 817.2, 553.1, 817.4);
      ctx.bezierCurveTo(552.7, 817.6, 552.3, 817.8, 552.0, 818.1);
      ctx.bezierCurveTo(551.7, 818.5, 551.5, 818.8, 551.3, 819.3);
      ctx.bezierCurveTo(551.2, 819.7, 551.1, 820.2, 551.1, 820.6);
      ctx.bezierCurveTo(551.1, 821.1, 551.2, 821.6, 551.3, 822.0);
      ctx.bezierCurveTo(551.5, 822.5, 551.7, 822.9, 552.0, 823.2);
      ctx.bezierCurveTo(552.3, 823.5, 552.7, 823.7, 553.1, 823.9);
      ctx.bezierCurveTo(553.5, 824.1, 554.0, 824.2, 554.4, 824.2);
      ctx.bezierCurveTo(555.0, 824.2, 555.5, 824.1, 556.0, 823.8);
      ctx.bezierCurveTo(556.4, 823.6, 556.9, 823.2, 557.2, 822.8);
      ctx.lineTo(558.1, 823.7);
      ctx.bezierCurveTo(557.6, 824.2, 557.1, 824.6, 556.5, 824.9);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto
      ctx.beginPath();

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(568.6, 822.5);
      ctx.bezierCurveTo(568.4, 823.1, 568.1, 823.6, 567.6, 824.0);
      ctx.bezierCurveTo(567.2, 824.5, 566.7, 824.8, 566.1, 825.1);
      ctx.bezierCurveTo(565.5, 825.3, 564.9, 825.4, 564.2, 825.4);
      ctx.bezierCurveTo(563.5, 825.4, 562.9, 825.3, 562.3, 825.1);
      ctx.bezierCurveTo(561.8, 824.8, 561.3, 824.5, 560.8, 824.0);
      ctx.bezierCurveTo(560.4, 823.6, 560.1, 823.1, 559.8, 822.5);
      ctx.bezierCurveTo(559.6, 822.0, 559.5, 821.3, 559.5, 820.7);
      ctx.bezierCurveTo(559.5, 820.0, 559.6, 819.4, 559.8, 818.9);
      ctx.bezierCurveTo(560.1, 818.3, 560.4, 817.8, 560.8, 817.3);
      ctx.bezierCurveTo(561.3, 816.9, 561.8, 816.5, 562.3, 816.3);
      ctx.bezierCurveTo(562.9, 816.0, 563.6, 815.9, 564.3, 815.9);
      ctx.bezierCurveTo(564.9, 815.9, 565.6, 816.0, 566.2, 816.3);
      ctx.bezierCurveTo(566.7, 816.5, 567.2, 816.9, 567.7, 817.3);
      ctx.bezierCurveTo(568.1, 817.7, 568.4, 818.2, 568.7, 818.8);
      ctx.bezierCurveTo(568.9, 819.4, 569.0, 820.0, 569.0, 820.7);
      ctx.bezierCurveTo(569.0, 821.3, 568.9, 821.9, 568.6, 822.5);

      // capa1/Recortar grupo/Recortar grupo/Trazado compuesto/Trazado
      ctx.moveTo(567.4, 819.3);
      ctx.bezierCurveTo(567.2, 818.9, 566.9, 818.5, 566.6, 818.2);
      ctx.bezierCurveTo(566.3, 817.8, 566.0, 817.6, 565.6, 817.4);
      ctx.bezierCurveTo(565.2, 817.2, 564.7, 817.1, 564.2, 817.1);
      ctx.bezierCurveTo(563.7, 817.1, 563.3, 817.2, 562.9, 817.4);
      ctx.bezierCurveTo(562.5, 817.6, 562.1, 817.8, 561.8, 818.1);
      ctx.bezierCurveTo(561.5, 818.5, 561.3, 818.8, 561.1, 819.3);
      ctx.bezierCurveTo(561.0, 819.7, 560.9, 820.2, 560.9, 820.6);
      ctx.bezierCurveTo(560.9, 821.1, 561.0, 821.6, 561.1, 822.0);
      ctx.bezierCurveTo(561.3, 822.5, 561.6, 822.8, 561.9, 823.2);
      ctx.bezierCurveTo(562.2, 823.5, 562.5, 823.7, 562.9, 823.9);
      ctx.bezierCurveTo(563.3, 824.1, 563.8, 824.2, 564.3, 824.2);
      ctx.bezierCurveTo(564.8, 824.2, 565.2, 824.1, 565.6, 823.9);
      ctx.bezierCurveTo(566.0, 823.7, 566.4, 823.5, 566.7, 823.2);
      ctx.bezierCurveTo(567.0, 822.9, 567.2, 822.5, 567.4, 822.1);
      ctx.bezierCurveTo(567.5, 821.6, 567.6, 821.2, 567.6, 820.7);
      ctx.bezierCurveTo(567.6, 820.2, 567.5, 819.7, 567.4, 819.3);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(579.2, 817.0);
      ctx.bezierCurveTo(579.4, 816.8, 579.7, 816.6, 579.9, 816.4);
      ctx.bezierCurveTo(580.2, 816.3, 580.5, 816.1, 580.8, 816.1);
      ctx.bezierCurveTo(581.1, 816.0, 581.5, 815.9, 581.9, 815.9);
      ctx.bezierCurveTo(583.0, 815.9, 583.8, 816.2, 584.4, 816.9);
      ctx.bezierCurveTo(585.0, 817.5, 585.3, 818.4, 585.3, 819.6);
      ctx.lineTo(585.3, 825.2);
      ctx.lineTo(583.9, 825.2);
      ctx.lineTo(583.9, 819.9);
      ctx.bezierCurveTo(583.9, 819.0, 583.7, 818.3, 583.3, 817.9);
      ctx.bezierCurveTo(582.9, 817.4, 582.3, 817.1, 581.6, 817.1);
      ctx.bezierCurveTo(581.2, 817.1, 580.9, 817.2, 580.6, 817.3);
      ctx.bezierCurveTo(580.3, 817.5, 580.0, 817.6, 579.8, 817.9);
      ctx.bezierCurveTo(579.6, 818.1, 579.4, 818.4, 579.2, 818.8);
      ctx.bezierCurveTo(579.1, 819.1, 579.0, 819.5, 579.0, 820.0);
      ctx.lineTo(579.0, 825.2);
      ctx.lineTo(577.7, 825.2);
      ctx.lineTo(577.7, 819.9);
      ctx.bezierCurveTo(577.7, 819.0, 577.5, 818.3, 577.1, 817.9);
      ctx.bezierCurveTo(576.7, 817.4, 576.1, 817.1, 575.4, 817.1);
      ctx.bezierCurveTo(575.0, 817.1, 574.7, 817.2, 574.3, 817.4);
      ctx.bezierCurveTo(574.0, 817.5, 573.8, 817.7, 573.5, 818.0);
      ctx.bezierCurveTo(573.3, 818.2, 573.1, 818.5, 573.0, 818.9);
      ctx.bezierCurveTo(572.9, 819.2, 572.8, 819.6, 572.8, 820.0);
      ctx.lineTo(572.8, 825.2);
      ctx.lineTo(571.5, 825.2);
      ctx.lineTo(571.5, 816.1);
      ctx.lineTo(572.8, 816.1);
      ctx.lineTo(572.8, 817.6);
      ctx.bezierCurveTo(573.0, 817.4, 573.1, 817.2, 573.3, 817.0);
      ctx.bezierCurveTo(573.5, 816.8, 573.7, 816.6, 573.9, 816.4);
      ctx.bezierCurveTo(574.2, 816.3, 574.4, 816.1, 574.7, 816.1);
      ctx.bezierCurveTo(575.0, 816.0, 575.4, 815.9, 575.8, 815.9);
      ctx.bezierCurveTo(576.5, 815.9, 577.1, 816.1, 577.6, 816.4);
      ctx.bezierCurveTo(578.1, 816.8, 578.4, 817.2, 578.7, 817.7);
      ctx.bezierCurveTo(578.9, 817.5, 579.0, 817.2, 579.2, 817.0);
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(151.8, 305.2);
      ctx.lineTo(151.8, 351.5);
      ctx.bezierCurveTo(151.8, 353.6, 153.5, 355.4, 155.7, 355.4);
      ctx.lineTo(159.4, 355.4);
      ctx.lineTo(159.4, 362.1);
      ctx.bezierCurveTo(159.4, 364.9, 158.4, 367.6, 156.7, 369.4);
      ctx.bezierCurveTo(150.7, 376.1, 143.0, 384.6, 137.6, 390.5);
      ctx.bezierCurveTo(136.0, 392.2, 134.0, 393.2, 131.9, 393.2);
      ctx.lineTo(23.5, 393.2);
      ctx.lineTo(23.5, 283.4);
      ctx.lineTo(159.4, 283.4);
      ctx.lineTo(159.4, 301.4);
      ctx.lineTo(155.7, 301.4);
      ctx.bezierCurveTo(153.5, 301.4, 151.8, 303.1, 151.8, 305.2);
      ctx.closePath();
      ctx.strokeStyle = "rgb(12, 74, 153)";
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(159.4, 304.1);
      ctx.lineTo(159.4, 352.7);
      ctx.lineTo(156.7, 352.7);
      ctx.bezierCurveTo(155.1, 352.7, 153.9, 351.1, 153.9, 349.2);
      ctx.lineTo(153.9, 307.6);
      ctx.bezierCurveTo(153.9, 305.6, 155.1, 304.1, 156.7, 304.1);
      ctx.lineTo(159.4, 304.1);
      ctx.closePath();
      ctx.fillStyle = "rgb(12, 74, 153)";
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(433.5, 305.2);
      ctx.lineTo(433.5, 351.5);
      ctx.bezierCurveTo(433.5, 353.6, 435.2, 355.4, 437.4, 355.4);
      ctx.lineTo(441.0, 355.4);
      ctx.lineTo(441.0, 362.1);
      ctx.bezierCurveTo(441.0, 364.9, 440.1, 367.6, 438.4, 369.4);
      ctx.bezierCurveTo(432.4, 376.1, 424.7, 384.6, 419.3, 390.5);
      ctx.bezierCurveTo(417.7, 392.2, 415.7, 393.2, 413.6, 393.2);
      ctx.lineTo(305.2, 393.2);
      ctx.lineTo(305.2, 283.4);
      ctx.lineTo(441.0, 283.4);
      ctx.lineTo(441.0, 301.4);
      ctx.lineTo(437.4, 301.4);
      ctx.bezierCurveTo(435.2, 301.4, 433.5, 303.1, 433.5, 305.2);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(441.0, 304.1);
      ctx.lineTo(441.0, 352.7);
      ctx.lineTo(438.4, 352.7);
      ctx.bezierCurveTo(436.8, 352.7, 435.6, 351.1, 435.6, 349.2);
      ctx.lineTo(435.6, 307.6);
      ctx.bezierCurveTo(435.6, 305.6, 436.8, 304.1, 438.4, 304.1);
      ctx.lineTo(441.0, 304.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(174.5, 305.2);
      ctx.lineTo(174.5, 351.5);
      ctx.bezierCurveTo(174.5, 353.6, 172.7, 355.4, 170.6, 355.4);
      ctx.lineTo(166.9, 355.4);
      ctx.lineTo(166.9, 362.1);
      ctx.bezierCurveTo(166.9, 364.9, 167.9, 367.6, 169.5, 369.4);
      ctx.bezierCurveTo(175.6, 376.1, 183.3, 384.6, 188.6, 390.5);
      ctx.bezierCurveTo(190.2, 392.2, 192.3, 393.2, 194.4, 393.2);
      ctx.lineTo(302.7, 393.2);
      ctx.lineTo(302.7, 283.4);
      ctx.lineTo(166.9, 283.4);
      ctx.lineTo(166.9, 301.4);
      ctx.lineTo(170.6, 301.4);
      ctx.bezierCurveTo(172.7, 301.4, 174.5, 303.1, 174.5, 305.2);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(166.9, 304.1);
      ctx.lineTo(166.9, 352.7);
      ctx.lineTo(169.6, 352.7);
      ctx.bezierCurveTo(171.1, 352.7, 172.4, 351.1, 172.4, 349.2);
      ctx.lineTo(172.4, 307.6);
      ctx.bezierCurveTo(172.4, 305.6, 171.1, 304.1, 169.6, 304.1);
      ctx.lineTo(166.9, 304.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(457.3, 305.2);
      ctx.lineTo(457.3, 351.5);
      ctx.bezierCurveTo(457.3, 353.6, 455.6, 355.4, 453.5, 355.4);
      ctx.lineTo(449.8, 355.4);
      ctx.lineTo(449.8, 362.1);
      ctx.bezierCurveTo(449.8, 364.9, 450.8, 367.6, 452.4, 369.4);
      ctx.bezierCurveTo(458.5, 376.1, 466.2, 384.6, 471.5, 390.5);
      ctx.bezierCurveTo(473.1, 392.2, 475.2, 393.2, 477.3, 393.2);
      ctx.lineTo(585.6, 393.2);
      ctx.lineTo(585.6, 283.4);
      ctx.lineTo(449.8, 283.4);
      ctx.lineTo(449.8, 301.4);
      ctx.lineTo(453.5, 301.4);
      ctx.bezierCurveTo(455.6, 301.4, 457.3, 303.1, 457.3, 305.2);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(449.8, 304.1);
      ctx.lineTo(449.8, 352.7);
      ctx.lineTo(452.5, 352.7);
      ctx.bezierCurveTo(454.0, 352.7, 455.3, 351.1, 455.3, 349.2);
      ctx.lineTo(455.3, 307.6);
      ctx.bezierCurveTo(455.3, 305.6, 454.0, 304.1, 452.5, 304.1);
      ctx.lineTo(449.8, 304.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(151.8, 426.1);
      ctx.lineTo(151.8, 472.3);
      ctx.bezierCurveTo(151.8, 474.5, 153.5, 476.2, 155.7, 476.2);
      ctx.lineTo(159.4, 476.2);
      ctx.lineTo(159.4, 482.9);
      ctx.bezierCurveTo(159.4, 485.7, 158.4, 488.4, 156.7, 490.2);
      ctx.bezierCurveTo(150.7, 496.9, 143.0, 505.4, 137.6, 511.3);
      ctx.bezierCurveTo(136.0, 513.1, 134.0, 514.0, 131.9, 514.0);
      ctx.lineTo(23.5, 514.0);
      ctx.lineTo(23.5, 404.2);
      ctx.lineTo(159.4, 404.2);
      ctx.lineTo(159.4, 422.2);
      ctx.lineTo(155.7, 422.2);
      ctx.bezierCurveTo(153.5, 422.2, 151.8, 423.9, 151.8, 426.1);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(159.4, 424.9);
      ctx.lineTo(159.4, 473.5);
      ctx.lineTo(156.7, 473.5);
      ctx.bezierCurveTo(155.1, 473.5, 153.9, 471.9, 153.9, 470.0);
      ctx.lineTo(153.9, 428.4);
      ctx.bezierCurveTo(153.9, 426.5, 155.1, 424.9, 156.7, 424.9);
      ctx.lineTo(159.4, 424.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(433.5, 426.1);
      ctx.lineTo(433.5, 472.3);
      ctx.bezierCurveTo(433.5, 474.5, 435.2, 476.2, 437.4, 476.2);
      ctx.lineTo(441.0, 476.2);
      ctx.lineTo(441.0, 482.9);
      ctx.bezierCurveTo(441.0, 485.7, 440.1, 488.4, 438.4, 490.2);
      ctx.bezierCurveTo(432.4, 496.9, 424.7, 505.4, 419.3, 511.3);
      ctx.bezierCurveTo(417.7, 513.1, 415.7, 514.0, 413.6, 514.0);
      ctx.lineTo(305.2, 514.0);
      ctx.lineTo(305.2, 404.2);
      ctx.lineTo(441.0, 404.2);
      ctx.lineTo(441.0, 422.2);
      ctx.lineTo(437.4, 422.2);
      ctx.bezierCurveTo(435.2, 422.2, 433.5, 423.9, 433.5, 426.1);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(441.0, 424.9);
      ctx.lineTo(441.0, 473.5);
      ctx.lineTo(438.4, 473.5);
      ctx.bezierCurveTo(436.8, 473.5, 435.6, 471.9, 435.6, 470.0);
      ctx.lineTo(435.6, 428.4);
      ctx.bezierCurveTo(435.6, 426.5, 436.8, 424.9, 438.4, 424.9);
      ctx.lineTo(441.0, 424.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(174.5, 426.1);
      ctx.lineTo(174.5, 472.3);
      ctx.bezierCurveTo(174.5, 474.5, 172.7, 476.2, 170.6, 476.2);
      ctx.lineTo(166.9, 476.2);
      ctx.lineTo(166.9, 482.9);
      ctx.bezierCurveTo(166.9, 485.7, 167.9, 488.4, 169.5, 490.2);
      ctx.bezierCurveTo(175.6, 496.9, 183.3, 505.4, 188.6, 511.3);
      ctx.bezierCurveTo(190.2, 513.1, 192.3, 514.0, 194.4, 514.0);
      ctx.lineTo(302.7, 514.0);
      ctx.lineTo(302.7, 404.2);
      ctx.lineTo(166.9, 404.2);
      ctx.lineTo(166.9, 422.2);
      ctx.lineTo(170.6, 422.2);
      ctx.bezierCurveTo(172.7, 422.2, 174.5, 423.9, 174.5, 426.1);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(166.9, 424.9);
      ctx.lineTo(166.9, 473.5);
      ctx.lineTo(169.6, 473.5);
      ctx.bezierCurveTo(171.1, 473.5, 172.4, 471.9, 172.4, 470.0);
      ctx.lineTo(172.4, 428.4);
      ctx.bezierCurveTo(172.4, 426.5, 171.1, 424.9, 169.6, 424.9);
      ctx.lineTo(166.9, 424.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(457.3, 426.1);
      ctx.lineTo(457.3, 472.3);
      ctx.bezierCurveTo(457.3, 474.5, 455.6, 476.2, 453.5, 476.2);
      ctx.lineTo(449.8, 476.2);
      ctx.lineTo(449.8, 482.9);
      ctx.bezierCurveTo(449.8, 485.7, 450.8, 488.4, 452.4, 490.2);
      ctx.bezierCurveTo(458.5, 496.9, 466.2, 505.4, 471.5, 511.3);
      ctx.bezierCurveTo(473.1, 513.1, 475.2, 514.0, 477.3, 514.0);
      ctx.lineTo(585.6, 514.0);
      ctx.lineTo(585.6, 404.2);
      ctx.lineTo(449.8, 404.2);
      ctx.lineTo(449.8, 422.2);
      ctx.lineTo(453.5, 422.2);
      ctx.bezierCurveTo(455.6, 422.2, 457.3, 423.9, 457.3, 426.1);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(449.8, 424.9);
      ctx.lineTo(449.8, 473.5);
      ctx.lineTo(452.5, 473.5);
      ctx.bezierCurveTo(454.0, 473.5, 455.3, 471.9, 455.3, 470.0);
      ctx.lineTo(455.3, 428.4);
      ctx.bezierCurveTo(455.3, 426.5, 454.0, 424.9, 452.5, 424.9);
      ctx.lineTo(449.8, 424.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(151.8, 546.9);
      ctx.lineTo(151.8, 593.1);
      ctx.bezierCurveTo(151.8, 595.3, 153.5, 597.0, 155.7, 597.0);
      ctx.lineTo(159.4, 597.0);
      ctx.lineTo(159.4, 603.7);
      ctx.bezierCurveTo(159.4, 606.5, 158.4, 609.2, 156.7, 611.1);
      ctx.bezierCurveTo(150.7, 617.7, 143.0, 626.2, 137.6, 632.1);
      ctx.bezierCurveTo(136.0, 633.9, 134.0, 634.8, 131.9, 634.8);
      ctx.lineTo(23.5, 634.8);
      ctx.lineTo(23.5, 525.0);
      ctx.lineTo(159.4, 525.0);
      ctx.lineTo(159.4, 543.0);
      ctx.lineTo(155.7, 543.0);
      ctx.bezierCurveTo(153.5, 543.0, 151.8, 544.7, 151.8, 546.9);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(159.4, 545.7);
      ctx.lineTo(159.4, 594.3);
      ctx.lineTo(156.7, 594.3);
      ctx.bezierCurveTo(155.1, 594.3, 153.9, 592.7, 153.9, 590.8);
      ctx.lineTo(153.9, 549.2);
      ctx.bezierCurveTo(153.9, 547.3, 155.1, 545.7, 156.7, 545.7);
      ctx.lineTo(159.4, 545.7);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(433.5, 546.9);
      ctx.lineTo(433.5, 593.1);
      ctx.bezierCurveTo(433.5, 595.3, 435.2, 597.0, 437.4, 597.0);
      ctx.lineTo(441.0, 597.0);
      ctx.lineTo(441.0, 603.7);
      ctx.bezierCurveTo(441.0, 606.5, 440.1, 609.2, 438.4, 611.1);
      ctx.bezierCurveTo(432.4, 617.7, 424.7, 626.2, 419.3, 632.1);
      ctx.bezierCurveTo(417.7, 633.9, 415.7, 634.8, 413.6, 634.8);
      ctx.lineTo(305.2, 634.8);
      ctx.lineTo(305.2, 525.0);
      ctx.lineTo(441.0, 525.0);
      ctx.lineTo(441.0, 543.0);
      ctx.lineTo(437.4, 543.0);
      ctx.bezierCurveTo(435.2, 543.0, 433.5, 544.7, 433.5, 546.9);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(441.0, 545.7);
      ctx.lineTo(441.0, 594.3);
      ctx.lineTo(438.4, 594.3);
      ctx.bezierCurveTo(436.8, 594.3, 435.6, 592.7, 435.6, 590.8);
      ctx.lineTo(435.6, 549.2);
      ctx.bezierCurveTo(435.6, 547.3, 436.8, 545.7, 438.4, 545.7);
      ctx.lineTo(441.0, 545.7);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(174.5, 546.9);
      ctx.lineTo(174.5, 593.1);
      ctx.bezierCurveTo(174.5, 595.3, 172.7, 597.0, 170.6, 597.0);
      ctx.lineTo(166.9, 597.0);
      ctx.lineTo(166.9, 603.7);
      ctx.bezierCurveTo(166.9, 606.5, 167.9, 609.2, 169.5, 611.1);
      ctx.bezierCurveTo(175.6, 617.7, 183.3, 626.2, 188.6, 632.1);
      ctx.bezierCurveTo(190.2, 633.9, 192.3, 634.8, 194.4, 634.8);
      ctx.lineTo(302.7, 634.8);
      ctx.lineTo(302.7, 525.0);
      ctx.lineTo(166.9, 525.0);
      ctx.lineTo(166.9, 543.0);
      ctx.lineTo(170.6, 543.0);
      ctx.bezierCurveTo(172.7, 543.0, 174.5, 544.7, 174.5, 546.9);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(166.9, 545.7);
      ctx.lineTo(166.9, 594.3);
      ctx.lineTo(169.6, 594.3);
      ctx.bezierCurveTo(171.1, 594.3, 172.4, 592.7, 172.4, 590.8);
      ctx.lineTo(172.4, 549.2);
      ctx.bezierCurveTo(172.4, 547.3, 171.1, 545.7, 169.6, 545.7);
      ctx.lineTo(166.9, 545.7);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(457.3, 546.9);
      ctx.lineTo(457.3, 593.1);
      ctx.bezierCurveTo(457.3, 595.3, 455.6, 597.0, 453.5, 597.0);
      ctx.lineTo(449.8, 597.0);
      ctx.lineTo(449.8, 603.7);
      ctx.bezierCurveTo(449.8, 606.5, 450.8, 609.2, 452.4, 611.1);
      ctx.bezierCurveTo(458.5, 617.7, 466.2, 626.2, 471.5, 632.1);
      ctx.bezierCurveTo(473.1, 633.9, 475.2, 634.8, 477.3, 634.8);
      ctx.lineTo(585.6, 634.8);
      ctx.lineTo(585.6, 525.0);
      ctx.lineTo(449.8, 525.0);
      ctx.lineTo(449.8, 543.0);
      ctx.lineTo(453.5, 543.0);
      ctx.bezierCurveTo(455.6, 543.0, 457.3, 544.7, 457.3, 546.9);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(449.8, 545.7);
      ctx.lineTo(449.8, 594.3);
      ctx.lineTo(452.5, 594.3);
      ctx.bezierCurveTo(454.0, 594.3, 455.3, 592.7, 455.3, 590.8);
      ctx.lineTo(455.3, 549.2);
      ctx.bezierCurveTo(455.3, 547.3, 454.0, 545.7, 452.5, 545.7);
      ctx.lineTo(449.8, 545.7);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(151.8, 667.7);
      ctx.lineTo(151.8, 714.0);
      ctx.bezierCurveTo(151.8, 716.1, 153.5, 717.8, 155.7, 717.8);
      ctx.lineTo(159.4, 717.8);
      ctx.lineTo(159.4, 724.5);
      ctx.bezierCurveTo(159.4, 727.3, 158.4, 730.0, 156.7, 731.9);
      ctx.bezierCurveTo(150.7, 738.6, 143.0, 747.0, 137.6, 752.9);
      ctx.bezierCurveTo(136.0, 754.7, 134.0, 755.7, 131.9, 755.7);
      ctx.lineTo(23.5, 755.7);
      ctx.lineTo(23.5, 645.8);
      ctx.lineTo(159.4, 645.8);
      ctx.lineTo(159.4, 663.8);
      ctx.lineTo(155.7, 663.8);
      ctx.bezierCurveTo(153.5, 663.8, 151.8, 665.6, 151.8, 667.7);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(159.4, 666.5);
      ctx.lineTo(159.4, 715.1);
      ctx.lineTo(156.7, 715.1);
      ctx.bezierCurveTo(155.1, 715.1, 153.9, 713.6, 153.9, 711.6);
      ctx.lineTo(153.9, 670.0);
      ctx.bezierCurveTo(153.9, 668.1, 155.1, 666.5, 156.7, 666.5);
      ctx.lineTo(159.4, 666.5);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(433.5, 667.7);
      ctx.lineTo(433.5, 714.0);
      ctx.bezierCurveTo(433.5, 716.1, 435.2, 717.8, 437.4, 717.8);
      ctx.lineTo(441.0, 717.8);
      ctx.lineTo(441.0, 724.5);
      ctx.bezierCurveTo(441.0, 727.3, 440.1, 730.0, 438.4, 731.9);
      ctx.bezierCurveTo(432.4, 738.6, 424.7, 747.0, 419.3, 752.9);
      ctx.bezierCurveTo(417.7, 754.7, 415.7, 755.7, 413.6, 755.7);
      ctx.lineTo(305.2, 755.7);
      ctx.lineTo(305.2, 645.8);
      ctx.lineTo(441.0, 645.8);
      ctx.lineTo(441.0, 663.8);
      ctx.lineTo(437.4, 663.8);
      ctx.bezierCurveTo(435.2, 663.8, 433.5, 665.6, 433.5, 667.7);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(441.0, 666.5);
      ctx.lineTo(441.0, 715.1);
      ctx.lineTo(438.4, 715.1);
      ctx.bezierCurveTo(436.8, 715.1, 435.6, 713.6, 435.6, 711.6);
      ctx.lineTo(435.6, 670.0);
      ctx.bezierCurveTo(435.6, 668.1, 436.8, 666.5, 438.4, 666.5);
      ctx.lineTo(441.0, 666.5);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(174.5, 667.7);
      ctx.lineTo(174.5, 714.0);
      ctx.bezierCurveTo(174.5, 716.1, 172.7, 717.8, 170.6, 717.8);
      ctx.lineTo(166.9, 717.8);
      ctx.lineTo(166.9, 724.5);
      ctx.bezierCurveTo(166.9, 727.3, 167.9, 730.0, 169.5, 731.9);
      ctx.bezierCurveTo(175.6, 738.6, 183.3, 747.0, 188.6, 752.9);
      ctx.bezierCurveTo(190.2, 754.7, 192.3, 755.7, 194.4, 755.7);
      ctx.lineTo(302.7, 755.7);
      ctx.lineTo(302.7, 645.8);
      ctx.lineTo(166.9, 645.8);
      ctx.lineTo(166.9, 663.8);
      ctx.lineTo(170.6, 663.8);
      ctx.bezierCurveTo(172.7, 663.8, 174.5, 665.6, 174.5, 667.7);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(166.9, 666.5);
      ctx.lineTo(166.9, 715.1);
      ctx.lineTo(169.6, 715.1);
      ctx.bezierCurveTo(171.1, 715.1, 172.4, 713.6, 172.4, 711.6);
      ctx.lineTo(172.4, 670.0);
      ctx.bezierCurveTo(172.4, 668.1, 171.1, 666.5, 169.6, 666.5);
      ctx.lineTo(166.9, 666.5);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(457.3, 667.7);
      ctx.lineTo(457.3, 714.0);
      ctx.bezierCurveTo(457.3, 716.1, 455.6, 717.8, 453.5, 717.8);
      ctx.lineTo(449.8, 717.8);
      ctx.lineTo(449.8, 724.5);
      ctx.bezierCurveTo(449.8, 727.3, 450.8, 730.0, 452.4, 731.9);
      ctx.bezierCurveTo(458.5, 738.6, 466.2, 747.0, 471.5, 752.9);
      ctx.bezierCurveTo(473.1, 754.7, 475.2, 755.7, 477.3, 755.7);
      ctx.lineTo(585.6, 755.7);
      ctx.lineTo(585.6, 645.8);
      ctx.lineTo(449.8, 645.8);
      ctx.lineTo(449.8, 663.8);
      ctx.lineTo(453.5, 663.8);
      ctx.bezierCurveTo(455.6, 663.8, 457.3, 665.6, 457.3, 667.7);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(449.8, 666.5);
      ctx.lineTo(449.8, 715.1);
      ctx.lineTo(452.5, 715.1);
      ctx.bezierCurveTo(454.0, 715.1, 455.3, 713.6, 455.3, 711.6);
      ctx.lineTo(455.3, 670.0);
      ctx.bezierCurveTo(455.3, 668.1, 454.0, 666.5, 452.5, 666.5);
      ctx.lineTo(449.8, 666.5);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(151.5, 62.9);
      ctx.lineTo(151.5, 109.2);
      ctx.bezierCurveTo(151.5, 111.3, 153.2, 113.0, 155.4, 113.0);
      ctx.lineTo(159.1, 113.0);
      ctx.lineTo(159.1, 119.7);
      ctx.bezierCurveTo(159.1, 122.6, 158.1, 125.3, 156.4, 127.1);
      ctx.bezierCurveTo(150.4, 133.8, 142.7, 142.2, 137.3, 148.1);
      ctx.bezierCurveTo(135.7, 149.9, 133.7, 150.9, 131.6, 150.9);
      ctx.lineTo(23.2, 150.9);
      ctx.lineTo(23.2, 41.0);
      ctx.lineTo(159.1, 41.0);
      ctx.lineTo(159.1, 59.0);
      ctx.lineTo(155.4, 59.0);
      ctx.bezierCurveTo(153.2, 59.0, 151.5, 60.8, 151.5, 62.9);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(159.1, 61.7);
      ctx.lineTo(159.1, 110.3);
      ctx.lineTo(156.4, 110.3);
      ctx.bezierCurveTo(154.9, 110.3, 153.6, 108.8, 153.6, 106.9);
      ctx.lineTo(153.6, 65.2);
      ctx.bezierCurveTo(153.6, 63.3, 154.9, 61.7, 156.4, 61.7);
      ctx.lineTo(159.1, 61.7);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(433.2, 62.9);
      ctx.lineTo(433.2, 109.2);
      ctx.bezierCurveTo(433.2, 111.3, 434.9, 113.0, 437.1, 113.0);
      ctx.lineTo(440.7, 113.0);
      ctx.lineTo(440.7, 119.7);
      ctx.bezierCurveTo(440.7, 122.6, 439.8, 125.3, 438.1, 127.1);
      ctx.bezierCurveTo(432.1, 133.8, 424.4, 142.2, 419.0, 148.1);
      ctx.bezierCurveTo(417.4, 149.9, 415.4, 150.9, 413.3, 150.9);
      ctx.lineTo(304.9, 150.9);
      ctx.lineTo(304.9, 41.0);
      ctx.lineTo(440.7, 41.0);
      ctx.lineTo(440.7, 59.0);
      ctx.lineTo(437.1, 59.0);
      ctx.bezierCurveTo(434.9, 59.0, 433.2, 60.8, 433.2, 62.9);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(440.7, 61.7);
      ctx.lineTo(440.7, 110.3);
      ctx.lineTo(438.1, 110.3);
      ctx.bezierCurveTo(436.5, 110.3, 435.3, 108.8, 435.3, 106.9);
      ctx.lineTo(435.3, 65.2);
      ctx.bezierCurveTo(435.3, 63.3, 436.5, 61.7, 438.1, 61.7);
      ctx.lineTo(440.7, 61.7);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(174.2, 62.9);
      ctx.lineTo(174.2, 109.2);
      ctx.bezierCurveTo(174.2, 111.3, 172.4, 113.0, 170.3, 113.0);
      ctx.lineTo(166.6, 113.0);
      ctx.lineTo(166.6, 119.7);
      ctx.bezierCurveTo(166.6, 122.6, 167.6, 125.3, 169.2, 127.1);
      ctx.bezierCurveTo(175.3, 133.8, 183.0, 142.2, 188.3, 148.1);
      ctx.bezierCurveTo(189.9, 149.9, 192.0, 150.9, 194.1, 150.9);
      ctx.lineTo(302.4, 150.9);
      ctx.lineTo(302.4, 41.0);
      ctx.lineTo(166.6, 41.0);
      ctx.lineTo(166.6, 59.0);
      ctx.lineTo(170.3, 59.0);
      ctx.bezierCurveTo(172.4, 59.0, 174.2, 60.8, 174.2, 62.9);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(166.6, 61.7);
      ctx.lineTo(166.6, 110.3);
      ctx.lineTo(169.3, 110.3);
      ctx.bezierCurveTo(170.8, 110.3, 172.1, 108.8, 172.1, 106.9);
      ctx.lineTo(172.1, 65.2);
      ctx.bezierCurveTo(172.1, 63.3, 170.8, 61.7, 169.3, 61.7);
      ctx.lineTo(166.6, 61.7);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(457.1, 62.9);
      ctx.lineTo(457.1, 109.2);
      ctx.bezierCurveTo(457.1, 111.3, 455.3, 113.0, 453.2, 113.0);
      ctx.lineTo(449.5, 113.0);
      ctx.lineTo(449.5, 119.7);
      ctx.bezierCurveTo(449.5, 122.6, 450.5, 125.3, 452.1, 127.1);
      ctx.bezierCurveTo(458.2, 133.8, 465.9, 142.2, 471.2, 148.1);
      ctx.bezierCurveTo(472.8, 149.9, 474.9, 150.9, 477.0, 150.9);
      ctx.lineTo(585.3, 150.9);
      ctx.lineTo(585.3, 41.0);
      ctx.lineTo(449.5, 41.0);
      ctx.lineTo(449.5, 59.0);
      ctx.lineTo(453.2, 59.0);
      ctx.bezierCurveTo(455.3, 59.0, 457.1, 60.8, 457.1, 62.9);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(449.5, 61.7);
      ctx.lineTo(449.5, 110.3);
      ctx.lineTo(452.2, 110.3);
      ctx.bezierCurveTo(453.7, 110.3, 455.0, 108.8, 455.0, 106.9);
      ctx.lineTo(455.0, 65.2);
      ctx.bezierCurveTo(455.0, 63.3, 453.7, 61.7, 452.2, 61.7);
      ctx.lineTo(449.5, 61.7);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(151.5, 183.7);
      ctx.lineTo(151.5, 230.0);
      ctx.bezierCurveTo(151.5, 232.1, 153.2, 233.9, 155.4, 233.9);
      ctx.lineTo(159.1, 233.9);
      ctx.lineTo(159.1, 240.5);
      ctx.bezierCurveTo(159.1, 243.4, 158.1, 246.1, 156.4, 247.9);
      ctx.bezierCurveTo(150.4, 254.6, 142.7, 263.1, 137.3, 268.9);
      ctx.bezierCurveTo(135.7, 270.7, 133.7, 271.7, 131.6, 271.7);
      ctx.lineTo(23.2, 271.7);
      ctx.lineTo(23.2, 161.9);
      ctx.lineTo(159.1, 161.9);
      ctx.lineTo(159.1, 179.9);
      ctx.lineTo(155.4, 179.9);
      ctx.bezierCurveTo(153.2, 179.9, 151.5, 181.6, 151.5, 183.7);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(159.1, 182.6);
      ctx.lineTo(159.1, 231.2);
      ctx.lineTo(156.4, 231.2);
      ctx.bezierCurveTo(154.9, 231.2, 153.6, 229.6, 153.6, 227.7);
      ctx.lineTo(153.6, 186.0);
      ctx.bezierCurveTo(153.6, 184.1, 154.9, 182.6, 156.4, 182.6);
      ctx.lineTo(159.1, 182.6);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(433.2, 183.7);
      ctx.lineTo(433.2, 230.0);
      ctx.bezierCurveTo(433.2, 232.1, 434.9, 233.9, 437.1, 233.9);
      ctx.lineTo(440.7, 233.9);
      ctx.lineTo(440.7, 240.5);
      ctx.bezierCurveTo(440.7, 243.4, 439.8, 246.1, 438.1, 247.9);
      ctx.bezierCurveTo(432.1, 254.6, 424.4, 263.1, 419.0, 268.9);
      ctx.bezierCurveTo(417.4, 270.7, 415.4, 271.7, 413.3, 271.7);
      ctx.lineTo(304.9, 271.7);
      ctx.lineTo(304.9, 161.9);
      ctx.lineTo(440.7, 161.9);
      ctx.lineTo(440.7, 179.9);
      ctx.lineTo(437.1, 179.9);
      ctx.bezierCurveTo(434.9, 179.9, 433.2, 181.6, 433.2, 183.7);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(440.7, 182.6);
      ctx.lineTo(440.7, 231.2);
      ctx.lineTo(438.1, 231.2);
      ctx.bezierCurveTo(436.5, 231.2, 435.3, 229.6, 435.3, 227.7);
      ctx.lineTo(435.3, 186.0);
      ctx.bezierCurveTo(435.3, 184.1, 436.5, 182.6, 438.1, 182.6);
      ctx.lineTo(440.7, 182.6);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(174.2, 183.7);
      ctx.lineTo(174.2, 230.0);
      ctx.bezierCurveTo(174.2, 232.1, 172.4, 233.9, 170.3, 233.9);
      ctx.lineTo(166.6, 233.9);
      ctx.lineTo(166.6, 240.5);
      ctx.bezierCurveTo(166.6, 243.4, 167.6, 246.1, 169.2, 247.9);
      ctx.bezierCurveTo(175.3, 254.6, 183.0, 263.1, 188.3, 268.9);
      ctx.bezierCurveTo(189.9, 270.7, 192.0, 271.7, 194.1, 271.7);
      ctx.lineTo(302.4, 271.7);
      ctx.lineTo(302.4, 161.9);
      ctx.lineTo(166.6, 161.9);
      ctx.lineTo(166.6, 179.9);
      ctx.lineTo(170.3, 179.9);
      ctx.bezierCurveTo(172.4, 179.9, 174.2, 181.6, 174.2, 183.7);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(166.6, 182.6);
      ctx.lineTo(166.6, 231.2);
      ctx.lineTo(169.3, 231.2);
      ctx.bezierCurveTo(170.8, 231.2, 172.1, 229.6, 172.1, 227.7);
      ctx.lineTo(172.1, 186.0);
      ctx.bezierCurveTo(172.1, 184.1, 170.8, 182.6, 169.3, 182.6);
      ctx.lineTo(166.6, 182.6);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(457.1, 183.7);
      ctx.lineTo(457.1, 230.0);
      ctx.bezierCurveTo(457.1, 232.1, 455.3, 233.9, 453.2, 233.9);
      ctx.lineTo(449.5, 233.9);
      ctx.lineTo(449.5, 240.5);
      ctx.bezierCurveTo(449.5, 243.4, 450.5, 246.1, 452.1, 247.9);
      ctx.bezierCurveTo(458.2, 254.6, 465.9, 263.1, 471.2, 268.9);
      ctx.bezierCurveTo(472.8, 270.7, 474.9, 271.7, 477.0, 271.7);
      ctx.lineTo(585.3, 271.7);
      ctx.lineTo(585.3, 161.9);
      ctx.lineTo(449.5, 161.9);
      ctx.lineTo(449.5, 179.9);
      ctx.lineTo(453.2, 179.9);
      ctx.bezierCurveTo(455.3, 179.9, 457.1, 181.6, 457.1, 183.7);
      ctx.closePath();
      ctx.stroke();

      // capa1/Recortar grupo/Recortar grupo/Trazado
      ctx.beginPath();
      ctx.moveTo(449.5, 182.6);
      ctx.lineTo(449.5, 231.2);
      ctx.lineTo(452.2, 231.2);
      ctx.bezierCurveTo(453.7, 231.2, 455.0, 229.6, 455.0, 227.7);
      ctx.lineTo(455.0, 186.0);
      ctx.bezierCurveTo(455.0, 184.1, 453.7, 182.6, 452.2, 182.6);
      ctx.lineTo(449.5, 182.6);
      ctx.closePath();
      ctx.fill();

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(209.9, 145.8);
      ctx.lineTo(249.7, 145.8);
      ctx.lineTo(249.7, 77.2);
      ctx.lineTo(209.9, 77.2);
      ctx.lineTo(209.9, 145.8);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(209.9, 145.8);
      ctx.lineTo(249.7, 145.8);
      ctx.lineTo(249.7, 77.2);
      ctx.lineTo(209.9, 77.2);
      ctx.lineTo(209.9, 145.8);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Imagen
      //imagen 2
      ctx.drawImage(document.getElementById("image-"+articulos[1].sap), 209.9, 77.2,54,69);

      // capa1/Recortar grupo/Recortar grupo
      ctx.restore();
      ctx.restore();

      // capa1/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(66.2, 145.2);
      ctx.lineTo(120.8, 145.2);
      ctx.lineTo(120.8, 66.9);
      ctx.lineTo(66.2, 66.9);
      ctx.lineTo(66.2, 145.2);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Trazado de recorte
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(66.2, 145.2);
      ctx.lineTo(120.8, 145.2);
      ctx.lineTo(120.8, 66.9);
      ctx.lineTo(66.2, 66.9);
      ctx.lineTo(66.2, 145.2);
      ctx.closePath();
      ctx.clip();

      // capa1/Recortar grupo/Recortar grupo/Recortar grupo/Imagen
      //imagen 1
      ctx.drawImage(document.getElementById("image-"+articulos[0].sap), 90, 80.9,54,69);
      ctx.restore();
      ctx.restore();
      ctx.restore();
      ctx.restore();
    },
    Comprarya(){
      this.prueba = false
      this.drawer = !this.drawer
      
    },
    closeSession() {
      console.log('here')
    },
    updateCarouselHeight() {
      this.carouselHeight = window.innerWidth < 1000 ? '120px' : '500px';
    },
    async preload(a) {
      if (a == 'promociones') {
        if (this.stop) {
          this.pag.cant = 20
          await this.getpromo()
          this.stop = false
        }

      }
      console.log(a)
      if (a[0] == 'L') {
        if (this.stop) {
          this.openModal('producto', a)
          this.stop = false
        }

      }

    },
    async getstado() {
      let res = await fetch("/direccion/getestado")
      res = await res.json()
      this.datosG.estado = res
    },
    async getTiendas() {
      let res = await fetch("/direccion/gettienda")
      res = await res.json()
      this.dirtienda = res;
      for (let tienda of res) {
        this.tiendas.push(tienda.nombre)
      }


    },
    async getmunicipio(a) {

      let res = await fetch("/direccion/getmunicipio/" + this.cliente.estado.cod_entidad)
      res = await res.json()

      this.datosG.municipio = res
    },
    async getparroquia(a) {

      let res = await fetch("/direccion/getparroquia/" + this.cliente.municipio.cod_mun + "/" + this.cliente.estado.cod_entidad)
      res = await res.json()

      this.datosG.parroquia = res
    },
    setvideo(a) {
      this.videoP = a
    },
    async getpromo() {

      let res = await fetch('/producto/promo/0/20')
      res = await res.json()
      this.pag.ruta = "/producto/promo"
      this.pag.inicio = 0
      this.pag.fin = 20

      this.pag.actual = 1
      this.articulos = res.valor
      let cant = res.n
      if (cant == 0) {
        cant = 1;
      }

      this.banner = false;
      this.titulo = "Promociones";
      this.pag.cant = cant
    },
    async getproducto() {

      let res = await fetch('/producto/va')
      res = await res.json()
      this.articulos = res.valor
     
    },
  

    async Getlinea(a) {

      let categoria = [];

      let res = await fetch('/producto/list_linea/' + a + '/0/20')
      this.pag.inicio = 0
      this.pag.fin = 20
      this.pag.ruta = '/producto/list_linea/' + a
      this.pag.actual = 1
      res = await res.json()
      this.articulos = res.valor
      this.pag.cant = res.cand
      this.banner = false;
      this.titulo = a;
    },
    async getmarca(a) {

      let categoria = [];

      let res = await fetch('/producto/list_marca/' + a + '/0/20')
      this.pag.inicio = 0
      this.pag.fin = 20
      this.pag.ruta = '/producto/list_marca/' + a
      this.pag.actual = 1
      res = await res.json()
      this.articulos = res.valor
      this.pag.cant = res.cand
      this.banner = false;
      this.titulo = a;
    },
    async ProductoDestacado() {
      let consul = await fetch('/producto/destacado')
      consul = await consul.json()

      this.Pdestacado = await consul
    },
    async productoparati() {
      let consul = await fetch('/producto/parati')
      consul = await consul.json()

      this.parati = await consul
    },

    async ProductoLinea(a) {

      let res = []
      for (let linea in this.MenuCategoria) {
        let consul = await fetch('/producto/lineas/' + this.MenuCategoria[linea].Nombre)
        consul = await consul.json()
        res = await consul
        this.MenuCategoria[linea].producto = res

      }





    },
    async openModal(a, b) {

      if (a == 'quienes') {
        this.modal.quienes = true
        if (!this.init) {
          //this.createMap()
          this.init = true;
        }
      }
      if (a == 'servicios') {
        this.modal.servicios = true
      }
      if (a == 'producto') {

        if (typeof b == "string") {
          let p = await fetch('/producto/getproducto/' + b)

          p = await p.json()

          b = p
        }

        this.modelProd = b
        let res = await fetch('/producto/caracterisctica/' + b.sap)
        res = await res.json()

        this.modelProd['caracteristica'] = res.valor
        this.categoriaico = res.ico
        this.modal.producto = true

      }
    },
    async GetCaracteristica(sap){
      let res = await fetch('/producto/caracterisctica/' +sap)
        res = await res.json()
        console.log(res)
       return res

    },
    colorPromo(a) {
      if (a == 'PROMO') {
        return "#143E8F"
      }
    },
    contacto() {

      let msm = 'https://api.whatsapp.com/send/?phone=584244624218'
      location.href = msm
    },
    SendWhs() {
      let total = "Bienvenido(a) a tiendas daka, gracias por comprar con nosotros."
      // let  = 'Hola '+this.cliente.nombre+"%0A%0A Bienvenido(a) a tiendas daka %0A";
      if (this.metodoSelect == 'Delivery') {
        total += 'Direccion del Envio : %0A';
        total += 'Estado:' + this.cliente.estado.nombre + " ,  Municipio:" + this.cliente.municipio.nombre + ' , Parroquia:' + this.cliente.parroquia.nombre + '%0A';
        total += 'Direccion:' + this.cliente.direccion + '%0A';
      } else {
        total += 'Tienda a Retirar:' + this.cliente.direccion + '%0A';
      }

      total += 'Cedula:' + this.cliente.cedula + '%0A%0A';
      total += 'PRODUCTO %0A';

      this.carrito.forEach((item) => {

        total = total + " %0A " + item.sap + ' -' + item.precio + ' $ - ' + item.descripcion;
      })
      total += ' %0A %0AEl monto total a cancelar es de ' + this.totalCarro + '$.';

      let msm = 'https://api.whatsapp.com/send/?phone=584244624218&text=' + total + '&type=phone_number&app_absent=0'
      location.href = msm
    },
    menuSelect(a) {
      this.articulos.forEach(element => {
        if (element.familia == a) {
          element.view = true;
        } else {
          element.view = false;
        }
      })
    },
    async nextp(tipo) {

      let res
      if (tipo == 'up') {

        this.pag.inicio = this.pag.inicio + 20
        this.pag.fin = this.pag.fin + 20
        res = await fetch(this.pag.ruta + "/" + this.pag.inicio + '/' + this.pag.fin)
      }
      if (tipo == 'down') {

        this.pag.inicio = this.pag.inicio - 20
        this.pag.fin = this.pag.fin - 20
        res = await fetch(this.pag.ruta + "/" + this.pag.inicio + '/' + this.pag.fin)
      }

      if (tipo == 'click') {

        this.pag.inicio = (this.pag.actual * 20) - 20

        this.pag.fin = this.pag.actual * 20
        res = await fetch(this.pag.ruta + "/" + this.pag.inicio + '/' + this.pag.fin)
      }

      res = await res.json()

      this.articulos = res.valor

    },
    async nextpr(tipo) {

      let res
      if (tipo == 'up') {

        this.pag.inicio = this.pag.inicio + 20
        this.pag.fin = this.pag.fin + 20
        res = await fetch(this.pag.ruta + "/" + this.pag.inicio + '/' + this.pag.fin)
      }
      if (tipo == 'down') {

        this.pag.inicio = this.pag.inicio - 20
        this.pag.fin = this.pag.fin - 20
        res = await fetch(this.pag.ruta + "/" + this.pag.inicio + '/' + this.pag.fin)
      }

      if (tipo == 'click') {

        this.pag.inicio = (this.pag.actual * 20) - 20

        this.pag.fin = this.pag.actual * 20
        res = await fetch(this.pag.ruta + "/" + this.pag.inicio + '/' + this.pag.fin)
      }

      res = await res.json()

      this.articulosR = res.valor

    },

    async filtro(a) {
      if (a == 'inicio') {

        this.buscador = ""
        this.banner = true
        this.pag.ruta = '/producto/va'
        this.pag.inicio = 0
        this.pag.fin = 20
        this.pag.actual = 1
        this.getproducto()
        return 0;
      }
      let categoria = [];

      let res = await fetch('/producto/va/list_des/' + this.buscador.toUpperCase() + '/0/20')
      
      this.pag.ruta = '/producto/va/list_des/' + this.buscador.toUpperCase()
      this.pag.actual = 1
      res = await res.json()
      this.banner = false
      this.articulos = res.valor
    
      this.titulo = this.buscador;
    },
    async filtror(a) {
      if (a == 'inicio' || a == '') {

        this.buscador = ''
        this.banner = true
        this.pag.ruta = '/producto/listR'
        this.pag.inicio = 0
        this.pag.fin = 20
        this.pag.actual = 1
        this.getproductoR()
        return 0;
      }
      let categoria = [];

      let res = await fetch('/producto/list_desr/' + this.buscador.toUpperCase() + '/0/20')
      this.pag.inicio = 0
      this.pag.fin = 20
      this.pag.ruta = '/producto/list_desr/' + this.buscador.toUpperCase()
      this.pag.actual = 1
      res = await res.json()
      this.banner = false
      this.articulosR = res.valor
      this.pag.cant = res.n
      this.titulo = this.buscador;
    },
    async logout(){
      let res = await fetch('/user/logout',{
        method: 'POST',
      })
      console.log(await res)
      res = await res.json()
      if(res.status){
        location.href ='../'
      }
      
    },
    async filtroC(a) {

      this.banner = false
      let res = await fetch('/producto/list/' + a + '/0/20')
      this.pag.inicio = 0
      this.pag.fin = 20
      res = await res.json()
      this.articulos = []
      this.articulos = res.valor
      this.pag.cant = res.n
      this.pag.ruta = '/producto/list/' + a
      this.pag.actual = 1
      let categoria = [];

      this.articulos.forEach(element => {

        if (element.categoria == a) {

          element.view = true;
          categoria.push(element)
        } else {
          element.view = false;
        }

        this.menus = categoria

      });
      this.titulo = a;
    },
    RemoveCarrito(articulo) {
      articulo['carrito'] = false;
      var index = this.carrito.findIndex(e => e == articulo);
      if (index == 0) {
        this.carrito.splice(index, 1);
        return;
      }
      this.carrito.splice(index, index);

    },
    testCart(){
      console.log('llega aqui')
    },
    addCarrito(articulo) {
      articulo['carrito'] = true;
      this.carrito.push(articulo)
      if (this.modal.producto) {
        this.modal.producto = false
      }
    },
    async getinfo(articulo, tipo) {

      let res = await fetch('/producto/getproducto/' + articulo.sap)

      res = await res.json()
      articulo[tipo] = await res[tipo];
      return articulo[tipo]
    }
  },

})
