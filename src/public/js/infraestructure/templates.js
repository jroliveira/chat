chatApp.infraestructure.templates = {

  loaded: {},

  load: function (names, callback) {
    var self = this;

    loadTemplate(0);

    function loadTemplate(index) {
      var name = names[index];
      var relativePath = $('#relativePath').val();

      $.get(relativePath + '/public/js/templates/' + name + '.html', saveTemplate);

      function saveTemplate(data) {
        self.loaded[name] = data;

        index++;
        if (index < names.length) {
          loadTemplate(index);
        } else {
          callback();
        }
      }
    }
  },

  get: function (name) {
    return this.loaded[name];
  }

};