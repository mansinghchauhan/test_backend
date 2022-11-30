import { Router } from "express";
import userActions from "./actions";
import validator from "../../middlewares/validator";
import { userAuth } from "../../middlewares/authGuard";
import {
  otpValidator,
  loginValidator,
  registerValidator,
} from "../../validators/users";

const userRouter = Router();

userRouter.post(
  "/register",
  registerValidator,
  validator,
  userActions.REGISTER_USER
);

userRouter.post(
  "/verify-otp",
  otpValidator,
  validator,
  userActions.VERIFY_USER
);

userRouter.post("/auth", loginValidator, validator, userActions.LOGIN_USER);

userRouter.post(
  "/verify-login-otp",
  otpValidator,
  validator,
  userActions.VERIFY_LOGIN_OTP
);

userRouter.get("/auth", userAuth, userActions.GET_AUTH_USER);

export default userRouter;
