var map;
var locations = [];

function initialiseMap() {
  var id = '1oByVdWnxXUsAJZ7mAXyNsSljsiL_Cu0aFFyIz8R2myk';
//var id = '1oByVdWnxXUsAJZ7mAXyNsSljsiL_Cu0aFFyIz8R2myk';
  var llave = 'AIzaSyDGG3G-RJoX-lJCMk9rSysH9x3SPjYD0Sg';
  var gid = '483823972';
  var valores = 'Ruta01!A2:G';
  var url = 'https://sheets.googleapis.com/v4/spreadsheets/'+id+'/values/'+valores+'?key='+llave;
  //var url = 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:json&tq&gid='+gid;
  //var url = 'https://sheets.googleapis.com/v4/spreadsheets/'+id+'/values/'+valores+'?key='+llave;

  // Load data from an example Google spreadsheet that contains latitude and longitude columns using Google Sheets API v4 that returns JSON.
  // Replace the ID of your Google spreadsheet and you API key in the URL:
  // https://sheets.googleapis.com/v4/spreadsheets/ID_OF_YOUR_GOOGLE_SPREADSHEET/values/Sheet1!A2:Q?key=YOUR_API_KEY
  // Also make sure your API key is authorised to access Google Sheets API - you can enable that through your Google Developer console.
  // Finally, in the URL, fix the sheet name and the range that you are accessing from your spreadsheet. 'Sheet1' is the default name for the first sheet.
  $.getJSON(url, function(data) {
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
    '<p><strong>' + 
    ((location.nombre   === undefined) ? "" : ('<p><strong>' + location.nombre + '</strong></p>')) +
    ((location.cel      === undefined) ? "" : ('<p><strong>Cel: </strong><a href="tel:' + location.cel + '">'+location.cel+'</a></p>')) +
    ((location.dir      === undefined) ? "" : ('<p><strong>Direccion: </strong>' + location.dir + '</p>')) +
    ((location.wap      === undefined) ? "" : ('<a href="' + location.wap +'">WhatsApp</a>')) + '</strong></p>' +
    ((location.map      === undefined) ? "" : ('<a href="' + location.map +'">GMaps</a>')) + '</strong></p>' +
    '</div>');
    infowindow.open(map, marker);
  });
  return marker;
}