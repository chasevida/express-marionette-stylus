

var gulp        = require('gulp'),
    clean       = require('gulp-clean'),
    livereload  = require('gulp-livereload'),
    nodemon     = require('gulp-nodemon'),
    stylus      = require('gulp-stylus');


var indir   = "client/",
    outdir  = "public/";

/**
 * -----------------------------------------------------------------
 * Stylus
 */

gulp.task('stylus:dev', function () {
    gulp.src( indir + 'styles/style.styl' )
        .pipe(stylus())
        .pipe(gulp.dest( outdir + 'css/' ))
        .pipe( livereload() );
});

gulp.task('stylus:dist', function () {
    gulp.src( indir + 'styles/style.styl' )
        .pipe(stylus({ compress: true }))
        .pipe(gulp.dest( outdir + 'css/' ));
});

/**
 * -----------------------------------------------------------------
 * JavaScript
 */

gulp.task('scripts:dev', function() {
    gulp.src( indir + 'js/**/*.js')
        .pipe(gulp.dest( outdir + 'js/' ))
        .pipe( livereload() );
});

/**
 * -----------------------------------------------------------------
 * Static Assets
 */

gulp.task('assets:dev', function() {
    gulp.src( indir + 'img/**/*.{png,jpg,gif}' )
        .pipe(gulp.dest( outdir + 'img/' ))
        .pipe( livereload() );
});

gulp.task('views:dev', function() {
    gulp.src( 'views/**/*.html' )
        .pipe( livereload() );
});


/**
 * -----------------------------------------------------------------
 * Clean
 */

gulp.task('clean:dist', function () {
    return gulp.src( outdir + '**/*', {read: false})
        .pipe(clean());
});


/**
 * -----------------------------------------------------------------
 * Watch
 */


gulp.task('watch', function () {
    console.log("watch event fired");
    gulp.watch( indir + '/styles/**/*.styl', ['stylus:dev']);
    gulp.watch( indir + '/js/**/*.js', ['scripts:dev']);
    gulp.watch( indir + '/img/**/*.{png,jpg,gif}', ['assets:dev']);
    gulp.watch( 'views/**/*.html', ['views:dev']);
});


/**
 * -----------------------------------------------------------------
 * Nodemon
 */

gulp.task('demon', function () {
  nodemon({
    script: 'server/server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function () {
      console.log('restarted!');
    });
});


/**
 * -----------------------------------------------------------------
 * General Build Tasks
 */

gulp.task('default', [
    'clean:dist', 
    'stylus:dev', 
    'scripts:dev', 
    'assets:dev', 
    'demon'
]);




