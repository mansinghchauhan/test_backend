import * as mournActions from "./actions";
import MournValidator from "../../validators/mourns";
import Validator from "../../middlewares/validator";
import { userAuth } from "../../middlewares/authGuard";
import { Router } from "express";

const mournRouter = Router();
mournRouter.post(
  "/",
  MournValidator,
  Validator,
  userAuth,
  mournActions.CREATE_MOURN
);
mournRouter.put("/:id", userAuth, mournActions.UPDATE_MOURN);
mournRouter.delete("/:id", userAuth, mournActions.DELETE_MOURN);
mournRouter.get("/:id", userAuth, mournActions.GET_MOURN_BY_ID);
mournRouter.get("/", userAuth, mournActions.GET_MOURN);

export default mournRouter;
