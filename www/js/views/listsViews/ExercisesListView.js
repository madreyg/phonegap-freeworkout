// Список площадок
define([
    "jquery",
    "underscore",
    "backbone",
    "./LayoutListView",
    "text!../../../templates/exercisesList.html",
    "text!../../../templates/exercisesFilter.html"
], function($, _, Backbone, LayoutListView, exercisesListHTML, exercisesFilter) {

    var ExercisesListView = LayoutListView.extend({

        template: _.template(exercisesListHTML),

        events: {
            "click .exercises": 'exercises'
        },

        initialize: function() {
            LayoutListView.prototype.initialize.apply(this);
            $('#filter-btn-header').show();
            $('#filterpanel').children().remove();
            $('#filterpanel').html(exercisesFilter).trigger("create");
            this.initFilter();
        },

        exercises: function(event) {
            var href = $(event.currentTarget).attr('href');
            // Backbone.history.navigate(href, true);
            $.mobile.navigate(href, true)
        },

        applyFilter: function(e) {
        	e.preventDefault();
        	e.stopPropagation();
            window.localStorage.setItem('exercise_trainer', $("#filter-trainer").val());
            window.localStorage.setItem('muscle', $("#filter-muscle").val());

            $('#filterpanel').panel('close');
            $('.exerciseslist').children().remove();
            $('.exerciseslist').remove();
            this.collection.fltr = {'page' : 1};
            this.collection.fetch({reset:true});
        },

        initFilter: function() {
            var self = this;
            $('#filterpanel').on('panelbeforeopen', function(event, ui) {
                $.when(
                    $.ajax('http://free-workout.ru/workout/api/muscles/'),
                    $.ajax('http://free-workout.ru/workout/api/trainers/')
                ).then(function(result1, result2) {

                    // заполняем select для тренажеров
                    var select_trainer = $("#filter-trainer");
                    $.each(result2[0], function(key, trainer) {
                        select_trainer.append('<option value="' + trainer.id + '">' + trainer.name + '</option>');
                    })
                    select_trainer.val(window.localStorage.getItem('exercise_trainer') || '').attr('selected', true).siblings('option').removeAttr('selected');
                    select_trainer.selectmenu("refresh");

                    // заполняем select для мышц
                    var select_muscle = $("#filter-muscle");
                    $.each(result1[0], function(key, muscle) {
                        select_muscle.append('<option value="' + muscle.id + '">' + muscle.name + '</option>');
                    })
                    select_muscle.val(window.localStorage.getItem('muscle') || '').attr('selected', true).siblings('option').removeAttr('selected');
                    select_muscle.selectmenu("refresh");

                })
            });

            // обрабатываем клик по фильтру
             // обрабатываем клик по фильтру
            $('#filter-submit').bind('vclick', function(event) {
                //$.mobile.navigate('', true);
                //event.result = false;
                self.applyFilter(event);
                return false
            })
        }

    });
    return ExercisesListView;
})