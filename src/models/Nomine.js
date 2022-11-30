import { Schema, model } from "mongoose";

const nomineeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    otp: {
      type: Number,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Nominee = model("nominees", nomineeSchema);
export default Nominee;
