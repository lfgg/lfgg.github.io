/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    concat: {
      dist: {
        src: ['assets/js/lazyload.min.js',
              'assets/js/swup.min.js',
              'assets/js/shuffle.min.js',
              'assets/js/lfgg.js'],
        dest: 'assets/js/main.js'
      }
    },
    uglify: {
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'assets/js/main.min.js'
      }
    },
    watch: {
      scripts: {
        files: ['assets/js/*.js'],
        tasks: ['default']
      },
      vendor: {
        files: ['node_modules/inuitcss/**/*',
                'node_modules/inuit-flexgrid/**/*',
                'node_modules/sass-mq/**/*'],
        tasks: ['copy']
      }
    },
    copy: {
        update_sass: {
            files: [
                {
                    expand: true,
                    cwd: 'node_modules/inuitcss/',
                    src: '**',
                    dest: '_sass/inuitcss/'
                },
                {
                    expand: true,
                    cwd: 'node_modules/inuit-flexgrid/',
                    src: '**',
                    dest: '_sass/inuit-flexgrid'
                },
                {
                    expand: true,
                    cwd: 'node_modules/sass-mq/',
                    src: '**',
                    dest: '_sass/sass-mq'
                }
            ]
        }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // The copy task automatically copies inuitCSS and other dependencies whenever
  // they are updated or changed. Since node_modules is ignored by GitHub we have
  // to include these dependencies in the _sass folder, but this way we can still
  // keep them updated with npm.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['concat', 'uglify']);
};
