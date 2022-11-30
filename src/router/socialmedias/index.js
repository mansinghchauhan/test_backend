import { Router } from "express";
import * as socialMediaActions from "./actions";
import upload from "../../middlewares/uploader";
import { userAuth } from "../../middlewares/authGuard";
import validator from "../../middlewares/validator";
import socialMediaValidator from "../../validators/socialmedias";
const socialMediaRouter = Router();

socialMediaRouter.post(
  "/",
  socialMediaValidator,
  validator,
  userAuth,
  socialMediaActions.CREATE_SOCIALMEDIA
);
socialMediaRouter.put("/:id", userAuth, socialMediaActions.UPDATE_SOCIALMEDIA);
socialMediaRouter.delete(
  "/:id",
  userAuth,
  socialMediaActions.DELETE_SOCIALMEDIA
);
socialMediaRouter.get(
  "/byAuthor",
  userAuth,
  socialMediaActions.GET_SOCIALMEDIA_BY_AUTHOR
);
socialMediaRouter.get(
  "/:id",
  userAuth,
  socialMediaActions.GET_SOCIALMedia_BY_ID
);
socialMediaRouter.get("/", userAuth, socialMediaActions.GET_SOCIALMEDIA);

export default socialMediaRouter;
