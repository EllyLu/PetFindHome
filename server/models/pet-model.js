const mongoose = require("mongoose");
const multer = require("multer");

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

petSchema.methods.base64ToImage = function (base64String) {
    const imageData = Buffer.from(base64String, "base64");
    const imageUrl = `${imageData.toString("base64")}`;
    return imageUrl;
  };

//創建一個 Multer，設置圖片存儲位置和文件名
petSchema.statics.upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5242880 }, // 限制圖片大小為 5MB
  }).array("image");  

module.exports = mongoose.model("Pet", petSchema);