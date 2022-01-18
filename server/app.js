var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user.route");
var postRouter = require("./routes/post.route");
var locationRouter = require("./routes/location.route");
var missionRouter = require("./routes/mission.route");
var accountRouter = require("./routes/account.route");
var commentRouter = require("./routes/comment.route");
var adminRouter = require("./routes/admin.route");
var likeRouter = require("./routes/like.route");
var voucherRouter = require("./routes/voucher.route");
var notifyRouter = require("./routes/notifications.route");

var app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/location", locationRouter);
app.use("/mission", missionRouter);
app.use("/account", accountRouter);
app.use("/comment", commentRouter);
app.use("/admin", adminRouter);
app.use("/like", likeRouter);
app.use("/voucher", voucherRouter);
app.use("/notify", notifyRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
