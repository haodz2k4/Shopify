const mongoose = require("mongoose");
const {Schema} = mongoose;
const feedbackSchema = new Schema({
    userId: String,
    productId: String,
    rating: Number,
    comment: String,
    deletedAt: String,
    delete: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "active"
    }

},{
    timestamps: true
})
module.exports = mongoose.model("feedback",feedbackSchema,"feedbacks")