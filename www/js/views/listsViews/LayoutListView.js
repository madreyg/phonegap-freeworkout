// template ListsViews
define([
    "jquery",
    "underscore",
    "backbone"
], function ($, _, Backbone) {

    return Backbone.View.extend({

        initialize: function () {
            $(document).on("scrollstop", this.checkScroll.bind(this));
        },

        render: function () {
            var data = {
                collection: this.collection
            };
            this.stopListening();
            this.$el.append(this.template(data)).trigger("create");
            $('#container').page('destroy').page();
            $('.ui-content').css('padding', 0);
            this.listenTo(this.collection, "reset", this.render);
            return this
        },

        checkScroll: function () {
            //var scope = this;
            var activePage = $.mobile.pageContainer.pagecontainer("getActivePage"),
            /* Viewport's height */
                screenHeight = $.mobile.getScreenHeight(),
            /* Content div - include padding too! */
                contentHeight = $(".ui-content", activePage).outerHeight(),
            /* Height of scrolled content (invisible) */
                scrolled = $(window).scrollTop(),
            /* Height of both Header & Footer and whether they are fixed
             If any of them is fixed, we will remove (1px)
             If not, outer height is what we need */
                header = $(".ui-header", activePage).outerHeight() - 1,
                footer = $(".ui-footer", activePage).outerHeight() - 1,
            /* Math 101 - Window's scrollTop should match content minus viewport plus toolbars */
                scrollEnd = contentHeight - screenHeight + header + footer;
            /* if (pageX) is active and page's bottom is reached sportgroundsListoad more elements  */
            if (activePage[0].id == "container" && scrolled >= scrollEnd) {
                /* run loadMore function */
                $(document).off("scrollstop");
                $.mobile.loading("show", {
                    textVisible: true
                });
                if (this.collection.next()) {
                    $.mobile.loading("hide");
                    $(document).on("scrollstop", this.checkScroll.bind(this));
                }
            }
        }
    });
});