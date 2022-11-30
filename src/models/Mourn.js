import { Schema, model } from "mongoose";
import paginator from "mongoose-paginate-v2";
const MournSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  write: {
    type: String,
    required: true,
  },
  cremateType: {
    type: [Schema.Types.ObjectId],
    ref:"dropdowns",
    required: true,
  },
  author:{
    type:[Schema.Types.ObjectId],
    ref:"users"
  }
},
{
  timestamps:true
});
MournSchema.plugin(paginator);
const Mourn=model("mourn",MournSchema);
export default Mourn;