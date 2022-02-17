
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
    'low':{'speed':600,'color':'#006400'}, 
    'mediumLow':{'speed':300,'color':'#228B22'}, 
    'medium':{'speed':400,'color':'#EADF00'}, 
    'mediumBusy':{'speed':500,'color':'#DAD032'},
    'busy':{'speed':600,'color':'#FFA500'},
    'veryBusy':{'speed':700,'color':'#FF4500'}} ;

var path = {
    'colToStl':{'coordinate':[[39,-92.4],[38.7,-90.5]],'util':utilization.low},
    'stlToCol': {'coordinate':[[38.7,-90.5],[39,-92.4]],'util':utilization.low},
    'colToKC':{'coordinate':[[39,-92.4],[38.9, -94.5]],'util':utilization.medium},
    'KCToCol':{'coordinate':[[38.9, -94.5],[39,-92.4]],'util':utilization.medium},
    'stlToSp':{'coordinate':[[38.7, -90.5],[37, -93.4]],'util':utilization.mediumLow},
    'spToStl':{'coordinate':[[37, -93.4],[38.7, -90.5]],'util':utilization.mediumLow},
    'KCToSp':{'coordinate':[[38.9, -94.5],[37, -93.4]],'util':utilization.busy},
    'spToKC':{'coordinate':[[37, -93.4],[38.9, -94.5]],'util':utilization.busy},
    'colToSp':{'coordinate':[[39, -92.4],[37, -93.4]],'util':utilization.low},
    'spToCol':{'coordinate':[[37, -93.4],[39, -92.4]],'util':utilization.low}
}


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
L.marker([38.6, -90.5],{icon:morenetIcon}).bindTooltip('St.Louis Core',{
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
L.marker([37, -93.3],{icon:morenetIcon}).bindTooltip('Springfield Core',{
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
 var map = L.map('mapid2', {
    center: [38, -92],
    zoom: 6.5,
    maxZoom: 7.5,
    minZoom: 5.5,
    maxBounds:L.latLngBounds([44,-98],[34,-86]),
    layers:[grayscale,cities]
});


//Highlight Missouri with given coordinate
L.geoJson(moGeo).addTo(map);

for(var key in path){
    addPath(path[key].coordinate,path[key].util) ;
}


L.control.Legend({
    position:"bottomleft",
    title:"Bandwith Utilization",
    column:2,
    legends:[{
        label: "<= 20%",
        type: "circle",
        radius: 6,
        color: "#006400",
        fillColor: "#006400",
        weight: 2
    },
    {
        label: "<= 40%",
        type: "circle",
        radius: 6,
        color: "#228B22",
        fillColor: "#228B22",
        weight: 2
    },
    {
        label: "<= 60%",
        type: "circle",
        radius: 6,
        color: "#DAD032",
        fillColor: "#DAD032",
        weight: 2
    },
    {
        label: "<= 80%",
        type: "circle",
        radius: 6,
        color: "#FFF000",
        fillColor: "#FFF000",
        weight: 2
    },
    {
        label: "<= 90%",
        type: "circle",
        radius: 6,
        color: "#FFA500",
        fillColor: "#FFA500",
        weight: 2
    },
    {
        label: "> 90%",
        type: "circle",
        radius: 6,
        color: "#FF4500",
        fillColor: "#FF4500",
        weight: 2
    }]
}).addTo(map) ;

function addPath(coordinates, util){
    L.polyline(coordinates,{
        color:util.color,
        weight:4
    }).addTo(map);

    L.polylineDecorator(coordinates, {
        patterns: [
            {offset: '65%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 12, pathOptions: {color:util.color,fillOpacity: 1, weight: 1}})}
        ]
    }).addTo(map);

}











