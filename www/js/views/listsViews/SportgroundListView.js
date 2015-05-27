// Список площадок
define([
    "jquery",
    "underscore",
    "backbone",
    // "jqueryrating",
    "./LayoutListView",
    "text!../../../templates/sportgroundsList.html",
    "text!../../../templates/sportgroundsFilter.html"
], function($, _, Backbone, LayoutListView, sportgroundsListHTML, sportgroundsFilter) {

    var SportgroundsListView = LayoutListView.extend({

        template: _.template(sportgroundsListHTML),

        events: {
            "click .sportground": 'sportground'

        },

        initialize: function() {
            LayoutListView.prototype.initialize.apply(this);
            $('#filter-btn-header').show();
            $('#filterpanel').children().remove();
            $('#filterpanel').html(sportgroundsFilter).trigger("create");
            this.initFilter();
        },

        sportground: function(event) {
            var href = $(event.currentTarget).attr('href');
            // Backbone.history.navigate(href, true);
            $.mobile.navigate(href, true)
        },

        applyFilter: function(e,stars,approved,filterCheckPlace) {
            e.preventDefault();
            filterCheckPlace = $('#filterCheckPlace').val()
            if (filterCheckPlace === 'off') {
                window.localStorage.setItem('station', '');
                window.localStorage.setItem('district', '');
                window.localStorage.setItem('distance', $('#distance').val());
            } else {
                window.localStorage.setItem('station', $("#filter-station").val());
                window.localStorage.setItem('district', $("#filter-district").val());
                window.localStorage.setItem('distance', '');
            }
            window.localStorage.setItem('trainer', $("#filter-trainer").val());
            window.localStorage.setItem('filterCheckPlace', filterCheckPlace);
            window.localStorage.setItem('stars', stars);
            window.localStorage.setItem('sportgroundsQuery', $("#search-sportgroungs").val());
            window.localStorage.setItem('approved', approved);
            $('#filterpanel').panel('close');
            $('.sportgroundlist').children().remove();
            $('.sportgroundlist').remove();
            this.collection.fltr = {'page' : 1};
            this.collection.fetch({reset:true});
            e.preventDefault();
            e.stopPropagation();

        },

        initFilter: function() {
            var self = this;
            var stars, approved;
            $('#filterpanel').on('panelbeforeopen', function(event, ui) {
                approved = (window.localStorage.getItem('approved') === 'true');
                stars = parseInt(window.localStorage.getItem('stars')) || 1;
                $.when(
                    $.ajax('http://free-workout.ru/location/api/district/'),
                    $.ajax('http://free-workout.ru/location/api/subway-station/'),
                    $.ajax('http://free-workout.ru/workout/api/trainers/')
                ).then(function(result1, result2, result3) {
                    var filterCheckPlace = window.localStorage.getItem('filterCheckPlace') || 'off';
                    $('#search-sportgroungs').val(window.localStorage.getItem('sportgroundsQuery') || '')
                    $('#filterCheckPlace').val(filterCheckPlace).attr('selected', true).siblings('option').removeAttr('selected');
                    $('#filterCheckPlace').slider("refresh");
                    $('#starts-form').val(parseInt(window.localStorage.getItem('stars')) || 1);
                    // заполняем select для районов
                    var select_district = $("#filter-district");
                    $.each(result1[0], function(key, district) {
                        select_district.append('<option value="' + district.id + '">' + district.name + '</option>');
                    })
                    select_district.val(window.localStorage.getItem('district') || '').attr('selected', true).siblings('option').removeAttr('selected');
                    select_district.selectmenu("refresh");

                    // заполняем select для метро
                    var select_station = $("#filter-station");
                    $.each(result2[0], function(key, station) {
                        select_station.append('<option value="' + station.id + '">' + station.name + '</option>');
                    })
                    select_station.val(window.localStorage.getItem('station') || '').attr('selected', true).siblings('option').removeAttr('selected');
                    select_station.selectmenu("refresh");

                    if (filterCheckPlace === 'off') {
                        select_district.selectmenu('disable');
                        select_station.selectmenu('disable');
                        $('#distance').slider('enable');
                        $('#distance-filter label').removeClass('disable');
                        $('.filter-metro-district label').addClass('disable');
                    } else {
                        select_district.selectmenu('enable');
                        select_station.selectmenu('enable');
                        $('#distance').slider('disable');
                        $('#distance-filter label').addClass('disable');
                        $('.filter-metro-district label').removeClass('disable');
                    }

                    // заполняем select для тренажеров
                    var select_trainer = $("#filter-trainer");
                    $.each(result3[0], function(key, trainer) {
                        select_trainer.append('<option value="' + trainer.id + '">' + trainer.name + '</option>');
                    })
                    select_trainer.val(window.localStorage.getItem('trainer') || '').attr('selected', true).siblings('option').removeAttr('selected');
                    select_trainer.selectmenu("refresh");

                    var btn = $('#button-like');
                    if (!approved) {
                        btn.removeClass('ui-icon-like ui-btn-icon-left btn-like');
                        btn.text('Все площадки');
                        btn.addClass('btn-all');
                    } else {
                        btn.removeClass('btn-all');
                        btn.text('Одобренные');
                        btn.addClass('ui-icon-like ui-btn-icon-left btn-like');
                    };
                    self.setStars(stars);
                })
            });
            var showFlag = true;
            $('#btn-addedFilter').bind('vclick', function(event) {
                (showFlag) ? $('#addedFilter').show() : $('#addedFilter').hide();
                showFlag = !showFlag;
                event.stopImmediatePropagation();
                event.preventDefault();
            })
            $('#filterCheckPlace').change(function(event, result) {
                var filterCheckPlace = $('#filterCheckPlace').val();
                if (filterCheckPlace === 'off') {
                    $("#filter-district").selectmenu('disable');
                    $("#filter-station").selectmenu('disable');
                    $('#distance').slider('enable');
                    $('#distance-filter label').removeClass('disable');
                    $('.filter-metro-district label').addClass('disable');
                } else {
                    $("#filter-district").selectmenu('enable');
                    $("#filter-station").selectmenu('enable');
                    $('#distance').slider('disable');
                    $('#distance-filter label').addClass('disable');
                    $('.filter-metro-district label').removeClass('disable');
                }
            })

            $('#button-like').bind('vclick', function(event) {
                var btn = $(this);
                if (approved) {
                    btn.removeClass('ui-icon-like ui-btn-icon-left btn-like');
                    btn.text('Все площадки');
                    btn.addClass('btn-all');
                    approved = false
                } else {
                    btn.removeClass('btn-all');
                    btn.text('Одобренные');
                    btn.addClass('ui-icon-like ui-btn-icon-left btn-like');
                    approved = true
                }
                event.stopImmediatePropagation();
                event.preventDefault();
            });
            $('.stars').bind('vclick', function(event) {
                var position = parseInt($(this).data('position'));
                stars = position;
                self.setStars(position);

            });
            // обрабатываем клик по фильтру
            $('#filter-submit').bind('vclick', function(event) {
                //$.mobile.navigate('', true);
                //event.result = false;
                self.applyFilter(event,stars,approved,filterCheckPlace);
                return false
            })
        },

        setStars: function(position) {
            $('#stars-count').text(position);
            $.each($('.stars'), function(key, value) {
                if (parseInt($(value).data('position')) <= position) {
                    $(value).addClass('stars-select')
                } else {
                    $(value).removeClass('stars-select')
                }
            })
        }
    });
    return SportgroundsListView;
})