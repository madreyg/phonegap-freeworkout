define([
    "jquery",
    "backbone",
    "../controllers/MainController"
], function($, Backbone, MainController) {
    var Router = Backbone.Router.extend({

        // Constructor
        initialize: function() {
            // this.checkConnection();
            //Required for Backbone to start listening to hashchange events
            Backbone.history.start();
            $("#menu-sportgrounds").bind("vclick", "p", function() {
                $.mobile.navigate("#sport-grounds", true);
                $('#navpanel').panel("close");
            });
            $("#menu-exercises").bind("vclick", "p", function() {
                $.mobile.navigate("#exercises", true);
                $('#navpanel').panel("close");
            });
            $("#menu-trainers").bind("vclick", "p", function() {
                $.mobile.navigate("#trainers", true);
                $('#navpanel').panel("close");
            });
             $("#menu-senders").bind("vclick", "p", function() {
                $('#navpanel').panel("close");
            });
            $("#menu-exit").bind("vclick", 'p', function() {
                navigator.app.exitApp();
            });
            $("#btn-reload").bind("vclick", '[id="btn-reload]', function() {
                var newFragment = Backbone.history.location.hash;
                $(this).attr('href', newFragment);
                // Backbone.history.navigate(newFragment, true);
                Backbone.history.stop();
                Backbone.history.start();
                // $.mobile.navigate(newFragment, true);
            });


            navigator.geolocation.getCurrentPosition(this.onSuccessGeolocation, this.onErrorGeolocation, {
                timeout: 15000, enableHighAccuracy: true
            });
        },

        checkConnection: function() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';

            alert('Connection type: ' + states[networkState]);
        },

        onSuccessGeolocation: function(position) {
            window.localStorage.setItem('lt', position.coords.latitude);
            window.localStorage.setItem('lg', position.coords.longitude);
        },

        onErrorGeolocation: function(error) {
            alert('Не удалось получить данные геолокации.' + error);
            window.localStorage.setItem('filterCheckPlace', 'on');
        },

        routes: {

            '': 'home',
            'sport-grounds': 'home',
            'sport-grounds?:id': 'sportgroundsDetail',
            'sport-groundsmap?:id?:lt?:lg?:address': 'sportgroundsMap',
            'exercises': 'exercisesList',
            'exercises?:id': 'exercisesDetail',
            'exercisesmap?:id': 'exercisesMap',
            'trainers': 'trainersList',
            'trainers?:id': 'trainersDetail',
            'senders': 'senders'

        },

        'index': 'index',
        'home': MainController.home,
        'sportgroundsDetail': MainController.sportgroundsDetail,
        'sportgroundsMap': MainController.sportgroundsMap,
        'exercisesList': MainController.exercisesList,
        'exercisesDetail': MainController.exercisesDetail,
        'exercisesMap': MainController.exercisesMap,
        'trainersList': MainController.trainersList,
        'trainersDetail': MainController.trainersDetail,
        'senders': MainController.senders,
        'default': MainController.default
    });
    return $.extend(Router, MainController);
});