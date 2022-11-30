import { User } from "../../models";
import { verifyOtp, sendOtp } from '../../utils/msg91';

const userActions = {
  REGISTER_USER: async (req, res) => {
    try {
      const { email, phoneNumber } = req.body;
      // Check if the phone number and email is already registered in the database
      let user = await User.findOne({ email });
      if (user) {
        return res.status(403).json({
          message: "Email is already registered.",
          success: false,
        });
      }
      user = await User.findOne({ phoneNumber });
      if (user) {
        return res.status(403).json({
          message: "Phone number is already linked with an account.",
          success: false,
        });
      }
      // Not then create the user
      await sendOtp({ phoneNumber });
      user = await User.create({
        ...req.body,
        otpValidity: new Date(new Date().getTime() + 2 * 60000),
      });
      return res.status(201).json({
        message: "An otp has been sent to your registred mobile number.",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Something went wrong...",
      });
    }
  },
  VERIFY_USER: async (req, res) => {
    try {
      // Find the user by _id
      const { phoneNumber, otp } = req.body;
      const user = await User.findOne({ phoneNumber });
      // If user is found or not
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
          success: false,
        });
      }
      // Check if the OTP is not expired
      if (user.otpValidity < new Date().getTime()) {
        user.otpValidity = undefined;
        await user.save();
        return res.status(401).json({
          message: "OTP Expired.",
          success: false,
        });
      }
      const isOTPMatching = await verifyOtp({ phoneNumber, otp });
      // Check if the OTP is matching or not
      if (!isOTPMatching) {
        return res.status(401).json({
          message: "Invalid OTP.",
          success: false,
        });
      }
      user.verified = true;
      user.otpValidity = undefined;
      await user.save();
      const token = user.signJWT();
      return res.status(200).json({
        token,
        message: "You are now logged in.",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error.",
      });
    }
  },
  LOGIN_USER: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      const user = await User.findOne({ phoneNumber });
      // If user is found or not
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
          success: false,
        });
      }
      await sendOtp({ phoneNumber });
      user.otpValidity = new Date(new Date().getTime() + 2 * 60000);
      await user.save();
      return res.status(200).json({
        message: "An otp has been sent to your registred mobile number.",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Something is terribly wrong.",
      });
    }
  },
  VERIFY_LOGIN_OTP: async (req, res) => {
    try {
      const { phoneNumber, otp } = req.body;
      const user = await User.findOne({ phoneNumber });
      // If user is found or not
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
          success: false,
        });
      }
      if (user.otpValidity < new Date().getTime()) {
        user.otpValidity = undefined;
        user.loginOtp = undefined;
        await user.save();
        return res.status(401).json({
          message: "OTP Expired.",
          success: false,
        });
      }
      const isOTPMatching = await verifyOtp({ phoneNumber, otp })
      // Check if the OTP is matching or not
      if (!isOTPMatching) {
        return res.status(401).json({
          message: "Invalid OTP.",
          success: false,
        });
      }
      user.loginOtp = undefined;
      user.otpValidity = undefined;
      await user.save();
      const token = user.signJWT();
      return res.status(200).json({
        token,
        message: "You are now logged in.",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Something is terribly wrong.",
      });
    }
  },
  GET_AUTH_USER: async (req, res) => {
    try {
      return res.status(200).json(req.user);
    } catch (err) {
      return res.status(500).json({
        message: "Somehting went wrong.",
      });
    }
  },
};

export default userActions;
