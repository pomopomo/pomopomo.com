module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
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
};