/*globals $, dropzone, thumbnailer, console */

(function () {
  'use strict';

  $(function () {

    function displayOriginal (dataurl) {
      var i = new Image();
      i.onload = function () {
        makeIcons(i);
      };
      i.src = dataurl;
    }

    function makeIcons (source) {
      $('canvas').each(function (i, targetcanvas) {
        var ctx, source_w, source_h, scaled_x, scaled_y, target_w, target_h, aspect, scaled_w, scaled_h;

        ctx = targetcanvas.getContext('2d');

        scaled_w = source_w = source.width;
        scaled_h = source_h = source.height;
        aspect = source_w / source_h;

        target_w = targetcanvas.width;
        target_h = targetcanvas.height;

        if ((scaled_w > target_w) || (scaled_h > target_h)) {
          // shrink
          if (scaled_w > target_w) {
            scaled_w = target_w;
            scaled_h = scaled_w / aspect;
          }

          if (scaled_h > target_h) {
            aspect = scaled_w / scaled_h;
            scaled_h = target_h;
            scaled_w = scaled_h * aspect;
          }
        } else {
          // zoom
          if (scaled_w < target_w) {
            scaled_w = target_w;
            scaled_h = scaled_w / aspect;
          }

          if (scaled_h > target_h) {
            aspect = scaled_w / scaled_h;
            scaled_h = target_h;
            scaled_w = scaled_h * aspect;
          }
        }

        scaled_x = (target_w / 2) - (scaled_w / 2);
        scaled_y = (target_h / 2) - (scaled_h / 2);

        // draw
        ctx.clearRect(0, 0, target_w, target_h);
        ctx.drawImage(source, scaled_x, scaled_y, scaled_w, scaled_h);

        // make link
        $(targetcanvas).parent().attr('href', targetcanvas.toDataURL());
      });

      $('.placeholder').hide();
      $('.drawtarget').show();
    }

    dropzone.make({
      element: "#dropzone",
      formelement: "#sourceimage",
      oninfo: function (filename) {
        console.log(filename);
      },
      ondata: function (dataurl) {
        console.log(dataurl);

        displayOriginal(dataurl);
      }
    });


  });
}());