import * as imageAction from "./actions";
import { Router } from "express";
import { userAuth } from "../../middlewares/authGuard";
import imageValidator from "../../validators/images";
import validator from "../../middlewares/validator";

const imageRouter = Router();
imageRouter.post(
  "/",
  imageValidator,
  validator,
  userAuth,
  imageAction.CREATE_IMAGE
);
imageRouter.put("/:id", userAuth, imageAction.UPDATE_IMAGE);
imageRouter.delete("/:id", userAuth, imageAction.DELETE_IMAGE);
imageRouter.get("/byAuthor", userAuth, imageAction.GET_IMAGE_BY_AUTHOR);
imageRouter.get("/", userAuth, imageAction.GET_IMAGE);
imageRouter.get("/:id", userAuth, imageAction.GET_IMAGE_BY_ID);

export default imageRouter;
