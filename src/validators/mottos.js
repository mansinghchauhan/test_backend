import { check } from "express-validator";
import { model } from "mongoose";
const title = check("title", "title is required").not().isEmpty();
const description = check("description", "description is required")
  .not()
  .isEmpty();
const videoUrl = check("videoUrl", "video url is required").not().isEmpty();
const imageUrl = check("imageUrl", "image url is required").not().isEmpty();
const audioUrl = check("audioUrl", "audio Url is required").not().isEmpty();

const MottoValidator = [title, description];
export default MottoValidator;
