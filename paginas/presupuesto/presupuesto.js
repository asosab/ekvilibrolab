var pagina = pagina || {}
var pag = "presupuesto";
pagina.presupuesto = {}
console.log(pag+".js");

var dir = "paginas/" + pag + "/";
$.getScript( "js/lib/jspdf.min.js" );

if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
$("#cuerpo").html("");

pagina.presupuesto.data = {}
pagina.presupuesto.setData = function() {
	var data = {};
	//TODO serializar formulario, a json

	pagina.presupuesto.data = data
}


//@TODO cargar formulario
var frm = $("<div id='formulario'></div>");
$("#cuerpo").append(frm);
//$( "#formulario" ).load( dir+"vista/frm.html", function() {});
//console.log(dir+"vista/frm.json");
pagina.frm.make(dir+"vista/frm.json","formulario");


//@TODO mostrar presupuesto


//@TODO mostrar contrato


/*
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1045658145444820',
      xfbml      : true,
      version    : 'v2.4'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

<div
  class="fb-like"
  data-share="true"
  data-width="450"
  data-show-faces="true">
</div>


$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '1045658145444820',
      xfbml      : true,
      version: 'v2.4' 
    });     
	//FB.ui({method: 'send',link: 'http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html',});
  });
});


http://www.facebook.com/dialog/send?
  app_id=123456789
  &link=http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html
  &redirect_uri=https://www.domain.com/
  &to=

*/