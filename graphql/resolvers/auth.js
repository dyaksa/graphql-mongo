const User = require("../../models/user");
const bcrypt = require("bcryptjs");

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
    }
}