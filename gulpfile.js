var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass');
  coffee = require('gulp-coffee');
  uglify = require('gulp-uglify');

gulp.task('sass', function () {
  gulp.src('./src/sass/*.{sass,scss}')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/modularscale-sass/stylesheets', 'node_modules/standard/src/sass']
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./src/sass/*.sass', ['sass']);
  gulp.watch('./src/js/*.coffee',['coffee']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('coffee', function() {
  gulp.src('./src/js/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('default', [
  'sass',
  'develop',
  'coffee',
  'watch'
]);
