chatApp.views.AlertView = Backbone.View.extend({

  options: ['type', 'message'],

  initialize: function (options) {
    this.setOptions(options);

    this.template = chatApp.infraestructure.templates.get('alert');

    this.$el.find('div.alert').remove();
  },

  render: function () {
    var data = {
      type: this.type,
      message: this.message
    };
    var compilatedTemplate = _.template(this.template, data);

    this.$el.prepend(compilatedTemplate);

    return this;
  }
});