pagina.galeria = function(obj,fnc) {
	var pag = "galeria";
	var dir = "paginas/" + pag + "/";
	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', dir+pag+'.css') );
	$("#cuerpo").load(dir+pag+".html");
	pagina.enEspera.on();
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",{
		id: "53124237@N00",
		tags: "asbmenosdecien",
		tagmode: "all",
		format: "json",
		cache: true
	},
	  function(data) {
	    $.each(data.items, function(i,item){
		    var img = $("<img/>").attr("src", item.media.m.flickrSize('q')).appendTo(".items--small").wrap("<li class='item'></li>").wrap("<a href='#'></a>");
		    var fig = $("<figure></figure>")
		    fig.append($("<img/>").attr("src", item.media.m.flickrSize('')))
		    fig.append($("<figcaption class='img-caption'>" + item.title + "</figcaption>"))
		    fig.appendTo(".items--big").wrap("<li class='item--big'></li>").wrap("<a href='#'></a>");
		    //if ( i == 7 ) return false;
	    });
	    pagina.enEspera.off();
	  });
		$('#gallery-container').sGallery({fullScreenEnabled: true});
}



pagina.galeria();

/*
s	small square 75x75
q	large square 150x150
t	thumbnail, 100 on longest side
m	small, 240 on longest side
n	small, 320 on longest side
-	medium, 500 on longest side
z	medium 640, 640 on longest side
c	medium 800, 800 on longest side†
b	large, 1024 on longest side*
h	large 1600, 1600 on longest side†
k	large 2048, 2048 on longest side†
o	original image, either a jpg, gif or png, depending on source format
*/


/*
http://www.flickr.com/photos/53124237@N00/archives/date-taken/

<li class="item"><a href="#"><img src="images/small-1.png" alt="" /></a></li>
<li class="item--big"><a href="#"><figure><img src="images/big-1.jpg" alt="" /><figcaption class="img-caption">Caption</figcaption></figure></a></li>

*/