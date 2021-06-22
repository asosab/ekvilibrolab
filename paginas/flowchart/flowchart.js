pagina = pagina || {}

console.log("flowchart.js");
pagina.flowchart = {};
pagina.flowchart.config ={
	                          'x': 0,
	                          'y': 0,
	                          'line-width': 3,
	                          'line-length': 50,
	                          'text-margin': 10,
	                          'font-size': 14,
	                          'font-color': 'black',
	                          'line-color': 'black',
	                          'element-color': 'black',
	                          'fill': 'white',
	                          'yes-text': 'yes',
	                          'no-text': 'no',
	                          'arrow-end': 'block',
	                          'scale': 1,
	                          // style symbol types
	                          'symbols': {
	                            'start': {
	                              'font-color': 'red',
	                              'element-color': 'green',
	                              'fill': 'yellow'
	                            },
	                            'end':{
	                              'class': 'end-element'
	                            }
	                          },
	                          // even flowstate support ;-)
	                          'flowstate' : {
	                            'pasado' : { 'fill' : '#CCCCCC', 'font-size' : 12},
	                            'actual' : {'fill' : 'yellow', 'font-color' : 'red', 'font-weight' : 'bold'},
	                            'futuro' : { 'fill' : '#FFFF99'},
	                            'peticion' : { 'fill' : 'blue'},
	                            'invalido': {'fill' : '#444444'},
	                            'aprobado' : { 'fill' : '#58C4A3', 'font-size' : 12, 'yes-text' : 'APROBADO', 'no-text' : 'NO' },
	                            'negado' : { 'fill' : '#C45879', 'font-size' : 12, 'yes-text' : 'SI', 'no-text' : 'NEGADO' },
	                            'sino' : { 'font-size' : 12, 'yes-text' : 'SI', 'no-text' : 'NO' }
	                          }
	                        }

pagina.flowchart.ini = function(obj,fnc) {
	var pag = "flowchart";
	var dir = "paginas/" + pag + "/";
	console.log("vars");
	$(function() {
	  $.when(
	     $.getScript( dir+"js/raphael-min.js" )
	    ,$.getScript( dir+"js/flowchart-1.4.0.min.js" )
	    ,console.log("funcs")
	  ).done(function(){
	  	console.log("done");
			var dia = $("<textarea class='form-control' id='diatext' cols='50' rows='8'></textarea><div id='diagram'></div>");
		  if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
		  $("#cuerpo").html(dia);
			$( "#diatext" ).load( dir+"modelos/modelo.txt", function() {
			  $('#diatext').keyup();
			});
 			//$('#diagram').css({'position':'absolute','right':'0px','left': 'auto','top':'0','padding':'60px' });
		  $('#diatext').on( "keyup", function(event) {
		    $('#diagram').html('')
		    var diagram = flowchart.parse($('#diatext').val());
		  	diagram.drawSVG("diagram", pagina.flowchart.config);
			});
	  });
	});
	console.log("ext");
}

pagina.flowchart.ini();

/*
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End|future:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes 
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
*/