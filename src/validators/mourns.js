import { check } from "express-validator";

const Title = check("title", "Title is required").not().isEmpty();
const Description = check("description", "Description is required").not().isEmpty();
const Write = check("write", "write is required").not().isEmpty();
const CremateType = check("cremateType", "cremate Type is required").not().isEmpty();

const MournValidator = [Title, Description, CremateType, Write];
export default MournValidator;