
var Utils = {};


Utils.random = function(range) {
    return Math.floor(Math.random() * range);
};

Utils.randomRange = function(min, max) {
    return min + (Math.random() * (max - min));
};

Utils.randomInt = function(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
};

Utils.clamp = function(min, max, value) {
    if(value < min) {
        return min;
    } else if(value > max) {
        return max;
    } else {
        return value;
    }
};

// hacer un push a un arreglo en el primer puesto rotando todo el contenido
Utils.arrAddFirsf = function(arr, valor) {
    var a = [];
    a.push(valor);
    for(var val in arr) a.push(arr[val]);
    return a;
};

Utils.distanceTo = function(x, y, x2, y2) {
    var distX = Math.abs(x - x2);
    var distY = Math.abs(y - y2);
    return (distX > distY) ? distX : distY;
};

Utils.hacerluego = function(fnc, tiempo){
    var index = 0; 
    jsKata.nofreeze.forloop(
        function() { return index <= tiempo;  },
        function() { index++; },
        function() {if(index==tiempo){eval(funcion)(fnc)};}
    );
}

Utils.toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
}

Utils.objSum = function(obj) {
    var sum = 0;
    for (var _ in obj) sum += obj[_];
  return sum;
}

Utils.shuffle = function(o){ 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

Utils.isset = function(variable){return (typeof(variable) != "undefined" && variable !== null)?true:false;}


Utils.LightenDarkenColor = function(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

Utils.preloadImg = function(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

String.prototype.flickrSize = function(size) {
        var index = this.length - 5
        if(size =="") return this.substr(0, index -1) + '.jpg';
    return this.substr(0, index) + size + this.substr(index+size.length);
}

String.prototype.IniMayuscula = function() {
    return this.charAt(0).toUpperCase() + this.toLowerCase().slice(1);
}

jQuery.cachedScript = function( url, options ) {
  options = $.extend( options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });
  return jQuery.ajax( options );
};


