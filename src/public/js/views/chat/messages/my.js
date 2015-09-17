chatApp.views.chat.message.MyMessageView = chatApp.views.chat.message.MessageView.extend({

  className: 'right clearfix',

  initialize: function () {
    this.template = chatApp.infraestructure.templates.get('chat/messages/my');

    var self = this;

    localforage.ready(getItem);

    function getItem() {
      localforage.getItem('indexes', removeItem);
    }

    function removeItem(index) {
      var key = index + 1;

      localforage.removeItem('indexes', setMessage);

      function setMessage() {
        localforage.setItem('indexes', key);

        var message = {
          id: self.model.id,
          msg: self.model.msg,
          sent: 0
        };

        localforage.setItem(key, message);
      }
    }
  }

});