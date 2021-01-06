const bcrypt = require("bcryptjs");
const Event = require("../../models/event");
const User = require("../../models/user");

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

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return {
                    ...event._doc,
                    _id: event.id.toString(),
                    date: new Date(event.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)//!important
                }
            })
        }catch(err){
            throw err;
        }
    },
    createEvent: async (args) => {
        try {
            let createdEvent;
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price,
                date: new Date(),
                creator: "5ff495dbba3ee9021825c69b"
            })
            const eventSave = await event.save();
            createdEvent = {
                ...eventSave._doc, 
                _id: eventSave._doc._id.toString(), 
                creator: user.bind(this, eventSave._doc.creator)
            }
            const existsUser = await User.findById("5ff495dbba3ee9021825c69b");
            if(!existsUser){
                throw new Error("user not already exists");
            }
            existsUser.createdEvents.push(event);
            await existsUser.save();
            return createdEvent;
        }catch(err){
            throw err;
        }
    },
    createUser: async (args) => {
        try {
            const user = await User.findOne({email: args.userInput.email});
            if(user){
                throw new Error("user already exists");
            }
            const hashPassword = await bcrypt.hash(args.userInput.password,12);
            const userSaved = new User({
                email: args.userInput.email,
                password: hashPassword
            });
            await userSaved.save();
            return {...userSaved._doc, _id: userSaved.id.toString(), password: null}
        }catch(err){
            throw err;
        }
    }
}