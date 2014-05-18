chatApp.infraestructure.templates = {

	loaded: {},

	load: function (names, callback) {
		var self = this;

		var loadTemplate = function (index) {
			var name = names[index],
				relativePath = $('#relativePath').val();

			$.get(relativePath + '/client/js/templates/' + name + '.html', function (data) {
				self.loaded[name] = data;

				index++;
				if (index < names.length) {
					loadTemplate(index);
				} else {
					callback();
				}
			});
		};

		loadTemplate(0);
	},

	get: function (name) {
		return this.loaded[name];
	}

};