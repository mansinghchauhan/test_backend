import { Schema, model } from "mongoose";

const FileDeleteSchema = new Schema(
  {
    path: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const FileDelete = model("filedelete", FileDeleteSchema);
export default FileDelete;
