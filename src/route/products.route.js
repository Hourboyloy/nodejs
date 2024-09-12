const handle      = require("../controller/products.controller");
const upload      = require("../middleware/upload");

const products_route = (app) => {
  app.post(
    "/upload-product",
    upload.fields([{ name: "photo" }, { name: "logo" }]),
    handle.create
  );

  app.put(
    "/edit-product/:id",
    upload.fields([{ name: "photo" }, { name: "logo" }]),
    handle.updateProduct
  );

  app.delete("/remove-product/:id", handle.deleteProduct);
  
  // app.get("/get-all", handle.getAll);
  // app.post("/getone/:id", handle.getOne);
};

module.exports = products_route;
