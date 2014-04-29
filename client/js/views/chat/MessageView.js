define([
    'jquery',
    'underscore',
    'backbone',
    
    'jquery.format'
], function (
    $,
    _,
    Backbone
) {

    var MessageView = Backbone.View.extend({

        tagName: 'li',
        
        render: function () {
            var data = {
                id: this.model.id,
                user: this.model.user,
                letterImage: this.model.user.substring(0, 2),
                date: !this.model.date ? '--/-- --:--' : $.format.date(new Date(this.model.date), "dd/MM hh:mm"),
                message: this.model.msg
            };         
           
            var compilatedTemplate = _.template(this.template, data);
            $(this.el).append(compilatedTemplate);

            return this;
        }

    });

    return MessageView;

});