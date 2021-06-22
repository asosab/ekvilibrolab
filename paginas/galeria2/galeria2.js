console.log("galeria2.js");

pagina = pagina || {}
pagina.galeria2 = {};

pagina.galeria2.ini = function(obj,fnc) {
	/*
	var pag = "galeria2";
	var dir = "paginas/" + pag + "/";
	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', dir+'css/gallery.css') );
	console.log("vars");
	$(function() {
	  $.when(
	     $.getScript( dir+"js/custom.js" )
	    ,$.getScript( dir+"js/FlickrAPI.js" )
	    ,$.getScript( dir+"js/Flickr.Gallery.min.js" )
	    ,console.log("funcs")
	  ).done(function(){
	  	console.log("done");
		if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
		var galeria = $("<div class='niceGallery' id='gallery'></div>");
		$("#cuerpo").html(galeria);
	  });
	});
	console.log("ext");
	*/

		if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
		var galeria = $("<div class='niceGallery' id='gallery'></div>");
		$("#cuerpo").html(galeria);
	    $.getScript( dir+"js/custom.js" )
	    $.getScript( dir+"js/FlickrAPI.js" )
	    $.getScript( dir+"js/Flickr.Gallery.min.js" )



}

pagina.galeria2.ini();
