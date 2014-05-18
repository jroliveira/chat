(function () {
    var jQuery,
        relativePath = 'http://widget-chat.herokuapp.com';
        //relativePath = 'http://localhost:4000';
    
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '2.1.1') {
    	createScriptReferenceAsync(relativePath + '/client/bower_components/jquery/dist/jquery.js', function () {
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
                url: relativePath + '/entrar',
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
            createStyleReferenceSync(relativePath + '/client/bower_components/bootstrap/dist/css/bootstrap.css', $),
            createStyleReferenceSync(relativePath + '/client/css/chat.css', $)
        ).then(function() {
            defer.resolve();
        });
     
        return defer.promise();
    }

    function loadScripts($) {
        var defer = $.Deferred();

    	/* components */

        $.when(
            createScriptReferenceSync(relativePath + '/client/bower_components/jquery/dist/jquery.js', $)
        ).then(function () {
            $.when(
                createScriptReferenceSync(relativePath + '/client/bower_components/underscore/underscore.js', $),
                createScriptReferenceSync(relativePath + '/client/bower_components/localforage/dist/localforage.js', $),
                createScriptReferenceSync(relativePath + '/client/bower_components/bootstrap/dist/js/bootstrap.js', $),
                createScriptReferenceSync(relativePath + '/client/js/libs/jquery.format-1.2/jquery.format-1.2.js', $),
                createScriptReferenceSync(relativePath + '/socket.io/socket.io.js', $)
            ).then(function () {
                $.when(
                    createScriptReferenceSync(relativePath + '/client/bower_components/backbone/backbone.js', $),
                    createScriptReferenceSync(relativePath + '/client/js/libs/datejs/date-pt-BR.js', $)
                ).then(function () {
                    $.when(
                        createScriptReferenceSync(relativePath + '/client/bower_components/backbone.viewOptions/backbone.viewOptions.js', $)
                    ).then(function () {

						/* app */

                    	$.when(
                            createScriptReferenceSync(relativePath + '/client/js/project.js', $)
                        ).then(function () {
                        	$.when(
                    			createScriptReferenceSync(relativePath + '/client/js/infraestructure/templates.js', $),
								createScriptReferenceSync(relativePath + '/client/js/services/mailslot.js', $),
								createScriptReferenceSync(relativePath + '/client/js/server.js', $),
                        		createScriptReferenceSync(relativePath + '/client/js/router.js', $)
							).then(function () {
                        		$.when(
                        			createScriptReferenceSync(relativePath + '/client/js/views/AlertView.js', $),
									createScriptReferenceSync(relativePath + '/client/js/views/login/LoginView.js', $),
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