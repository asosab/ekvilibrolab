
console.log("chart.js");

pagina = pagina || {}


pagina.chart = {};


pagina.chart.options = {
    scaleShowGridLines : true,
    scaleGridLineColor : "rgba(0,0,0,.05)",
    scaleGridLineWidth : 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve : true,
    bezierCurveTension : 0.4,
    pointDot : true,
    pointDotRadius : 4,
    pointDotStrokeWidth : 1,
    pointHitDetectionRadius : 20,
    datasetStroke : true,
    datasetStrokeWidth : 2,
    datasetFill : true,
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    //responsive: true
	//legendTemplate : "<ul><% for (var i=0; i<datasets.length; i++) { %><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><% if (datasets[i].label) { %><%= datasets[i].label %><% } %></li><% } %></ul>"
};


pagina.chart.data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    datasets: [
        {
            label: "2014",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0,0,0,0,0,0,0,2613, 1233, 2742, 1911, 1911]
        },
        {
            label: "2015",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [1385, 1739, 1333, 3394, 4130, 2474, 18581, 11606,4069,18344,0,0]
        }
    ]
};


pagina.chart.ini = function() {
    //cachedScript
	$.getScript( "js/lib/Chart.min.js" ).done(function( script, textStatus ) {

		console.log( "Chart.min.js: "+ textStatus );
		var s = $("<canvas id='barras' width='1000' height='400'></canvas>");

		$("#cuerpo").html("");
  		$("#cuerpo").append(s);

		pagina.chart.ctx = s.get(0).getContext("2d");

		pagina.chart.lineChart = new Chart(pagina.chart.ctx).Line(pagina.chart.data, pagina.chart.options);
  		//var legend = pagina.chart.lineChart.generateLegend();
  		//$('#barras').append(legend);

	});
}

pagina.chart.descargar = function() {
	$("#cuerpo").append("<a href='#' id='deschart'>Descargar</a>");
	$( "#deschart" ).on( "click", function() {
	//$("#deschart").attr("href", pagina.chart.ctx.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));    
	});
}

pagina.chart.ini();
