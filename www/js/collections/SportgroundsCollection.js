// коллекция спортплощадок

define([
    "jquery",
    "backbone",
    "./LayoutCollection",
    "../models/SportgroundsModel"
], function($, Backbone, LayoutCollection, SportgroundsModel) {

    var SportgroundsCollection = LayoutCollection.extend({

        model: SportgroundsModel,

        url: function(fltr) {
            flagFilter = window.localStorage.getItem('filterCheckPlace') === 'on';
            return ["http://free-workout.ru/workout/api/sportgrounds/?page=" + this.fltr.page,
                    'district=' + ((flagFilter) ? window.localStorage.getItem('district') : ''),
                    'query=' + (window.localStorage.getItem('sportgroundsQuery') || ''),
                    'subway_station=' + ((flagFilter) ? window.localStorage.getItem('station'):''),
                    'trainers=' + (window.localStorage.getItem('trainer') || ''),
                    'stars=' + ((window.localStorage.getItem('stars') - 1) || ''),
                    'distance=' + ((flagFilter) ? ('') :window.localStorage.getItem('distance')),
                    'approved=' + (window.localStorage.getItem('approved') || false),
                    'lat=' + ((flagFilter)? ('') : window.localStorage.getItem('lt')),
                    'lng=' + ((flagFilter)? ('') : window.localStorage.getItem('lg'))
                    ].join('&')
        }
    });
    return SportgroundsCollection
})