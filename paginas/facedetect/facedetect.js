pagina = pagina || {}

console.log("facedetect.js");
pagina.facedetect = {};

var pag = "jspdf";
var dir = "paginas/" + pag + "/";

pagina.facedetect.fb = function(obj,fnc) {
	return $("<div id='fb' style='width: 470px; height: 300px;'></div>").append($("<img id='fbfoto' style='width: 470px; height: 300px;'/>"));
}

pagina.facedetect.load = function(obj,fnc) {
	  $.when(
	     $.getScript( dir+"js/photobooth_min.js" )
	    ,$.getScript( "js/ccv.js" )
	    ,$.getScript( "js/face.js" )
	    ,$.getScript( "js/jquery.facedetection.js" )  
	    ,$.Deferred(function( deferred ){$( deferred.resolve );})
	    ,console.log("when");
	  ).done(function(){
	  	console.log("done");
	    pagina.facedetect.ini();
	  });
}

pagina.facedetect.ini = function(obj,fnc) {
	if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
	$("#cuerpo").html(pagina.facedetect.fb());

	var coords;
	$('#fb').photobooth().on("image",function( event, dataUrl ){
		$("#fbfoto").attr("src", dataUrl);

		coords = $('#fbfoto').faceDetection({
			complete:function() {
				$('#msj').text('Listo!');
				console.log(coords);
			},
			error:function(img, code, message) {
				$('#msj').text('error: '+message);
			}
		});
	});
}




pagina.facedetect.load();