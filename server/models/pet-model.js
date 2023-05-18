const mongoose = require("mongoose");

const petSchema = mongoose.Schema({
    image: {
        type: [Buffer],
    },

    name: {
        type: String,
        minlength: 1,
        maxlength: 15,
        required: true,
    },
    petType: {
        type: String,
        enum: ["貓","狗"],
        required: true,
    },
    species: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        minlength:10,
        maxlength:100,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    adopters: {
        type: [String],
        default: [],
    },
    date: {
        type: Date,
        default: Date.now,
    }

})

//在儲存之前將圖片轉為base64
// petSchema.pre("save", function (next) {
    
//     this.image = Buffer.from(this.image).toString("base64");
//     next();
//   });

module.exports = mongoose.model("Pet", petSchema);