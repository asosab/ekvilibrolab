console.log("fileupload.js");
var pagina = pagina || {}
pagina.fileupload = {}
fu = pagina.fileupload;

fu.urlserver = "http://jbase/paginas/fileupload/server/index.php";
//fu.urlserver = "http://jbase/paginas/";

fu.frm  = $("<span class='btn btn-success fileinput-button'> <i class='glyphicon glyphicon-plus'></i><span>Select files...</span><input id='fileupload' type='file' name='files[]' data-url='"+fu.urlserver+"' multiple></span><div id='progress'><div class='bar' style='width: 0%;'></div></div>");

fu.setHtml = function(fnc){
  if($("#cuerpo").length==0) $('body').append("<div id='cuerpo'></div>");
  $("#cuerpo").html("");
  $("#cuerpo").append(fu.frm);
  $(".bar").css({"height":"18px", "background":"green"});

  if(fnc)fnc;
}

fu.setFU = function(){
  $('#fileupload').fileupload({
      dataType: 'json',
      maxChunkSize: 1000000, // 10 MB
      add: function (e, data) {
        data.context = $('<button/>').text('Upload ')
            .appendTo(document.body)
            .click(function () {
                data.context = $('<p/>').text('Uploading...').replaceAll($(this));
                data.submit();
            });
      },
      done: function (e, data) {
          data.context.text('Upload finished.');
      },
      /*
      done: function (e, data) {
          $.each(data.result.files, function (index, file) {
              $('<p/>').text(file.name).appendTo(document.body);
          });
      },
      */
      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .bar').css('width', progress + '%');
    }
  });
}

fu.ini = function(){
  fu.setHtml();
  fu.setFU();
}

$(function() {
  fu.ini();
});


/**/