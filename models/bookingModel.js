import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    // admin_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Admin",
    // },
    // tour_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Tour",
    // },
    // user_id: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],

  },
  {
    timestamps: true,
    collection: "Booking",
  }
);
bookingSchema.plugin(mongoosePaginate);

// bookingSchema.pre(['find', 'findOne', 'save', 'create'], function () {
// 	this.populate(['admin_id', 'tour_id', 'user_id']);
// });

const BookingModel = model("Booking", bookingSchema);
BookingModel.paginate().then({});
export default BookingModel;
