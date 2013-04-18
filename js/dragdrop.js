(function () {
  'use strict';

/*

// example

dropzone.make({
  element: "#dropzone",
  formelement: "#fileinput",
  oninfo: function (filename) {

  },
  ondata: function (dataurl) {

  }
});

 */
  window.dropzone = {
    make : function (options) {

      var dz = document.querySelectorAll(options.element);

      var noop = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
      };

      var showpreview = function (readevent) {
        if ('function' === typeof(options.ondata)) {
          var dataurl = readevent.target.result;
          options.ondata(dataurl);
        }
      };

      var capturedata = function (file) {
        if ('function' === typeof(options.oninfo)) {
          options.oninfo(file.name);
        }

        var reader = new FileReader();
        reader.onload = showpreview;
        reader.readAsDataURL(file);
      };

      var getfile = function (evt) {
        noop(evt);

        var files = evt.target.files || evt.dataTransfer.files;

        if (0 < files.length) {
          capturedata(files[0]);
        }
      };

      dz[0].addEventListener('dragenter', noop, false);
      dz[0].addEventListener('dragexit', noop, false);
      dz[0].addEventListener('dragover', noop, false);
      dz[0].addEventListener('drop', getfile, false);

      if ("string" === typeof(options.formelement)) {
        var fileinput = document.querySelectorAll(options.formelement);
        fileinput[0].addEventListener('change', getfile, false);
      }
    }
  };

}());
