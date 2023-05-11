import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema, model } = mongoose;

const socialmediaSchema = new Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    whatsapp: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "Socialmedia",
  }
);
socialmediaSchema.plugin(mongoosePaginate);

socialmediaSchema.pre(['find', 'findOne', 'save', 'create'], function () {
	this.populate(['admin_id']);
});

const SocialmediaModel = model("Post", socialmediaSchema);
SocialmediaModel.paginate().then({});
export default SocialmediaModel;
