const mongoose = require("mongoose");
require("dotenv").config();

const mymongodb = async () => {
  await mongoose
    .connect(process.env.URL_DATABSE)
    .then((result) => console.log("success connection"))
    .catch((error) => console.log(error));
};
module.exports = { mymongodb };
