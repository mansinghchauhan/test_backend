import { Schema, model } from "mongoose";
import paginator from "mongoose-paginate-v2";

const GiftSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  relationId: {
    type: Schema.Types.ObjectId,
    ref: "dropdowns",
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "dropdowns",
    required: true,
  },

  link: {
    type: String,
    required: true,
  },

  videoIds: {
    type: [Schema.Types.ObjectId],
    ref: "files",
    required: true,
  },
  author: {
    type: [Schema.Types.ObjectId],
    ref: "users",
    required: true,
  },
});
GiftSchema.plugin(paginator);
const Gift = model("gifts", GiftSchema);
export default Gift;
