/**
 * Ejemplo de uso de html2canvas
 * http://html2canvas.hertzen.com/documentation.html
 *
 * @param {number} num - The number for squaring
 * @return {number}
 */

pagina = pagina || {}

console.log("html2canvas.js");
pagina.h2c = {};

pagina.h2c.capturar = function(){
	$.cachedScript( "js/lib/html2canvas.js" ).done(function( script, textStatus ) {
		console.log( "html2canvas: "+ textStatus );
		$("#h2cbc").hide();
		html2canvas(document.body, {
		  onrendered: function(canvas) {
		  	//var info = "headers=Content-Disposition:attachment;filename=captura.png;";
		  	pagina.h2c.captura = canvas.toDataURL("image/png");
		    $("#h2cbd").show();
		    $("#h2cbc").show();
		  }
		});
	});
}

pagina.h2c.saveDataUrl = function(fileName, dataUrl) {
    var dataString = dataUrl.split( "," )[ 1 ];
    var buffer = new Buffer( dataString, 'base64');  //TODO error !!!
    var extension = dataUrl.match(/\/(.*)\;/)[ 1 ];
    var fs = require( "fs" );
    var fullFileName = fileName + "." + extension;
    fs.writeFileSync( fullFileName, buffer, "binary" );
}

pagina.h2c.toDataUrl = function(source) {
    var canvas = document.createElement( "canvas" );
    canvas.width = source.videoWidth || source.width;
    canvas.height = source.videoHeight || source.height;
    canvas.getContext( "2d" ).drawImage( source, 0, 0 );
    return canvas.toDataURL();
}

pagina.h2c.botonCapturar = function(id) {
	var id = id || "cuerpo"
	//<button class="btn btn-info disabled" type="button">Disabled Info Button</button>
	var boton = $("<button id='h2cbc' class='btn btn-default' type='button'>Capturar</button>");
	if($("#"+id).length==0) $('body').append("<div id='"+id+"'></div>");
	$("#"+id).append(boton);
	boton.on( "click", function() {
		pagina.h2c.capturar();
	});
}

pagina.h2c.botonDescargar = function(id) {
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

/*
function dlCanvas() {
    var dt = canvas.toDataURL('image/png');
    this.href = dt.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
};
dl.addEventListener('click', dlCanvas, false);
*/

pagina.h2c.ini = function() {
	pagina.h2c.botonCapturar('cuerpo');
	pagina.h2c.botonDescargar('cuerpo');
}

pagina.h2c.ini();
