var log = require('./app/core/log/')(module);
var herokuAppName = 'pomopomo-com';
var bowerPath = '.bower/bower';
var fontExt = '**/*.{otf,eot,svg,ttf,woff,woff2}';
var imgExt = '**/*.{png,gif,jpeg,jpg}';
var port = 7666;
var logFileName = function (src, filepath) {
  log.info(filepath);
  return src;
};
var concatOptions = {
  separator: '\n',
  process: logFileName
};

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    open: {
      browser: {
        path: 'http://localhost:' + port
      }
    },
    shell: {
      log: {
        command: 'heroku logs -t -a ' + herokuAppName
      },
      deploy: {
        command: [
          'echo adding remote heroku url',
          'git remote add heroku-prod git@heroku.com:' + herokuAppName + '.git',
          'echo pushing master branch to heroku',
          'git push heroku-prod master:master',
          'echo removing heroku url',
          'git remote remove heroku-prod'
        ].join('&&')
      }
    },
    clean: {
      bower: ['.bower'],
      bowerBuild: ['.bower/build'],
      public: ['public'],
      template: ['.template'],
      build: ['.bower', '.template']
    },
    bower: {
      install: {
        options: {
          targetDir: '.bower/target'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      scripts: {
        src: [
          'app/**/*.js',
          'app/**/*.json',
          'client/**/*.js',
          'config/**.js',
          'test/**',
          '*.js',
          '*.json',
          '!package.json'
        ]
      }
    },
    copy: {
      assets: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: bowerPath,
            filter: 'isFile',
            src: [fontExt],
            dest: 'public/fonts/'
          },
          {
            expand: true,
            flatten: true,
            cwd: 'client/fonts',
            filter: 'isFile',
            src: [fontExt],
            dest: 'public/fonts/'
          },
          {
            expand: true,
            flatten: true,
            cwd: bowerPath,
            src: [imgExt],
            dest: 'public/img/'
          },
          {
            expand: true,
            cwd: 'client/img',
            src: [imgExt],
            dest: 'public/img/'
          }
        ]
      }
    },
    concat: {
      bower: {
        files: [
          {
            options: concatOptions,
            src: [
              bowerPath + '/angular/angular-csp.css',
              bowerPath + '/bootstrap/dist/css/bootstrap.min.css',
              bowerPath + '/fontawesome/css/font-awesome.css'
            ],
            dest: '.bower/build/css/all.css'
          },
          {
            options: concatOptions,
            src: [
              bowerPath + '/angular/angular.js',
              bowerPath + '/jquery/dist/jquery.js',
              bowerPath + '/bootstrap/dist/js/bootstrap.js'
            ],
            dest: '.bower/build/js/all.js'
          }
        ]
      },
      css: {
        options: concatOptions,
        src: [
          '.bower/build/css/all.css',
          'client/**/*.css'
        ],
        dest: 'public/css/all.css'
      },
      js: {
        options: concatOptions,
        src: [
          '.bower/build/js/all.js',
          '.template/**/*.js',
          'client/js/**/*.js'
        ],
        dest: 'public/js/all.js'
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0,
        rebase: false
      },
      minify: {
        expand: true,
        cwd: 'public/css',
        src: 'all.css',
        dest: 'public/css'
      }
    },
    uglify: {
      scripts: {
        expand: true,
        cwd: 'public/js',
        src: 'all.js',
        dest: 'public/js'
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      kpgl: {
        expand: true,
        cwd: 'public/js',
        src: 'all.js',
        dest: 'public/js'
      }
    },
    html2js: {
      options: {
        quoteChar: '\'',
        rename: function (moduleName) {
          return (moduleName.replace('../client/js/', '')
              .replace('.html', '')
              .replace('.jade', '') + '.tpl')
              .replace(new RegExp('/', 'g'), '.');
        }
      },
      main: {
        src: ['client/js/**/*.html', 'client/js/**/*.jade'],
        dest: '.template/template.js'
      }
    },
    watch: {
      html: {
        options: {
          interrupt: true,
          spawn: false
        },
        files: ['client/index.jade'],
        tasks: ['jade:dev']
      },
      js: {
        options: {
          interrupt: true,
          spawn: false
        },
        files: ['client/js/**/*.js', 'client/js/**/*.html',
          'client/js/**/*.jade'],
        tasks: ['clean:template', 'html2js', 'concat:js', 'clean:template']
      },
      css: {
        options: {
          interrupt: true,
          spawn: false
        },
        files: ['client/**/*.css'],
        tasks: ['concat:css']
      },
      grunt: {
        options: {
          interrupt: true,
          spawn: false,
          reload: true
        },
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          interrupt: true,
          spawn: false,
          livereload: true
        },
        files: ['public/css', 'public/js']
      }
    }
  });

  grunt.registerTask('prepare', ['ngAnnotate', 'uglify', 'cssmin']);
  grunt.registerTask('install', ['bower', 'clean:bowerBuild', 'concat:bower']);
  grunt.registerTask('reset', ['clean', 'install']);

  grunt.registerTask('build',
      ['jshint', 'clean:public', 'clean:template', 'html2js',
        'concat:js', 'concat:css', 'clean:template', 'copy:assets']);

  grunt.registerTask('dev', ['reset', 'build']);
  grunt.registerTask('prod', ['dev', 'prepare']);

  grunt.registerTask('default', ['build', 'open:browser', 'watch']);

  grunt.registerTask('heroku', function (command) {
    switch (command) {
      case 'dev':
      case 'prod':
        grunt.task.run(command, 'clean:build');
        break;
      case 'deploy':
      case 'log':
        grunt.task.run('shell:' + command);
        break;
      default:
        log.log('There is no task named heroku:' + command);
        break;
    }
  });
};