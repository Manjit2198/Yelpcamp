var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const user = require("../../../authentication/authDemo/models/user");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);
module.exports= mongoose.model("User", userSchema);