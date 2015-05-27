define([
	'underscore',
	'backbone',
	'./LayoutModel'
], function (_, Backbone, LayoutModel) {
	'use strict';

	var ExercisesModel = LayoutModel.extend({
		
		urlRoot: 'http://free-workout.ru/workout/api/exercises/'
		
	});

	return ExercisesModel;
});