define([
    'underscore',
    'backbone',
    'localforage',

    'router',
    
    'text!templates/loading.html',
    'backbone.viewOptions'
], function (
    _,
    Backbone,
    database,
    
    router,
     
    templateLoading
) {

    Backbone.View.prototype.close = function () {
        this.remove();
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    };

    Backbone.ViewOptions.add(Backbone.View.prototype);

    _.each(["Model", "Collection"], function(name) {
        var ctor = Backbone[name];
        var fetch = ctor.prototype.fetch;
        ctor.prototype.fetch = function() {
            $('article').html(templateLoading);
            this.trigger("fetch", this);
            return fetch.apply(this, arguments);
        };
    });

    database.config({
        name: 'chat',
        storeName: 'messages',
        description: 'unsent messages'
    });

    var initialize = function () {        
        router.initialize();
    };

    return {
        initialize: initialize
    };
    
});