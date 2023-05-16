const router = require("express").Router();
const Pet = require("../models/pet-model");
const petValidation = require("../validation").petValidation;
const joi = require("joi");
const multer = require("multer");

//創建一個 Multer，設置圖片存儲位置和文件名
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5242880 }, // 限制圖片大小為 5MB
});

router.use((req, res, next) => {
  console.log("A request is coming into pets.js");
  next();
});

router.get("/", (req, res) => {
  Pet.find({})
    .then((pet) => {
      res.send(pet);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("發生一些錯誤");
    });
});

router.get("/:pet_id", (req, res) => {
  let { pet_id } = req.params;
  Pet.findOne({ _id: pet_id })
    .populate("sender", ["username", "email", "phoneNumber"])
    .then((pet) => {
        return res.status(200).send(pet);
    })
    .catch((err) => {
      res.status(500).send("無法獲得資料");
    });
});

router.post("/postPet", upload.array("image"), async (req, res) => {
  const { error } = petValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, petType, species, age, description } = req.body;
  const images = req.files.map((file) => file.buffer);
  const newPet = new Pet({
    image: images,
    name,
    petType,
    species,
    age,
    description,
    sender: req.user._id,
  });

  try {
    await newPet.save();
    res.status(200).send("新增成功");
  } catch (err) {
    res.status(400).send("無法儲存您新增的資料");
  }
});

// router.post("/postPet", async (req, res) => {
//     const { error } = petValidation(req.body);
//     if ( error ) return res.status(400).send(error.details[0].message)

//     const { name, petType, species, age, description } = req.body;
//     const newPet = new Pet({
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

module.exports = router;
