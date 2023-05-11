import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    image: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "Post",
  }
);
postSchema.plugin(mongoosePaginate);

postSchema.pre(['find', 'findOne', 'save', 'create'], function () {
	this.populate(['admin_id']);
});

const PostModel = model("Post", postSchema);
PostModel.paginate().then({});
export default PostModel;
