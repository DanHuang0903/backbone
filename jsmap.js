
/*
This is the DEMO of Leaflet library.
I only marked 4 core servers for demostrating purpose.

In this DEMO, I used leaflet core and the leaflet-ant-path plugin.

The basic map is provided by the mapbox.

I pre-set fixed the speeds for the path (data flow), in the real project, it's doable to use dynamic value to set the speed.

Dan Huang
*/


//Set the utilization level for the data flow animation 
var utilization = {
    'low':{'speed':300,'color':'#006400'}, 
    'mediumLow':{'speed':300,'color':'#228B22'}, 
    'medium':{'speed':400,'color':'#EADF00'}, 
    'mediumBusy':{'speed':500,'color':'#FFF00'},
    'busy':{'speed':600,'color':'#FFA500'},
    'veryBusy':{'speed':700,'color':'#FF4500'}} ;


//The token to access mapbox for the basic map
var mapboxAccessToken = 'pk.eyJ1IjoibWFnZ2llMDkwMyIsImEiOiJja3pvYTlqOWU1dHhtMm5wNHV0ZTc4YWF2In0.4Jde-6K_vNPVOZkVrKgaFQ';

//Create MOREnet icon
var morenetIcon = L.icon({
    iconUrl: 'img/logo.png',
    iconSize: [40,40]
})
//Define a layer group for the cities layer
//There are two layers in total on this map, one is the bacis map (streets), and the other is the markers (cities)
var cities = L.layerGroup();

//Mark the 4 core servers on the map by providing the coordinates and add themn to the cities layer
L.marker([38.7, -90.5],{icon:morenetIcon}).bindTooltip('St.Louis Core',{
    permanent:true,
    direction:'top',
    offset:L.point(0,-20),
    opacity:0.8
    }).addTo(cities),
L.marker([38.9, -94.5],{icon:morenetIcon}).bindTooltip('KansasCity Core',{
    permanent:true,
    direction:'top',
    offset:L.point(0,-20),
    opacity:0.8
}).addTo(cities),
L.marker([37, -93.4],{icon:morenetIcon}).bindTooltip('Springfield Core',{
    permanent:true,
    direction:'bottom',
    offset:L.point(0,15),
    opacity:0.8
}).addTo(cities),
L.marker([39, -92.4],{icon:morenetIcon}).bindTooltip('Columbia Core',{
    permanent:true,
    direction:'top',
    offset:L.point(0,-20),
    opacity:0.8
}).addTo(cities);


//I defined two types of basic map: 'mapbox/light-v9'(grayscale) and 'mapbox/streets-v11'(streets)
//In this DEMO I used street as the basic map
var grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    tileSize: 512,
    zoomOffset: -1
});

var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/streets-v11',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    tileSize: 512,
    zoomOffset: -1
});


//Draw the map use the streets layer and the cities layer
 var map = L.map('mapid', {
    center: [38, -92],
    zoom: 6.5,
    maxZoom: 7.5,
    minZoom: 5.5,
    maxBounds:L.latLngBounds([44,-98],[34,-86]),
    layers:[streets,cities]
});


//Highlight Missouri with given coordinate
L.geoJson(moGeo).addTo(map);

//Add dataflow paths to the map
addPath([[38.75,-90.5],[39.05,-92.4]],utilization.low);
addPath([[39,-92.4],[38.7,-90.5]], utilization.low);
addPath([[39,-92.4],[38.9, -94.5]], utilization.mediumLow);
addPath([[38.95, -94.5],[39.05,-92.4]], utilization.mediumLow);
addPath([[38.7, -90.5],[37, -93.4]], utilization.busy);
addPath([[37.05, -93.42],[38.75, -90.52]], utilization.busy);
addPath([[38.9, -94.5],[37, -93.4]], utilization.low);
addPath([[37.06, -93.37],[38.96, -94.47]], utilization.low);
addPath([[39, -92.4],[37, -93.4]], utilization.mediumLow);
addPath([[37, -93.44],[39, -92.44]], utilization.mediumLow);


//This function is to initialize the leaflet-ant-path with given coordinate and speed
function addPath(coordinates, util){
    path = L.polyline.antPath(coordinates,{
    "delay":util.speed,
    "dashArray":[5,20],
    "opacity":0.9,
    "weight": 4,
    "color": util.color,
    "pulseColor": "#FFFFFF",
    "paused": false,
    "reverse": false,
    "hardwareAccelerated": true
}).addTo(map) ;
}











