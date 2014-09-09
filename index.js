var voyager = require('voyager')
  , browserify = require('browserify')
  , vfs = require('vinyl-fs')
  , vss = require('vinyl-source-stream');

voyager.task('browserify', 'scripts', function (done) {
  browserify({ debug: true })
    .add(voyager.SRC + '/javascripts/main.js')
    .bundle()
    .pipe(vss('main.js'))
    .pipe(vfs.dest(voyager.TMP + '/javascripts'))
    .on('end', done);
});
