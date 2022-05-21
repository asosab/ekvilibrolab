var map;
var locations = [];

function initialiseMap() {

  // Load data from an example Google spreadsheet that contains latitude and longitude columns using Google Sheets API v4 that returns JSON.
  // Replace the ID of your Google spreadsheet and you API key in the URL:
  // https://sheets.googleapis.com/v4/spreadsheets/ID_OF_YOUR_GOOGLE_SPREADSHEET/values/Sheet1!A2:Q?key=YOUR_API_KEY
  // Also make sure your API key is authorised to access Google Sheets API - you can enable that through your Google Developer console.
  // Finally, in the URL, fix the sheet name and the range that you are accessing from your spreadsheet. 'Sheet1' is the default name for the first sheet.
  //$.getJSON("https://www.googleapis.com/auth/spreadsheets.readonly/1oByVdWnxXUsAJZ7mAXyNsSljsiL_Cu0aFFyIz8R2myk/values/Ruta01!A2:G?key=AIzaSyCz2nyy2FyAGVGODM3rqOlDD_bVzwC4iVw", function(data) {
  //$.getJSON("https://sheets.googleapis.com/v4/spreadsheets.readonly/1oByVdWnxXUsAJZ7mAXyNsSljsiL_Cu0aFFyIz8R2myk/values/Ruta01!A2:G?key=AIzaSyCz2nyy2FyAGVGODM3rqOlDD_bVzwC4iVw", function(data) {
  $.getJSON("https://docs.google.com/spreadsheets/d/1oByVdWnxXUsAJZ7mAXyNsSljsiL_Cu0aFFyIz8R2myk/gviz/tq?tqx=out:json&tq&gid=AIzaSyCz2nyy2FyAGVGODM3rqOlDD_bVzwC4iVw", function(data) {
    	// data.values contains the array of rows from the spreadsheet. Each row is also an array of cell values.
    	// Modify the code below to suit the structure of your spreadsheet.
    	$(data.values).each(function() {
    		var location = {};
				location.nombre = this[0];
				location.lat = parseFloat(this[2]);
      	location.lon = parseFloat(this[3]);
        location.cel = this[1];
       	location.dir = this[4];
        location.wap = this[5];
        location.map = this[6];
	  		locations.push(location);
    	});

      // Center on (0, 0). Map center and zoom will reconfigure later (fitbounds method)
      var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(0, 0)
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      setLocations(map, locations);
  });
}


function setLocations(map, locations) {
  var bounds = new google.maps.LatLngBounds();
  // Create nice, customised pop-up boxes, to appear when the marker is clicked on
  var infowindow = new google.maps.InfoWindow({
    content: "Content String"
  });
  for (var i = 0; i < locations.length; i++) {
    var new_marker = createMarker(map, locations[i], infowindow);
    bounds.extend(new_marker.position);
  }
  map.fitBounds(bounds);
}

function createMarker(map, location, infowindow) {

  // Modify the code below to suit the structure of your spreadsheet (stored in variable 'location')
  var position = {
    lat: parseFloat(location.lat),
    lng: parseFloat(location.lon)
  };
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: location.nombre,
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div>'+
    '<p><strong>' + ((location.wap === undefined) ? location.nombre : ('<a href="' + location.wap +'">' + location.nombre + '</a>')) + '</strong></p>' +
    ((location.cel === undefined) ? "" : ('<p><strong>Cel: </strong>' + location.cel + '</p>')) +
    ((location.dir === undefined) ? "" : ('<p><strong>Direccion: </strong>' + location.dir + '</p>')) +
    '</div>');
    infowindow.open(map, marker);
  });
  return marker;
}