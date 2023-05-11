import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema, model } = mongoose;

const feedbackSchema = new Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "Feedback",
  }
);
feedbackSchema.plugin(mongoosePaginate);

feedbackSchema.pre(['find', 'findOne', 'save', 'create'], function () {
	this.populate(['admin_id', 'user_id']);
});

const FeedbackModel = model("Feedback", feedbackSchema);
FeedbackModel.paginate().then({});
export default FeedbackModel;
