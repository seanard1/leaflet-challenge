let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// https://css-irl.info/working-with-color-scales-for-data-visualisation-in-d3/
// https://www.d3indepth.com/scales/
let color = d3.scaleLinear().domain([0,100]).range(['green', 'red']).clamp(true);

let platesURL = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';


d3.json(queryUrl).then(function (data) {

    createFeatures(data.features);
  
});


function circleSize (mag) {
    let radius = mag * 20000;
    return radius;
};

function createFeatures(earthquakeData) {
  
    function onEachFeature (feature, layer) {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>\
        <p>When: ${new Date(feature.properties.time).toLocaleDateString()}<br />\
        Magnitude: ${feature.properties.mag}<br />\
        Depth: ${feature.geometry.coordinates[2]}</p>`);
      console.log(feature.geometry.coordinates[2]);
    };
    

    let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,

      pointToLayer: function(feature, latlng) {
        let circles = {
            radius: circleSize(feature.properties.mag),
            fillColor: color(feature.geometry.coordinates[2]),
            fillOpacity: 0.4,
            color: 'black',
            stroke: true,
            weight: 0.25
        }

        return L.circle(latlng, circles);
      }
    });
    
    createMap(earthquakes);
  
};

function createMap(earthquakes) {
    
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // https://github.com/leaflet-extras/leaflet-providers
    let relief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
      });
  
    
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo,
      "Relief Map": relief
    };
  
    let overlayMaps = {
      Quakes: earthquakes
    };
  
    // Create a new map.
    // Edit the code to add the earthquake data to the layers.
    let myMap = L.map("map", {
      center: [
        47.09, -110.71
      ],
      zoom: 4,
      layers: [relief, earthquakes]
    });

    // https://codepen.io/haakseth/pen/KQbjdO
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend"),
        depth = [0, 20, 40, 60, 80, 100];

        div.innerHTML += "<h3 style='text-align: center'>Quake depth</h3>"

        for (var i = 0; i < depth.length; i++) {
            div.innerHTML +=
            '<i style="background:' + color(depth[i] + 1) + '"></i> ' + depth[i] + (depth[i + 1] ? ' to ' + depth[i + 1] + '<br>' : '-plus');
        }
    console.log(div);
    return div;
    };
    legend.addTo(myMap)
  

    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
};
