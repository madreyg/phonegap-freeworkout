// коллекция спортплощадок

define([
    "jquery",
    "backbone"
], function($, Backbone) {

    return Backbone.Collection.extend({

        fltr: {
            'page': 1
        },

        initialize: function (model, options) {
            if (model) {
                this.model = model
            }
            if (options) {
                this.fltr = $.extend(this.fltr, options);
            } else {
                this.fltr = {'page': 1};
            }
        },

        parse: function (data) {
            if (data.results) {
                this.has_next = data.has_next;
                return data.results;
            } else {
                return data;
            }
        },

        filter: function (obj, options) {
            var that = this;
            options = (options) ? options : {};
            _.each(obj, function (v, k) {
                if (_.isArray(v)) {
                    v = v.join(',');
                }
                that.fltr[k] = v;
            });
            options.data = that.fltr;
            return this.fetch(options);
        },

        next: function () {
            if (this.has_next) {
                this.fltr.page = this.fltr.page || 1;
                this.fltr.page += 1;
                return this.fetch({
                    remove: false,
                    reset: true
                });
            }
        }
    })
});