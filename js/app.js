var OpenStreetMap_HOT = L.tileLayer(
  'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  {
    maxZoom: 15,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
  }
);
var OpenTopoMap = L.tileLayer(
  'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 17,
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }
);
var Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
	maxZoom: 16,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

let baseMaps = {
  'Open Street Map': OpenStreetMap_HOT,
  'Open Street Topo': OpenTopoMap,
  'Open Stadia Outdoors' : Stadia_Outdoors
};

//let map = L.map('map').fitWorld();

let map = L.map('map',{
  layers: [
    OpenTopoMap
  ]
}).fitWorld(); 

L.control.layers(baseMaps, ).addTo(map); //CONTROL LAYRSMAPAS

function eachLayer(layer) { // CADA CAPA UN MARCADOR
  const layerData = layer.toGeoJSON(); // cargar datos a formato geojason
  //console.log(layerData)
  layer.options.title = layerData.properties.Nombre;
  layer.bindPopup(`<h2>${layerData.properties.Nombre}</h2>`); // PARA CZADA MARCADOR UN POPUP
}

///Users/Fredricksen/.bitnami/stackman/machines/xampp/volumes/root/htdocs/Cnveniodependencias/convleaflet/data/CPPCUVALLES.csv
let layer = omnivore.csv('/Cnveniodependencias/convleaflet/data/CPPCUVALLES.csv', {
//let layer = omnivore.csv('/Cnveniodependencias/convleaflet/data/pruebat-rural.csv', {
  latfield: 'GPS.Latitud',
  lonfield: 'GPS.Longitud',
  delimiter: ','
  })
  .on('ready', function() {
    map.fitBounds(layer.getBounds());

    let markers = L.markerClusterGroup({
      showCoverageOnHover: true, // -muestra los bordes que alcanza
      maxClusterRadius: 50 // pixels
    });
    markers.addLayer(layer);
    map.addLayer(markers);

    layer.eachLayer(eachLayer);//PARA CADA CAPA CARGUE UN EACHLAYER
/* Busqueda nombre*/
    let controlSearch = new L.Control.Search({
      layer: markers,
      zoom: 14,
      marker: false,
      moveToLocation: function(latlng, title, map) {
        map.flyTo(latlng, 18);

        map.once('moveend', function(){
          latlng.layer.openPopup();
        })
      }

    });
    map.addControl(controlSearch);



    console.log('works')
  })
  .on('error', function(error) {
    console.log('error')
    console.log(error);
  });