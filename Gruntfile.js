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

         requirejs: {
             dev: {
                 options: {
                     mainConfigFile: '<%= srcDir %>/js/app.js',
                     preserveLicenseComments: false,
                     name: 'app',
                     baseUrl: "<%= srcDir %>/js",
                     out: "<%= srcDir %>/js/app-require.js",
                     wrapShim: true,
                     useStrict: true,
                     compress: false,
                     beautify: false,
                     generateSourceMaps: false,
                     optimizeCss: "standard.keepWhitespace",

                     // will be taken care of with an uglify task directly
                     optimize: "none"
                 }
             },
             production: {
                 options: {
                     mainConfigFile: '<%= srcDir %>/js/app.js',
                     preserveLicenseComments: false,
                     name: 'app',
                     baseUrl: "<%= srcDir %>/js",
                     out: "<%= srcDir %>/js/app-require.js",
                     wrapShim: true,
                     useStrict: true,
                     compress: false,
                     beautify: false,
                     generateSourceMaps: false,
                     optimizeCss: "standard.keepWhitespace",

                     // will be taken care of with an uglify task directly
                     optimize: "uglify"
                 }
             }
         },

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
                    '<%= srcDir %>/resources/css/app.css',
                    '<%= srcDir %>/resources/css/global.css',
                    '<%= srcDir %>/resources/css/sportgroundOne.css',
                    '<%= srcDir %>/resources/css/exercisesOne.css',
                    '<%= srcDir %>/resources/css/trainerList.css',
                    '<%= srcDir %>/resources/css/trainerOne.css',
                    '<%= srcDir %>/css/jquery.mobile-1.4.5.css',
                    '<%= srcDir %>/css/jqm-icon-pack-fa.css',
                    '<%= srcDir %>/css/photoswipe.css',
                    '<%= srcDir %>/css/default-skin/default-skin.css',
                ],
                dest: '<%= srcDir %>resources/css/base.css'
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

        cssmin: {
            'resources/css/base.css': ['resources/css/base.css'],
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
        //'uglify',
         'requirejs:dev',
        // 'compass:prod',
        'concat:core',
        // 'copy',
        //'cssmin',
        // 'clean'
    ]);

     grunt.registerTask('production', [
    //     'jshint:all',
    //     'uglify',
         'requirejs:production',
    //     'compass:prod',
         'concat:core',
    //     'copy',
         'cssmin',
    //     // 'clean'
     ]);

};
