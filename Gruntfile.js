module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        srcDir:   'www/',

        // watch: {
        //   scripts: {
        //     files: [
        //         'Gruntfile.js',
        //         '<%= srcDir %>/js/**/*.js',
        //         '<%= srcDir %>/sass/**/*.scss'
        //     ],
        //     tasks: ['default'],
        //     options: {
        //       debounceDelay: 250
        //     }
        //   }
        // },

        // jshint: {
        //     options: {
        //         reporter: require('jshint-stylish')
        //     },
        //     all: [
        //         'Gruntfile.js',
        //         '<%= srcDir %>/js/**/*.js'
        //     ]
        // },

        // requirejs: {
        //     dev: {
        //         options: {
        //             mainConfigFile: '<%= srcDir %>/js/requirejs-config.js',
        //             preserveLicenseComments: false,
        //             name: 'app',
        //             baseUrl: "<%= srcDir %>/js",
        //             out: "<%= libsDir %>/js/app.js",
        //             wrapShim: true,
        //             useStrict: true,
        //             compress: false,
        //             beautify: false,
        //             generateSourceMaps: false,
        //             optimizeCss: "standard.keepWhitespace",

        //             // will be taken care of with an uglify task directly
        //             optimize: "none"
        //         }
        //     },
        //     production: {
        //         options: {
        //             mainConfigFile: '<%= srcDir %>/js/requirejs-config.js',
        //             preserveLicenseComments: false,
        //             name: 'app',
        //             baseUrl: "<%= srcDir %>/js",
        //             out: "<%= libsDir %>/js/app.js",
        //             wrapShim: true,
        //             useStrict: true,
        //             compress: true,
        //             beautify: true,
        //             generateSourceMaps: false,
        //             optimizeCss: "standard.keepWhitespace",

        //             // will be taken care of with an uglify task directly
        //             optimize: "uglify"
        //         }
        //     }
        // },

        concat: {
            options: {
                separator: '\n',
                stripBanners: true/*{
                    block: true,
                    line: true
                }*/
            },
            core: {
                src: [
                    '<%= srcDir %>/css/default-skin/default-skin.css',
                    '<%= srcDir %>/css/jqm-icon-pack-fa.css',
                    '<%= srcDir %>/css/jquery.mobile-1.4.5.css',
                    '<%= srcDir %>/css/jquerymobile.css',
                    '<%= srcDir %>/css/photoswipe.css',
                    '<%= srcDir %>/css/swiper.min.css',
                    '<%= srcDir %>/resources/css/app.css',
                    '<%= srcDir %>/resources/css/exercisesOne.css',
                    '<%= srcDir %>/resources/css/global.css',
                    '<%= srcDir %>/resources/css/mytheme.css',
                    '<%= srcDir %>/resources/css/sportgroundOne.css',
                    '<%= srcDir %>/resources/css/trainerList.css',
                    '<%= srcDir %>/resources/css/trainerOne.css',
                ],
                dest: '<%= srcDir %>/base.css'
            }
        },

        copy: {
            main: {
                cwd: '<%= srcDir %>/images',
                src: '**/*',
                dest: '<%= libsDir %>/images',
                expand: true
            },
            bootstrap: {
                    cwd: '<%= libsDir %>/bootstrap-sass/assets/fonts',
                    src: '**/*',
                    dest: '<%= libsDir %>/css/',
                    expand: true
            },
            fontawesome: {
                cwd: '<%= libsDir %>/fontawesome/fonts',
                src: '**/*',
                dest: '<%= libsDir %>/fonts',
                expand: true
            }
        },

        uglify: {
            '<%= srcDir %>js/collections/ExercisesCollection.min.js': ['<%= srcDir %>js/collections/ExercisesCollection.js'],
            '<%= srcDir %>js/collections/LayoutCollection.min.js': ['<%= srcDir %>js/collections/LayoutCollection.js'],
            '<%= srcDir %>js/collections/SportgroundsCollection.min.js': ['<%= srcDir %>js/collections/SportgroundsCollection.js'],
            '<%= srcDir %>js/collections/TrainersCollection.min.js': ['<%= srcDir %>js/collections/TrainersCollection.js'],
            '<%= srcDir %>js/controllers/MainController.min.js': ['<%= srcDir %>js/controllers/MainController.js'],
            '<%= srcDir %>js/libs/domReady.min.js': ['<%= srcDir %>js/libs/domReady.js'],
            '<%= srcDir %>js/libs/jqueryjsonp.min.js': ['<%= srcDir %>js/libs/jqueryjsonp.js'],
            '<%= srcDir %>js/libs/jquerymobile.min.js': ['<%= srcDir %>js/libs/jquerymobile.js'],
            '<%= srcDir %>js/libs/require.min.js': ['<%= srcDir %>js/libs/require.js'],
            '<%= srcDir %>js/libs/text.min.js': ['<%= srcDir %>js/libs/text.js'],
            '<%= srcDir %>js/libs/underscore.min.js': ['<%= srcDir %>js/libs/underscore.js'],
            '<%= srcDir %>js/models/ExercisesMapModel.min.js': ['<%= srcDir %>js/models/ExercisesMapModel.js'],
            '<%= srcDir %>js/models/ExercisesModel.min.js': ['<%= srcDir %>js/models/ExercisesModel.js'],
            '<%= srcDir %>js/models/LayoutModel.min.js': ['<%= srcDir %>js/models/LayoutModel.js'],
            '<%= srcDir %>js/models/SportgroundsModel.min.js': ['<%= srcDir %>js/models/SportgroundsModel.js'],
            '<%= srcDir %>js/models/TrainersModel.min.js': ['<%= srcDir %>js/models/TrainersModel.js'],
            '<%= srcDir %>js/views/listsViews/ExercisesListView.min.js': ['<%= srcDir %>js/views/listsViews/ExercisesListView.js'],
            '<%= srcDir %>js/views/listsViews/LayoutListView.min.js': ['<%= srcDir %>js/views/listsViews/LayoutListView.js'],
            '<%= srcDir %>js/views/listsViews/SportgroundListView.min.js': ['<%= srcDir %>js/views/listsViews/SportgroundListView.js'],
            '<%= srcDir %>js/views/listsViews/SportgroundListView.min.js': ['<%= srcDir %>js/views/listsViews/SportgroundListView.js'],
            '<%= srcDir %>js/views/listsViews/TrainersListView.min.js': ['<%= srcDir %>js/views/listsViews/TrainersListView.js'],
            '<%= srcDir %>js/views/ExercisesMapView.min.js': ['<%= srcDir %>js/views/ExercisesMapView.js'],
            '<%= srcDir %>js/views/ExercisesView.min.js': ['<%= srcDir %>js/views/ExercisesView.js'],
            '<%= srcDir %>js/views/SportgroundView.min.js': ['<%= srcDir %>js/views/SportgroundView.js'],
            '<%= srcDir %>js/views/TrainersView.min.js': ['<%= srcDir %>js/views/TrainersView.js'],
            '<%= srcDir %>js/app.min.js': ['<%= srcDir %>js/app.js'],
            '<%= srcDir %>js/cordova.min.js': ['<%= srcDir %>js/cordova.js'],
            '<%= srcDir %>js/cordova_plugins.min.js': ['<%= srcDir %>js/cordova_plugins.js'],
        },

        cssmin: {
            '<%= srcDir %>/base.min.css': ['<%= srcDir %>/base.css'],
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', [
        // 'jshint:all',
        'uglify',
        // 'requirejs:dev',
        // 'compass:prod',
        'concat:core',
        // 'copy',
        'cssmin',
        // 'clean'
    ]);

    // grunt.registerTask('production', [
    //     'jshint:all',
    //     'uglify',
    //     'requirejs:production',
    //     'compass:prod',
    //     'concat:core',
    //     'copy',
    //     'cssmin',
    //     // 'clean'
    // ]);

};
