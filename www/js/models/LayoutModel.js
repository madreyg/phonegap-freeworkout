define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var LayoutModel = Backbone.Model.extend({
		
		initialize: function(opt) {
			this.fltr = opt
		},

		fltr: {}
				
	});

	return LayoutModel;
});