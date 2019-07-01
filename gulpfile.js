var gulp = require('gulp'),
  concat = require('gulp-concat'), // to add many files to one file
  autoprefixer = require('gulp-autoprefixer'), // to add prefix to css3
  sass = require('gulp-sass'), // for change from sass to css
  connect = require('gulp-connect'), // for server run
  sourcemaps = require('gulp-sourcemaps'), // for css.map
  notify = require('gulp-notify'), // for notification
  webp = require('gulp-webp'), // for convert image any format to webp format
  zip = require('gulp-zip'); // for compressed file

// Html Task
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(notify('HTML Task Is Done'))
    .pipe(connect.reload());
});
// Css Task
gulp.task('css', function () {
  return gulp.src('src/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      // outputStyle: 'expanded'
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(concat('home.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify('Css Task Is Done'))
    .pipe(connect.reload());
});
//js task
function js() {
  return src('src/js/*.js', {
      sourcemaps: true
    })
    .pipe(concat('main.min.js'))
    .pipe(dest('dist/js', {
      sourcemaps: true
    }))
}
// Image.webp task
gulp.task('img', function () {
  return gulp.src('src/img/**/*.*')
    .pipe(webp())
    .pipe(gulp.dest('dist/img'))
    .pipe(notify('Image Has Compressed'))
});

// zip task
gulp.task('zip', function () {
  return gulp.src('dist/**/*.*')
    .pipe(zip('carepoint_wesite.zip'))
    .pipe(gulp.dest('.'))
    .pipe(notify('File Is compressed'))
});

// Watch Task
gulp.task('watch', function () {
  connect.server({
    root: './dist/',
    port: 80,
    livereload: true
  });
  gulp.watch('src/**/*.html', gulp.parallel('html'));
  gulp.watch('src/css/**/*.*', gulp.parallel('css'));
  gulp.watch('src/img/**/*.*', gulp.parallel('img'));
  gulp.watch('dist/**/*.*', gulp.parallel('zip'));
});

//Default Task
gulp.task('default', gulp.parallel('watch')); // to write gulp only without gulp and name task