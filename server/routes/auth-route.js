const router = require("express").Router();
const User = require("../models/user-model");
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("A request is coming in to auth.js");
  next();
});

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, username, password } = req.body;
  // 檢查帳戶是存在
  const user = await User.findOne({ email });

  if (user) {
    res.status(400).send("User already exist.");
  } else {
    // 儲存帳戶資訊
    const newUser = new User({ email, username, password });
    try {
      await newUser.save();
      res.status(200).send("Save sucessfully");
    } catch {
      res.status(400).send("User not saved.");
    }
  }
});

router.post("/login", async (req, res) => {
  //驗證格式  
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //確認email存在
  const { email } = req.body;
  const user = await User.findOne({ email });

  try {
    if (!user) {
        res.status(401).send("信箱或密碼有誤");
    } else {
        //驗證密碼
        user.comparePassword(req.body.password, function (err, ismatch) {
            if (err) {
                return res.status(400).send(err);
            } else {
                if (!ismatch) {
                    res.status(401).send("信箱或密碼有誤");
                } else {
                  const tokenObject = { _id: user._id, email: user.email };
                  const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
                  res.send({ sucess: true, token: "JWT " + token, user});
                }
            }
        })
    }
  } catch {err => res.status(400).send(err)}
});

module.exports = router;
