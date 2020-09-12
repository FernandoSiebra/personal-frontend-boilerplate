module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: ['src/app.js'],
        dest: 'dist/app.min.js'
      }
    },
    sass: {                              
      dist: {                            
        options: {                      
          style: 'expanded'
        },
        files: {                        
          'src/app.css': 'src/scss/app.scss'
        }
      }
    },
    watch: {
      css: {
        files: 'src/scss/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      },
      js : {
        files: 'src/js/*.js',
        tasks : ['concat','babel'],
        options: {
          livereload: true,
        }
      },
      src : {
        files : ['src/*.html'],
        options: {
          livereload: true,
        }
      }
    },
    clean: {
      css: ['dist/*.css','!dist/*.min.css'],
      js: ['dist/*.js','!dist/*.min.js'],
      map: ['dist/*.map']
    },
    copy : {
      main : {
        expand: true,
        cwd: 'src/',
        src: '*',
        dest: 'dist/',
        flatten: true,
        filter: 'isFile',
        options: {
          process: function (content, srcpath) {
            return content
                   .replace('<script src="http://localhost:35729/livereload.js?snipver=1"></script>', '')
                   .replace('.css', '.min.css')
                   .replace('js/app.js', 'app.min.js')
          }
        }
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/app.min.css': ['dist/app.css']
        }
      }
    },
    concat : 
    {
      app : {
        src : ['src/js/*.js'],
        dest: 'src/app.js'
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'src/app.js': 'src/app.js'
        }
      }
    },
    htmlmin: {                                    
      dist: {                                     
        options: {                               
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                  
          'dist/index.html': 'dist/index.html',    
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-babel');


  grunt.registerTask('build', ['concat','babel','uglify','sass','copy','cssmin','clean','htmlmin']);

};