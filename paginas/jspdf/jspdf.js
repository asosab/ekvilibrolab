
console.log("jspdf.js");

//var img1 = new Image();
//img1.src = 'https://lh3.googleusercontent.com/-V2os8XvtKUs/VWz3EYtNyoI/AAAAAAAARmE/bHVrzqI_nM0/s512-Ic42/IMG_20150515_143220.jpg';

var pag = "jspdf";
var dir = "paginas/" + pag + "/";
$.getScript( "js/lib/jspdf.1.0.272.js" );
var input = $("<textarea class='form-control' id='input' cols='50' rows='8'></textarea><br/><a id='linkpdf' href='#'>Descargar PDF</a>");
if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
$("#cuerpo").html(input);
$( "#input" ).load( dir+"modelos/modelo.txt", function() {
});
$('#linkpdf').on( "click", function(event) {
  event.preventDefault();
  eval($('#input').val());
});
