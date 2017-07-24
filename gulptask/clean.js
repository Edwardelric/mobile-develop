var gulp = require('gulp');
var del  = require('del');

var sourcePath = {
    'styles'     : 'dist/styles'
};

var distPath = {
    'dist'       : 'dist',
}

gulp.task('clean-dev',function(){
    del.sync([sourcePath.styles]);
});

gulp.task('clean-build',function(){
    del.sync([distPath.dist]);
});