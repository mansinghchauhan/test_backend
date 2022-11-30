import { check } from "express-validator";

const title = check("title", "title is required").not().isEmpty();
export const videoUrl = check("videoIds", "videoIds is required")
  .not()
  .isEmpty();

export const message = check("message", "message is required");

const videoValidator = [title, videoUrl, message];

export default videoValidator;
