console.log("personas.js");
pagina = pagina || {}
pagina.servicios = {}
pagina.servicios.render = {}
pagina.servicios.intt = {}
pagina.servicios.ivss = {}
pagina.servicios.inces = {}

 
//pagina.servicios.ws({'func':'con_multa','serv':'intt','nac':'v','id':'12797985','fnac':'26/11/1974'}, function(json){data = json})
// https://sinsera.inces.gob.ve/intt/con_lic/v/17475327/22/10/1984/
//{'nac':'v','id':'17475327','fnac':'22/10/1984'}
// https://sinsera.inces.gob.ve/ivss/cuenta/v/5661072/22/10/1962/
// http://ws.inces.gob.ve/s/rif/V127979851/
// {"naport":"1030385456","rif":"V127979851","ncert":"6443508","razsoc":"JORGE DAVID GONZALEZ BRICE\u00d1O","fpub":"2015-07-09","fexp":"2015-07-08","fven":"2015-10-07","estatus":"1"}
// 26/11/1974 /  12.797.985
// http://ws.inces.gob.ve/s/rif/V127979851/jsonCallback/
//pagina.servicios.todos.ws({'nac':'v','id':'12797985','fnac':'26/11/1974'})


function serviciosWS(obj,fnc){
	var obj 	= obj 		|| {};
	var nac 	= obj.nac
	var id 		= obj.id
	var fnac 	= obj.fnac
	var func 	= obj.func || "con_lic";
	var serv 	= obj.serv || "intt";
	var url 	= "";
	switch(serv) {
	    case "intt": 
	    case "ivss": 
	    	url = "https://sinsera.inces.gob.ve/" + serv + "/" + func + "/" + nac + "/" + id + "/" + fnac + "/";
	        break;
	    case "s":
	    case "a":
	        url = "http://ws.inces.gob.ve/" + serv + "/" + func + "/" + nac + id + "/jsonCallback/";
	        break;
	} 
	var jqxhr = $.ajax({
	   type: 'GET',
	    url: url,
	    async: false,
	    jsonpCallback: 'jsonCallback',
	    contentType: "application/json",
	    dataType: 'jsonp',
	    cache: true,
	    beforeSend: function() {pagina.enEspera.on();},
	    success: function(json) {if(fnc) fnc(json);},
	    error: function(e) { console.log("error intt " + func + ": " + e.message); if(fnc) fnc(json);},
	    complete: function(json) {pagina.enEspera.off();}
	});
	return jqxhr;
}


//pagina.servicios.ivss.dataCP
//pagina.servicios.intt.dataLic
//pagina.servicios.intt.dataMulta
//pagina.servicios.inces.dataS
//pagina.servicios.inces.dataA
pagina.servicios.todos = function(obj,fnc) {
	obj.serv 	= "intt";
	obj.func 	= "con_lic";
	serviciosWS(obj, function(data){
		pagina.servicios.intt.dataLic = data;
		obj.func 	= "con_multa";
		serviciosWS(obj, function(data){
			pagina.servicios.intt.dataMulta = data;
			obj.serv 	= "ivss";
			obj.func 	= "cuenta";
			serviciosWS(obj, function(data){
				pagina.servicios.ivss.dataCP = data;
				obj.serv 	= "s";
				obj.func 	= "rif";
				serviciosWS(obj, function(data){
					pagina.servicios.inces.dataS = data;
					obj.serv 	= "a";
					serviciosWS(obj, function(data){
						pagina.servicios.inces.dataA = data;
					});
				});
			});
		});
	});
}



pagina.personas = function(obj,fnc) {
	var pag = "personas";
	var dir = "paginas/" + pag + "/";
	if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
	//$("#cuerpo").load(dir+"personas.html");

	//TODO formulario captura cedula y fecha de nacimiento

	//TODO mostrar resultados de la búsqueda en los webservices

	//TODO descargar pdf de resultados
}
/**/

$("#cuerpo").click();

//pagina.enEspera.off();
//pagina.servicios.todos({'nac':'v','id':'12797985','fnac':'26/11/1974'}, function(json){data = json})
//pagina.servicios.ivss.dataCP
//pagina.servicios.intt.dataLic
//pagina.servicios.intt.dataMulta
//pagina.servicios.inces.dataS
//pagina.servicios.inces.dataA