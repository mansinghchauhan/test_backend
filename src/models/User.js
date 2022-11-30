import { Schema, model } from "mongoose";
import { APP_SECRET } from "../config";
import sign from "jsonwebtoken/sign";
import { pick } from "lodash";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    loginOtp: {
      type: Number,
      required: false,
    },
    otpValidity: {
      type: Date,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.getUserDetails = function () {
  return pick(this, ["_id", "name", "email", "phoneNumber"]);
};

UserSchema.methods.signJWT = function () {
  return sign(this.getUserDetails(), APP_SECRET, { expiresIn: "10 day" });
};

const User = model("users", UserSchema);

export default User;
