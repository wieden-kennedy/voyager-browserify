var voyager = require('voyager')
  , browserify = require('browserify')
  , vfs = require('vinyl-fs')
  , vss = require('vinyl-source-stream');

voyager.task('scripts-prebuild', ['scripts', 'prebuild'], function (done) {
  browserify({ debug: true })
    .add(voyager.SRC + '/javascripts/main.js')
    .bundle()
    .pipe(vss('main.js'))
    .pipe(vfs.dest(voyager.TMP + '/javascripts'))
    .on('end', done);
});

voyager.task('scripts-vendor', ['scripts', 'prebuild'], function (done) {
  vfs.src(this.SRC + '/javascripts/vendor/**/*.js')
    .pipe(vfs.dest(this.TMP + '/javascripts/vendor'))
    .on('end', done);
});

voyager.task('scripts-build', ['scripts', 'build'], function (done) {
  vfs.src([
      this.TMP + '/javascripts/main.js'
    , '!' + this.TMP + '/javascripts/vendor/*'
    ])
    .pipe(vfs.dest(this.BLD + '/javascripts'))
    .on('end', done);
});

voyager.task('scripts-build-vendor', ['scripts', 'build'], function (done) {
  vfs.src(this.TMP + '/javascripts/vendor/**/*.js')
    .pipe(vfs.dest(this.BLD + '/javascripts/vendor'))
    .on('end', done);
});
