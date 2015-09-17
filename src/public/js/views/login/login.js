chatApp.views.login.LoginView = Backbone.View.extend({

  events: {
    'click #submit': 'submit',
    'click #signup': 'signup',
    'keypress #password': 'enter'
  },

  initialize: function () {
    this.template = chatApp.infraestructure.templates.get('login/login');
  },

  render: function () {
    this.$el.html(this.template);

    return this;
  },

  enter: function (e) {
    if (e.keyCode === 13) {
      this.submit(e);
    }
  },

  signup: function (e) {
    e.preventDefault();

    $(document).trigger('signupRoute');
  },

  submit: function (e) {
    e.preventDefault();

    var email = $('#email').val();
    var password = $('#password').val();
    var relativePathApi = $('#relativePathApi').val();

    $.ajax({
      type: 'POST',
      url: relativePathApi + '/entrar',
      data: {
        email: email,
        password: password
      },
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: success,
      error: error
    });

    function success(data) {
      if (data.success) {
        $(document).trigger('chatRoute');
        return;
      }

      var alert = new chatApp.views.AlertView({
        type: data.type,
        message: data.message,
        el: $('.panel-body')
      });

      alert.render();
    }

    function error(err) {
      console.log(err);
    }
  }

});