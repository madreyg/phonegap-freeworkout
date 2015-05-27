define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var ExercisesMapModel = Backbone.Model.extend({
		
		url: function(id) {
			return 'http://free-workout.ru/workout/api/sportgrounds/?pagination=none&trainers=' + this.id	
		} 
		
	});

	return ExercisesMapModel;
});