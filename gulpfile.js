var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');

var cleanCSS = require('gulp-clean-css');



/**
CONFIG VARS
*/
var DIR_DIST = "html/dist";

var DIR_JS = "html/js",
	DIR_CSS = "html/css",
	DIR_LIBS = "html/libs";




gulp.task('compress-js', function (cb) {
  pump([
        gulp.src(DIR_JS+'/*.js'),
        uglify({
			preserveComments: "license"
		}),
		concat('site.min.js'),
        gulp.dest(DIR_DIST)
    ],
    cb
  );
});

gulp.task('compress-libs', function (cb) {
  pump([
        gulp.src(DIR_LIBS+'/*.js'),
        uglify({
			preserveComments: "license"
		}),
		concat('libs.min.js'),
        gulp.dest(DIR_DIST)
    ],
    cb
  );
});

gulp.task('minify-css', function (cb) {
  pump([
        gulp.src(DIR_CSS+'/*.css'),
        cleanCSS({compatibility: 'ie8'}),
		concat('style.min.css'),
        gulp.dest(DIR_DIST)
    ],
    cb
  );
});


gulp.task('compress', ['compress-js', 'compress-libs', 'minify-css']);










