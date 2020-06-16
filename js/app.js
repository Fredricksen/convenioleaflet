let map = L.map('map').fitWorld();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function eachLayer(layer) {
  const layerData = layer.toGeoJSON();
  layer.options.title = layerData.properties.Nombre;
  layer.bindPopup(`<h3>${layerData.properties.Nombre}</h3>`);
}

let layer = omnivore.csv('/Conveniodependencias/convenioleaflet/data/pruebat-rural.csv', {
  latfield: 'GPS.Latitud',
  lonfield: 'GPS.Longitud',
  delimiter: ';'
  })
  .on('ready', function() {
    map.fitBounds(layer.getBounds());

    let markers = L.markerClusterGroup({
      showCoverageOnHover: false, // -muestra los bordes que alcanza
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