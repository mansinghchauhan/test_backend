import { Schema, model } from "mongoose";
import Paginator from "mongoose-paginate-v2";

const FileSchema = new Schema(
  {
    filePath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
FileSchema.plugin(Paginator);
const File = model("files", FileSchema);
export default File;
