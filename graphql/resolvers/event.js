const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            })
        }catch(err){
            throw err;
        }
    },

    createEvent: async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated!");
        }
        try {
            let createdEvent;
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price,
                date: new Date(),
                creator: req.userId
            })
            const eventSave = await event.save();
            createdEvent = transformEvent(eventSave);
            const existsUser = await User.findById(req.userId);
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
}