import { Schema, model } from "mongoose";
import Paginator from "mongoose-paginate-v2";

const DiarySchema = new Schema(
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
DiarySchema.plugin(Paginator);
const Diary = model("diaries", DiarySchema);
export default Diary;
