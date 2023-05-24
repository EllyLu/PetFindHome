const router = require("express").Router();
const Pet = require("../models/pet-model");
const petValidation = require("../validation").petValidation;
const joi = require("joi");

// middleware
router.use((req, res, next) => {
  console.log("A request is coming into pets.js");
  next();
});

//查看所有待領養的寵物
router.get("/", (req, res) => {
  Pet.find({ petType : req.query.petType})
    .sort({ date: -1 })
    .then((pets) => {
      
      const updatedPets = pets.map((pet) => {
        const updatedImages = pet.image.map((base64String) =>
          pet.base64ToImage(base64String)
        );
        return { ...pet.toObject(), image: updatedImages };
      });
      res.send(updatedPets);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("發生一些錯誤");
    });
});

//查看單一寵物
router.get("/petProfile/:pet_id", (req, res) => {
  let { pet_id } = req.params;
  Pet.findOne({ _id: pet_id })
    .populate("sender", ["username", "email", "phoneNumber"])
    .then((pet) => {
      const updatedImages = pet.image.map((base64String) => {
        return pet.base64ToImage(base64String);
      });
      const updatedPet = { ...pet.toObject(), image: updatedImages };
      res.status(200).send(updatedPet);
    })
    .catch((err) => {
      res.status(500).send("無法獲得資料");
    });
});

//添加喜歡的寵物
router.post("/petProfile/:pet_id", async (req, res) => {
  let { pet_id } = req.params;
  try {
    let pet = await Pet.findOne({ _id: pet_id });
    pet.adopters.push(req.user._id);
    await pet.save();
    res.send("添加成功");
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

// 搜尋添加至清單的寵物
router.get("/userProfile/addPet", async (req, res) => {
  try {
    const pets = await Pet.find({ adopters: { $in: [req.user.id] } }).populate(
      "sender",
      ["username", "email", "phoneNumber"]
    );
    const updatedPets = pets.map((pet) => {
      const updatedImages = pet.image.map((base64String) =>
        pet.base64ToImage(base64String)
      );
      return { ...pet.toObject(), image: updatedImages };
    });
    res.send(updatedPets);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

//獲得發佈的寵物
router.get("/userProfile/postPet", async (req, res) => {
  try {
    const pets = await Pet.find({ sender: req.user.id });
    const updatedPets = pets.map((pet) => {
      const updatedImages = pet.image.map((base64String) =>
        pet.base64ToImage(base64String)
      );
      return { ...pet.toObject(), image: updatedImages };
    });
    res.send(updatedPets);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

//post待領養的寵物
router.post("/postPet", Pet.upload, async (req, res) => {
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
    res.status(400).send(err.errors.description.properties.message);
    console.log(err);
  }
});

module.exports = router;
