import { Schema, model } from "mongoose";
import paginator from "mongoose-paginate-v2";

const ImageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageIds: {
      type: [Schema.Types.ObjectId],
      ref: "files",
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
ImageSchema.plugin(paginator);
const Image = model("images", ImageSchema);
export default Image;
