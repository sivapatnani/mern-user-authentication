const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    quote: { type: String},
}
)

const userModel = mongoose.model("users", userSchema)

module.exports = userModel