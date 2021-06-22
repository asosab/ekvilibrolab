
console.log("uml.js");
pagina.uml = function(obj,fnc) {
	var pag = "uml";
	var dir = "paginas/" + pag + "/";
	console.log("vars");
	$(function() {
	  $.when(
	     $.getScript( dir+"js/raphael-min.js" )
	    ,$.getScript( dir+"js/underscore-min.js" )
	    ,$.getScript( dir+"js/sequence-diagram-min.js" )
	    ,console.log("funcs")
	  ).done(function(){
	  	console.log("done");
			var dia = $("<textarea class='form-control' id='diatext' cols='50' rows='10'></textarea><div id='diagram'></div>");
		  if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
		  $("#cuerpo").html(dia);
			$( "#diatext" ).load( dir+"modelos/solvencia.uml", function() {
			  $('#diatext').keyup();
			});
		  //$('#diagram').css({'position':'absolute','right':'0px','left': 'auto','top':'0','padding':'60px' });
		  $('#diatext').on( "keyup", function(event) {
		    //event.preventDefault();
		    $('#diagram').html('')
		    var diagram = Diagram.parse($('#diatext').val());
		  	diagram.drawSVG("diagram", {theme: 'simple'});
			});
	  });
	});
	console.log("ext");

}
pagina.uml();
