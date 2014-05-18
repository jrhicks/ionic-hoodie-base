var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    es = require('event-stream'),
    inject = require("gulp-inject"),
    debug = require('gulp-debug'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    filesize = require('gulp-filesize'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    watch = require('gulp-watch'),
    ngmin = require('gulp-ngmin');

/**
 * Configure paths
 */

var paths = {
    index: ['./app/index.html'],
    app_js: ['./app/app.js'],
    components_js: ['./app/components/**/*.js'],
    states_js: ['./app/states/**/*.js'],
    scss: ['./scss/**/*.scss'],
    css: ['./app/css/**/*.css'],
    states_html: ['./app/states/**/*.html'],
    fonts: ['./bower_components/ionic/release/fonts/*.*'],
    lib: [
        './bower_components/angular/angular.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/angular-animate/angular-animate.js',
        './bower_components/angular-sanitize/angular-sanitize.js',
        './bower_components/ionic/release/js/ionic.js',
        './bower_components/ionic/release/js/ionic-angular.js',
        './bower_components/jquery/jquery.js',
        './bower_components/hoodie/dist/hoodie.js'
    ]
};

/**
 * Configure error handling
 */

var beep_on_error = {
    errorHandler: function (err) {
        gutil.beep();
        console.log(err);
    }
}


/**
 * Default tasks load bower components into app/lib
 * compiles external scss into app/css, injects
 * references into index.html and starts server on
 * port 9000
 */

var app_server = require('./tasks/app_server.js');

gulp.task('default', ['app_scss', 'app_watch', 'app_serve', 'app_build']);

gulp.task('app_serve', function() {
    app_server.run();
});

gulp.task('app_scss', function(done) {
    gulp.src(paths.scss)
        .pipe(plumber(beep_on_error))
        .pipe(sass())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./app/css'));
});

gulp.task('app_build', function(done) {
    //  Compile scss and inject css and js into index.html
    var fonts = gulp.src(paths.fonts)
        .pipe(gulp.dest('./app/fonts'))
    var app_js = gulp.src(paths.app_js)
    var components_js = gulp.src(paths.components_js, {base: './app/compoonents'})
    var states_js = gulp.src(paths.states_js, { base: './app/states' })
    var lib_js = gulp.src(paths.lib)
        .pipe(gulp.dest('./app/lib'));
    var css = gulp.src(paths.css);
    gulp.src('./app/index.html')
        .pipe(inject(lib_js,
            {
                starttag: '<!-- inject:lib:{{ext}} -->',
                ignorePath: '/app'
            }))
        .pipe(inject(es.merge(app_js, states_js, components_js, css),
            {
                ignorePath: '/app'
            }))
        .pipe(gulp.dest('./app'))
        .pipe(app_server.reload())
        .on('end', done)
})

gulp.task('app_watch', function() {
    watch({glob: './app/**/*.*'},['app_build']);
    watch({glob: './scss/**/*.*'},['app_build']);
});

/**
 * www related tasks concat and minify into the www folder
 * and launches a server on port 9080
 */

var www_server = require('./tasks/www_server.js');

gulp.task('www', ['app_scss','www_watch','www_serve','www_build']);

gulp.task('www_clean', function () {
    return gulp.src('www', {read: false})
        .pipe(clean());
});

gulp.task('www_build', function(done) {
    //  Compile scss and inject css and js into index.html
    var states_html = gulp.src(paths.states_html, {base: './app/states'})
        .pipe(minifyHTML())
        .pipe(gulp.dest('./www/states'));
    var fonts = gulp.src(paths.fonts)
        .pipe(gulp.dest('./www/fonts'))
    var css = gulp.src(paths.css)
        .pipe(concat("app.css"))
        .pipe(filesize())
        .pipe(minifyCss())
        .pipe(filesize())
        .pipe(gulp.dest("./www/css"))
    var app_js = gulp.src(paths.app_js)
        .pipe(concat("app.js"))
        .pipe(filesize())
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(filesize())
        .pipe(gulp.dest("./www/js"))
    var components_js = gulp.src(paths.components_js)
        .pipe(concat("components.js"))
        .pipe(filesize())
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(filesize())
        .pipe(gulp.dest("./www/js"))
    var states_js = gulp.src(paths.states_js)
        .pipe(concat("states.js"))
        .pipe(filesize())
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(filesize())
        .pipe(gulp.dest("./www/js"))
    var lib_js = gulp.src(paths.lib)
        .pipe(concat("lib.js"))
        .pipe(filesize())
        .pipe(uglify())
        .pipe(filesize())
        .pipe(gulp.dest("./www/js"))

    gulp.src('./app/index.html')
        .pipe(inject(lib_js,
            {
                starttag: '<!-- inject:lib:{{ext}} -->',
                ignorePath: '/www'
            }))
        .pipe(inject(es.merge(app_js, states_js, components_js, css),
            {
                ignorePath: '/www'
            }))
        .pipe(minifyHTML())
        .pipe(gulp.dest('./www'))
        .pipe(www_server.reload())
        .on('end', done)
});

gulp.task('www_serve', function() {
    www_server.run();
});

gulp.task('www_watch', function() {
    watch({glob: './app/**/*.*'},['www_build']);
    watch({glob: './scss/**/*.*'},['www_build']);
});




