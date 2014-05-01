define([
    'jquery',
    'backbone',

    'views/chat/ChatView',
    'views/home/IndexView'
], function (
    $,
    Backbone,
    
    ChatView,
    HomeIndexView
) {

    var AppRouter = Backbone.Router.extend({
        
        routes: {
            '*actions': 'defaultAction'
        },
        
        showView: function (selector, view, menu) {  
            $('.nav > li.active').removeClass('active');
            $('#' + menu).parent().addClass('active');
            
            if (this.currentView) this.currentView.close();

            var container = view.render();
            $(selector).html(container.el);
            
            this.currentView = view;
        }
        
    });

    var initialize = function () {
        
        this.chatView = new ChatView();
        this.chatView.render();        
        
        var appRouter = new AppRouter;
        
        appRouter.on('route:defaultAction', function () {
            var view = new HomeIndexView;
            this.showView('article', view, '');
        });
        
        Backbone.history.start({ pushState: true, root: '/' });
        
    };

    return { initialize: initialize };

});