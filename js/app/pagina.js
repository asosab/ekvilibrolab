
var pagina    = pagina || {};
pagina.titulo = "ekvilibroLab";
pagina.data   = "./js/json";
pagina.menu   = {};
pagina.pie    = {};
pagina.cuerpo = {};
pagina.enEspera = {};

pagina.enEspera.on = function(obj,fnc){
  var obj = obj || {className:"blue-with-image-2", content:''};
  $.loader(obj);
}
pagina.enEspera.off = function(obj,fnc){
  $.loader('close');
}

//obj 
pagina.set = function(obj,fnc){
  var obj = obj || {};
  pagina.menu.set(obj);
  pagina.cuerpo.set(obj);
  pagina.pie.set(obj);
  return obj;
}

pagina.init = function(obj,fnc){
  var obj = obj || {};
  var tit = pagina.titulo = obj.titulo || pagina.titulo;
  document.title = tit;
  if(obj.menu) pagina.menu.init(obj);
  if(obj.cuerpo) pagina.cuerpo.init(obj);
  if(obj.pie) pagina.pie.init(obj);
  router.init();
  router.activar() || $(".active a").click();
  msj.set({'id':'pie'});
  tiempo.init();
  Utils.preloadImg(['imagen/ajax-loader.gif'])
}

pagina.cuerpo.set = function(obj,fnc){
  var obj = obj || {};
  var c   = obj.cuerpo || false;
  if(!c) return;
  var cuerpo = $("#cuerpo");
  cuerpo.html('');
  for(var elm in c) cuerpo.append($(c[elm]));
  return cuerpo;
}

pagina.cuerpo.init = function(obj,fnc){
  var obj = obj || {};
  var c   = obj.cuerpo || {}
  var cuerpo = $("<div id='cuerpo' class='container'></div>");
  $("Body").append(cuerpo);
  return pagina.cuerpo.set(obj);
}

pagina.pie.set = function(obj,fnc){
  var obj = obj || {};
  var p   = obj.pie || false;
  if(!p) return;
  var pie = $("#pie");
  pie.html('');
  for(var elm in p) pie.append($(p[elm]));
  return pie;
}

pagina.pie.init = function(obj,fnc){
  var obj = obj || {};
  var p   = obj.pie || {}
  var pie = $("<footer class='footer'></footer>");
  var cnt = $("<div id='pie' class='container'></div>");
  pie.append(cnt);
  $("Body").append(pie);
  return pagina.pie.set(obj);
}

// retorna un elemento determinado por su titulo
pagina.menu.ele = function(nombre,fnc){
  return $("#ulmenu li:contains('"+nombre+"')");
}

// define el elemento activo, apagando los demás
pagina.menu.act = function(nombre,fnc){
  var ele = pagina.menu.ele(nombre);
  $( "#ulmenu li.active" ).removeClass('active');
  ele.addClass('active');
}

pagina.menu.set = function(obj,fnc){
  var obj = obj || {};
  var m   = obj.menu || false;
  if(!m) return;
  var ulnbr = $("#ulmenu");
  ulnbr.html("");
  for(var li in m){
    if(m[li].c != 'dropdown'){
      var a = "";
      if(m[li].u !="") a = "<a href='"+m[li].u+"'>"+m[li].t+"</a>"; else a = "<a href='#'>"+m[li].t+"</a>";
      ulnbr.append("<li class='"+m[li].c+"'>"+a+"</li>");
    }else{
      var dd = $("<li class='dropdown'></li>");
      dd.append("<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>"+m[li].t+"<span class='caret'></span></a>");
      var ul = $("<ul class='dropdown-menu' role='menu'></ul>");
      dd.append(ul);
      for (var lii in m[li].l){
        var b = "";
        if(m[li].l[lii].u !="") b = "<a href='"+m[li].l[lii].u+"'>"+m[li].l[lii].t+"</a>"; else b = m[li].l[lii].t;
        ul.append("<li class='"+m[li].l[lii].c+"'>"+b+"</li>");
      }
      ulnbr.append(dd);
    }
  }
  return ulnbr;
}

pagina.menu.setr = function(obj,fnc){
  var obj = obj || {};
  var m   = obj.menur || false;
  if(!m) return;
  var ulnrr = $("#ulmenur");
  ulnrr.html("");
  for(var li in m){
    if(m[li].c != 'dropdown'){
      var a = "";
      if(m[li].u !="") a = "<a href='"+m[li].u+"'>"+m[li].t+"</a>"; else a = "<a href='#'>"+m[li].t+"</a>";
      ulnrr.append("<li class='"+m[li].c+"'>"+a+"</li>");
    }else{
      var dd = $("<li class='dropdown'></li>");
      dd.append("<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>"+m[li].t+"<span class='caret'></span></a>");
      var ul = $("<ul class='dropdown-menu' role='menu'></ul>");
      dd.append(ul);
      for (var lii in m[li].l){
        var b = "";
        if(m[li].l[lii].u !="") b = "<a href='"+m[li].l[lii].u+"'>"+m[li].l[lii].t+"</a>"; else b = m[li].l[lii].t;
        ul.append("<li class='"+m[li].l[lii].c+"'>"+b+"</li>");
      }
      ulnrr.append(dd);
    }
  }
  return ulnrr;
}


pagina.menu.init = function(obj,fnc){
  var obj = obj || {};
  var m   = obj.menu || {}
  var barra = $("<nav class='navbar navbar-inverse navbar-fixed-top'></nav>");
  $("Body").append(barra);
  var conte = $("<div class='container'></div>");
  barra.append(conte);
  var nbh   = $("<div class='navbar-header'></div>");
  conte.append(nbh);
  var btntn = $("<button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'><span class='r-only'></span><span class='icon-bar'></span><span class='icon-bar'></span><span class='icon-bar'></span></button>") // button Toggle navigation
  nbh.append(btntn);
  var nbb   = $("<a class='navbar-brand' href='#'>"+pagina.titulo+"</a>");
  nbh.append(nbb);
  var navba = $("<div id='navbar' class='navbar-collapse collapse'></div>");
  conte.append(navba);
  var ulnbr = $("<ul id='ulmenu' class='nav navbar-nav'></ul>");
  navba.append(ulnbr);
  var ulnrr = $("<ul id='ulmenur' class='nav navbar-nav navbar-right'></ul>");
  navba.append(ulnrr);
  pagina.menu.set(obj);
  pagina.menu.setr(obj);
  if(fnc)fnc(obj);
}


pagina.test = function(obj,fnc){
  console.log(obj)
  if(fnc)fnc(obj);
}