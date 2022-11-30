import { Schema, model } from "mongoose";
import paginator from "mongoose-paginate-v2";
const MottoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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
MottoSchema.plugin(paginator);
const Motto = model("mottos", MottoSchema);

export default Motto;
