import cors from "cors";
import consola from "consola";
import mongoose from "mongoose";
import passport from "passport";
import express, { json } from "express";
import swaggerUI from "swagger-ui-express";

import { DB, PORT } from "./config";
import userRouter from "./router/users";
import mottoRouter from "./router/mottos";
import file_uploadrouter from "./router/files";
import swaggerDocs from "./docs/swagger.json";
import diaryRouter from "./router/dairies";
import videoRouter from "./router/videos";
import audioRouter from "./router/audios";
import imageRouter from "./router/images";
import noteRouter from "./router/notes";
import dropdownRouter from "./router/dropdowns";
import socialMediaRouter from "./router/socialmedias";
import giftRouter from "./router/gifts";
import mournRouter from "./router/mourns";
import donationRouter from "./router/donations";
import nomineeRouter from "./router/nominees.js";
const app = express();
app.use(json());
app.use(cors());
app.use(passport.initialize());
const path = require("path");
app.use("/static", express.static(path.join(__dirname, "uploads")));
// Import passport middleware

require("./middlewares/passport");

// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api/users", userRouter);
app.use("/api/mottos", mottoRouter);
app.use("/api/file-uploader", file_uploadrouter);
app.use("/api/dairies", diaryRouter);
app.use("/api/videos", videoRouter);
app.use("/api/audios", audioRouter);
app.use("/api/images", imageRouter);
app.use("/api/notes", noteRouter);
app.use("/api/dropdowns", dropdownRouter);
app.use("/api/socialMedias", socialMediaRouter);
app.use("/api/gifts", giftRouter);
app.use("/api/mourns", mournRouter);
app.use("/api/donations", donationRouter);
app.use("/api/nominees", nomineeRouter);
const main = async () => {
  try {
    await mongoose.connect(DB, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });
    consola.success({ message: "DATABASE CONNECTED", badge: true });
    app.listen(PORT, () =>
      consola.success({
        message: `Server started listening on PORT ${PORT}`,
        badge: true,
      })
    );
  } catch (err) {
    consola.error({
      message: err.message,
      badge: true,
    });
  }
};

export default main;
