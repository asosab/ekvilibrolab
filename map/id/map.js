var map;
var locations = [];

async function initialiseMap2() {
  var urlParams = new URLSearchParams(window.location.search);
  let id = desencriptar((urlParams.get('id'))); //urlParams.get('id');
  let key = desencriptar((urlParams.get('key'))); //urlParams.get('key');

//  var gid = '661544739';
  var valores = 'Sheet1!A2:F';
  var url = 'https://sheets.googleapis.com/v4/spreadsheets/'+id+'/values/'+valores+'?key='+key;
  $.getJSON(url, function(data) {
    	$(data.values).each(function() {
    		var location = {};
				location.nombre = this[0];
				location.lat = parseFloat(this[1]);
      	location.lon = parseFloat(this[2]);
       	location.dir = this[3];
        location.URL = this[4];
        location.des = this[5];
	  		locations.push(location);
    	});

      var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(0, 0)
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      setLocations(map, locations);
  });
}

async function initialiseMap() {
  try {
    var urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    let key = urlParams.get('key');

    if (!id || !key) {
      throw new Error("ID o clave no proporcionados en la URL");
    }

    id = await desencriptar(id);
    key = await desencriptar(key);

    var valores = 'Sheet1!A2:F';
    var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/' + valores + '?key=' + key;

    $.getJSON(url, function (data) {
      $(data.values).each(function () {
        var location = {};
        location.nombre = this[0];
        location.lat = parseFloat(this[1]);
        location.lon = parseFloat(this[2]);
        location.dir = this[3];
        location.URL = this[4];
        location.des = this[5];
        locations.push(location);
      });

      var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(0, 0)
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      setLocations(map, locations);
    });
  } catch (error) {
    console.error("Error al inicializar el mapa:", error);
  }
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
//    icon: iconoMapa(location.tie,location.ran)
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div>'+
//    '<p><strong>' + 
    ((location.nombre   === undefined) ? "" : ('<p><strong>' + location.nombre + '</strong></p>')) +
    ((location.dir      === undefined) ? "" : ('<p><strong>Direccion: </strong>' + location.dir + '</p>')) +
    ((location.url      === undefined) ? "" : ('<p><a href="'+location.url+'">Web</a><br/></p>')) +
    ((location.des      === undefined) ? "" : ('<p>'+location.des+'<br/></p>')) +
    '</div>');
    infowindow.open(map, marker);
  });
  return marker;
}

function desencriptar(fraseEncriptada) {
  const CARACTERES_ALFANUMERICOS = 36;
  const CARACTERES_NUMERICOS_INICIALES = 48;
  const CARACTERES_MINUSCULAS_INICIALES = 97; // Cambiado a 97

  const CAMBIO_CLAVE_CADA_HORAS = 2;

  const horaActual = new Date().getHours();
  const clave = Math.floor(horaActual / CAMBIO_CLAVE_CADA_HORAS);
console.log("clave:",clave);
  const fraseDesencriptada = fraseEncriptada.split('').map(caracter => {
    const codigoAscii = caracter.charCodeAt(0);
    let inicioCaracteres = CARACTERES_NUMERICOS_INICIALES;
    
    if (codigoAscii >= CARACTERES_MINUSCULAS_INICIALES) {
      inicioCaracteres = CARACTERES_MINUSCULAS_INICIALES;
    }

    const codigoDesencriptado = (codigoAscii - inicioCaracteres - clave + CARACTERES_ALFANUMERICOS) % CARACTERES_ALFANUMERICOS;
    return String.fromCharCode(codigoDesencriptado + (codigoDesencriptado < 10 ? CARACTERES_NUMERICOS_INICIALES : CARACTERES_MINUSCULAS_INICIALES));
  }).join('');

  return fraseDesencriptada;
}
