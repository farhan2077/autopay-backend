"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var datasource_1 = require("./utils/datasource");
// establish database connection
datasource_1.datasource
    .initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (error) {
    console.error("Error during Data Source initialization:", error);
});
var app = express();
var debug = require("debug")("app");
app.use(logger("dev"));
app.use((0, cors_1.default)());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", routes_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + "/build"));
}
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
});
var port = process.env.PORT || 4000;
app.listen(port, function () {
    debug("Backend app listening at http://localhost:".concat(port));
    console.info("Backend server has started");
});
