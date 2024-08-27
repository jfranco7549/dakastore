  <template>
    <div>sssasasd</div>
<div id='map' class='map'>
 
</div>
</template>

 

<script >
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';


export default {
name: "ubicanos",
props: [""],
data() {
  return {
   a:false
  }
},

mounted() {
 
   
  },
  activated(){
    createMap()
  },
components: {
 
 },
 computed:{},
 methods:{
  createMap(){
    let aa = document.getElementById('map')
console.log(aa)
    const map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
    });
  }
 
}
};
</script>
<style>
.map{
  height: 120px;
  
}
</style>

