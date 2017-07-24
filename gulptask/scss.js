var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

var sourcePath = {
    'images'         : 'static/images/**/*',
    'scss'           : 'static/scss/**/*.scss',
    'styles'         : 'static/styles/'
};

var distPath = {
    'styles'         : 'dist/styles',
    'images'         : 'dist/images'
};

gulp.task('images',function() {
    gulp.src(sourcePath.images)
        .pipe(gulp.dest(distPath.images));
});

function sassFn(){
    gulp.src(sourcePath.scss)
        .pipe(sass({
            precision       : 10,
            outputStyle     : 'compact',
            errLogToConsole : true
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'Last 2 versions', 'IE 8'],
            cascade: false
        }))
        .pipe(gulp.dest(sourcePath.styles))
        .pipe(connect.reload());
}

gulp.task('sass',function(){
    sassFn();
});

gulp.task('watchSassStyle',function(){
    sassFn();
});

gulp.task('sass-release',['images'],function(){
    gulp.src(sourcePath.scss)
        .pipe(sass({
            precision       : 10,
            outputStyle     : 'compressed',
            errLogToConsole : true
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'Last 2 versions', 'IE 8'],
            cascade: false
        }))
        .pipe(gulp.dest(distPath.styles));
});

gulp.task('watchSass',function(){
    gulp.watch(sourcePath.scss,['watchSassStyle']);
});