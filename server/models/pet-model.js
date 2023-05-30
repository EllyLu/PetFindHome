const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const petSchema = mongoose.Schema({
    image: {
        //type: [Buffer],
        type: [String]
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
// petSchema.statics.upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 5242880 }, // 限制圖片大小為 5MB
//   }).array("images",5);  

petSchema.statics.upload = multer({
limits: {
    fileSize: 5 * 1024 * 1024,
},
fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
    cb('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。');
    }
    cb(null, true);
},
}).array("images",5);

module.exports = mongoose.model("Pet", petSchema);