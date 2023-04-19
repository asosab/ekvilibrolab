var map;
var locations = [];

function initialiseMap() {
  var id = '12AuTzLbbkOj_BQrHi09jJEZaFnThPpn75NJkXaDVivk';
//var id = '1oByVdWnxXUsAJZ7mAXyNsSljsiL_Cu0aFFyIz8R2myk';
  var llave = 'AIzaSyCz2nyy2FyAGVGODM3rqOlDD_bVzwC4iVw';
  var gid = '661544739';
  var valores = 'tiendasActivas!A2:F';
  var url = 'https://sheets.googleapis.com/v4/spreadsheets/'+id+'/values/'+valores+'?key='+llave;
  $.getJSON(url, function(data) {
    	$(data.values).each(function() {
    		var location = {};
				location.nombre = this[0];
				location.lat = parseFloat(this[1]);
      	location.lon = parseFloat(this[2]);
       	location.dir = this[3];
        location.pro = this[4];
        location.ran = this[5];
        location.tie = 1;
	  		locations.push(location);
    	});

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
  var infowindow = new google.maps.InfoWindow({content: "Content String"});
  for (var i = 0; i < locations.length; i++) {
    var new_marker = createMarker(map, locations[i], infowindow);
    bounds.extend(new_marker.position);
  }
  map.fitBounds(bounds);
}

function iconoMapa(tipo,rank){ 
  var i = 1;
  var icon = (tipo ==1)?"tienda0":"person0"; 
  if (rank>500)   {i = 2;}
  if (rank>1000)  {i = 3;}
  if (rank>10000) {i = 4;}
  return "https://ekvilibrolab.com/imagen/icons/"+icon+i+".png";
}

function createMarker(map, location, infowindow) {
  var position = {
    lat: parseFloat(location.lat),
    lng: parseFloat(location.lon)
  };

  var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: location.nombre,
    icon: iconoMapa(location.tie,location.ran)
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div>'+
//    '<p><strong>' + 
    ((location.nombre   === undefined) ? "" : ('<p><strong>' + location.nombre + '</strong></p>')) +
    ((location.dir      === undefined) ? "" : ('<p><strong>Direccion: </strong>' + location.dir + '</p>')) +
    ((location.pro      === undefined) ? "" : ('<p><strong>Podrás encontrar los siguientes productos: </strong><br/>' + location.pro + '</p>')) +
    '</div>');
    infowindow.open(map, marker);
  });
  return marker;
}