import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;

const tourSchema = new Schema(
  {
    // admin_id:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Admin',
    // },
    // user_id: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User',
    //     },
    // ],
    title: {
      type: String,
      trim: true,
    },
    image: {
        type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
    departure_hour: {
      type: String,
      trim: true,
    },
    return_hour: {
      type: String,
      trim: true,
    },
    instruction: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "Tour",
  }
);
tourSchema.plugin(mongoosePaginate);

// tourSchema.pre(['find', 'findOne', 'save', 'create'], function () {
// 	this.populate(['admin_id', 'user_id']);
// });

const TourModel = model("Tour", tourSchema);
// TourModel.paginate().then({});
export default TourModel;
