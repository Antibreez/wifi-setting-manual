/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
`use strict`;

let gulp = require(`gulp`);
let del = require(`del`);
let plumber = require(`gulp-plumber`);
let sourcemap = require(`gulp-sourcemaps`);
let concat = require(`gulp-concat`);
let rename = require(`gulp-rename`);
let newer = require(`gulp-newer`);
let imagemin = require(`gulp-imagemin`);
let svgstore = require(`gulp-svgstore`);
let webp = require(`gulp-webp`);
let posthtml = require(`gulp-posthtml`);
let include = require(`posthtml-include`);

let sass = require(`gulp-sass`);
let postcss = require(`gulp-postcss`);
let autoprefixer = require(`autoprefixer`);
let csso = require(`gulp-csso`);

let uglify = require(`gulp-terser`);

let server = require(`browser-sync`).create();

gulp.task(`clean`, function () {
  return del(`build`);
});

gulp.task(`copy`, function () {
  return gulp.src([
    `source/fonts/**`,
    `source/data.json`
  ], {
    base: `source`
  })
    .pipe(gulp.dest(`build`));
});

// СТИЛИ
gulp.task(`css`, function () {
  return gulp.src(`source/scss/style.scss`)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass({
      outputStyle: `expanded`
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest(`build/css`))
    .pipe(csso())
    .pipe(rename(`style.min.css`))
    .pipe(sourcemap.write(`.`))
    .pipe(gulp.dest(`build/css`))
    .pipe(server.stream());
});

// ИЗОБРАЖЕНИЯ
gulp.task(`sprite`, function () {
  return gulp.src(`source/img/*.svg`)
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename(`sprite.svg`))
    .pipe(gulp.dest(`build/img`));
});

gulp.task(`webp`, function () {
  return gulp.src(`build/img/*.{png,jpg,gif}`)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(`build/img`));
});

gulp.task(`images`, function () {
  return gulp.src(`source/img/**/*.{png,jpg,svg,gif}`)
    .pipe(newer(`build/img`))
    .pipe(gulp.dest(`build/img`));
});

gulp.task(`imagemin`, function () {
  return gulp.src(`build/img/**/*.{png,jpg,svg}`)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false,
          removeUselessStrokeAndFill: false
        }]
      })
    ]))
    .pipe(gulp.dest(`build/img`));
});

// СКРИПТЫ
gulp.task(`js-vendor`, function () {
  return gulp.src([
    `source/js/vendor/*.js`,
  ])
    .pipe(plumber())
    .pipe(concat(`vendor.js`))
    .pipe(gulp.dest(`build/js`))
    .pipe(uglify())
    .pipe(rename({
      suffix: `.min`
    }))
    .pipe(gulp.dest(`build/js`));
});

gulp.task(`js`, function () {
  return gulp.src([
    `source/js/modules/animation.js`,
    `source/js/modules/backend.js`,
    `source/js/modules/select.js`,
    `source/js/modules/resize.js`,
    `source/js/modules/choice.js`,
    `source/js/modules/equipment.js`,
    `source/js/modules/process.js`,
  ])
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(concat(`script.js`))
    .pipe(gulp.dest(`build/js`))
    .pipe(uglify())
    .pipe(rename({
      suffix: `.min`
    }))
    .pipe(sourcemap.write())
    .pipe(gulp.dest(`build/js`));
});

// HTML
gulp.task(`html`, function () {
  return gulp.src(`source/*.html`)
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest(`build`));
});

// СТРИМ
gulp.task(`server`, function () {
  server.init({
    server: `build/`,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(`source/scss/**/*.scss`, gulp.series(`css`));
  gulp.watch(`source/img/**/*`, gulp.series(`images`, `sprite`, `webp`, `refresh`));
  gulp.watch(`source/js/**/*.js`, gulp.series(`js`, `js-vendor`, `refresh`));
  gulp.watch(`source/*.html`).on(`change`, gulp.series(`html`, `refresh`));
});

gulp.task(`refresh`, function (done) {
  server.reload();
  done();
});

// СБОРКА И СТАРТ
gulp.task(`build`, gulp.series(`clean`, `copy`, `images`, `webp`, `imagemin`, `sprite`, `css`, `js-vendor`, `js`, `html`));
gulp.task(`start`, gulp.series(`build`, `server`));
