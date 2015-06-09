require.config({

    baseUrl: "js",
    // enforceDefine: true,
    // urlArgs: "bust=" +  (new Date()).getTime(),
    waitSeconds: 0,
    paths: {
        'jquery': 'libs/jquery',
        'jquerymobile': 'libs/jquerymobile',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone-min',
        //'cordova': 'cordova',
        //'cordova_plugins': 'cordova_plugins',
        'text': 'libs/text',
        'photoSwipe': 'libs/photoswipe.min',
        'photoSwipe_default': 'libs/photoswipe-ui-default.min',
        'jqueryvalidate': 'libs/jquery.validate.min'
    },

    shim: {
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
        //"jqueryvalidate": {
        //    deps: ['jquery'],
        //    export: "$"
        //},
        //"jquerymobile": {
        //    deps: ['jquery'],
        //    export: "$"
        //}
        //"cordova_plugins": {
        //    deps: ['cordova']
        //},
        //"photoSwipe_default": {
        //    deps: ["photoSwipe"]
        //}
    }

});

require(["jquery", "backbone", "routers/mobileRouter", "jquerymobile", 'jqueryvalidate'], function($, Backbone, Mobile) {
    function onDeviceReady() {
        // Prevents all anchor click handling
        $.mobile.linkBindingEnabled = false;

        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;

        $.mobile.allowCrossDomainPages = true;
        $.mobile.linkBindingEnabled = false;
        $.mobile.selectmenu.prototype.options.nativeMenu = true;
        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;
        $.mobile.phonegapNavigationEnabled = true;
        $.mobile.defaultPageTransition = "fade";
        $.mobile.defaultDialogTransition = "fade";
        $.mobile.phonegapNavigationEnabled = true;
        $.mobile.touchOverflowEnabled = true;

        $.event.special.tap.tapholdThreshold = 10;
        $.event.special.swipe.horizontalDistanceThreshold = 3;
        $.event.special.swipe.verticalDistanceThreshold = 1000;
        $.event.special.swipe.durationThreshold = 4000;
        $.event.special.swipe.scrollSupressionThreshold = 1;
        $.support.cors = true;
        window.localStorage.clear();
        window.helpers = {};

        document.addEventListener("offline", onOffline, false);
        function onOffline() {
        // Handle the offline event
            navigator.notification.alert("Message", function() {}, "Title", "Button Text");
        } 
        
        window.App = {
            Const: {
                MAX_WIDTH: 1000,
                MAX_HEIGHT: 1000
            },
            viewport: {
                width: $(window).width(),
                height: $(window).height()
            }
        };

        App.router = new Mobile();
        
    }

    if (navigator.userAgent.match(/(iPad|iPhone|Android|MSIE|Trident)/)) {
        document.addEventListener('deviceready', onDeviceReady(true), false);
    } else {
        onDeviceReady(true);
    }

});