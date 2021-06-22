var tiempo = {};

tiempo.activo  	= false;
tiempo.pulso 	= 1000;
tiempo.cuenta 	= 0;
tiempo.tareas  	= ['tiempo.hacer()', 'tiempo.contar()'];
tiempo.relojes 	= [];
tiempo.stop    	= function(){ tiempo.activo = false;tiempo.cuenta =0;clearTimeout(tiempo.relojes[0])}
tiempo.init   	= function(){ tiempo.activo = true; tiempo.hacer();}
tiempo.contar 	= function(){ ++tiempo.cuenta;}
tiempo.hacer 	= function(){if(tiempo.activo) for(var tarea in tiempo.tareas) tiempo.relojes[tarea] = setTimeout(tiempo.tareas[tarea],tiempo.pulso);}
