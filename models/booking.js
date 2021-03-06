const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: "Events"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
},{timestamps: true})

module.exports = mongoose.model("Bookings",bookingSchema);