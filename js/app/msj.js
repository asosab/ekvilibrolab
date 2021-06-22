var msj = {};
msj.rec = [];


// obj {id:id del padre}
msj.set = function(obj){
  var obj = obj || {};
  var id = obj.id || 'pie';
  var msj = $("<div id='msj' data-alerts='alerts' data-fade='3000' ></ div>")
  $('#'+id).append(msj);
}


//obj {'m':''}
msj.agregar = function(obj){
  var obj = obj || {};
  var m = obj.m || '';
  if(m == '') return false;
  if(m !=msj.rec[0]) msj.rec.splice(0, 0, m);
}

//obj {'c':cuantos, 'id':'id del obj html que muestra'}
msj.listar = function(obj){
  var obj = obj || {};
  var c = obj.c || 1;
  var id = obj.id || 'msj';
  if($("#" + id).length == 0) return;
  $('#'+id).html('');
  c = Utils.clamp(0,msj.rec.length, c)
  for (var i = 0; i < c; i++) $('#'+id).append("<p>" + msj.rec[i] + "</p>");
}

//{'m':'hola', 't':'swal','tt':'success','id':'pie'}
//obj {'tm':titulo_mensaje 'm':mensaje, 'g':guardar,'mo':mostrar,tt:lista|swal|alert,'t':tipo, 'c':cuantos mostrar, 'id':id del mostrador}
msj.mostrar = function(obj){
  var obj = obj 	|| {};
  var m = obj.m 	|| '';
  var id = obj.id 	|| 'msj';
  var g = Utils.isset(obj.g)? obj.g:true;
  var mo = Utils.isset(obj.mo)? obj.m:true;
  var t = obj.t 	|| 'swal';
  var tm = obj.tm  || '';
  var tt = obj.tt 	|| 'success';
  var c = obj.c 	|| 5;

  if(g) msj.agregar({'m':m})
  if(mo){
    switch(t) {
      case 'lista': msj.listar({'c':c,'id':id}); break;
      case 'swal':  swal(m, "", tt); break;
      case 'swalh': swal({ html:true, title:tm, text:m});
      case 'alert': msj.alert({'m':m,'id':id,'t':tt}); break;
      case 'm': $('#'+id).html(m); break;
      default: swal(m); break;
    } 
  }
}

// Priority: error/danger, warning, info/notice, success
// obj {'m':msj, 'id':'id del obj html que muestra', 't':success|info|warning|danger}
msj.alert = function(obj){
  var obj = obj || {};
  var m = obj.m || '';
  var id = obj.id || 'msj';
  var t = obj.t || 'success';
  $('#'+id).trigger("add-alerts", [{'message': m,'priority': t}]);
}

