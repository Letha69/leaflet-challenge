
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//function to build map
function mapDisplay (){
    // Create map object
    var myMap = L.map("map-id",{
        center: [0, 0],
        zoom:3,
        //worldCopyJump: true
    });
    // Adding tile layer
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    // Grab data with d3
    d3.json(url, function(data){
        L.geoJSON(data, {
            pointToLayer:function (feature, latlng){
                return L.circleMarker(latlag, markerStyle(feature));
            },
        // Binding a pop-up to each feature
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h1> Magnitude: " + feature.properties.mag+ "</h1> <hr> <h2>" + feature.properties.place + "</h2>");
        }
        }).addTo(myMap);
    mapLegend(myMap);       
        

    });
    
}



