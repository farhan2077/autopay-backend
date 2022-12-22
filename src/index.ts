import express = require("express");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import cors from "cors";

import router from "./routes";
import { datasource } from "./utils/datasource";

// establish database connection
datasource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

const app = express();
const debug = require("debug")("app");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/build"));
}

app.use(function (
  err: any,
  req: express.Request,
  res: express.Response,
  next: Function
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  debug(`Backend app listening at http://localhost:${port}`);
  console.info("Backend server has started");
});
