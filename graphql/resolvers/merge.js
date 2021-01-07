const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

//!important
const user = async (userId) => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            password: null,
            createdEvents: events.bind(this, user._doc.createdEvents)
        }
    }catch(err){
        throw err;
    }
}

const singleEvent = async (eventId) => {
    try {
        const event = await Event.findById(eventId);
        return {
            ...event._doc,
            _id: event.id.toString,
            creator: user.bind(this,event._doc.creator)
        }
    }catch(err){
        throw err;
    }
}

//!important
const events = async (eventIds) => {
    try {
        const events = await Event.find({_id: {$in: eventIds}});
        events.map(event => {
            return  {
                ...event._doc,
                _id: event.id,
                creator: user.bind(this, event.creator)
            }
        })
        return events;
    }catch(err){
        throw err;
    }
}

const transformEvent = (event) => {
    return {
        ...event._doc,
        _id: event.id.toString(),
        date: dateToString(event.date),
        creator: user.bind(this, event._doc.creator)//!important
    }
}

const transformBooking = (booking) => {
    return {
        ...booking._doc,
        _id: booking.id.toString(),
        event: singleEvent.bind(this,booking._doc.event),
        user: user.bind(this, booking._doc.user),
        createdAt: dateToString(booking.createdAt),
        updatedAt: dateToString(booking.updatedAt)
    }
}

module.exports = {
    transformEvent,
    transformBooking
}