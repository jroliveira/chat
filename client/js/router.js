chatApp.router = function () {

	var view;

	function changeView(View, callback) {
		if (view) view.close();

		view = new View;
		var content = view.render();
		$('.chat').html(content.el);

		if (callback) callback();
	}

	$(document).on('chatRoute', function (event) {
		var relativePath = $('#relativePath').val(),
			socket = io.connect(relativePath);

		chatApp.services.mailslot.initialize(socket);

		changeView(chatApp.views.chat.ChatView, function () {
			chatApp.server(socket, view);
		});
	});

	$(document).on('loginRoute', function (event) {
		changeView(chatApp.views.login.LoginView, null);
	});

}();