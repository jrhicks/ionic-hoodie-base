var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var server = require('./gulpfile_server.js');

var paths = {
    css: ['./www/css/**/*.css'],
    js: ['./www/js/**/*.js'],
    html: ['./www/index.html', './www/templates/**/*.html'],
    sass: ['./scss/**/*.scss']
};

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .pipe(server.reload())
        .on('end', done);
});

gulp.task('js', function(done) {
    gulp.src(paths.js)
        .pipe(server.reload())
        .on('end', done);
});

gulp.task('css', function(done) {
    gulp.src(paths.css)
        .pipe(server.reload())
        .on('end', done);
});

gulp.task('html', function(done) {
    gulp.src(paths.html)
        .pipe(server.reload())
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['watch', 'server']);

gulp.task('server', function() {
    server.run();
});
