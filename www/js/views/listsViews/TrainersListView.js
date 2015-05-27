// Список площадок
define([
    "jquery",
    "underscore",
    "backbone",
    "./LayoutListView",
    "text!../../../templates/trainersList.html"
], function($, _, Backbone, LayoutListView, trainersListHTML) {

    var TrainersListView = LayoutListView.extend({

        template: _.template(trainersListHTML),

        events: {

        },

         initialize: function() {
            LayoutListView.prototype.initialize.apply(this);
            $('#filter-btn-header').hide();
            $('#filterpanel').children().remove();
            
        },


    });
    return TrainersListView;
})