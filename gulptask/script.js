var gulp   = require('gulp');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');

var sourcePath = {
    'scripts'   : 'static/scripts/**/*.js'
};

var distPath = {
    'scripts'   : 'dist/scripts/'
};

gulp.task('eslint',function(){
    return gulp.src('app/scripts/**/*.js')
        .pipe(eslint({
            "env": {
                "browser": true
            },
            "extends": "eslint:recommended",
            "rules": {
                "no-console":0,
                "indent"          : ["error", 4],
                "linebreak-style" : ["error", "unix"],
                "quotes"          : ["error", "single"],
                "semi"            : ["error", "always", { "omitLastInOneLineBlock": true}],
                "no-extra-semi"   : ["error"],
                "comma-dangle"    : ["error", "never"]
            },
            "parserOptions": {
                "ecmaVersion": 6,
                "sourceType": "module"
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('js-release',function(){
    gulp.src(sourcePath.scripts)
        .pipe(uglify())
        .pipe(gulp.dest(distPath.scripts));
});