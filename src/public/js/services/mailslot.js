chatApp.services.mailslot = function () {

  var server;
  var connected = false;

  return {
    initialize: initialize,
    connected: socketConnected
  };

  function initialize(socket) {
    $(document).on('socketConnected', $.proxy(socketConnected, this));

    server = socket;

    verify();
  }

  function socketConnected(event, isConnected) {
    connected = isConnected;

    verify();
  }

  function verify() {
    if (!connected) {
      return;
    }

    localforage.length(getKeys);

    setTimeout(verify, 5000);
  }

  function getKeys(length) {
    for (var i = 0; i < length; ++i) {
      localforage.key(i, getItem);
    }
  }

  function getItem(key) {
    if (key == 'indexes') {
      return;
    }

    localforage.getItem(key, send);

    function send(message) {
      if (message.sent === 1) {
        return;
      }

      var newMessage = {
        id: message.id,
        msg: message.msg,
        key: key
      };

      server.emit('new message', newMessage);

      message.sent = 1;

      localforage.removeItem(key, function () {
        localforage.setItem(key, message);
      });
    }
  }

}();