// Список площадок
define([
    "jquery",
    "underscore",
    "backbone",
    "../models/ExercisesMapModel",
    "text!../../templates/exercisesMap.html"
], function($, _, Backbone, ExercisesMapModel, exercisesMapHTML) {

    var ExercisesMapView = Backbone.View.extend({

        // el: $("#content"),
        template: _.template(exercisesMapHTML),
        events: {

        },

        initialize: function() {
            $('#filter-btn-header').hide();
            this.listenTo(this.model, "reset", this.render);
        },

        render: function() {
            var date = {
                model: this.model,
            };
            this.$el.html(this.template(date)).trigger("create");
            return this
        },
      
    });
    return ExercisesMapView;
})