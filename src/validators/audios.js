import { check } from "express-validator";
const title = check("title", "title is required").not().isEmpty();
export const audioUrl = check("audioIds", "audioIds  is required")
  .not()
  .isEmpty();

const audioValidator = [title, audioUrl];

export default audioValidator;
