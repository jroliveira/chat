chatApp.app = function () {

  localforage.config({
    name: 'chat',
    storeName: 'messages',
    description: 'unsent messages'
  });

  Backbone.View.prototype.close = viewClose;
  Backbone.ViewOptions.add(Backbone.View.prototype);

  function viewClose() {
    this.remove();
    this.unbind();

    if (this.onClose) {
      this.onClose();
    }
  }

  var templates = [
		'chat/chat',
		'chat/messages/friend',
		'chat/messages/my',
		'chat/messages/new-user',
		'chat/messages/user-left',
		'login/login',
    'signup/signup',
		'alert'
	];

  chatApp.infraestructure.templates.load(templates, start);

  function start() {
    $(document).trigger('loginRoute');
  }

}();