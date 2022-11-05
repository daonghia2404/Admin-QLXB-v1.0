var gulp = require("gulp");

//Minify HTML
var html = require("gulp-htmlmin");

gulp.task("html", () => {
  return gulp.src("src/**/*.html").pipe(html()).pipe(gulp.dest("dist"));
});

//PUG - HTML
var pug = require("gulp-pug");

gulp.task("pug", function buildHTML() {
  return gulp
    .src("./src/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("./src"));
});

//SASS - CSS
var sass = require("gulp-sass");
sass.compiler = require("node-sass");

gulp.task("sass", () => {
  return gulp
    .src("./src/assets/css/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./src/assets/css/"));
});
gulp.task("sass:watch", () => {
  gulp.watch("./src/assets/css/main.scss", gulp.series("sass"));
});

//Clean CSS
var clean = require("gulp-clean-css");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("cleanCSS", () => {
  return gulp
    .src("./src/assets/css/main.css")
    .pipe(clean())
    .pipe(
      autoprefixer({
        cascade: true,
        add: true,
      })
    )
    .pipe(gulp.dest("dist/assets/css"));
});

//Minify JS
var minify = require("gulp-minify");

gulp.task("minifyJS", () => {
  return gulp.src("./src/assets/js/**/*.js").pipe(gulp.dest("dist/assets/js"));
});

// Image / Icon - Minify
var imagesMin = require("gulp-imagemin");

gulp.task("imagesMin", () => {
  return gulp
    .src("./src/assets/images/**/*")
    .pipe(imagesMin())
    .pipe(gulp.dest("dist/assets/images"));
});

gulp.task("iconsMin", () => {
  return gulp
    .src("./src/assets/icons/**/*")
    .pipe(imagesMin())
    .pipe(gulp.dest("dist/assets/icons"));
});

// Video - Minify
gulp.task("videosMin", () => {
  return gulp
    .src("./src/assets/videos/**/*")
    .pipe(gulp.dest("dist/assets/videos"));
});

// Fonts - Minify
gulp.task("fontsMin", () => {
  return gulp
    .src("./src/assets/css/fonts/**/*")
    .pipe(gulp.dest("dist/assets/css/fonts"));
});

//Browser Sync
var browserSync = require("browser-sync");
var reload = browserSync.reload;

gulp.task("serve", () => {
  var files = [
    "./src/**/*.html",
    "./src/**/*.pug",
    "./src/assets/css/**/*.scss",
    "./src/assets/js/**/*.js",
  ];

  browserSync.init(files, {
    server: {
      baseDir: "./src",
    },
  });

  gulp.watch(["./src/**/*.html"], reload);
  gulp.watch(["./src/**/*.pug"], gulp.series("pug"), reload);
  gulp.watch(["./src/assets/css/**/*.scss"], gulp.series("sass"), reload);
  gulp.watch(["./src/assets/js/**/*.js"], reload);
});

//Gulp-Method
gulp.task("dev", gulp.series("serve"));
gulp.task(
  "build",
  gulp.series(
    "html",
    "cleanCSS",
    "minifyJS",
    "imagesMin",
    "iconsMin",
    "videosMin",
    "fontsMin"
  )
);
