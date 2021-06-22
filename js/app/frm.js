var pagina = pagina || {}
pagina.frm = {}
pagina.frm.list = [];
console.log("frm.js");

//@TODO crear checkbox, textarea

pagina.frm.sel = function(obj){
		var opt = obj.opt;  //?obj.opt:{};
		var col = pagina.frm.col(obj);
		var input = $("<select id='"+obj.id+"' name='"+obj.id+"' class='form-control' "+ (obj.readonly?"readonly":"") +"></select>");
		$.each(opt, function(key, value) {input.append($("<option></option>").attr("value",key).text(value)); });
		col.append(input);
		return col;
}

pagina.frm.tex = function(obj){
	var col = pagina.frm.col(obj);
	var input = $("<input type='text' class='form-control' id='"+obj.id+"' placeholder='"+obj.nombre+"' "+ (obj.readonly?"readonly":"") +">");
	col.append(input);
	return col;
}

pagina.frm.opt = function(obj){
		var opt = obj.opt;
		var col = pagina.frm.col(obj);
		var indice = 0;
		$.each(opt, function(key, value) {
			var input = $("<label class='radio inline col-sm-3' for='" + obj.id + indice + "'></label>");
			var chequeado = ""; // checked
			if(Utils.isset(obj.value)) if(obj.value==value) chequeado = "checked";
			input.append($("<input name='" + obj.id + "' id='" + obj.id + "-" + indice + "' value='"+value+"' type='radio' "+ (obj.readonly?"readonly":"") + " " + chequeado + ">")); 
			input.append(key);
			col.append(input);
			indice++;
		});
		return col;
}

pagina.frm.sta = function(obj){
	var col = pagina.frm.col(obj);
	var input = $("<p class='form-control-static'>"+obj.value+"</p>");
	col.append(input);
	return col;
}

pagina.frm.ema = function(obj){
	var col = pagina.frm.col(obj);
	var input = $("<input type='email' class='form-control' id='"+obj.id+"' placeholder='"+obj.nombre+"' "+ (obj.readonly?"readonly":"") +">");
	col.append(input);
	return col;
}

pagina.frm.tel = function(obj){
	var col = pagina.frm.col(obj);
	var input = $("<input type='tel' class='form-control' id='"+obj.id+"' placeholder='"+obj.nombre+"' "+ (obj.readonly?"readonly":"") +">");
	col.append(input);
	return col;
}

pagina.frm.num = function(obj){
	var col = pagina.frm.col(obj);
	var input = $("<input type='number' value='"+obj.value+"' class='form-control' id='"+obj.id+"' placeholder='"+obj.nombre+"' "+ (obj.readonly?"readonly":"") +">");
	col.append(input);
	return col;
}

pagina.frm.sub = function(obj){
	var col = pagina.frm.col(obj);
	var input = $("<button type='submit' class='btn btn-default' "+ (obj.readonly?"readonly":"") +">"+obj.nombre+"</button>");
	col.append(input);
	return col;
}

pagina.frm.col = function(obj){
	var offset = obj.label==1? "":"col-sm-offset-2";
	var column = 4; // col-sm-4
	switch(obj.tipo) {
    case "select": 	column = 4;		break;
    case "text": 		column = 4; 	break;
    case "opt": 		column = 4; 	break;
    case "static": 	column = 10; 	break;
    case "email": 	column = 4; 	break;
    case "tel": 		column = 2; 	break;
    case "number": 	column = 2; 	break;
    case "submit": 	column = 4; 	break;
	} 
	if(Utils.isset(obj.max)){
		if(obj.max>99) column = 4;
		if(obj.max>49) column = 4;
		if(obj.max>21) column = 2;
	}
	return $("<div class='" + offset + " col-sm-" + column + "'></div>");
}

pagina.frm.campo = function(obj){
	var id = obj.id || "id" + Utils.randomInt(1000,9999);
	var nombre = obj.nombre || id;
	var tipo = obj.tipo || "text";
	var combo = $("<div id='"+obj.id+"combo' class='form-group'></div>");
	if(obj.label==1) combo.append("<label for='"+id+"' class='col-sm-2 control-label'>"+nombre+"</label>");	
	switch(tipo) {
    case "select": 	combo.append(pagina.frm.sel(obj)); 		break;
    case "text": 		combo.append(pagina.frm.tex(obj)); 		break;
    case "opt": 		combo.append(pagina.frm.opt(obj)); 		break;
    case "static": 	combo.append(pagina.frm.sta(obj)); 		break;
    case "email": 	combo.append(pagina.frm.ema(obj)); 		break;
    case "tel": 		combo.append(pagina.frm.tel(obj)); 		break;
    case "number": 	combo.append(pagina.frm.num(obj)); 		break;
    case "submit": 	combo.append(pagina.frm.sub(obj)); 		break;

    default: 				combo.append(pagina.frm.tex(obj)); 
	} 
	return combo;
}

pagina.frm.fset = function(obj){
	var ca = obj.l;
	var fset = $("<fieldset><legend>"+obj.nombre+"</legend></fieldset>");
	for(var x in ca){
		if(ca[x].tipo == 'fset') fset.append(pagina.frm.fset(ca[x]))
		else fset.append(pagina.frm.campo(ca[x]))
	}
	return fset;
}

pagina.frm.nuevo = function(obj){
	var tp = obj.tipo?(obj.tipo=="frm"?obj.tipo:false):false;
	if(!tp) return;
	var id = obj.id || false;
	var no = obj.nombre || id;
	var ca = obj.campos;
	var f = $("<form id='"+id+"' class='form-horizontal'></form>");
	for(var x in ca){
		//console.log(ca[x]);
		if(ca[x].tipo == 'fset') f.append(pagina.frm.fset(ca[x]))
		else f.append(pagina.frm.campo(ca[x]))
	}
	pagina.frm.list.push(f);
	return pagina.frm.list.length-1;
}

pagina.frm.hideshow = function(obj){
	var campos = {}
	if(Utils.isset(obj.campos)) campos = obj.campos;
	if(Utils.isset(obj.l)) campos = obj.l;
	for(var x in campos){
		if(campos[x].tipo == 'fset') pagina.frm.hideshow(campos[x]);
		else {
			if(Utils.isset(campos[x].hif)){
				$.each(campos[x].hif, function(llave, arreglo) {
					var cmp = campos[x].id;
					for(var valor in arreglo){ 
						if($("input:radio[name=" + llave + "]").val()==(arreglo[valor])) $("#"+cmp+"combo").hide();
						$("input:radio[name=" + llave + "]").click(function() { 
							if($(this).val()==(arreglo[valor])) $("#"+cmp+"combo").hide();
						});
					}
				});
			}
			if(Utils.isset(campos[x].sif)){
				$.each(campos[x].sif, function(llave, arreglo) {
					var cmp = campos[x].id;
					for(var valor in arreglo){ 
						$("input:radio[name=" + llave + "]").click(function() { 
							var elv = arreglo[valor];
							if($(this).val()==elv) $("#"+cmp+"combo").show();
						});
					}
				});
			}
		}
		
	}
	return;
}


pagina.frm.make = function(url, where){
  $.getJSON(url)
    .done(function( data ) {
    	var id = pagina.frm.nuevo(data);
    	$("#"+where).append(pagina.frm.list[id]);
    	pagina.frm.hideshow(data);
    });
}

pagina.frm.test = function(){
	console.log("frm.test.js");
}

/**/


	/*
	@TODO cargar pagina.frm.hideshow.campo 
	{"idx":
		{"hide":
			{
				"id1":[1,2,3],
				"id2":[1],
				"id3":[1]
			},
			"show":
			{
				"id4":[2],
				"id5":[2],
				"id6":[2]
			}
		},
	}
*/