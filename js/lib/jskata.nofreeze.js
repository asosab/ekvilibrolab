/*jslint forin: true */
(function() {
  var jsk = {
    sleepFor : 1, // How many milliseconds should it sleeps
    chunkSize : 10, // How many executions before sleep
    stops : [], // Contains all stop functions
    // A responsive for
    forLoop:function for_(wh, inc, fct, options, stopCallback) {
      var self = this;
      var timerId;
      
      var sleepFor = options && options.sleepFor ? 
        options.sleepFor : this.sleepFor;
        
      var chunkSize = options && options.chunkSize ? 
        options.chunkSize : this.chunkSize;
        
      // Create the stop function
      var innerStop = function innerStop() {
        if (stopCallback) { stopCallback(); }
        clearTimeout(timerId);
      };
      
      var stop = function stopWrapper() {
        if (innerStop) { innerStop(); }
        innerStop = null;
      };
      
      self.stops.push(stop);
      
      // Execute a chunk of code
      var chunk = function chunk() {
        var jskcurrent = 0;
        while (wh() && jskcurrent++ < chunkSize) {
          fct();
          if (inc) { inc(); }
        } 
        
        if (wh()) { 
          timerId = setTimeout(chunk, sleepFor);
        } else {
          stop();
        }
      };
            
      // Start the process
      chunk();
      
      return {stop:stop};
    },
    // A simple for with an index increasing to a count
    forCount : function forCount(maxCount, fct, options, stopCallback) {
      var jsKataforCountIndex = (options && options.beginAt) || 0;
      var newFct = function() { fct(jsKataforCountIndex); };
      return this.forloop(
        function() {return jsKataforCountIndex <= maxCount;},
        function() {jsKataforCountIndex++;},
        newFct,
        options,
        stopCallback
      );
    },
    // Create an infinite loop
    infinite:function infinite(fct, options, stopCallback) {
      return this.forloop(
        function() { return true; },
        null,
        fct,
        options,
        stopCallback
      );
    },
    // Each
    each:function(obj, fct, options, stopCallback) {
      var i = 0;
      
      // If it's an array
      // taken from jQuery
      if (Object.prototype.toString.call(obj) == "[object Array]") {
        i = 0;
        return this.forloop(
          function() { return i < obj.length; },
          function() { i++; },
          function() { fct.call(obj[i], i, obj[i]); },
          options,
          stopCallback
        );
      // If it's an an object
      } else {
        // Create an array of properties
        var props = [];
        
        for(var prop in obj) { 
          if (true) { // for jshint
            props.push(prop); 
          }
        }
        
        i = 0;
        return this.forloop(
          function() { return i < props.length; },
          function() { i++; },
          function() { fct.call(obj[props[i]], props[i], obj[props[i]]);},
          options,
          stopCallback
        );
      }
    },
    // Stop it after the next round
    stop:function() {
      for(var i = 0; i < this.stops.length; i++) {
        this.stops[i]();
      }
      if (this.onStop) { this.onStop(); }
    }
  };
  
  jsk.forloop = jsk.forLoop; // backward compatibility
  
  // Creates the base namespaces
  if (typeof window !== 'undefined') {
    if (window.javascriptKataDotCom === undefined) { window.javascriptKataDotCom = {}; }
    if (window.jsKata === undefined) { window.jsKata = window.javascriptKataDotCom; }
    if (window.jsk === undefined) { window.jsk = window.javascriptKataDotCom; }
    if (window._  === undefined) { window._ = window.javascriptKataDotCom; }
      
    window.javascriptKataDotCom.nofreeze = jsk; 
    window.javascriptKataDotCom.nf = window.javascriptKataDotCom.nofreeze;
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = jsk;
  }
})();
