const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
const authRoute = require("./routes/auth-route");
const petsRoute = require("./routes/pets-route");
const port = process.env.PORT || 8000;


//connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to MongoDB Altas."))
  .catch((e) => {
    console.log(e);
  });

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
app.use(
  "/api/pets",
  passport.authenticate("jwt", { session: false }),
  petsRoute
);

app.listen(port, () => {
  console.log("Server is running on port 8000");
});
