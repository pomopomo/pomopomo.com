module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
  var herokuAppName = 'pomopomo-com';
  grunt.initConfig({
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
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      scripts: {
        src: [
          'app/**/*.js',
          'app/**/*.json',
          'cli/**/*.js',
          'cli/**/*.json',
          'client/**/*.js',
          'config/**.js',
          'migrations/**',
          'test/**',
          '*.js',
          '*.json',
          '!package.json'
        ]
      }
    }
  });

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('deploy', ['shell:deploy']);

};