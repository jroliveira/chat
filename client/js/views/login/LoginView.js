LoginView = Backbone.View.extend({

	events: {
		'click #submit': 'submit',
		'keypress #password': 'enter'
	},

	initialize: function () {
		this.template = templates.get('login/login');
	},

	render: function () {
		this.$el.html(this.template);

		return this;
	},

	enter: function (e) {
		if (e.keyCode === 13) this.submit(e);
	},

	submit: function (e) {
		e.preventDefault();

		var email = $('#email').val(),
		    password = $('#password').val(),
		    relativePath = $('#relativePath').val();

		$.ajax({
			type: 'POST',
			url: relativePath + '/entrar',
			data: { email: email, password: password },
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function (data) {
				if (!data.success) {
					var alert = new AlertView({ type: data.type, message: data.message, el: $('.panel-body') });
					return alert.render();
				}
				
				$(document).trigger('changeView', [ChatView]);
			},
			error: function (err) {
				console.log(err);
			}
		});
	}

});