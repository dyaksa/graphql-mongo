const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports = {
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
    },

    login: async ({email,password}) => {
        try {
            const user = await User.findOne({email: email});
            if(!user){
                throw new Error("email not exists!");
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if(!isEqual){
                throw new Error("password does not match!");
            }
            const token = jwt.sign({
                userId: user._id,
                userEmail: user.email
            },process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h"
            })
            return {
                ...user._doc,
                _id: user.id.toString(),
                token: token,
                expiredIn: 1
            }
        }catch(err){
            throw err;
        }
    }
}