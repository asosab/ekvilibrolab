console.log("inicio.js");
pagina = pagina || {}
pagina.inicio = function(obj,fnc) {
	var pag = "inicio";
	var dir = "paginas/" + pag + "/";
	if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
	$("#cuerpo").load(dir+"inicio.html");
}
pagina.inicio();