// Load plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    express = require('express'),
    min = require('gulp-ngmin'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect'),
    livereload = require('connect-livereload'),
    refresh = require('gulp-livereload')
    lrserver = require('tiny-lr')(),
    watch = require('gulp-watch'),
    livereloadport = 35729,
    serverport = 3000,
    sass = require("gulp-sass");

//We only configure the server here and start it only when running the watch task
var server = express();
//Add livereload middleware before static-middleware
server.use(livereload({
  port: livereloadport
}));


var paths = {
  buildDir: 'build/',
  scripts: {
    app: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/firebase/firebase.js',
      'bower_components/firebase-simple-login/firebase-simple-login.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angularfire/angularfire.js',
      'scripts/app.js',
      'scripts/controllers/*.js',
      'scripts/directives/*.js',
      'scripts/models/*.js',
      'scripts/services/*.js',
      'scripts/refs/*.js',
    ],
    unminified: 'firedeck.js',
    minified: 'firedeck.min.js',
    buildDir: 'build/js/',
  },

  ngHack: {
    app: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/firebase/firebase.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angularfire/angularfire.js',
      'code/ngHack.js'
    ],
    unminified: 'ngHack.js',
    buildDir: 'build/js'
  },

  styles: {
    src: 'styles',
    files: 'styles/*.scss',
    dest: 'build/css/'
  }

};

gulp.task('concat', function(){
  return gulp.src(paths.scripts.app)
    .pipe(concat(paths.scripts.unminified))
    .pipe(gulp.dest(paths.scripts.buildDir));
});

gulp.task('minify', function(){
  return gulp.src(paths.scripts.buildDir + paths.scripts.unminified)
    .pipe(concat(paths.scripts.minified))
    .pipe(gulp.dest(paths.scripts.buildDir));
});

gulp.task('preMin', ['minify'],function(){
  return gulp.src(paths.scripts.buildDir + paths.scripts.minified)
    .pipe(min())
    .pipe(gulp.dest(paths.scripts.buildDir));
});

gulp.task('uglify', ['preMin'],function(){
  return gulp.src(paths.scripts.buildDir + paths.scripts.minified)
   .pipe(uglify())
   .pipe(gulp.dest(paths.scripts.buildDir))
   .pipe(notify({ message: 'Build Done' }));
});

gulp.task('ngHack', function() {
  return gulp.src(paths.ngHack.app)
    .pipe(concat(paths.ngHack.unminified))
    .pipe(gulp.dest(paths.ngHack.buildDir));
});

gulp.task('watch', function() {
  gulp.watch(['scripts/**/*', 'slides/**/*', 'styles/**/*', 'views/**/*'], ['build', 'reload']);
});

/* Converts sass files to css */
gulp.task('styles', function () {
  return gulp.src(paths.styles.files)
    .pipe(sass({
      outputStyle : 'compressed',
      errLogToConsole: true,
      includePaths : [paths.styles.files]
    }))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('reload', function(){
  gulp.src(paths.buildDir + '/**/*')
   .pipe(refresh(lrserver));
});

gulp.task('server', function() {
  //Set up your static fileserver, which serves files in the build dir
  server.use(express.static(__dirname));
  server.listen(serverport);
  server.get('/', function(req, res) {
    res.sendfile('index.html')
  });
  //Set up your livereload server
  lrserver.listen(livereloadport);
});

gulp.task('order-slides', function() {
  var Firebase = require('firebase');

  var index = new Firebase('https://fire-deck.firebaseio.com/order-index');
  var order = new Firebase('https://fire-deck.firebaseio.com/order');

  function orderSlides() {

    index.remove();
    order.remove();

    var slideOrder = [
    // intro
      'presentation-info',
      'intro',
      'who',
      'covering-today',
      'who-knows-fb',
      'who-has-used-fb',

    // what
      'platform',

    // why
      'hardest-part',
      'prototype-stage',
      'backend-stage',
      'production-stage',
      'better-way',

    // what
      'fb-arch',
      'no-backend',
      'simple-api',
      'realtime-api',
      'js-client',

    // how
      // -- Basic data
      'live-coding-intro',
      'data-in-out',

      // -- AngularFire
      'angular-fire-intro',
      'ng-federer-facts',

      // -- Load Data Once
      //'data-once', // switch to angular

      // -- Simple Login Example Code
      'simple-login',
      // 'tokens',
      'federer-secret',

      // -- Security Rules
      'security-rules',

      // -- Hosting
      'hosting',
      //   -- Escape to command line

      // -- Summary
      'summary',
      'resources',
      'goodbye' // contact us & challenge for free swag
    ];

    var count = 1;
    slideOrder.forEach(function(title) {
      order.child(count).set(title);
      index.child(title).set(count);
      count++;
    });

  }

  orderSlides();

});

gulp.task('build', ['concat', 'uglify', 'styles', 'ngHack']);

gulp.task('serve', ['build', 'server', 'watch']);

gulp.task('default', ['build']);
