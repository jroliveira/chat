chatApp.router = function () {

  var view;

  function changeView(View, callback) {
    if (view) {
      view.close();
    }

    view = new View;
    var content = view.render();
    $('.chat').html(content.el);

    if (callback) {
      callback();
    }
  }

  $(document).on('loginRoute', loginRoute);
  $(document).on('signupRoute', signupRoute);
  $(document).on('chatRoute', chatRoute);

  function loginRoute(event) {
    changeView(chatApp.views.login.LoginView, null);
  }

  function signupRoute(event) {
    changeView(chatApp.views.signup.SignupView, null);
  }

  function chatRoute(event) {
    var relativePathApi = $('#relativePathApi').val();
    var socket = io.connect(relativePathApi);

    chatApp.services.mailslot.initialize(socket);

    changeView(chatApp.views.chat.ChatView, serverStart);

    function serverStart() {
      chatApp.server(socket, view);
    }
  }

}();