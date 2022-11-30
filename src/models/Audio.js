import { Schema, model } from "mongoose";
import Paginator from "mongoose-paginate-v2";

const AudioSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    audioIds: {
      type: [Schema.Types.ObjectId],
      ref: "files",
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

AudioSchema.plugin(Paginator);

const Audio = model("audios", AudioSchema);
export default Audio;
