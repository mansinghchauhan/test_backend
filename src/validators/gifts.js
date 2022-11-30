import { check } from "express-validator";

const title = check("title", "title is required").not().isEmpty();
const description = check("description", "description is required")
  .not()
  .isEmpty();
const relationId = check("relationId", "relation Id is required")
  .not()
  .isEmpty();
const categorieId = check("categoryId", "categorie Id is required")
  .not()
  .isEmpty();
const link = check("link", "link is required").not().isEmpty();
const GiftValidator = [title, description, relationId, categorieId, link];
export default GiftValidator;
