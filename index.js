var browserify = require('browserify')
  , uglify = require('gulp-uglify')
  , vss = require('vinyl-source-stream');

module.exports = function (voyager) {
  
  voyager.task('write', 'scripts', function (done) {
    browserify({ debug: true })
      .add(voyager.SRC + '/javascripts/main.js')
      .bundle()
      .pipe(vss('main.js'))
      .pipe(this.out('javascripts'))
      .on('end', done);
  });

  voyager.task('write', 'scripts-vendor', function (done) {
    this.src('javascripts/vendor/**/*.js')
      .pipe(this.out('javascripts/vendor'))
      .on('end', done);
  });

  voyager.task('build', 'scripts', function (done) {
    this.src(['javascripts/main.js', '!javascripts/vendor/**'])
      .pipe(uglify({ preserveComments: 'some' }))
      .pipe(this.out('javascripts'))
      .on('end', done);
  });

  voyager.task('build', 'scripts-vendor', function (done) {
    this.src('javascripts/vendor/**/*.js')
      .pipe(this.out('javascripts/vendor'))
      .on('end', done);
  });

  voyager.cancelWatch('javascripts/**/*.js');

  voyager.watch(['javascripts/**/*.js', '!javascripts/vendor/**'], 'scripts');
};
