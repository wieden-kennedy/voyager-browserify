var voyager = require('voyager')
  , browserify = require('browserify')
  , vss = require('vinyl-source-stream');

voyager.task('scripts-prebuild', ['scripts', 'prebuild'], function (done) {
  browserify({ debug: true })
    .add(voyager.SRC + '/javascripts/main.js')
    .bundle()
    .pipe(vss('main.js'))
    .pipe(voyager.out.dev('javascripts'))
    .on('end', done);
});

voyager.task('scripts-vendor', ['scripts', 'prebuild'], function (done) {
  this.in.src('javascripts/vendor/**/*.js')
    .pipe(this.out.dev('javascripts/vendor'))
    .on('end', done);
});

voyager.task('scripts-build', ['scripts', 'build'], function (done) {
  this.src([
      this.TMP + '/javascripts/main.js'
    , '!' + this.TMP + '/javascripts/vendor/*'
    ])
    .pipe(this.out.bld('javascripts'))
    .on('end', done);
});

voyager.task('scripts-build-vendor', ['scripts', 'build'], function (done) {
  this.in.dev('javascripts/vendor/**/*.js')
    .pipe(this.out.bld('javascripts/vendor'))
    .on('end', done);
});
