// set up the map view

var map = L.map('map').setView([40.79,-73.93], 12);

// set a tile layer to be CartoDB tiles 
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

// add these tiles to our map
map.addLayer(CartoDBTiles);

// add in OSM Mapnik tiles
var OSMMapnikTiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: 'Map Data and Tiles &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
});
// do not add to the map just yet, but add varible to the layer switcher control 

// add in MapQuest Open Aerial layer
var MapQuestAerialTiles = L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png',{
  attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
});









// add Strava weekend data to the map

var rideRollupTotalWeekendStyle = function (feature){
    var value = feature.properties.nyc_edges_ride_rollup_total_weekend_CMTCNT;
    //var fillColor = null;
    if(value == 'NULL'){
        lineWeight = 0;
            lineColor = "#fff";
        lineOpacity = 0;
    }
        if(value >= 0 && value <=1){
          lineWeight = 0;
            lineColor = "#fff";
        lineOpacity = 0;
    }
    if(value >= 1 && value <=5){
        lineWeight = 2;
        lineColor = "#ffffd4";
        lineOpacity = 0.80;
    }
    if(value >= 6 && value <=30){
        lineWeight = 4;
        lineColor = "#fee391";
        lineOpacity = 0.80;
    }
        if(value >= 31 && value <=80){
        lineWeight = 8;
        lineColor = "#fec44f";
        lineOpacity = 0.80;
    }
        if(value >= 81 && value <=130){
        lineWeight = 12;
        lineColor = "#fe9929";
        lineOpacity = 0.80;
    }
        if(value >= 131 && value <=200){
        lineWeight = 16;
        lineColor = "#ec7014";
        lineOpacity = 0.80;
    }
        if(value >= 201 && value <=300){
        lineWeight = 20;
        lineColor = "#cc4c02";
        lineOpacity = 0.80;
    }
            if(value > 301){
        lineWeight = 24;
        lineColor = "#8c2d04";
        lineOpacity = 0.80;
    }
    
    
    var style = {
        color: lineColor,
		weight: lineWeight,
        opacity: lineOpacity
    };

    return style;
}

var rideRollupTotalWeekendGeoJSON = L.geoJson(rideRollupTotalWeekend, {
    style: rideRollupTotalWeekendStyle,
})//.addTo(map);







// add Strave weekday data to the map

var rideRollupTotalWeekdayStyle = function (feature){
    var value = feature.properties.nyc_edges_ride_rollup_month_2014_7_weekday_CMTCNT;
    if(value == 'NULL'){
            lineWeight = 0;
            lineColor = "#f0f9e8";
        lineOpacity = 0.80;
    }
        if(value >= 0 && value <=1){
            lineWeight = 0;
            lineColor = "#f0f9e8";
        lineOpacity = 0.80;
    }
    if(value >= 1 && value <=5){
        lineWeight = 2;
        lineColor = "#f0f9e8";
        lineOpacity = 0.80;
    }
    if(value >= 6 && value <=30){
        lineWeight = 4;
        lineColor = "#ccebc5";
        lineOpacity = 0.80;
    }
        if(value >= 31 && value <=80){
        lineWeight = 8;
        lineColor = "#a8ddb5";
        lineOpacity = 0.80;
    }
        if(value >= 81 && value <=130){
        lineWeight = 12;
        lineColor = "#7bccc4";
        lineOpacity = 0.80;
    }
        if(value >= 131 && value <=200){
        lineWeight = 16;
        lineColor = "#4eb3d3";
        lineOpacity = 0.80;
    }
        if(value >= 201 && value <=300){
        lineWeight = 20;
        lineColor = "#2b8cbe";
        lineOpacity = 0.80;
    }
            if(value > 301){
        lineWeight = 24;
        lineColor = "#08589e";
        lineOpacity = 0.80;
    }
    
    
  
    var style = {
        color: lineColor,
		weight: lineWeight,
        opacity: lineOpacity
    };

    return style;
}

var rideRollupTotalWeekdayGeoJSON = L.geoJson(rideRollupTotalWeekday, {
    style: rideRollupTotalWeekdayStyle,
})//.addTo(map);







// cycling fatalities by month and year
// if statement to filter for cycling deaths only

var cyclingFatalityMonthlyPointToLayer = function (feature, latlng){

var value = feature.properties.BikeFatali;
var Radius = 60;
 		if (value == '0') { 
 		Radius = 0;
 		fillColor: '#fff',
 		fillOpacity = 0
 		}


	var cyclingFatalityMonthlyMarker = L.circle(latlng, Radius, {	
        stroke: false,
		fillColor: '#d0320a',
		fillOpacity: 1,
    });
   	
	return cyclingFatalityMonthlyMarker;
}


var cyclingFatalityMonthlyClick = function (feature, layer) {
	// add date and number killed properties
	layer.bindPopup("<strong>Month/Year:</strong> " + feature.properties.MN + "/" + feature.properties.YR + "<br /><strong>Number of cyclists killed:</strong> " + feature.properties.BikeFatali);
}


var cyclingFatalityMonthlyGeoJSON = L.geoJson(cyclingFatalityMonthly, {
	pointToLayer: cyclingFatalityMonthlyPointToLayer,
	onEachFeature: cyclingFatalityMonthlyClick
})//.addTo(map);





// cycling injuries by month and year
// if statement to filter for cycling injuries only

var cyclingInjuryMonthlyPointToLayer = function (feature, latlng){

var value = feature.properties.BikeInjuri;
var Radius = 50;
 		if (value == '0') { 
 		Radius = 0;
 		fillColor: '#fff',
 		fillOpacity = 0
 		}

	var cyclingInjuryMonthlyMarker = L.circle(latlng, Radius, {	
        stroke: false,
		fillColor: '#9920b0',
		fillOpacity: 1,
    });
   	
	return cyclingInjuryMonthlyMarker;
}


var cyclingInjuryMonthlyClick = function (feature, layer) {
	// add date and number injured properties
	layer.bindPopup("<strong>Month/Year:</strong> " + feature.properties.MN + "/" + feature.properties.YR + "<br /><strong>Number of cyclists injured:</strong> " + feature.properties.BikeInjuri);
}


var cyclingInjuryMonthlyGeoJSON = L.geoJson(cyclingInjuryMonthly, {
	pointToLayer: cyclingInjuryMonthlyPointToLayer,
	onEachFeature: cyclingInjuryMonthlyClick
})//.addTo(map);






// add cycle routes to the basemap

var bikeRouteStyle = function (feature){
    var value = feature.properties.AllClasses;
    //var fillColor = null;
    if(value == 'I'){
        lineColor = "#40760e";
        lineWeight = 2;
    }
    if(value == 'II'){
        lineColor = "#ea380c";
                lineWeight = 2;

    }
    if(value == 'III'){
        lineColor = "#df8a07";
                lineWeight = 2;

    }

    var style = {
        color: lineColor,
		weight: lineWeight,
        opacity: 0.80
    };

    return style;
}


var bikeRouteClick = function (feature, layer) {
	// add feature properties to a pop up
	layer.bindPopup("<strong>Route runs from: </strong> " + feature.properties.FROMSTREET + " to " + feature.properties.TOSTREET + "<br /><strong>Lanes: </strong>" + feature.properties.LaneCount );
}

var nycBikeRoutesGeoJSON = L.geoJson(nycBikeRoute, {
    style: bikeRouteStyle,
    onEachFeature: bikeRouteClick
}).addTo(map);








// add in layer controls
var baseMaps = {
    "CartoDB": CartoDBTiles,
    "OSM Mapnik": OSMMapnikTiles,
    "Mapquest Aerial": MapQuestAerialTiles
};

var overlayMaps = {
    "Cycling Fatalities": cyclingFatalityMonthlyGeoJSON,
    "Cycling Injuries": cyclingInjuryMonthlyGeoJSON,
    "Strava data for weekdays": rideRollupTotalWeekdayGeoJSON,
    "Strava data for weekends": rideRollupTotalWeekendGeoJSON
};


// add controls
L.control.layers(baseMaps, overlayMaps).addTo(map);



