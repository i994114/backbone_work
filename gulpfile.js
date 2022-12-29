//plug-in
var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');


// gulpタスクの作成
gulp.task('build', function(){
  browserify({
    entries: ['src/app.js'] // ビルド元のファイルを指定
  }).bundle()
    .pipe(source('bundle.js')) // 出力ファイル名を指定
    .pipe(gulp.dest('dist/')); // 出力ディレクトリを指定
});
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./", // 対象ディレクトリ
      index: "index.html" //indexファイル名
    }
  });
});
gulp.task('bs-reload', function () {
  browserSync.reload();
});

// Gulpを使ったファイルの監視
gulp.task('default', ['build', 'browser-sync'], function(){
  gulp.watch('./src/*.js', ['build']);
  gulp.watch("./*.html", ['bs-reload']);
  gulp.watch("./dist/*.+(js|css)", ['bs-reload']);
});
