import { Schema, model } from "mongoose";
import paginator from "mongoose-paginate-v2";
const socialMediaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    socialMediaIds: {
      type: [Schema.Types.ObjectId],
      ref: "files",
    },
    socialMediaType: {
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
socialMediaSchema.plugin(paginator);
const socialMedia = model("socialmedias", socialMediaSchema);
export default socialMedia;
