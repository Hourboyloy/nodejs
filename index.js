require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./src/database/connection");
const user_route = require("./src/route/user.route");
const product_route = require("./src/route/products.route");

// ====================================================================>

app.use(cors());
app.use(express.json());
connection.mymongodb();
user_route(app);
product_route(app);

// ====================================================================>

app.listen(process.env.PORT_LESTION, () => {
  console.log("Lestioning");
});
