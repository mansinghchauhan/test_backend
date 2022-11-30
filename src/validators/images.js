import { check } from "express-validator";

const title = check("title", "title is required").not().isEmpty();
export const imageIds = check("imageIds", "image Url is required")
  .not()
  .isEmpty();

const audioValidator = [title, imageIds];

export default audioValidator;
