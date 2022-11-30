import { Schema, model } from "mongoose";
import paginator from "mongoose-paginate-v2";

const NoteSchema = new Schema(
  {
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
    imageIds: {
      type: [Schema.Types.ObjectId],
      ref: "files",
      required: true,
    },

    mediaIds: {
      type: [Schema.Types.ObjectId],
      ref: "files",
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
NoteSchema.plugin(paginator);
const Note = model("notes", NoteSchema);
export default Note;
