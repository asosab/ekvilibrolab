console.log("KJ3.js");

function generateHtmlTable(data) {
    var html = '<table  class="table table-condensed table-hover table-striped">';

      if(typeof(data[0]) === 'undefined') {
        return null;
      } else {
		$.each(data, function( index, row ) {
		  //bind header
		  if(index == 0) {
			html += '<thead>';
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<th>';
				html += colData;
				html += '</th>';
			});
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
		  } else {
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<td>';
				html += colData;
				html += '</td>';
			});
			html += '</tr>';
		  }
		});
		html += '</tbody>';
		html += '</table>';
		alert(html);
		$('#producto').append(html);
	  }
	}	



pagina = pagina || {}
pagina.KJ3 = function(obj,fnc) {
	var pag = "KJ3";
	var dir = "paginas/" + pag + "/";
	var producto = $("<DIV id='producto'></DIV>");
	var data;
	$.getScript( "js/lib/jquery.csv-0.71.min.js" );
	if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
	$("#cuerpo").html(producto);

	$.ajax({
	  type: "GET",  
	  url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmjlZGRLnjrDcLnpGAlJniJntV5mtYDVU9_XaDNwEfvWtNYis88MXAQa8FPVC3Gu26gd339saCBCo0/pub?gid=0&single=true&output=csv",
	  dataType: "text",       
	  success: function(response){
		data = $.csv.toArrays(response);
		generateHtmlTable(data);
	  }   
	});

}
pagina.KJ3();






