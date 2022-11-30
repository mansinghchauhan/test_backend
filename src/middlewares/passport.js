import passport from "passport";
import { User } from "../models";
import { Strategy, ExtractJwt } from "passport-jwt";
import { APP_SECRET as secretOrKey } from "../config";

const opts = {
  secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(opts, async ({ _id }, done) => {
    try {
      let user = await User.findById(_id);
      if (!user) {
        throw new Error("User not found.");
      }
      return done(null, user.getUserDetails());
    } catch (err) {
      done(null, false);
    }
  })
);
