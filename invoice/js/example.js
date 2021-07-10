function print_today() {
  // ***********************************************
  // AUTHOR: WWW.CGISCRIPT.NET, LLC
  // URL: http://www.cgiscript.net
  // Use the script, just leave this message intact.
  // Download your FREE CGI/Perl Scripts today!
  // ( http://www.cgiscript.net/scripts.htm )
  // ***********************************************
  var now = new Date();
  var months = new Array('enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre');
  var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
  function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
  }
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
  var total = 0;
  $('.price').each(function(i){
    price = $(this).html().replace("Bs.","");
    if (!isNaN(price)) total += Number(price);
  });
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

  
  $("#date").val(print_today());
  

  var cli, fec, ven, est, i1Nom, i1Can, i1val, i2Nom, i2Can, i2val, i3Nom, i3Can, i3val, i4Nom, i4Can, i4val;
  cli = decodeURI($.url('?cli'));
  fec = decodeURI(decodeURI($.url('?fec')));
  ven = decodeURI($.url('?ven'));
  est = decodeURI($.url('?est'));

  i1Nom = decodeURI($.url('?i1Nom'));
  i1Can = $.url('?i1Can');
  i1val = $.url('?i1val');

  i2Nom = decodeURI($.url('?i2Nom'));
  i2Can = $.url('?i2Can');
  i2val = $.url('?i2val');

  i3Nom = decodeURI($.url('?i3Nom'));
  i3Can = $.url('?i3Can');
  i3val = $.url('?i3val');

  i4Nom = decodeURI($.url('?i4Nom'));
  i4Can = $.url('?i4Can');
  i4val = $.url('?i4val');

  if (cli) {$("#contacto").val(cli);}
  if (fec) {$("#date").val(fec);}
  if (ven) {$("#vendedor").val(ven);}
  if (est) {$("#estadonota").val(est);}

  if (i1Nom) {addRow(i1Nom, i1Can, "Bs."+i1val);}
  if (i2Nom) {addRow(i2Nom, i2Can, "Bs."+i2val);}
  if (i3Nom) {addRow(i3Nom, i3Can, "Bs."+i3val);}
  if (i4Nom) {addRow(i4Nom, i4Can, "Bs."+i4val);}


  update_total();
});