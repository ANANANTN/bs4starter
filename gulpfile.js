const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

function isDefined(item, name) {
  if (item == null) {
    console.warn(`${name} is not defined!`);
  } else {
    console.log(`${name} is defined.`);
  }
};

[
  [null, 'null'],
  [undefined, 'undefined'],
  [gulp, 'gulp'],
  [browserSync, 'browserSync'],
  [sass, 'sass'],
].forEach(function (item) { isDefined(item[0], item[1]); });

gulp.task('sass', function () {
  return gulp.src(['node_modules/bootstrap-beta/scss/bootstrap.scss','src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
  return gulp.src(['node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js','node_modules/bootstrap-beta/dist/js/bootstrap.js'])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({server: './src'});

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch(['src/*.html']).on('change', browserSync.reload);
});

gulp.task('fonts', function () {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
});

gulp.task('fa', function () {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['sass', 'js', 'serve', 'fonts', 'fa']);
