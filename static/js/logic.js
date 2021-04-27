var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// grab data with d3.
d3.json(earthquakeUrl,function(data){
    createFeatures(data.features);
});

function createFeatures(earthquakeData){
    // Binding a pop-up describing the place and time of earthquake

    function onEachFeature(feature, layer) {
       layer.bindPopup( "<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
            "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>");
      }

    var earthquakes = L.geoJSON(earthquakeData,{
        onEachFeature: onEachFeature,
        pointToLayer: function (feature,latlng){
            var color;
            var r =255;
            var g= Math.floor(255-80*feature.properties.mag);
            var b= Math.floor(255-80*feature.properties.mag);
            color = "rgb("+r+" ,"+g+","+ b+")"       
    
    var geojsonMarkerOptions = {
        radius: 4*feature.properties.mag,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
        };    

        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
    });
    createMap(earthquakes);
}
//

function createMap(earthquakes){

    // Create tile layers

    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      }); 
    // create a baseMaps object to hold the streetmap layer

    var baseMaps = {
        "Street Map" : streetmap
    };

    // Create an overlayMaps object to hold the overlay layer
    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    // Creaate the map objects with options
    var myMap = L.map("mapid", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });
    function getColor(d) {
        return d <1 ? '#800026' :
               d <2  ? '#BD0026' :
               d <3 ? '#E31A1C' :
               d <4  ? '#FC4E2A' :
               d <5   ? '#FD8D3C' :
               d <6   ? '#FEB24C' :
               d <7   ? '#FED976' :
                          '#FFEDA0';
    }

    // Custom Legend Control
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5, 6, 7],
        labels = [];

        div.innerHTML+='Magnitude<br><hr>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

  // Adding legend to the map
legend.addTo(myMap);

}

