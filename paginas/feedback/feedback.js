/**
 * Ejemplo de uso de html2canvas
 * http://html2canvas.hertzen.com/documentation.html
 *
 * @param {number} num - The number for squaring
 * @return {number}
 */

feedback.capturar();

/*

pagina = pagina || {}

console.log("feedback.js");
pagina.feedback = {};

pagina.feedback.botonCapturar = function(id) {
	var id = id || "cuerpo"
	//<button class="btn btn-info disabled" type="button">Disabled Info Button</button>
	var boton = $("<button id='h2cbc' class='btn btn-default' type='button'>Capturar</button>");
	if($("#"+id).length==0) $('body').append("<div id='"+id+"'></div>");
	$("#"+id).append(boton);
	boton.on( "click", function() {
		pagina.h2c.capturar();
	});
}

pagina.feedback.botonDescargar = function(id) {
	var id = id || "cuerpo"
	//<button class="btn btn-info disabled" type="button">Disabled Info Button</button>
	var boton = $("<a id='h2cbd' download='captura.png' class='btn btn-default' type='button'>Descargar</a>");
	if($("#"+id).length==0) $('body').append("<div id='"+id+"'></div>");
	$("#"+id).append(boton);
	boton.hide();
	boton.on( "click", function() {
    var dt = pagina.h2c.captura;
    this.href = dt.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
	});
}

pagina.feedback.ini = function() {
	feedback.capturar();
}

pagina.feedback.ini();
*/