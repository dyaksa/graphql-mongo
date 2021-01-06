const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

//schema
const Event = require("./models/event");
const User = require("./models/user");

const user = (userId) => {
    return User.findById(userId)
    .then(user => {
        return { 
            ...user._doc, 
            _id: user.id, 
            createdEvents: events.bind(this, user._doc.createdEvents) 
        }
    }).catch(err => {
        throw err;
    })
}

const events = (eventIds) => {
    return Event.find({_id: {$in: eventIds}})
    .then(events => {
        return events.map(event => {
            return { 
                ...event._doc, 
                _id: event.id, 
                creator: user.bind(this, event.creator) 
            }
        })
    }).catch(err => {
        throw err;
    })
}

const app = express();
app.use(bodyParser.json());

app.use("/graphql",graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            createdEvents: [Event!]
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find()
            .then(events => {
                return events.map(event => {
                    return {
                        ...event._doc,
                        id: event.id.toString(), 
                        date: event.date.toISOString(),
                        creator: user.bind(this, event._doc.creator)
                    }
                })
            }).catch(err => {
                throw err;
            })
        },
        createEvent: (args) => {
            let createdEvent;
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price,
                date: new Date(),
                creator: "5ff495dbba3ee9021825c69b"
            })
            return event
            .save()
            .then(result => {
                createdEvent =  {...result._doc, _id: result._doc._id.toString()}
                return User.findById("5ff495dbba3ee9021825c69b")
            }).then(user => {
                if(!user){
                    throw new Error("User not exists");
                }
                user.createdEvents.push(event);
                return user.save();
            })
            .then(() => {
                return createdEvent;
            }).catch(err => {
                throw err;
            })
        },
        createUser: (args) => {
            return User.findOne({email: args.userInput.email})
            .then(user => {
                if(user){
                    throw new Error("user already exists");
                }
                return bcrypt.hash(args.userInput.password,12)
            })
            .then((hash) => {
                const user = new User({
                    email: args.userInput.email,
                    password: hash
                })
                return user.save();
            }).then(user => {
                return {...user._doc, _id: user.id.toString(), password: null};
            })
            .catch(err => {
                throw err;
            })
        }
    },
    graphiql: true
}))

mongoose.connect(`
mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ckvwl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
{useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {
    app.listen(8000);
    console.log("server is running");
}).catch(err => {
    throw err
})
