

var calendario = {};

calendario.date = {'A':0,'M':0,'D':1,'S':0,'h':0,'m':0,'s':0}
calendario.mes = {0:'enero',1:'febrero',2:'marzo',3:'abril',4:'mayo',5:'junio',6:'julio',7:'agosto',8:'septiembre',9:'octubre',10:'noviembre',11:'diciembre'}
calendario.dia = {0:'lunes',1:'martes',2:'miercoles',3:'jueves',4:'viernes',5:'sabado',6:'domingo'}
calendario.spi = 1;  // segundos por iteraccion

//obj {}
calendario.contar = function(){ 
  var f = calendario.date;
  ++f.s;
  if(f.s > 59){f.s = 0; ++f.m}
  if(f.m > 59){f.m = 0; ++f.h}
  if(f.h > 23){f.h = 0; ++f.D; ++f.S}
  if(f.S > 6) {f.S = 0}
  if(f.D > 27){f.D = 0; ++f.M}
  if(f.M > 11){f.M = 0; ++f.A}
}

calendario.contarV = function() {
	for (var i = 0; i < calendario.spi; i++) calendario.contar();
}

//obj {id:id del div que muestra }
calendario.mostrar = function(obj,fnc){ 
  var obj = obj || {};
  var id = obj.id || 'calendario';
  var f = calendario.date;
  var m = calendario.mes
  var d = calendario.dia
  var t = d[f.S] + ', ' + f.D + txt(' de ') + m[f.M] + txt(' del año ') + f.A + ' || ' + f.h + ':'+f.m+':'+f.s;
  pagina.mensajes.mostrar({'msj':t, 't':'m', 'g':false, 'id':'calendario'})
}



