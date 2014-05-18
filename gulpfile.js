var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    es = require('event-stream');
    inject = require("gulp-inject");
    debug = require('gulp-debug');

var server = require('./tasks/server.js');

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
        './app/lib/ionic/release/js/ionic.js',
        './app/lib/angular/angular.js',
        './app/lib/angular-ui-router/release/angular-ui-router.js',
        './app/lib/angular-animate/angular-animate.js',
        './app/lib/angular-sanitize/angular-sanitize.js',
        './app/lib/ionic/release/js/ionic-angular.js',
        './app/lib/jquery/jquery.js',
        './app/lib/hoodie/dist/hoodie.js'
    ]
};

gulp.task('app', function() {
    //  Compile scss and inject css and js into index.html
    var states_html = gulp.src(paths.states_html, {base: './app/states'})
    var fonts = gulp.src(paths.fonts)
        .pipe(debug())
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
        .pipe(inject(es.merge(app_js, lib_js, states_js, components_js, scss, css)))
        .pipe(gulp.dest('./app'))

})

gulp.task('states_html', function() {
    gulp.src(paths.states_html, {base: './app/states'})
        .pipe(gulp.dest('./dev_build/states'))
        .pipe(gulp.dest('./www/states'))
})

gulp.task('lib', function() {
    // concatenate vendor JS into build/lib.js
    gulp.src(paths.lib)
        .pipe(gulp.dest('./dev_build/lib'))
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./www/js'));
});

gulp.task('fonts', function(done) {
    gulp.src(paths.fonts)
        .pipe(gulp.dest('./dev_build'))
        .pipe(gulp.dest('./www/fonts'))
});

gulp.task('css', function(done) {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest('./dev_build/css'))
        .pipe(concat("app.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest('./www/css'))
        .pipe(server.reload())
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.html, ['html']);
});

gulp.task('index', function() {
    gulp.src(path.index)
        .pipe(inject(gulp.src(["./src/*.js", "./src/*.css"], {read: false})))
        .pipe(gulp.dest("./dist"));
});

gulp.task('default', ['watch', 'fonts','css', 'lib', 'server']);

gulp.task('server', function() {
    server.run();
});


