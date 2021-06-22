

var msj = {};
msj.rec = [];

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

//obj {'m':mensaje, 'g':guardar,'mo':mostrar,tt:lista|swal|alert,'t':tipo, 'c':cuantos mostrar, 'id':id del mostrador}
msj.mostrar = function(obj){
  var obj = obj 	|| {};
  var m = obj.m 	|| '';
  var id = obj.id 	|| 'msj';
  var g = Utils.isset(obj.g)? obj.g:true;
  var mo = Utils.isset(obj.mo)? obj.m:true;
  var t = obj.t 	|| 'lista';
  var tt = obj.tt 	|| 'lista';
  var c = obj.c 	|| 5;

  if(g ) msj.agregar({'m':m})
  if(mo){
    switch(t) {
      case 'lista': msj.listar({'c':c,'id':id}); break;
      case 'error': swal(m, "", "error"); break;
      case 'alert': swal(m, "", "alert"); break;
      case 'success': swal(m, "", "success"); break;
      case 'm': $('#'+id).html(m); break;
      default: swal(m); break;
    } 
  }
}




/*
      <div class="alert alert-success" role="alert">
        <strong>Well done!</strong> You successfully read this important alert message.
      </div>
      <div class="alert alert-info" role="alert">
        <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
      </div>
      <div class="alert alert-warning" role="alert">
        <strong>Warning!</strong> Best check yo self, you're not looking too good.
      </div>
      <div class="alert alert-danger" role="alert">
        <strong>Oh snap!</strong> Change a few things up and try submitting again.
      </div>
*/