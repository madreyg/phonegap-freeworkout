// коллекция тренировок

define([
    "jquery",
    "backbone",
    "./LayoutCollection",
    "../models/TrainersModel"
], function($, Backbone, LayoutCollection, TrainersModel) {

    var TrainersCollection = LayoutCollection.extend({

        url: function(fltr) {
            return "http://free-workout.ru/workout/api/workouts/?page=" + this.fltr.page
        },

        model: TrainersModel
        
    })
    return TrainersCollection
})