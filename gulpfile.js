'use strict';

const { src } = require('gulp');

const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      sass = require('gulp-sass'),
      csso = require('gulp-csso'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      plumber = require('gulp-plumber'),
      rigger = require('gulp-rigger'),
      notify = require('gulp-notify'),
      fileinclude = require('gulp-file-include'),
      browserSync = require('browser-sync').create();

const path = {
  src: {
    vendor_js: ['node_modules/jquery/dist/jquery.min.js'],
    vendor_css: ['node_modules/normalize.css/normalize.css'],
    css: ['src/scss/**/*.scss'],
    js: 'src/js/*.js',
    html: 'src/*.html'
  },
  build: {
    css: 'build/css/',
    js: 'build/js/',
    html: 'build/'
  },
  watch: {
    css: 'src/scss/**',
    js: 'src/js/**/*.js',
    html: 'src/**/*.html'
  },
};

const options = {
  fileInclude: {
    prefix: '@@',
    basepath: 'src/components/'
  }
};

gulp.task('vendor:css', () =>
    gulp.src(path.src.vendor_css)
    .pipe(csso())
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest(path.build.css))
);

gulp.task('vendor:js', () =>
  gulp.src(path.src.vendor_js)
  .pipe(concat('vendor.min.js'))
  .pipe(gulp.dest(path.build.js))
);

gulp.task('vendor', gulp.parallel(['vendor:js', 'vendor:css']));

gulp.task('build:css', () =>
  gulp.src(path.src.css)
  .pipe(sass())
  .pipe(autoprefixer({
    overrideBrowserslist: ["defaults"],
    cascade: false
  }))
  .pipe(csso())
  .pipe(concat('main.min.css'))
  .pipe(gulp.dest(path.build.css))
);

gulp.task('build:js', () =>
  gulp.src(path.src.js)
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(path.build.js))
);

gulp.task('build:html', () =>
  gulp.src(path.src.html)
  .pipe(rigger())
  .pipe(fileinclude(options.fileInclude))
  .pipe(gulp.dest(path.build.html))
);

gulp.task('build', gulp.parallel(['vendor', 'build:css', 'build:js', 'build:html']));

gulp.task('watch:css', (done) => {
  gulp.src(path.src.css)
  .pipe(plumber({errorHandler: notify.onError('Error: <%= error %>')}))
  .pipe(sass())
  .pipe(concat('main.min.css'))
  .pipe(gulp.dest(path.build.css));

browserSync.reload();
done();
});

gulp.task('watch:js', (done) => {
  gulp.src(path.src.js)
  .pipe(plumber({errorHandler: notify.onError('Error: <%= error %>')}))
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(concat('main.min.js'))
  .pipe(gulp.dest(path.build.js));

browserSync.reload();
done();
});

gulp.task('watch:html', () =>
  gulp.src(path.src.html)
  .pipe(plumber({errorHandler: notify.onError('Error: <%= error %>')}))
  .pipe(rigger())
  .pipe(fileinclude(options.fileInclude))
  .pipe(gulp.dest(path.build.html))
);

gulp.task('watch', () => {
  gulp.watch(path.watch.css, gulp.parallel('watch:css'));
  gulp.watch(path.watch.js, gulp.parallel('watch:js'));
  gulp.watch(path.watch.html, gulp.parallel('watch:html')).on('change', browserSync.reload);
});


gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './build/'
    }
  });
})

gulp.task('default', gulp.parallel('watch', 'serve'));
