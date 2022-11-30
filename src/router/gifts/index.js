import { Router } from "express";
import * as giftAction from "./actions";
import GiftValidator from "../../validators/gifts";
import validator from "../../middlewares/validator";
import { userAuth } from "../../middlewares/authGuard";

const giftRouter = Router();

giftRouter.post(
  "/",
  GiftValidator,
  validator,
  userAuth,
  giftAction.CREATE_GIFT
);
giftRouter.put("/:id", userAuth, giftAction.UPDATE_GIFT);
giftRouter.delete("/:id", userAuth, giftAction.DELETE_GIFT);
giftRouter.get("/byAuthor", userAuth, giftAction.GET_GIFT_BY_AUTHOR);
giftRouter.get("/:id", userAuth, giftAction.GET_GIFT_BY_ID);
giftRouter.get("/", userAuth, giftAction.GET_GIFT);

export default giftRouter;
