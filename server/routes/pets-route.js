const router = require("express").Router();
const Pet = require("../models/pet-model");
const petValidation = require("../validation").petValidation;
const joi = require("joi");
const multer = require("multer");

// 創建一個 Multer，設置圖片存儲位置和文件名
// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 5242880 }, // 限制圖片大小為 5MB
//   });

router.use((req, res, next) => {
    console.log("A request is coming into pets");
    next();
})

// router.post("/postPet", upload.array("image"), async (req, res) => {
//     const { error } = petValidation(req.body);
//     if ( error ) return res.status(400).send(error.details[0].message)
    
//     const { name, petType, species, age, description } = req.body;
//     const images = req.files.map(file => file.buffer);
//     const newPet = new Pet({
//         image: images,
//         name,
//         petType,
//         species,
//         age,
//         description,
//         sender: req.user._id,
//     })

//     try {
//         await newPet.save();
//         res.status(200).send("新增成功");
//     } catch (err) {
//         res.status(400).send("無法儲存您新增的資料");
//     }
// })

router.post("/postPet", async (req, res) => {
    const { error } = petValidation(req.body);
    if ( error ) return res.status(400).send(error.details[0].message)
    console.log(req.user);
    
    const { name, petType, species, age, description } = req.body;
    const newPet = new Pet({
        name,
        petType,
        species,
        age,
        description,
        sender: req.user._id,
    })

    try {
        await newPet.save();
        res.status(200).send("新增成功");
    } catch (err) {
        res.status(400).send("無法儲存您新增的資料");
    }
})

module.exports = router;