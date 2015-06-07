// коллекция спортплощадок

define([
    "jquery",
    "backbone",
    "./LayoutCollection",
    "../models/SportgroundsModel"
], function ($, Backbone, LayoutCollection, SportgroundsModel) {

    return LayoutCollection.extend({

            model: SportgroundsModel,

            url: function () {
                var flagFilter = localStorage.getItem('filterCheckPlace') === 'on';
                var result = undefined;
                if (flagFilter) {
                    result =  ["http://free-workout.ru/workout/api/sportgrounds/?page=" + this.fltr.page,
                        this.getDistrict(),
                        'query=' + (localStorage.getItem('sportgroundsQuery') || ''),
                        this.getSubwayStation(),
                        this.getTrainers(),
                        'stars='.concat((localStorage.getItem('stars') > 0) ? (localStorage.getItem('stars') - 1) : 0),
                        'approved='.concat(localStorage.getItem('approved') || false)
                    ].
                        join('&')

                } else {
                    var str_tmp = '';
                    if (localStorage.getItem('lt')){
                        str_tmp = 'geotype=target'+'&'+
                            'lat='.concat(localStorage.getItem('lt') || "")+'&'+
                            'lng='.concat(localStorage.getItem('lg') || "")+'&'+
                            'distance='.concat(localStorage.getItem('distance') || "")
                    }
                    result =  ["http://free-workout.ru/workout/api/sportgrounds/?page=" + this.fltr.page,
                        'query='.concat(localStorage.getItem('sportgroundsQuery') || ''),
                        'stars='.concat((localStorage.getItem('stars') > 0) ? (localStorage.getItem('stars') - 1) : 0),
                        'approved='.concat(localStorage.getItem('approved') || false),
                        this.getTrainers(),
                        str_tmp
                    ].join('&')
                }
                alert(result);
                return result

            },
            getDistrict: function () {
                var district = localStorage.getItem('district');
                if (district !== null && !isNaN(district)) {
                    return ('district='.concat(district))
                } else {
                    return ''
                }
            },

            getSubwayStation: function () {
                var subway_station = localStorage.getItem('subway_station');
                if (subway_station !== null && !isNaN(subway_station)) {
                    return ('subway_station='.concat(subway_station))
                } else {
                    return ''
                }
            },
            getTrainers: function () {
                var trainers = localStorage.getItem('trainer');
                if (trainers !== null && !isNaN(trainers)) {
                    return ('trainers='.concat(trainers))
                } else {
                    return ''
                }
            }
        }
    )
});
