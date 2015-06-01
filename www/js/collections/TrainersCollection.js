// коллекция тренировок

define([
    "jquery",
    "backbone",
    "./LayoutCollection",
    "../models/TrainersModel"
], function($, Backbone, LayoutCollection, TrainersModel) {

    return LayoutCollection.extend({

        url: function () {
            return "http://free-workout.ru/workout/api/workouts/?page=" + this.fltr.page
        },

        model: TrainersModel
    })
});