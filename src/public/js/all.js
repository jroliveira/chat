(function () {
  var jQuery;
  var relativePath = 'http://widget-chat.herokuapp.com';
  var relativePathApi = 'http://widget-chat-api.herokuapp.com';
  //var relativePath = 'http://localhost:4002';
  //var relativePathApi = 'http://localhost:4001';

  if (window.jQuery === undefined || window.jQuery.fn.jquery !== '2.1.1') {
    createScriptReferenceAsync(relativePath + '/public/bower_components/jquery/dist/jquery.js', function () {
      jQuery = window.jQuery.noConflict(true);
      main();
    });
  } else {
    jQuery = window.jQuery;
    main();
  }

  function main() {
    jQuery(document).ready(function ($) {

      var widgetType = $('.widget-container').attr('data-type');
      if (widgetType !== 'chat') return;

      $.ajax({
        type: 'GET',
        url: relativePath + '/',
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function (html) {
          $('.widget-container').html(html);

          loadStyles($);
          loadScripts($);
        },
        error: function (err) {
          console.log(err);
        }
      });

    });
  }

  function loadStyles($) {
    var defer = $.Deferred();

    $.when(
      createStyleReferenceSync(relativePath + '/public/bower_components/bootstrap/dist/css/bootstrap.css', $),
      createStyleReferenceSync(relativePath + '/public/bower_components/jasny-bootstrap/dist/css/jasny-bootstrap.css', $),
      createStyleReferenceSync(relativePath + '/public/css/chat.css', $),
      createStyleReferenceSync(relativePath + '/public/css/offcanvas.css', $)
    ).then(function () {
      defer.resolve();
    });

    return defer.promise();
  }

  function loadScripts($) {
    var defer = $.Deferred();

    /* components */

    $.when(
      createScriptReferenceSync(relativePath + '/public/bower_components/jquery/dist/jquery.js', $)
    ).then(function () {
      $.when(
        createScriptReferenceSync(relativePath + '/public/bower_components/underscore/underscore.js', $),
        createScriptReferenceSync(relativePath + '/public/bower_components/localforage/dist/localforage.js', $),
        createScriptReferenceSync(relativePath + '/public/bower_components/bootstrap/dist/js/bootstrap.js', $),
        createScriptReferenceSync(relativePath + '/public/js/libs/jquery.format-1.2/jquery.format-1.2.js', $),
        createScriptReferenceSync(relativePathApi + '/socket.io/socket.io.js', $)
      ).then(function () {
        $.when(
          createScriptReferenceSync(relativePath + '/public/bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.js', $),
          createScriptReferenceSync(relativePath + '/public/bower_components/backbone/backbone.js', $),
          createScriptReferenceSync(relativePath + '/public/js/libs/datejs/date-pt-BR.js', $)
        ).then(function () {
          $.when(
            createScriptReferenceSync(relativePath + '/public/bower_components/backbone.viewOptions/backbone.viewOptions.js', $)
          ).then(function () {

            /* app */

            $.when(
              createScriptReferenceSync(relativePath + '/public/js/project.js', $)
            ).then(function () {
              $.when(
                createScriptReferenceSync(relativePath + '/public/js/infraestructure/templates.js', $),
                createScriptReferenceSync(relativePath + '/public/js/services/mailslot.js', $),
                createScriptReferenceSync(relativePath + '/public/js/server.js', $),
                createScriptReferenceSync(relativePath + '/public/js/router.js', $)
              ).then(function () {
                $.when(
                  createScriptReferenceSync(relativePath + '/public/js/views/alert.js', $),
                  createScriptReferenceSync(relativePath + '/public/js/views/login/login.js', $),
                  createScriptReferenceSync(relativePath + '/public/js/views/signup/signup.js', $),
                  createScriptReferenceSync(relativePath + '/public/js/views/chat/messages/message.js', $),
                  createScriptReferenceSync(relativePath + '/public/js/views/chat/chat.js', $)
                ).then(function () {
                  $.when(
                    createScriptReferenceSync(relativePath + '/public/js/views/chat/messages/friend.js', $),
                    createScriptReferenceSync(relativePath + '/public/js/views/chat/messages/my.js', $),
                    createScriptReferenceSync(relativePath + '/public/js/views/chat/messages/new-user.js', $),
                    createScriptReferenceSync(relativePath + '/public/js/views/chat/messages/user-left.js', $)
                  ).then(function () {
                    $.when(
                      createScriptReferenceSync(relativePath + '/public/js/app.js', $)
                    ).then(function () {
                      defer.resolve();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

    return defer.promise();
  }

  function createScriptReferenceAsync(scriptUrl, callback) {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", scriptUrl);

    if (scriptTag.readyState) {
      scriptTag.onreadystatechange = function () {
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          callback();
        }
      };
    } else {
      scriptTag.onload = callback;
    }

    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
  }

  function createScriptReferenceSync(scriptUrl, $) {
    var defer = $.Deferred();

    var scriptTag = document.createElement('script');
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", scriptUrl);

    if (scriptTag.readyState) {
      scriptTag.onreadystatechange = function () {
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          defer.resolve();
        }
      };
    } else {
      scriptTag.onload = function () {
        defer.resolve();
      };
    }

    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);

    return defer.promise();
  }

  function createStyleReferenceSync(styleUrl, $) {
    var defer = $.Deferred();

    var styleTag = document.createElement('link');
    styleTag.setAttribute("type", "text/css");
    styleTag.setAttribute("href", styleUrl);
    styleTag.setAttribute("rel", "stylesheet");

    if (styleTag.readyState) {
      styleTag.onreadystatechange = function () {
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          defer.resolve();
        }
      };
    } else {
      styleTag.onload = function () {
        defer.resolve();
      };
    }

    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(styleTag);

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      defer.resolve();
    }

    return defer.promise();
  }
})();