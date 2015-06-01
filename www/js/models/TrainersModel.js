define([
    'underscore',
    'backbone',
    './LayoutModel'
], function (_, Backbone, LayoutModel) {
    'use strict';

    return LayoutModel.extend({

        urlRoot: 'http://free-workout.ru/workout/api/workouts/'

    });
});