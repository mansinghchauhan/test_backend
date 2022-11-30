import { Schema, model } from "mongoose";

const dropdownSchema = new Schema(
  {
    dropdownType: {
      type: String,
      required: true,
    },
    dropdownItem: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Dropdown = model("dropdowns", dropdownSchema);
export default Dropdown;
