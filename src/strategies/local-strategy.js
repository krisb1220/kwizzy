const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const UserModel = require("../models/User.js").User;
const bcrypt = require("bcrypt");

async function main() {
    console.log("mongoose connected");
    await mongoose.connect(process.env.MONGOOSE_URI);
}

main().catch((err) => console.log(err));

passport.serializeUser((user, done) => {
    console.log("Inside serialize user");
    console.log(`Serialize userID: ${user.id}`);
    console.log(`Serialize user email: ${user.email}`);
    done(null, user.id);
});

passport.deserializeUser(async (userID, done) => {
    console.log("deser");
    console.log(`UserID: ${userID}`);
    try {
        const findUser = await UserModel.findById(userID);
        if (!findUser) throw new Error("Not found");
        console.log(`deserialize email: ${findUser.email}`);
        done(null, findUser);
        console.log(`User deserialized`);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (username, password, done) => {
        console.log("Inside local strategy");
        console.log(`Username local: ${username}`);
        try {
            const user = await UserModel.findOne({ email: username });
            if (!user) {
                return done(null, false, { message: 'Invalid username or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Invalid username or password' });
            }
            return done(null, user);
        } catch (err) {
            console.log("error", err);
            return done(err);
        }
    })
);

module.exports = passport;
