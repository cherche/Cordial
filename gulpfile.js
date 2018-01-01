const gulp = require('gulp')

const webpack = require('webpack-stream')
const babel = require('gulp-babel')
const minify = require('gulp-babel-minify')

gulp.task('default', () => {
  return gulp.src('src/cordial.js')
    .pipe(webpack({
      watch: true,
      output: { filename: 'cordial.min.js' }
    }))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(minify())
    .pipe(gulp.dest('dist/'))
})
