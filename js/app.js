/**
 * Inicio de acciones javascript
 */
$(function() {
  $.when(
     $.getScript( "js/lib/jquery.rest.js" )
    ,$.getScript( "js/lib/jquery.bsAlerts.min.js" )
    ,$.getScript( "js/lib/jquery.loader.js" )
    ,$.getScript( "js/lib/jquery.ui.widget.js" )
    ,$.getScript( "js/lib/jquery.iframe-transport.js" )
    ,$.getScript( "js/lib/jquery.fileupload.js" )
    ,$.getScript( "js/lib/Chart.min.js" )   // graficas
    ,$.getScript( "js/lib/sweetalert.min.js" )  // ventanas emergentes estilizadas http://t4t5.github.io/sweetalert/
    ,$.getScript( "js/lib/jskata.nofreeze.js" ) // para acciones js que no congelen el resto del sistema
    ,$.getScript( "js/lib/url.js" )  // http://url.websanova.com/
    ,$.getScript( "js/lib/hammer_screenfull.js" )
    ,$.getScript( "js/lib/sgallery.js" )
    ,$.getScript( "js/app/Utils.js" )
    ,$.getScript( "js/app/frm.js" )
    ,$.getScript( "js/app/router.js" )
    ,$.getScript( "js/app/tiempo.js" )
    ,$.getScript( "js/app/pagina.es.js" )
    ,$.getScript( "js/app/msj.js" )
    ,$.getScript( "js/app/feedback.js" )
    ,$.getScript( "js/app/pagina.js" )
    ,$.getScript( "js/json/pagina.config.js" )
    ,$.getScript( "js/lib/jquery.csv-0.71.min.js" )
    ,$.Deferred(function( deferred ){$( deferred.resolve );})
  ).done(function(){
    pagina.init(pagina.config);

  });
});