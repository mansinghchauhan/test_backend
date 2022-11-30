import { check } from "express-validator";

const name = check("name", "Name is required").not().isEmpty();
const phoneNumber = check("phoneNumber", "phoneNumber is required").not().isEmpty();
const nomineesValidator = [name, phoneNumber];
export default nomineesValidator;