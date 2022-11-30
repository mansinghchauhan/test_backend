import { check } from "express-validator";

const dropdownType = check("dropdownType", "dropdowntype is required")
  .not()
  .isEmpty();
const dropdownItem = check("dropdownItem", "dropdownitems is required")
  .not()
  .isEmpty();

export const dropdownValidator = [dropdownType, dropdownItem];
