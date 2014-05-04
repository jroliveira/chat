(function () {
    var jQuery;
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.10.2') {
        createScriptReference('http://widget-chat.herokuapp.com/client/js/libs/jquery/jquery.js', function () {
            jQuery = window.jQuery.noConflict(true);
            main();
        });
    } else {
        jQuery = window.jQuery;
        main();
    }

    function main() {
        jQuery(document).ready(function ($) {

            var relativePath = 'http://widget-chat.herokuapp.com';

            $.when(

                createStyleReference(relativePath + '/client/js/libs/bootstrap/css/bootstrap.css', $),
                createStyleReference(relativePath + '/client/css/chat.css', $)
            
             ).then(function () {

                 var widgetType = $('.widget-container').attr('data-type');
                 if (widgetType !== 'chat') return;

                 var email = $('.widget-container').attr('data-email'),
                     password = $('.widget-container').attr('data-password');

                 $.ajax({
                    type: 'POST',
                    url: relativePath + '/bate-papo',
                    data: { email: email, password: password },
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (html) {
                        $('.widget-container').html(html);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                 });

             });
            
        });
    }

    function createScriptReference(scriptUrl, callback) {
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", scriptUrl);

        if (scriptTag.readyState) {
            scriptTag.onreadystatechange = function () {
                if (this.readyState == 'complete' || this.readyState == 'loaded') { callback(); }
            };
        } else { scriptTag.onload = callback; }

        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
    }

    function createStyleReference(styleUrl, $) {
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
            styleTag.onload = function() {
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