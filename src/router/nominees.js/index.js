import * as nomineeAction from "./actions";
import nomineeValidator from "../../validators/nominees";
import { userAuth } from "../../middlewares/authGuard";
import validator from "../../middlewares/validator";
import { Router } from "express";

const nomineeRouter = Router();

nomineeRouter.get("/by-user", userAuth, nomineeAction.GET_NOMINEE_BY_USER);
nomineeRouter.get("/", userAuth, nomineeAction.GET_NOMINEES);
nomineeRouter.put("/:id", userAuth, nomineeAction.UPDATE_NOMINEE);
nomineeRouter.delete("/:id", userAuth, nomineeAction.DELETE_NOMINEE);
nomineeRouter.post(
  "/",
  nomineeValidator,
  validator,
  userAuth,
  nomineeAction.CREATE_NOMINEE
);
export default nomineeRouter;
