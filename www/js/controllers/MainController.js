define([
    "jquery",
    "backbone",
    // "jqueryrati\ng",
    "../models/SportgroundsModel",
    "../models/ExercisesModel",
    "../models/ExercisesMapModel",
    "../models/TrainersModel",

    "../views/listsViews/SportgroundListView",
    "../views/SportgroundView",
    "../views/listsViews/ExercisesListView",
    "../views/ExercisesView",
    "../views/ExercisesMapView",
    "../views/listsViews/TrainersListView",
    "../views/TrainersView",

    "../collections/SportgroundsCollection",
    "../collections/ExercisesCollection",
    "../collections/TrainersCollection",

    "text!../../templates/exercisesMap.html",
    "text!../../templates/sendersForm.html"
], function ($,
             Backbone,
             SportgroundsModel,
             ExercisesModel,
             ExercisesMapModel,
             TrainersModel,
             SportgroundListView,
             SportgroundView,
             ExercisesListView,
             ExercisesView,
             ExercisesMapView,
             TrainersListView,
             TrainersView,
             SportgroundsCollection,
             ExercisesCollection,
             TrainersCollection,
             exercisesMap,
             sendersForm) {
    return {

        home: function () {
            // Show's the jQuery Mobile loading icon
            $.mobile.loading("show");
            var collection = new SportgroundsCollection();

            var sportgroundsListView = new SportgroundListView({
                collection: collection
            });
            $('#header').find('h1').text("Спортплощадки");
            collection.fetch({
                reset: true,
                // dataType: 'jsonp',
                success: function () {
                    $.mobile.loading("hide");
                    $("#content").html(sportgroundsListView.render().$el).trigger("create");
                    $('#container').page('destroy').page();
                },
                error: function (collection, response) {
                    alert('Не удалось получить данные с сервера.' + response);
                    $.mobile.loading("hide");
                }
            });
        },

        sportgroundsDetail: function (id) {
            // Show's the jQuery Mobile loading icon
            $.mobile.loading("show");
            var model = new SportgroundsModel({
                'id': id
            });

            var sportgroundView = new SportgroundView({
                model: model
            });
            $('#header').find('h1').text("Спортплощадка");
            model.fetch({
                reset: false,
                // dataType: 'jsonp',
                success: function () {
                    $.mobile.loading("hide");
                    $("#content").html(sportgroundView.render().$el).trigger("create");
                },
                error: function (model, response) {
                    alert('Не удалось получить данные с сервера.' + response);
                    $.mobile.loading("hide");
                }
            });
            // sportgroundView.render();

        },

        exercisesList: function () {
            // Show's the jQuery Mobile loading icon
            $.mobile.loading("show");
            var collection = new ExercisesCollection();

            var exercisesListView = new ExercisesListView({
                collection: collection
            });
            $('#header').find('h1').text("Упражнения");
            collection.fetch({
                reset: true,
                // dataType: 'jsonp',
                success: function () {
                    $.mobile.loading("hide");
                    $("#content").html(exercisesListView.render().$el).trigger("create");
                    $('#container').page('destroy').page();
                    $('.ui-content').css('padding', 0);
                },
                error: function (collection, response) {
                    alert('Не удалось получить данные с сервера.' + response);
                    $.mobile.loading("hide");
                }
            });
        },

        exercisesDetail: function (id) {
            // Show's the jQuery Mobile loading icon
            $.mobile.loading("show");
            var model = new ExercisesModel({
                'id': id
            });

            var exercisesView = new ExercisesView({
                model: model
            });
            $('#header').find('h1').text("Упражнение");
            model.fetch({
                reset: false,
                // dataType: 'jsonp',
                success: function () {
                    $.mobile.loading("hide");
                    $("#content").html(exercisesView.render().$el).trigger("create");
                },
                error: function (model, response) {
                    alert('Не удалось получить данные с сервера.' + response);
                    $.mobile.loading("hide");
                }
            });
            // sportgroundView.render();

        },

        sportgroundsMap: function (id, lt, lg, address) {
            $.mobile.loading("hide");
            $('#header').find('h1').text("Расположение");
            $('#content').html(exercisesMap).trigger("create");
            $(document).ready(
                ymaps.ready(function () {
                    $("#executormap").css('height', $(window).height()).css('width', $(window).width());
                    //$("#executormap").css('width', $(window).width());

                    //var coordinates = JSON.parse(event.currentTarget.getAttribute('data-map'));
                    var coordinates = [parseFloat(lt), parseFloat(lg)];
                    //var address = event.currentTarget.getAttribute('data-address');
                    var myMap = new ymaps.Map("executormap", {
                        center: coordinates,
                        zoom: 13
                    });
                    myMap.geoObjects.add(new ymaps.Placemark(coordinates, {
                        balloonContent: address
                    }, {
                        preset: 'islands#dotIcon',
                        iconColor: '#735184',
                        balloonCloseButton: true,
                        hideIconOnBalloonOpen: false
                    }));
                    myMap.container.fitToViewport();
                    $('#content-map').css('display', 'none');

                    $('.ui-icon-back').attr('href', '#exercises').one('vclick', function (e) {
                        $.mobile.navigate("#sport-grounds", true);
                        e.preventDefault();
                    });
                    $('.map-header-text').text('Расположение спортплощадки');
                }));
        },

        exercisesMap: function (id) {
            $.mobile.loading("show");
            var model = new ExercisesMapModel({
                'id': id
            });

            var exercisesMapView = new ExercisesMapView({
                model: model
            });
            $('#header').find('h1').text("Расположение");
            model.fetch({
                reset: false,
                // dataType: 'jsonp',
                success: function (model, response) {
                    $.mobile.loading("hide");
                    $("#content").html(exercisesMapView.render().$el).trigger("create");
                    $(document).ready(
                        ymaps.ready(function () {
                            $("#executormap").css('height', $(window).height()).css('width', $(window).width());
                            var myMap = new ymaps.Map("executormap", {
                                center: [59.94882257, 30.30817193],
                                zoom: 10
                            });
                            $.each(response, function (index, sportground) {
                                myMap.geoObjects.add(new ymaps.Placemark([sportground.point.lat, sportground.point.lng], {
                                    balloonContent: sportground.address,
                                    balloonPanelMaxMapArea: 0
                                }, {
                                    preset: 'islands#dotIcon',
                                    iconColor: '#735184',
                                    balloonCloseButton: true,
                                    hideIconOnBalloonOpen: false
                                }));
                            })
                        }));
                    $('#content-map').css('display', 'none');

                    $('.ui-icon-back').attr('href', '#exercises').one('vclick', function () {
                        $.mobile.navigate("#exercises", true);
                    });
                    $('.map-header-text').text('Расположение спортплощадок');
                },
                error: function (model, response) {
                    alert('Не удалось получить данные с сервера. ' + response)
                }
            });
            // sportgroundView.render();
        },


        trainersList: function () {
            // Show's the jQuery Mobile loading icon
            $.mobile.loading("show");
            var collection = new TrainersCollection();

            var trainersListView = new TrainersListView({
                collection: collection
            });
            $('#header').find('h1').text("Тренировки");
            collection.fetch({
                reset: true,
                // dataType: 'jsonp',
                success: function () {
                    $.mobile.loading("hide");
                    $("#content").html(trainersListView.render().$el).trigger("create");
                },
                error: function (collection, response) {
                    alert('Не удалось получить данные с сервера.' + response);
                    $.mobile.loading("hide");
                }
            });
            //sportgroundsListView.render();    
        },

        trainersDetail: function (id) {
            // Show's the jQuery Mobile loading icon
            $.mobile.loading("show");
            var model = new TrainersModel({
                'id': id
            });

            var trainersView = new TrainersView({
                model: model
            });
            $('#header').find('h1').text("Тренировка");
            model.fetch({
                reset: false,
                // dataType: 'jsonp',
                success: function () {
                    $.mobile.loading("hide");
                    $("#content").html(trainersView.render().$el).trigger("create");
                },
                error: function (model, response) {
                    alert('Не удалось получить данные с сервера.' + response);
                    $.mobile.loading("hide");
                }
            });

        },
        senders: function () {
            $.mobile.loading("hide");
            $('#header').find('h1').text("Расположение");
            $('#content').html(sendersForm).trigger("create");
            $('#form-sender').validate({
                rules: {
                    sender: {
                        required: true
                    },
                    message: {
                        required: true
                    },
                    email: {
                        required: true
                    }
                },
                messages: {
                    sender: {
                        required: "Введите ФИО."
                    },
                    message: {
                        required: "Введите сообщение."
                    },
                    email: {
                        required: "Введите email."
                    }
                },
                errorPlacement: function (error, element) {
                    error.appendTo(element.parent().prev());
                },
                submitHandler: function (form) {
                    var email = $(form).find("#email").val(),
                        sender = $(form).find("#sender").val(),
                        message = $(form).find("#message").val(),
                        subject = $(form).find("#subject").val(),
                        data = {email: email, sender: sender, message: message, subject: subject};
                    $.ajax({
                        type: 'POST',
                        data: data,
                        url: 'http://free-workout.ru/feedback/api/request/',
                        success: function () {
                            $('#content').html('<h3>Спасибо за помощь в развитии проекта. Ваше предложение/спортплощадка отправлены.</h3>')
                        },
                        error: function() {
                            alert('Не удалось отправить сообщение. Отсутствует подключение к интернету.')
                        }
                    });
                    return false;
                }
            });
        },

        default: function () {
            alert("нет такого урла")
        }

    }
});