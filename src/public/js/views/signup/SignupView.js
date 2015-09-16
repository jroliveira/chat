chatApp.views.signup.SignupView = Backbone.View.extend({

	events: {
	    'click #submit': 'submit',
	    'click #back': 'back',
	    'keypress #confirmPassword': 'enter'
	},

	initialize: function () {
	    this.template = chatApp.infraestructure.templates.get('signup/signup');
	},

	render: function () {
		this.$el.html(this.template);

		return this;
	},

	enter: function (e) {
		if (e.keyCode === 13) this.submit(e);
	},
	
	back: function (e) {
	    e.preventDefault();
	    
	    $(document).trigger('loginRoute');
	},

	submit: function (e) {
		e.preventDefault();

		var email = $('#email').val(),
		    password = $('#password').val(),
		    confirmPassword = $('#confirmPassword').val(),
		    relativePathApi = $('#relativePathApi').val();

		$.ajax({
			type: 'POST',
			url: relativePathApi + '/criar-conta',
			data: { email: email, password: password, confirmPassword: confirmPassword },
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function (data) {
			    var alert = new chatApp.views.AlertView({ type: data.type, message: data.message, el: $('.panel-body') });
			    alert.render();
			},
			error: function (err) {
				console.log(err);
			}
		});
	}

});