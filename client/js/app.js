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

localforage.config({
    name: 'chat',
    storeName: 'messages',
    description: 'unsent messages'
});

var chatView = new ChatView();
chatView.render();