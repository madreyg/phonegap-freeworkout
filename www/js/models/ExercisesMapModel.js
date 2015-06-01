define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	return Backbone.Model.extend({

		url: function (id) {
			return 'http://free-workout.ru/workout/api/sportgrounds/?pagination=none&trainers=' + id
		}

	});
});