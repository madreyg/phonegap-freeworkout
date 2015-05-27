// Список площадок
define([
    "jquery",
    "underscore",
    "backbone",
    "../models/TrainersModel",
    "text!../../templates/trainersOne.html"
], function($, _, Backbone, TrainersModel, trainersOneHTML) {

    var TrainersView = Backbone.View.extend({

        // el: $("#content"),
        template: _.template(trainersOneHTML),
        events: {

        },

        initialize: function() {
            $('#filter-btn-header').hide();
            this.listenTo(this.model, "reset", this.render);
        },

        render: function() {
            var data = {
                model: this.model,
                week: [{name:'Понедельник', data:[]}, 
                	   {name:'Вторник', data:[]}, 
                	   {name:'Среда', data:[]}, 
                	   {name:'Четверг', data:[]}, 
                	   {name:'Пятница', data:[]}, 
                	   {name:'Суббота', data:[]}, 
                	   {name:'Воскресенье', data:[]}]                	   
            };
            _.each(this.model.get('exercises'), function(item) {
        		data.week[item.day].data.push(item);
            });
            this.$el.html(this.template(data)).trigger("create");
            return this
        }
    });
    return TrainersView;
})