
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
var Standar = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let baseMaps = {
  'Open Street Map': OpenStreetMap_HOT,
  'Open Street Topo': OpenTopoMap,
  'Open Standar' : Standar
};

//let map = L.map('map').fitWorld();

let map = L.map('map',{
  layers: [
    OpenTopoMap
  ]
}).fitWorld();

L.control.layers(baseMaps, ).addTo(map); //CONTROL LAYRSMAPAS

function eachLayer(layer) { // CADA CXADA UN MARCADOR
  const layerData = layer.toGeoJSON(); // cargar datos a formato geojason
  //console.log(layerData)
  layer.options.title = layerData.properties.Nombre;
  layer.bindPopup(`<h3>${layerData.properties.Nombre}</h3>`); // PARA CZADA MARCADOR UN POPUP
}

let layer = omnivore.csv('/Cnveniodependencias/convleaflet/data/pruebat-rural.csv', {
  latfield: 'GPS.Latitud',
  lonfield: 'GPS.Longitud',
  delimiter: ';'
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