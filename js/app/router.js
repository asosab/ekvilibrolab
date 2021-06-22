var router = {}

router.init = function(){
	$("a").click(function(e){
		//e.preventDefault();
		var purl = $(this).attr('href');
		var pagi = $.url('#p', purl) || $.url('#a', purl)
		var para = $.url('?', purl)
		//return false;
		if(pagi !== null && para == ""){
			//console.log("paginas/"+pagi+"/"+pagi+".js");
		$.cachedScript("paginas/"+pagi+"/"+pagi+".js")
		  .done(function( script, textStatus ) {
		    if(pagina[pagi]){
		    	if($.url('#a', purl) == null){
		    		window.history.pushState({path:purl},'',purl);
		    		pagina.menu.act(pagi.IniMayuscula());
		    		document.title = pagina.config.titulo + " - " + pagi.IniMayuscula();
		    	} 
		    } 
		  })
		  .fail(function( jqxhr, settings, exception ) {
	    	if($.url('#a', purl) == null){
	    		window.history.pushState({path:purl},'',purl);
	    		pagina.menu.act(pagi.IniMayuscula());
	    		document.title = pagina.config.titulo + " - " + pagi.IniMayuscula();
	    	} 
		    $("#cuerpo").load("paginas/"+pagi+"/"+pagi+".html");
		});
			return false;
		}
	});
}

router.activar = function(){
	var purl = $.url();
	var pagi = $.url('#p', purl)
	var para = $.url('?', purl)
	if(pagi !== null && para == ""){
		pagina.menu.act(pagi.IniMayuscula());
		$(".active a").click();
		return true;
	}else{return false;}
}