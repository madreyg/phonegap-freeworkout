// коллекция спортплощадок

define([
    "jquery",
    "backbone",
    "./LayoutCollection",
    "../models/ExercisesModel"
], function($, Backbone, LayoutCollection, ExercisesModel) {

    var ExercisesCollection = LayoutCollection.extend({

        url: function(fltr) {
            return ["http://free-workout.ru/workout/api/exercises/?page=" + this.fltr.page,
                    'trainers=' + (window.localStorage.getItem('exercise_trainer') || ''),
                    'muscles=' + (window.localStorage.getItem('muscle') || '')
                    ].join('&')
        },

        model: ExercisesModel
        
    })
    return ExercisesCollection
})