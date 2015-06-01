// Список площадок
define([
    "jquery",
    "underscore",
    "backbone",
    "../models/SportgroundsModel",
    "text!../../templates/sportgroundsOne.html",
    'photoSwipe',
    'photoSwipe_default'
], function($, _, Backbone, SportgroundsModel, sportgroundsHTML, PhotoSwipe, PhotoSwipeUI_Default) {

    return Backbone.View.extend({

        // el: $("#content"),
        template: _.template(sportgroundsHTML),
        events: {
            "click .start-swipe": "clickPhoto"
        },

        initialize: function () {
            $('#filter-btn-header').hide();
            this.listenTo(this.model, "reset", this.render);

        },

        render: function () {
            var date = {
                model: this.model,
                gallery: this.model.get('gallery') || [],
                full_address: this.model.get('full_address') || "",
                subway_station: this.model.get('subway_station') || [],
                trainers: this.model.get('trainers') || []
            };
            this.$el.html(this.template(date)).trigger("create");
            return this
        },

        clickPhoto: function (event) {
            var self = this;
            var pswpElement = document.querySelectorAll('.pswp')[0];
            var list_items = [];
            var selected_photo = $(event.currentTarget).find('img');

            selected_photo.addClass('selected-photo');
            var images = $('.start-swipe img');
            var index_start_photo = 0;
            $.each(images, function (index, image) {
                list_items.push({
                    src: self._createImageUrl($(image).attr('src'), App.Const.MAX_WIDTH, App.Const.MAX_HEIGHT),
                    w: App.Const.MAX_WIDTH,
                    h: App.Const.MAX_HEIGHT,
                    title: $(image).attr('name')
                });
                if ($(image).attr('class').search('selected-photo') !== -1) {
                    index_start_photo = index
                }
            });

            // define options (if needed)
            var options = {
                // optionName: 'option value'
                // for example:
                index: index_start_photo - 1, // start at first slide
                history: false,
                focus: false,
                backButtonHideEnabled: false,
                showAnimationDuration: 0,
                hideAnimationDuration: 0
                // backButtonHideEnabled: false
            };


            // Initializes and opens PhotoSwipe
            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, list_items, options);
            gallery.init();
        },

        _createImageUrl: function (url, width, height) {
            return url.replace(/width=\d*/, 'width=' + width).replace(/height=\d*/, 'height=' + height);
        }
    });
});