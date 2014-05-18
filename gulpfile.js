var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    es = require('event-stream');
    inject = require("gulp-inject");
    debug = require('gulp-debug');

var app_server = require('./tasks/app_server.js'),
    www_server = require('./tasks/www_server.js');

var after_build = function() {
    app_server.reload();
    www_server.reload();
};

var paths = {
    index: ['./app/index.html'],
    app_js: ['./app/app.js'],
    components_js: ['./app/components/**/*.js'],
    states_js: ['./app/states/**/*.js'],
    scss: ['./scss/**/*.scss'],
    css: ['./app/css/**/*.css'],
    states_html: ['./app/states/**/*.html'],
    fonts: ['./app/lib/ionic/release/fonts/*.*'],
    lib: [
        './app/lib/angular/angular.js',
        './app/lib/angular-ui-router/release/angular-ui-router.js',
        './app/lib/angular-animate/angular-animate.js',
        './app/lib/angular-sanitize/angular-sanitize.js',
        './app/lib/ionic/release/js/ionic.js',
        './app/lib/ionic/release/js/ionic-angular.js',
        './app/lib/jquery/jquery.js',
        './app/lib/hoodie/dist/hoodie.js'
    ]
};

gulp.task('serve', function() {
    app_server.run();
});

gulp.task('www_serve', function() {
    www_server.run();
});

gulp.task('app_build', function(done) {
    //  Compile scss and inject css and js into index.html
    var states_html = gulp.src(paths.states_html, {base: './app/states'})
    var fonts = gulp.src(paths.fonts)
        .pipe(gulp.dest('./app/fonts'))
    var app_js = gulp.src(paths.app_js)
    var components_js = gulp.src(paths.components_js, {base: './app/compoonents'})
    var states_js = gulp.src(paths.states_js, { base: './app/states' })
    var lib_js = gulp.src(paths.lib);
    var css = gulp.src(paths.css);
    var scss = gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest('./app/css'));
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


gulp.task('www_build', function(done) {
    //  Compile scss and inject css and js into index.html
    var states_html = gulp.src(paths.states_html, {base: './app/states'})
        .pipe(gulp.dest('./www/states'));
    var fonts = gulp.src(paths.fonts)
        .pipe(gulp.dest('./www/fonts'))
    var css = gulp.src(paths.css)
        .pipe(concat("app.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest("./www/css"))

    var app_js = gulp.src(paths.app_js)
        .pipe(concat("app.js"))
        .pipe(gulp.dest("./www/js"))
    var components_js = gulp.src(paths.components_js)
        .pipe(concat("components.js"))
        .pipe(gulp.dest("./www/js"))
    var states_js = gulp.src(paths.states_js)
        .pipe(concat("states.js"))
        .pipe(gulp.dest("./www/js"))
    var lib_js = gulp.src(paths.lib)
        .pipe(concat("lib.js"))
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
        .pipe(gulp.dest('./www'))
        .pipe(www_server.reload())
        .on('end', done)
});

gulp.task('watch', function() {
    gulp.watch('./app/**/**',['app_build'])
});


gulp.task('default', ['watch', 'serve', 'app_build']);


