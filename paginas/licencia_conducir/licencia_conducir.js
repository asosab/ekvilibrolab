



$.ajax({
   type: 'GET',
    url: "https://sinsera.inces.gob.ve/intt/con_lic/v/17475327/22/10/1984/",
    async: false,
    jsonpCallback: 'jsonCallback',
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json) {
      alert(json.fnac);
    },
    error: function(e) {
       console.log(e.message);
    }
});


