// коллекция спортплощадок

define([
    "jquery",
    "backbone",
    "./LayoutCollection",
    "../models/SportgroundsModel"
], function($, Backbone, LayoutCollection, SportgroundsModel) {

    return LayoutCollection.extend({

        model: SportgroundsModel,

        url: function () {
            var flagFilter = localStorage.getItem('filterCheckPlace') === 'on';
            if (flagFilter) {
                return ["http://free-workout.ru/workout/api/sportgrounds/?page=" + this.fltr.page,
                var district = parseInt(localStorage.getItem('district'));
                if (district !== null){
                    'district='.concat((district === 0) ? district : ''),
                'query=' + (localStorage.getItem('sportgroundsQuery') || ''),
                var subway_station = parseInt(localStorage.getItem('subway_station'));
                if (subway_station !== null){
                    'subway_station='.concat((subway_station === 0) ? subway_station : ''),
                var trainers = parseInt(localStorage.getItem('trainer'));
                if (trainers !== null){
                    'trainers='.concat((trainers === 0) ? trainers : ''),
                'stars='.concat((localStorage.getItem('stars') > 0) ? (localStorage.getItem('stars') - 1) : 0)
                'approved='.concat(localStorage.getItem('approved') || false)
            ].join('&')

            } else {
                return ["http://free-workout.ru/workout/api/sportgrounds/?page=" + this.fltr.page,
                'query='.concat(localStorage.getItem('sportgroundsQuery') || ''),
                'stars='.concat((localStorage.getItem('stars') > 0) ? (localStorage.getItem('stars') - 1) : 0),
                'distance='.concat(localStorage.getItem('distance') || ""),
                'approved='.concat(localStorage.getItem('approved') || false),
                'geotype=target',
                'lat='.concat(localStorage.getItem('lt') || ""),
                'lng='.concat(localStorage.getItem('lg') || "")
            ].join('&')
            }
            
        }
    })
});