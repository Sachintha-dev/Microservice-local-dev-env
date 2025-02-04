import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.middleware";
import { resourceNotFound } from "./utils/nofFoundError.handler";
import { config } from "./config";
import router from "./api";
var cookies = require("cookie-parser");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const hpp = require("hpp");
import methodCheckMiddleware from "./middlewares/methodCheck.middleware";

// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000,    // 10 minutes
//   max: 100                     // 100 requests per IP
// });
class App {
  express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  setMiddlewares(): void {
    this.express.enable("trust proxy");
    this.express.use(helmet());
    this.express.use(xssClean());
    // this.express.use(limiter);
    this.express.use(hpp());
    this.express.use(cors());
    this.express.use((req, res, next) => {
      res.setHeader("X-Frame-Options", "sameorigin");
      res.header("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Content-Security-Policy-Report-Only",
        "default-src 'self'; frame-ancestors 'self'; script-src 'self' "
      );
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomain"
      );

      next();
    });
    this.express.use(
      session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
          httpOnly: true,
          sameSite: "strict", //👈 new code
        },
      })
    );
    this.express.use(methodCheckMiddleware);
    this.express.use(morgan("dev"));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(cookies());
  }

  setRoutes(): void {
    this.express.use(config.api.prefix, router);
  }

  catchErrors(): void {
    this.express.use(resourceNotFound);
    this.express.use(errorHandler);
  }
}

export default new App().express;
