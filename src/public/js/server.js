chatApp.server = function (socket, view) {

  socket.on('connecting', show(false, 'conectando...'));
  socket.on('reconnecting', show(false, 'reconectando...'));
  socket.on('connect_failed', show(false, 'falha, conectar'));
  socket.on('reconnect_failed', show(false, 'falha, reconectar'));
  socket.on('reconnect', show(true, 'reconectado'));
  socket.on('disconnect', disconnect);
  socket.on('connect', connect);

  function show(connected, message) {
    view.showStatus(connected, message);

    return function () {}
  }

  function disconnect() {
    view.showStatus(false, 'desconectado');

    $(document).trigger('socketConnected', [false]);
  }

  function connect() {
    var room = {
      current: 'global'
    };
    socket.emit('room', room);

    socket.on('connected', connected);
    socket.on('new user', newUser);
    socket.on('user left', userLeft);
    socket.on('new message', newMessage);
    socket.on('sent', sent);
    socket.on('error', error);

    function connected(rooms) {
      view.showStatus(true, 'conectado');
      $(document).trigger('socketConnected', [true]);

      view.fetchRooms(rooms);
    }

    function newUser(message) {
      view.newUser(message);
    }

    function userLeft(message) {
      view.userLeft(message);
    }

    function newMessage(message) {
      var messageView = new chatApp.views.chat.message.FriendMessageView({
        model: message
      });
      view.showMessage(messageView);
    }

    function sent(message) {
      localforage.ready(function () {
        localforage.removeItem(message.key);

        view.markAsSent(message);
      });
    }

    function error(err) {
      if (err == 'handshake unauthorized') {
        $(document).trigger('loginRoute');
      }
    }
  }

};