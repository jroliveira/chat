(function () {
    var jQuery,
        //relativePath = 'http://widget-chat.herokuapp.com';
        relativePath = 'http://localhost:4000';
    
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.10.2') {
        createScriptReferenceAsync(relativePath + '/client/js/libs/jquery/jquery.js', function () {
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
            createStyleReferenceSync(relativePath + '/client/js/libs/bootstrap/css/bootstrap.css', $),
            createStyleReferenceSync(relativePath + '/client/css/chat.css', $)
        ).then(function() {
            defer.resolve();
        });
     
        return defer.promise();
    }

    function loadScripts($) {
        var defer = $.Deferred();

        $.when(
            createScriptReferenceSync(relativePath + '/client/js/libs/jquery/jquery.js', $)
        ).then(function () {
            $.when(
                createScriptReferenceSync(relativePath + '/client/js/libs/underscore/underscore.js', $),
                createScriptReferenceSync(relativePath + '/client/js/libs/localforage/localforage.js', $),
                createScriptReferenceSync(relativePath + '/client/js/libs/bootstrap/js/bootstrap.js', $),
                createScriptReferenceSync(relativePath + '/client/js/libs/jquery.format-1.2/jquery.format-1.2.js', $),
                createScriptReferenceSync(relativePath + '/socket.io/socket.io.js', $)
            ).then(function () {
                $.when(
                    createScriptReferenceSync(relativePath + '/client/js/libs/backbone/backbone.js', $),
                    createScriptReferenceSync(relativePath + '/client/js/libs/datejs/date-pt-BR.js', $)
                ).then(function () {
                    $.when(
                        createScriptReferenceSync(relativePath + '/client/js/libs/backbone/backbone.viewOptions.js', $)
                    ).then(function () {
                        $.when(
                            createScriptReferenceSync(relativePath + '/client/js/views/chat/mailslot.js', $)
                        ).then(function () {
                            $.when(
                                createScriptReferenceSync(relativePath + '/client/js/views/chat/message/MessageView.js', $),
                                createScriptReferenceSync(relativePath + '/client/js/views/chat/ChatView.js', $)
                            ).then(function () {
                                $.when(
                                    createScriptReferenceSync(relativePath + '/client/js/views/chat/message/FriendMessageView.js', $),
                                    createScriptReferenceSync(relativePath + '/client/js/views/chat/message/MyMessageView.js', $)
                                ).then(function () {
                                    $.when(
                                        createScriptReferenceSync(relativePath + '/client/js/app.js', $)
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
        
        return defer.promise();
    }

    function createScriptReferenceAsync(scriptUrl, callback) {
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
    
    function createScriptReferenceSync(scriptUrl, $) {
        var defer = $.Deferred();

        var scriptTag = document.createElement('script');
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", scriptUrl);

        if (scriptTag.readyState) {
            scriptTag.onreadystatechange = function() {
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    defer.resolve();
                }
            };
        } else {
            scriptTag.onload = function() {
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