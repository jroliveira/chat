chatApp.app = function () {

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

	chatApp.infraestructure.templates.load([
		'chat/chat',
		'chat/friend-message',
		'chat/my-message',

		'login/login',
	    
        'signup/signup',

		'alert'
	], function () {

		$(document).trigger('loginRoute');

	});

}();