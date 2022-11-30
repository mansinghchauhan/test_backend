import { Router } from "express";
import * as noteActions from "./actions";
import upload from "../../middlewares/uploader";
import { userAuth } from "../../middlewares/authGuard";
import noteValidator from "../../validators/notes";
import validator from "../../middlewares/validator";

const noteRouter = Router();

noteRouter.post(
  "/",
  noteValidator,
  validator,
  userAuth,
  noteActions.CREATE_NOTE
);
noteRouter.get("/", userAuth, noteActions.GET_NOTES);
noteRouter.put("/:id", userAuth, noteActions.UPDATE_NOTE);
noteRouter.get("/byAuthor", userAuth, noteActions.GET_NOTE_BY_AUTHOR);
noteRouter.get("/:id", userAuth, noteActions.GET_NOTE_BY_ID);
noteRouter.delete("/:id", userAuth, noteActions.DELETE_NOTE);

export default noteRouter;
