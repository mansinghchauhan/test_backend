import { check } from "express-validator";
const title = check("title", "title is required").not().isEmpty();
const description = check("description", "description is required")
  .not()
  .isEmpty();

export const dairyValidator = [title, description];
