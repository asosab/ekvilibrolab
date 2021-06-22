console.log("personas.js");


/*
busqueda de autos reportados como robados 
http://act1.mp.gob.ve:8080/informacion_detallada_solicitados.php
misdatos="np="+placa+"&ns="+serial;


http://www.mp.gob.ve/web/guest/buscador?p_p_id=77&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&_77_struts_action=%2Fjournal_content_search%2Fsearch
name="_77_keywords" value=""José Rafael Sosa Briceño""
*/

//

serv = {}

serv.get  = function(obj,fnc){
	var data = {};
	var solv = $.ajax({type: 'GET',url: obj.url,async: false,jsonpCallback: 'jsonCallback',contentType: "application/json",dataType: 'jsonp',cache: true,
	    beforeSend: function() {},
	    success: function(json) {data = json},
	    error: function(e) {console.log("error : " + e.message);},
	    complete: function(json) {pagina.enEspera.off();if(fnc) fnc(data);}
	});
	return solv;
}

serv.cne = {}
serv.cne.cuen = {}  
serv.cne.cuen.ws = function(obj,fnc, forma){
	console.log("cne : " + forma);
	var forma = forma || 1;
	var url = "";
	if(forma==1) url = "https://sinsera.inces.gob.ve/cne/jsonp/" + obj.nac.toUpperCase() + "/" + obj.id + "/" + obj.nomb.toUpperCase() + "/" + obj.apel.toUpperCase() + "/";
	if(forma==2) url = "https://sinsera.inces.gob.ve/cne/jsonp/" + obj.nac.toUpperCase() + "/" + obj.id + "/" + obj.nomb.IniMayuscula() + "/" + obj.apel.IniMayuscula() + "/";
	if(forma==3) url = "https://sinsera.inces.gob.ve/cne/jsonp/" + obj.nac.toLowerCase() + "/" + obj.id + "/" + obj.nomb.toLowerCase() + "/" + obj.apel.toLowerCase() + "/";
	console.log(url);
	var cuen = $.ajax({type: 'GET',url: url,async: false,jsonpCallback: 'jsonCallback',contentType: "application/json",dataType: 'jsonp',cache: true,
	    beforeSend: function() {},
	    success: function(json) {
	    	serv.cne.cuen.data = json; 
	    	if (json.length==0){
        	if(forma==1) serv.cne.cuen.ws(obj,fnc, 2);
        	if(forma==2) serv.cne.cuen.ws(obj,fnc, 3);
    		}else if(fnc) fnc(json);
	    },
	    error: function(e) { pagina.enEspera.off();console.log("error : " + e.message); if(fnc) fnc(json);},
	    complete: function(json) {pagina.enEspera.off();}
	});
	return cuen;
}



function apellido(nombre){
	if(nombre.length == 1) return "";
	if(nombre.length == 2) return nombre[1].trim();
	if(nombre.length == 3) return nombre[2].trim();
	if(nombre.length == 4){
		if(!!nombre[2]) return nombre[2].trim();
		else return nombre[3].trim();
	} 
}

serv.render = function(obj,id, nombre){
	if(Utils.isset(obj)){
		$("#cuerpo").append("<fieldset id='" + id + "'><legend>" + nombre + "</legend></fieldset><br /><br />");
		$.each(obj, function( key, value ) {
			var idi = id + key.split(' ').join('').replace(/[^a-zA-Z0-9]/g,'x');
			$("#"+ id).append("<div class='row'><div class='col-sm-4 '><strong>" + key + "</strong></div><div id='" + idi + "' class='col-sm-8'></div></div>");
			if(typeof(value) == "object" ){
				$.each(value, function( keyv, valuev ) {
					if(Utils.isset(valuev) && typeof(valuev) == "object" ){
						$.each(valuev, function( keyvv, valuevv ){
							if(Utils.isset(valuevv)){
								//console.log("valuevv " + valuevv);
								$("#"+ idi ).append(keyvv + "=" + valuevv + " "  );
							} 
						});
						$("#"+ idi ).append($("<br />"));
					}else{
						if(Utils.isset(valuev)){
							//console.log("valuev " + valuev);
							$("#"+ idi).append(valuev + " ");
						} 
					} 
				});
			}else{
				if(Utils.isset(value)){
					//console.log("value " + value);
					$("#"+ idi ).html(value);
				} 
			} 
		});
	}else console.log("no está seteado " + obj);
	return obj;
}

//12797985 5661072 18797762 1386821

serv.todos = function(obj,fnc) {
	$("#cuerpo").html("");

	obj.url = "https://sinsera.inces.gob.ve/dat/jsonp/" + obj.id + "/";
	serv.get(obj, function(data){serv.render(data,"dateper","Datos personales");
		obj.fnac = data['Fecha de Nacimiento'];
		obj.nac = 'V';

		obj.url = "https://sinsera.inces.gob.ve/intt/con_lic/" + obj.nac + "/" + obj.id + "/" + obj.fnac + "/";
		serv.get(obj, function(data){serv.render(data,"inttli","INTT - Licencias");
			obj.nomb = data['Nombre'][0];
			obj.apel = apellido(data['Nombre']);

			obj.url = "https://sinsera.inces.gob.ve/intt/con_multa/" + obj.nac + "/" + obj.id + "/" + obj.fnac + "/";
			serv.get(obj, function(data){serv.render(data,"inttmu","INTT - Multas");

				serv.cne.cuen.ws(obj, function(){
					serv.render(serv.cne.cuen.data,"cnedat","CNE");

					obj.url = "https://sinsera.inces.gob.ve/ivss/cuenta/" + obj.nac + "/" + obj.id + "/" + obj.fnac + "/";
					serv.get(obj, function(data){serv.render(data,"ivsscp","IVSS - Cuenta personal");
						serv.ivssc = data;

						obj.url = "https://sinsera.inces.gob.ve/ivss/pension/" + obj.nac + "/" + obj.id + "/" + obj.fnac + "/";
						serv.get(obj, function(data){serv.render(data,"ivsspe","IVSS - Pensión");

							obj.url = "http://ws.inces.gob.ve/s/rif/" + obj.nac + obj.id + "/jsonCallback/";
							serv.get(obj, function(data){serv.render(data,"incess","INCES - Solvencia");

								obj.url = "http://ws.inces.gob.ve/pc/jsonp/" + obj.id + "/";
								serv.get(obj, function(data){serv.render(data,"incespc","INCES - Certificados de formación");

								});
							});
						});
					});
				});
			});
		});
	});

}


serv.damecedula = function(obj,fnc) {
	var campo = $("<input type='text' placeholder='Número de cédula' id='cedula' class='form-control'>");
	$("#cuerpo").append(campo);

	$( "#cedula" ).keypress(function( event ) {
	  if ( event.which == 13 ) {
	     event.preventDefault();
	     serv.id = $("#cedula").val();
	     serv.todos({'id':serv.id});
	  }
	});	
}

serv.init = function(obj,fnc) {
	if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
	$("#cuerpo").html("");
	serv.damecedula();
}

$("#cuerpo").click();

serv.init();