const Event = require("../../models/event");
const Booking = require("../../models/booking");
const { transformBooking, transformEvent } = require("./merge");

module.exports = {
    bookings: async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated!");
        }
        try {
            const bookings =  await Booking.find();
            return bookings.map((booking) => {
                return transformBooking(booking);
            })
        }catch(err){
            throw err;
        }
    },

    bookEvent: async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated!");
        }
        try {
            const event = await Event.findById(args.eventId);
            const booking = new Booking({
                user: req.userId,
                event: event
            });
            await booking.save();
            return transformBooking(booking);
        }catch(err){
            throw err;
        }
    },

    cancelBooking: async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated!");
        }
        try {
            const booked = await Booking.findOne({_id: args.bookId}).populate("event");
            if(!booked){
                throw new Error("booking cannot found");
            }
            await booked.remove();
            return transformEvent(booked.event);
        }catch(err){
            throw err;
        }
    },
}