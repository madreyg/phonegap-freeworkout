// Список площадок
define([
    "jquery",
    "underscore",
    "backbone",
    "../models/ExercisesModel",
    "text!../../templates/exercisesOne.html"
], function($, _, Backbone, ExercisesModel, exercisesOneHTML) {

    var ExercisesView = Backbone.View.extend({

        // el: $("#content"),
        template: _.template(exercisesOneHTML),
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
    return ExercisesView;
})