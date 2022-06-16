/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const { parallel, series, src, dest } = require("gulp");
const sass = require("gulp-dart-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");

function compile() {
  return src("./src/*.scss")
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["ie > 9", "last 2 versions"],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest('../../outputFile//lib-sub/theme-chalk/src/'));
}

function copyfont() {
  return src("./src/fonts/**")
    .pipe(cssmin())
    .pipe(dest("./lib/fonts"));
}

 const build = parallel(
  series(compile, copyfont)
)

exports.build = build;
