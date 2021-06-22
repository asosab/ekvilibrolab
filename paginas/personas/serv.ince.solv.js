console.log("serv.ince.solv.js");

serv = serv || {}
serv.ince = serv.ince || {}
serv.ince.solv = {}
serv.ince.solv.data = {}

serv.ince.solv.ws = function(obj,fnc){
	var url = "http://ws.inces.gob.ve/s/rif/" + obj.nac + obj.id + "/jc/";
	var jqxhr = $.ajax({type: 'GET',url: url,async: true,jsonpCallback: 'jc',contentType: "application/json",dataType: 'jsonp',cache: true,
	    beforeSend: function() {pagina.enEspera.on();},
	    success: function(json) {serv.ince.solv.data = json; if(fnc) fnc(json);},
	    error: function(e) { console.log("error intt " + func + ": " + e.message); if(fnc) fnc(json);},
	    complete: function(json) {pagina.enEspera.off();}
	});
}
