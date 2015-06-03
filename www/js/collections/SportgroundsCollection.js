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
            return ["http://free-workout.ru/workout/api/sportgrounds/?page=" + this.fltr.page,
                'district=' + ((flagFilter && localStorage.getItem('district') !== 0) ? localStorage.getItem('district') : ''),
                'query=' + (localStorage.getItem('sportgroundsQuery') || ''),
                'subway_station=' + ((flagFilter && localStorage.getItem('station') !== 0) ? localStorage.getItem('station') : ''),
                'trainers=' + (localStorage.getItem('trainer') || ''),
                'stars=' + ((localStorage.getItem('stars') > 0) ? (localStorage.getItem('stars') - 1) : 0),
                'distance=' + ((flagFilter )  ? ('') : localStorage.getItem('distance') || ""),
                'approved=' + (localStorage.getItem('approved') || false),
                'geotype=' + ((!flagFilter) ? 'target' : ""),
                'lat=' + ((flagFilter) ? ('') : localStorage.getItem('lt') || ""),
                'lng=' + ((flagFilter) ? ('') : localStorage.getItem('lg') || "")
            ].join('&')
        }
    })
});