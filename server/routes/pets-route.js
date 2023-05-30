const router = require("express").Router();
const Pet = require("../models/pet-model");
const petValidation = require("../validation").petValidation;
const joi = require("joi");
const { ImgurClient } = require("imgur");

// middleware
router.use((req, res, next) => {
  console.log("A request is coming into pets.js");
  next();
});

//查看所有待領養的寵物
router.get("/", (req, res) => {
  Pet.find({ petType: req.query.petType })
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

//將寵物添加至清單
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

//移除添加至清單的寵物
router.patch("/userProfile/removeAddPet", async (req, res) => {
  console.log("req.body.pet_id : " + req.body.pet_id);
  console.log("req.user.id : " + req.user.id);
  try {
    let pet = await Pet.findOneAndUpdate(
      { _id: req.body.pet_id },
      { $pull: { adopters: req.user.id } },
      { new: true }
    );
    res.send(pet);
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
// router.post("/postPet", Pet.upload,  async (req, res) => {
//   const { error } = petValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const { name, petType, species, age, description } = req.body;
//   const images = req.files.map((file) => file.buffer);

//   const newPet = new Pet({
//     image: images,
//     name,
//     petType,
//     species,
//     age,
//     description,
//     sender: req.user._id,
//   });

//   try {
//     await newPet.save();
//     res.status(200).send("新增成功");
//   } catch (err) {
//     res.status(400).send(err.errors.description.properties.message);
//     console.log(err);
//   }
// });

// router.post("/postPet", async (req, res) => {
//   console.log("req.body in exterior1");
//   console.log(req.body);
//   Pet.upload(req, res, async () => {
//     console.log("req.body in inner");
//   console.log(req.body);
//     const client = new ImgurClient({
//       clientId: process.env.IMGUR_CLIENTID,
//       clientSecret: process.env.IMGUR_CLIENT_SECRET,
//       refreshToken: process.env.IMGUR_REFRESH_TOKEN,
//     });
//     req.files.map(async (file) => {
//       const response = await client.upload({
//         image: file.buffer.toString("base64"),
//         type: "base64",
//         album: process.env.IMGUR_ALBUM_ID,
//       });
//       const imageUrl = response.data.link;
//       console.log("imageUrl" + imageUrl);
//     });
//     // const response = await client.upload({
//     //   image: req.files[0].buffer.toString("base64"), //req.files.map((file) => file.buffer.toString("base64")),
//     //   type: 'base64',
//     //   album: process.env.IMGUR_ALBUM_ID
//     // });
//     // const imageUrl = response.data.link;
//     // console.log(imageUrl);
//   });
//   console.log("req.body in exterior2");
//   console.log(req.body);
//   const { error } = petValidation(req.body);
//   console.log(error);
//   if (error) return res.status(400).send(error.details[0].message);
//   const { name, petType, species, age, description } = req.body;
//   const images = req.files.map((file) => file.buffer);
  
//   const newPet = new Pet({
//     image: images,
//     name,
//     petType,
//     species,
//     age,
//     description,
//     sender: req.user._id,
//   });

//   try {
//     await newPet.save();
//     res.status(200).send("新增成功");
//   } catch (err) {
//     res.status(400).send(err.errors.description.properties.message);
//     console.log(err);
//   }
// });

router.post("/postPet", async (req, res) => {
  console.log("req.body in exterior1");
  console.log(req.body);
  Pet.upload(req, res, async () => {
    console.log("req.body in inner");
    console.log(req.body);
    const client = new ImgurClient({
      clientId: process.env.IMGUR_CLIENTID,
      clientSecret: process.env.IMGUR_CLIENT_SECRET,
      refreshToken: process.env.IMGUR_REFRESH_TOKEN,
    });
    req.files.map(async (file) => {
      const response = await client.upload({
        image: file.buffer.toString("base64"),
        type: "base64",
        album: process.env.IMGUR_ALBUM_ID,
      });
      file.imageUrl = response.data.link;
      console.log("imageUrl: " + file.imageUrl);
    });

    console.log("req.body in interior");
    console.log(req.body);
    
    const { error } = petValidation(req.body);
    console.log(error);
    if (error) return res.status(400).send(error.details[0].message);
    const { name, petType, species, age, description } = req.body;
    //const images = req.files.map((file) => file.buffer);
    const images = req.files.map((file) => file.imageUrl);
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

  console.log("req.body in exterior2");
  console.log(req.body);
});

//移除post的寵物
router.delete(
  "/userProfile/deletePostPet/:pet_id/:sender_id",
  async (req, res) => {
    const { sender_id } = req.params;
    const { pet_id } = req.params;
    if (sender_id != req.user.id)
      return res.status(400).send("你無法刪除此筆資料");
    try {
      let pet = await Pet.findOneAndDelete({ _id: pet_id }, { new: true });
      res.send(pet);
    } catch (err) {
      res.send(err);
      console.log(err);
    }
  }
);

module.exports = router;
