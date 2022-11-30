import { check } from "express-validator";
const title = check("title", "title is required").not().isEmpty();
const message = check("message", "message is required").not().isEmpty();
// const socialMediaIds = check(" socialMediaIds", "socialMediaIds is required")
//   .not()
//   .isEmpty();
const socialMediaType = check("socialMediaType", "social Media type Required")
  .not()
  .isEmpty();
const socialMediaValidator = [title, message, socialMediaType];
export default socialMediaValidator;
