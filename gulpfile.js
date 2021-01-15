// CSS configuration

const GULP = require("gulp");
const GUTIL = require("gulp-util");
// const GAP = require('gulp-append-prepend');
const GBABEL = require('gulp-babel');
const GTS = require("gulp-typescript");
const GTSPROJ = GTS.createProject("tsconfig.json");
const CONCAT = require("gulp-concat");
const CLEAN = require("gulp-clean-css");
const AUTOPREFIXER = require("gulp-autoprefixer");

GULP.task("build-css", function (cb) {
  GULP.src("./src/CSS/*.css")
    .pipe(CONCAT("root.min.css"))
    .pipe(CLEAN())
    .pipe(
      AUTOPREFIXER({
        cascade: false,
      })
    )
    .pipe(GULP.dest("./dist/CSS/"))
    .on("error", GUTIL.log);
  cb();
});

GULP.task("build-ts", function () {
  let tsResult =
    GULP.src("./src/ts/**/*.ts")
        .pipe(GTSPROJ());

    let tsFinalResult = tsResult.js;
  return tsFinalResult
  .pipe(CONCAT('root.min.js'))
  // .pipe(GAP.appendFile('./src/ts/__root/KJSComponent.js'))
  // .pipe(GAP.appendFile('./src/js/_root/root.js'))
  .pipe(GBABEL({
    presets: 
    ['@babel/preset-env', ['minify', {
      evaluate: false,
      mangle: false
    }],
  ],
    plugins: ["module:faster.js"],
    comments: false  }))
  .pipe(GULP.dest("./dist/js"));
});

GULP.task("build-js", function () {
  return GULP.src(["./src/ts/Script/Libs/*.js", "./src/js/*.js", "!./src/js/_root/root.js"])
  /*.pipe(GBABEL({
    presets: ['@babel/env', ['minify', {
      builtIns: false,
      evaluate: false,
      mangle: false,
    }],],
    plugins: ["module:faster.js"]
  }))  
  */
  .pipe(CONCAT('root-lib.min.js'))
  .pipe(GULP.dest("./dist/js/"));
});

GULP.task("build-html", function () {
  return GULP.src("./src/**/*.html").pipe(GULP.dest("./dist"));
});

GULP.task("build-assets", function () {
  return GULP.src("./src/Assets/**/*.*").pipe(GULP.dest("./dist/Assets"));
});

GULP.task(
  "build-site",
  GULP.series(
    "build-css",
    function (cb) {
      GULP.watch("./src/CSS/root.css", GULP.series("build-css"));
      cb();
    },
    "build-html",
    function (cb) {
      GULP.watch("./src/**/*.html", GULP.series("build-html"));
      cb();
    },
    "build-js",
    function (cb) {
      GULP.watch("./src/js/**/*.js", GULP.series("build-js"));
      cb();
    },
    "build-ts",
    function (cb) {
      GULP.watch("./src/ts/**/*.ts", GULP.series("build-ts", "build-js"));
      cb();
    },
    "build-assets",
    function (cb) {
      cb();
    }
  )
);
