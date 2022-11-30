import { check } from "express-validator";
import { model } from "mongoose";

const title = check("title", "title is required").not().isEmpty();
const description = check("description", "description is required")
  .not()
  .isEmpty();
const imageIds = check("imageIds", "image Id is required").not().isEmpty();
const mediaIds = check("mediaIds", "media Id is required").not().isEmpty();
const relationId = check("relationId", "relationId id required")
  .not()
  .isEmpty();
const NoteValidator = [title, description, imageIds, mediaIds, relationId];
export default NoteValidator;
