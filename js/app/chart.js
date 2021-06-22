var chart = {}
chart.lista = {}

chart.d = [{value:55,color:"#F7464A",highlight: "#FF5A5E",label: "v1"},{value:80,color:"#46BFBD",highlight: "#5AD3D1",label: "v2"}];
chart.o = {
    showScale: false,
    scaleShowLabelBackdrop : true,
    scaleBackdropColor : "rgba(255,255,255,0.75)",
    scaleBeginAtZero : true,
    scaleBackdropPaddingY : 2,
    scaleBackdropPaddingX : 2,
    scaleShowLine : true,
    segmentShowStroke : true,
    segmentStrokeColor : "#fff",
    segmentStrokeWidth : 2,
    animationSteps : 20,
    animationEasing : "easeInCubic",
    animateRotate : false,  //   true,
    animateScale : false,  //  true,
    responsive: false,
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
}

// {"p":"padre","d":"data","t":"tipo","i":"id","o":"opciones","w":"width","h":"height"}
chart.new = function(obj,fnc){
  var obj = obj || {};
  var p = obj.p || "#sidebar0";
  var d = obj.d || pagina.chart.d;
  var o = obj.o || pagina.chart.o;
  var t = obj.t || "PolarArea";
  var w = obj.w || 200;
  var h = obj.h || 200;
  var i = obj.i || 'chart'+Object.keys(pagina.chart.lista).length;
  var s = $("<canvas id='"+i+"' width='"+w+"' height='"+h+"'></canvas>");
  $(p).append(s);
  var ctx = s.get(0).getContext("2d");
  pagina.chart.lista[i] = new Chart(ctx)[t](d, o);
  return i;
}
