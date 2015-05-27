define([
	'underscore',
	'backbone',
	'./LayoutModel'
], function (_, Backbone, LayoutModel) {
	'use strict';

	var SportgroundsModel = LayoutModel.extend({
		
		urlRoot: 'http://free-workout.ru/workout/api/sportgrounds/',

		/*initialize: function() {
			SportgroundsModel.__super__.initialize.apply(this, arguments)
		},*/
		
	});

	return SportgroundsModel;
});