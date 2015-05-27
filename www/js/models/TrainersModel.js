define([
	'underscore',
	'backbone',
	'./LayoutModel'
], function (_, Backbone, LayoutModel) {
	'use strict';

	var TrainersModel = LayoutModel.extend({
		
		urlRoot: 'http://free-workout.ru/workout/api/workouts/'
		
	});

	return TrainersModel;
});