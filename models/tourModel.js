import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema, model } = mongoose;

const tourSchema = new Schema(
  {
    admin_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    user_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    title: {
        type: String,
        required: "Title is required",
        trim: true,
    },
    image: {
        type: String,
      trim: true,
    },
    location: {
        type: String,
        required: "Location is required",
        trim: true,
    },
    price: {
        type: Number,
        required: "Title is required",
        trim: true,
    },
    description: {
        type: String,
        required: "Description is required",
        trim: true,
    },
    date: {
        type: String,
        required: "Date is required",
        trim: true,
    },
    departure: {
        type: String,
        required: "Departure time is required",
        trim: true,
    },
    return: {
        type: String,
        required: "Return time is required",
        trim: true,
    },
    instruction: {
        type: String,
        required: "Instruction is required",
        trim: true,
    },
  },
  {
    timestamps: true,
    collection: "Tour",
  }
);
tourSchema.plugin(mongoosePaginate);

tourSchema.pre(['find', 'findOne', 'save', 'create'], function () {
	this.populate(['admin_id', 'user_id']);
});

const TourModel = model("Tour", tourSchema);
TourModel .paginate().then({});
export default TourModel ;
