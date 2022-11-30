import { Schema, model } from "mongoose";
import paginator from "mongoose-paginate-v2";
const VideoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    videoIds: {
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
VideoSchema.plugin(paginator);
const Video = model("videos", VideoSchema);
export default Video;
