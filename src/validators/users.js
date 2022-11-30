import { check } from "express-validator";

const otp = check("otp", "Opt is required.").isNumeric();
const name = check("name", "Name is required.").not().isEmpty();
const email = check("email", "Please enter a valid email.").isEmail();
const phoneNumber = check("phoneNumber", "Phone number is required.")
  .not()
  .isEmpty();

export const loginValidator = [phoneNumber];
export const otpValidator = [phoneNumber, otp];
export const registerValidator = [name, email, phoneNumber];
