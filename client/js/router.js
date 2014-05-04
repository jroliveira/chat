define([
    'jquery',
    'backbone',

    'views/chat/ChatView'
], function (
    $,
    Backbone,
    
    ChatView
) {

    var initialize = function () {
        
        this.chatView = new ChatView();
        this.chatView.render();        
        
        Backbone.history.start({ pushState: true, root: '/' });
        
    };

    return { initialize: initialize };

});