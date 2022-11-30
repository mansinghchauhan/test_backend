import * as audioAction from "./actions";
import { Router } from "express";
import { userAuth } from "../../middlewares/authGuard";
import audioValidator from "../../validators/audios";
import validator from "../../middlewares/validator";

const audiorouter = Router();
audiorouter.post(
  "/",
  audioValidator,
  validator,
  userAuth,
  audioAction.CREATE_AUDIO
);
audiorouter.put("/:id", userAuth, audioAction.UPDATE_AUDIO);
audiorouter.delete("/:id", userAuth, audioAction.DELETE_AUDIO);
audiorouter.get("/byAuthor", userAuth, audioAction.GET_AUDIO_BY_AUTHOR);
audiorouter.get("/:id", userAuth, audioAction.GET_AUDIO_BY_ID);
audiorouter.get("/", userAuth, audioAction.GET_AUDIOS);

export default audiorouter;
