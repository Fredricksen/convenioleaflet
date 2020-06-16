
var OpenStreetMap_HOT = L.tileLayer(
  'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
  }
);
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 16,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
})

var Estandar = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let baseMaps = {
  "Open Estandar map": Estandar,
  'Open Topo Map':OpenTopoMap,
  'Open Stret Map Hot':OpenStreetMap_HOT, 
  "Open Streat Map":OpenStreetMap_Mapnik
};

let Map =L.map('map',{
  layers: [
    OpenStreetMap_Mapnik
  ]
}).fitWorld();
L.control.layers(baseMaps).addTo(map);
L.control.layers(baseMaps).addTo(map);//CONTROL MAPAS

/*


function eachLayer(layer) {
  const layerData = layer.toGeoJSON();
  layer.options.title = layerData.properties.Nombre;
  layer.bindPopup(`<h3>${layerData.properties.Nombre}</h3>`);
}

let layer = omnivore.csv('/10-cluster/data/turismo-rural.csv', {
  latfield: 'GPS.Latitud',
  lonfield: 'GPS.Longitud',
  delimiter: ';'
  })
  .on('ready', function() {
    map.fitBounds(layer.getBounds());

    let markers = L.markerClusterGroup({
      showCoverageOnHover: false, // muestra los bordes que alcanza
      maxClusterRadius: 50 // pixels
    });
    markers.addLayer(layer);
    map.addLayer(markers);

    layer.eachLayer(eachLayer);

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

  */