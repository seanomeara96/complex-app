var postcss = require("gulp-postcss");
var gulp = require("gulp");
var plugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-hexrgba"),
  require("postcss-nested"),
  require("autoprefixer"),
  require("cssnano"),
];
gulp.task("style", function () {
  gulp.watch("./styles/**/*.css").on("change", () => {
    return gulp
      .src("./styles/*.css")
      .pipe(postcss(plugins))
      .pipe(gulp.dest("./src"));
  });
});
