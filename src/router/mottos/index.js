import { Router } from "express";
import * as mottoActions from "./actions";
import upload from "../../middlewares/uploader";
import { userAuth } from "../../middlewares/authGuard";
import MottoValidator from "../../validators/mottos";
import validator from "../../middlewares/validator";
const mottoRouter = Router();
mottoRouter.put("/:id", userAuth, mottoActions.UPDATE_MOTO);
mottoRouter.post(
  "/",
  MottoValidator,
  validator,
  userAuth,
  mottoActions.CREATE_MOTTO
);
mottoRouter.delete("/:id", userAuth, mottoActions.DELETE_MOTTO);
mottoRouter.get("/", userAuth, mottoActions.GET_MOTO);
mottoRouter.get("/:id", userAuth, mottoActions.GET_MOTO_BY_ID);
export default mottoRouter;
