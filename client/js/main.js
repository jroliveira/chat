require.config({
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                return true;
            }
        }
    },
    
    paths: {
        jquery: 'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        'backbone.viewOptions': 'libs/backbone/backbone.viewOptions',
        order: 'libs/require/order',
        text: 'libs/require/text',
        bootstrap: 'libs/bootstrap/js/bootstrap',
        socketio: '../../socket.io/socket.io',
        'jquery.format': 'libs/jquery.format-1.2/jquery.format-1.2',
        datejs: 'libs/datejs/date',
        'datejs.pt-BR': 'libs/datejs/date-pt-BR',
        localforage: 'libs/localforage/localforage'
    },

    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery']
        },
        socketio: {
            exports: 'io'
        },
        'jquery.format': {
            deps: ['jquery']
        },
        datejs: {
            deps: ['jquery']
        },
        'datejs.pt-BR': {
            deps: ['jquery', 'datejs']
        },
        localforage: {
            exports: 'database'
        }
    }
});

require(['app'], function (app) {
    app.initialize();
});