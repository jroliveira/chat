Backbone.View.prototype.close = function () {
    this.remove();
    this.unbind();
    if (this.onClose) {
        this.onClose();
    }
};

Backbone.ViewOptions.add(Backbone.View.prototype);

localforage.config({
    name: 'chat',
    storeName: 'messages',
    description: 'unsent messages'
});

var view;

$(document).on('changeView', function (event, View) {
	if (view) view.close();

	view = new View;

	var content = view.render();
	$('.chat').html(content.el);
});

templates.load([
	'chat/chat', 
	'chat/friend-message',
	'chat/my-message',

	'login/login',
		
	'alert'
], function () {

	$(document).trigger('changeView', [LoginView]);
	
});
