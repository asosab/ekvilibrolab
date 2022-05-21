function capture() {
  var captura;
  html2canvas(document.querySelector("#page-wrap"), {
    onrendered: function(canvas) {
      captura = canvas.toDataURL("image/png");
      $('#captura').click(function(){
        $('#captura').attr("src", captura);
      });
    }
  });
}

function format_fecha(fecha) {
  var now = new Date(fecha);
  var months = new Array('enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre');
  var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
  function fourdigits(number) { return (number < 1000) ? number + 1900 : number;}
  var today =  date + " de " + months[now.getMonth()] + " del " +  (fourdigits(now.getYear()));
  return today;
}

function numnota(){
  var now = new Date();
  return now.getTime();
}

// from http://www.mediacollege.com/internet/javascript/number/round.html
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your purposes)
}

function update_total() {
  global des;
  var subtotal = 0;
  var total = 0;
  var montoDes = 0;

  $('.price').each(function(i){
    price = $(this).html().replace("Bs.","");
    if (!isNaN(price)) subtotal += Number(price);
  });
  montoDes = des*subtotal/100;
  total = subtotal - montoDes;

  $("#descuento").val("-Bs."+montoDes);
  $("#subtotalsi").val("Bs."+subtotal);

  total = roundNumber(total,2);
  $('#total').html("Bs."+total);


}


function update_price() {
  var row = $(this).parents('.item-row');
  var price = row.find('.cost').val().replace("Bs.","") * row.find('.qty').val();
  price = roundNumber(price,2);
  isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html("Bs."+price);
  
  update_total();
}

function bind() {
  $(".cost").blur(update_price);
  $(".qty").blur(update_price);
}

function addRow(item, cantidad, valor){
  $(".item-row:last").after('<tr class="item-row"><td class="description"><div class="delete-wpr"><textarea>'+item+'</textarea><a class="delete" href="javascript:;" title="quitar">X</a></div></td><td class="tdqty"><textarea class="qty">'+cantidad+'</textarea></td><td class="tdcost"><textarea class="cost">'+valor+'</textarea></td><td class="tdprice"><span class="price">Bs.0</span></td></tr>');
  var row = $(".item-row:last");
  var price = row.find('.cost').val().replace("Bs.","") * row.find('.qty').val();
  price = roundNumber(price,2);
  isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html("Bs."+price);
  update_total();
}

$(document).ready(function() {
  $('input').click(function(){
    $(this).select();
  });

  $("#addrow").click(function(){
    $(".item-row:last").after('<tr class="item-row"><td class="item-name"><div class="delete-wpr"><textarea>Item Name</textarea><a class="delete" href="javascript:;" title="Remove row">X</a></div></td><td class="description"><textarea>Description</textarea></td><td><textarea class="cost">$0</textarea></td><td><textarea class="qty">0</textarea></td><td><span class="price">$0</span></td></tr>');
    if ($(".delete").length > 0) $(".delete").show();
    bind();
  });
  
  bind();
  $(".delete").live('click',function(){
    $(this).parents('.item-row').remove();
    update_total();
    if ($(".delete").length < 2) $(".delete").hide();
  });

  
  $("#date").val(format_fecha());
  

  var cli, des, fec, ven, est, i1Nom, i1Can, i1val, i2Nom, i2Can, i2val, i3Nom, i3Can, i3val, i4Nom, i4Can, i4val, i5Nom, i5Can, i5val, i6Nom, i6Can, i6val, i7Nom, i7Can, i7val, i8Nom, i8Can, i8val, i9Nom, i9Can, i9val, i10Nom, i10Can, i10val;
  cli = decodeURIComponent($.url('?cli'));
  
  fec = decodeURIComponent($.url('?fec'));
  if (fec) {} else {fec = format_fecha();}
  $("#date").val(fec);

  des = Number($.url('?des'));

  ven = decodeURIComponent($.url('?ven'));
  est = decodeURIComponent($.url('?est'));

  i1Nom = decodeURIComponent($.url('?i1Nom'));
  i1Can = Number($.url('?i1Can'));
  i1val = $.url('?i1val');

  i2Nom = decodeURIComponent($.url('?i2Nom'));
  i2Can = Number($.url('?i2Can'));
  i2val = $.url('?i2val');

  i3Nom = decodeURIComponent($.url('?i3Nom'));
  i3Can = Number($.url('?i3Can'));
  i3val = $.url('?i3val');

  i4Nom = decodeURIComponent($.url('?i4Nom'));
  i4Can = Number($.url('?i4Can'));
  i4val = $.url('?i4val');

  i5Nom = decodeURIComponent($.url('?i5Nom'));
  i5Can = Number($.url('?i5Can'));
  i5val = $.url('?i5val');

  i6Nom = decodeURIComponent($.url('?i6Nom'));
  i6Can = Number($.url('?i6Can'));
  i6val = $.url('?i6val');

  i7Nom = decodeURIComponent($.url('?i7Nom'));
  i7Can = Number($.url('?i7Can'));
  i7val = $.url('?i7val');

  i8Nom = decodeURIComponent($.url('?i8Nom'));
  i8Can = Number($.url('?i8Can'));
  i8val = $.url('?i8val');

  i9Nom = decodeURIComponent($.url('?i9Nom'));
  i9Can = Number($.url('?i9Can'));
  i9val = $.url('?i9val');

  i10Nom = decodeURIComponent($.url('?i10Nom'));
  i10Can = Number($.url('?i10Can'));
  i10val = $.url('?i10val');

  if (cli) {$("#contacto").val(cli);}
  if (ven) {$("#vendedor").val(ven);}
  if (est) {$("#estadonota").val(est);}

  if (des) {$("descuentoi").val('Descuento '+des+'%');}

  if (i1Can>0) {addRow(i1Nom, i1Can, "Bs."+i1val);}
  if (i2Can>0) {addRow(i2Nom, i2Can, "Bs."+i2val);}
  if (i3Can>0) {addRow(i3Nom, i3Can, "Bs."+i3val);}
  if (i4Can>0) {addRow(i4Nom, i4Can, "Bs."+i4val);}
  if (i5Can>0) {addRow(i5Nom, i5Can, "Bs."+i5val);}
  if (i6Can>0) {addRow(i6Nom, i6Can, "Bs."+i6val);}
  if (i7Can>0) {addRow(i7Nom, i7Can, "Bs."+i7val);}
  if (i8Can>0) {addRow(i8Nom, i8Can, "Bs."+i8val);}
  if (i9Can>0) {addRow(i9Nom, i9Can, "Bs."+i9val);}
  if (i10Can>0) {addRow(i10Nom, i10Can, "Bs."+i10val);}

  update_total();
  capture();
  
  console.log( des, i1Can, i2Can, i3Can, i4Can, i5Can, i6Can, i7Can, i8Can, i9Can, i10Can );

});