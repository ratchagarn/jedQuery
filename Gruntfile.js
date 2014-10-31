module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * JedQuery version <%= pkg.version %>\n' +
            ' * Inspiration by http://youmightnotneedjquery.com (https://github.com/HubSpot/YouMightNotNeedjQuery)\n' +
            ' * Copyright 2014-Preset\n' +
            ' * Author: <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' */\n',

    /**
     * ------------------------------------------------------------
     * Clean
     * ------------------------------------------------------------
     */
    

    clean: {
      dist: 'dist'
    },


    /**
     * ------------------------------------------------------------
     * JSHint (http://www.jshint.com/docs/options)
     * ------------------------------------------------------------
     */

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      grunt: 'Gruntfile.js',
      src: 'src/**/*.js'
    },


    /**
     * ------------------------------------------------------------
     * Concat
     * ------------------------------------------------------------
     */

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      dist: {
        src: [
          'src/core.js',
          'src/element.js',
          'src/event.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },


    /**
     * ------------------------------------------------------------
     * Watch
     * ------------------------------------------------------------
     */
    
    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src:newer']
      }
    },


    /**
     * ------------------------------------------------------------
     * Uglify
     * ------------------------------------------------------------
     */
    

    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: false
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
      }
    }


  });


  // https://github.com/gruntjs/grunt-contrib-clean
  grunt.loadNpmTasks('grunt-contrib-clean');

  // https://github.com/gruntjs/grunt-contrib-concat
  grunt.loadNpmTasks('grunt-contrib-concat');

  // https://github.com/tschaub/grunt-newer
  grunt.loadNpmTasks('grunt-newer');

  // https://github.com/gruntjs/grunt-contrib-watch
  grunt.loadNpmTasks('grunt-contrib-watch');

  // https://github.com/gruntjs/grunt-contrib-jshint
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // https://github.com/gruntjs/grunt-contrib-uglify
  grunt.loadNpmTasks('grunt-contrib-uglify');



  grunt.registerTask('default', ['clean', 'jshint', 'concat']);

  grunt.registerTask('dev', ['default', 'watch']);

  grunt.registerTask('dist', ['default', 'uglify']);

};