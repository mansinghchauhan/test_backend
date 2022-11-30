import * as dropdownActions from "./actions";
import { Router } from "express";
import { userAuth } from "../../middlewares/authGuard";
import validator from "../../middlewares/validator";
import { dropdownValidator } from "../../validators/dropdowns";

const dropdownRouter = Router();
dropdownRouter.put("/:id", userAuth, dropdownActions.UPDATE_DROPDOWN);
dropdownRouter.post(
  "/",
  dropdownValidator,
  validator,
  userAuth,
  dropdownActions.CREATE_DROPDOWN
);
dropdownRouter.delete("/:id", userAuth, dropdownActions.DELETE_DROPDOWN);
dropdownRouter.get(
  "/:dropdownType",
  userAuth,
  dropdownActions.GET_DROPDOWN_BY_DROPDOWN_TYPE
);

export default dropdownRouter;
