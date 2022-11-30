import { Router } from "express";
import * as videoActions from "./actions";
import upload from "../../middlewares/uploader";
import { userAuth } from "../../middlewares/authGuard";
import videoValidator from "../../validators/videos";
import validator from "../../middlewares/validator";

const videorouter = Router();

videorouter.post(
  "/",
  videoValidator,
  validator,
  userAuth,
  videoActions.CREATE_VIDEO
);
videorouter.get("/", userAuth, videoActions.GET_VIDEO);
videorouter.put("/:id", userAuth, videoActions.UPDATE_VIDEO);
videorouter.get("/byAuthor", userAuth, videoActions.GET_VIDEO_BY_AUTHOR);
videorouter.get("/:id", userAuth, videoActions.GET_VIDEO_BY_ID);
videorouter.delete("/:id", userAuth, videoActions.DELETE_VIDEO);

export default videorouter;
