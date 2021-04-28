
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" ;

//function to build map
function mapDisplay (){
    // Create map object
    var myMap = L.map("mapid",{
        center: [0, 0],
        zoom:3,
        worldCopyJump: true
    });
    // Adding tile layer
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      });

    //L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        //attribution: "Map data &copy; <a href=\'https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        //tileSize: 512,
        //maxZoom: 18,
        //zoomOffset: -1,
        //id: "streets-v11",
        //accessToken: API_KEY
    //}).addTo(myMap);

    // Grab data with d3
    d3.json(url, function(data){
        L.geoJSON(data, {
            pointToLayer:function (feature, latlng){
                return L.circleMarker(latlng);
                //return L.circleMarker(latlng, markerStyle(feature));
            },
        // Binding a pop-up to each feature
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h1> Magnitude: " + feature.properties.mag+ "</h1> <hr> <h2>" + feature.properties.place + "</h2>");
        }
        }).addTo(myMap);
    mapLegend(myMap);       
        

    });    
//}
//function for creating legend
function mapLegend (myMap) {

    colors = ["#459E22", "#7FB20E", "#BEBE02", "#B19A0F", "#B54C0B", "#C00000"];
  
    var legend = L.control({position: 'bottomright'});
  
    legend.onAdd = function () {
  
      var div = L.DomUtil.create('div', 'info legend'),
                    categories = ['<1', '1 to <2', '2 to <3', '3 to <4', '4 to <5', '>5'],
                    labels =[];
      
      div.innerHTML += '<strong> Magnitude </strong> <br>'
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < categories.length; i++) {
          div.innerHTML +=
              '<i style="background:' + colors[i] + '"></i> ' +
              categories[i] + '<br>';
      };
      return div;
   };
  legend.addTo(myMap);
  };
  //function for styling markers
function markerStyle (feature) {
    return {
        fillColor: markerColor(feature.properties.mag),
        radius: 4*feature.properties.mag,
        weight: 2,
        opacity: 1,
        color: markerColor(feature.properties.mag),
        fillOpacity: 0.8   
    };
  };
  
  // Function determining the color of marker based on magnitude
  function markerColor(magnitude) {
    if (magnitude<1) {
      return "#459E22"}
    else if (magnitude<2) {
       return "#7FB20E"}
    else if (magnitude<3) {
       return "#BEBE02"}
    else if (magnitude<4) {
       return "#B19A0F"}
    else if (magnitude<5) {
       return "#B54C0B"}
    else if (magnitude>=5) {
       return "#C00000"}
    else {
       return "black"}
   };

}  
  mapDisplay();



