/**
 * Ejemplo de uso de html2canvas
 * http://html2canvas.hertzen.com/documentation.html
 *
 * @param {number} num - The number for squaring
 * @return {number}
 */

feedback = {}

feedback.capturar = function(){
	$.cachedScript( "js/lib/html2canvas.js" ).done(function( script, textStatus ) {
		console.log( "html2canvas: "+ textStatus );
		html2canvas(document.body, {
		  onrendered: function(canvas) {
		  	feedback.captura = canvas.toDataURL("image/png");
		  	feedback.popup(feedback.captura);
		  }
		});
	});
}

feedback.popup = function(captura) {
	var m = "\
		<div class='fbpuc'><img id='fbpu' width='100' BORDER='0' align='left'></div>\
			<div class='fbpuc' class='form-group'>\
				<label for='fbcomentario'>Tu comentario puede ayudarnos a mejorar éstas páginas</label>\
				<textarea class='form-control' rows='5' id='fbcomentario'></textarea>\
			</div>\
	";
	swal({
		html:true,
		title: "Danos tu opinión",
		text: m,
		type: "warning",
		showCancelButton: true,
		//confirmButtonColor: "#DD6B55",
		confirmButtonText: "Enviar",
		closeOnConfirm: false
	},
	function(){
	  swal("¡Enviado!", "Gracias por tu comentario.", "success");
	});
	$('#fbpu').attr("src", captura)
	$('.fbpuc').css('text-align','left');
}
