console.log("academico.js");
var pagina = pagina || {}
pagina.academico = {}
var result = [];

var buscador = $(" \
		  <div id='pagina_academico_buscador'> \
	      <table> \
	        <tr> \
	          <td><input type='text' class='form-control' id='query' value='' size='50' /></td> \
	          <td colspan='2'><button type='submit' class='btn btn-default' id='buscar' >Buscar</button></td> \
	        </tr>\
        </table>\
        <br />\
      </div>\
  ")
var resultados = $("<div id='resultados'></div>");

pagina.academico.muestraResult = function() {
  var id =0;
  resultados.html('');
  for (item in result) {
    if(result[id])resultados.append( "<div class='record' id='rec"+id+"'> <a id='url"+id+"' href='"+result[id]['url']+"' title='"+result[id]['descripcion']+"'>"+result[id]['nombre']+"</a><br>"+result[id]['autor']+" | "+result[id]['fecha']+" <div id='repo"+id+"'></div> </div><br>" );
    ++id;
  }
  resultados.append("<br /><br />");
  resultados.append("<br /><br />");
  var anterior = (result['anterior'])? $("<a href='"+result['anterior']+"'>Anterior</a>"):$("<br />");
  var siguiente = (result['siguiente'])? $("<a href='"+result['siguiente']+"'>Siguiente</a>&nbsp;"):$("<br />");
  var paginador = $("<div class='paginador'></div>");
  paginador.html("<br /><br />").append(anterior).append("&nbsp;&nbsp;").append(siguiente).append("<br /><br />")
  buscador.append(paginador);
  resultados.append(paginador);
  $('a[href*="searchPage"]').on( "click", function(event) {
    event.preventDefault();
    var url = $(this).attr('href');
    var query = url.substring(url.indexOf('query') + 6)
    pagina.academico.traer(query);
  });
}

pagina.academico.cargarResult = function() {
  result = [];
  var id =0;
  $( ".recordContents" ).each(function( index ) {
    result[id] = {};
    result[id]['nombre'] = $(this).prev().prev().text();
    result[id]['autor'] = $(this).children( ".author" ).text();
    result[id]['fecha'] = $(this).children( ".date" ).text().replace("\n", "").trim()
    result[id]['url'] = $(this).children( ".action:contains('Ver Original')" ).attr('href');
    result[id]['regurl'] = $(this).children( ".action:contains('Ver Registro')" ).attr('href');
    pagina.academico.cargarRegistro(id, result[id]['regurl']);
    ++id;
  });
  result['siguiente'] = $("a:contains('>')" ).attr('href');
  result['anterior'] = $("a:contains('<')" ).attr('href');
  pagina.academico.muestraResult();
  if(pagina.enEspera) pagina.enEspera.off();
}

pagina.academico.cargarRegistro = function(id, url) {
  var registro = $("<div id='registro'><div>");
  registro.load(url, function(){
    result[id]['repo']        = $(this).find("a.current").prev("a").text();
    result[id]['descripcion'] = $(this).find("td:contains('Description')").next().text().trim();
    result[id]['nombre'] = $(this).find("td:contains('Title')").next().text().trim();
    pagina.academico.mostrarRegistro(id);
  });
}

pagina.academico.mostrarRegistro = function(id) {
  $("#url"+id).attr('title',result[id]['descripcion']);
  $("#url"+id).html(result[id]['nombre']);
  $("#repo"+id).html("Repositorio: " + result[id]['repo']);
}

pagina.academico.traer = function(query) {
  $('html').append("<div id='result'></div>");
  if(pagina.enEspera) pagina.enEspera.on();
  $( "#result" ).load( "http://josersosa.blogsite.org/cosechador/index.php/misearch/results?query=" + query + " #records", pagina.academico.cargarResult).hide();
}

pagina.academico.buscar = function(){

  $("#query").keypress(function( event ) {
    if ( event.which == 13 ) $("#buscar").click();
  });

  $("#buscar").on( "click", function(event) {
    event.preventDefault();
    var query = $("#query").val();
    pagina.academico.traer(query);
  });
}

pagina.academico.ini = function(){
	if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
	$("#cuerpo").html('');
	$("#cuerpo").append(buscador);
	$("#cuerpo").append(resultados);
	pagina.academico.buscar();
}

//function initJQuery() {if (typeof(jQuery) == 'undefined') {document.write("<scr" + "ipt type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js'></scr" + "ipt>");}}
//initJQuery();

$(function() {
  pagina.academico.ini();
});


/**/