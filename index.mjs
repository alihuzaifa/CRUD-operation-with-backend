import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// we are using now locally array and the data will remove auutomatically when you restart the server
// and connect with mongo db because it is a database

// All product storing array
let allProduct = [];

// For adding one product
app.post("/product", (req, res) => {
  let body = req.body;
  if (body.name && body.description && body.price) {
    res.status(200).send({
      message: "Product added successfully",
    });
    const data = {
      id: `${new Date().getTime()}`,
      name: body.name,
      price: body.price,
      description: body.description,
    };
    allProduct.push(data);
    return;
  }
  req.status().res.send({
    message: "Product added failed",
  });
});

// For getting all products
app.get("/products", (req, res) => {
  res.send({
    message: "got all product successfully",
    data: allProduct,
  });
});

// For Single Product we have to take specific value from user so we will get id
app.get("/product/:id", (req, res) => {
  let id = req.params.id;
  let isFound = false;
  for (let i = 0; i < allProduct.length; i++) {
    if (allProduct[i].id === id) {
      res.send({
        message: "product get successfully",
        data: allProduct[i],
      });
      isFound = true;
      break;
    }
  }

  if (!isFound) {
    res.status(404).send({
      message: "Product Not Found",
    });
    return;
  }
});

// For Deleting the product we have to take id also to get unique id
app.delete("/product/:id", (req, res) => {
  let id = req.params.id;
  let isFound = false;
  for (let i = 0; i < allProduct.length; i++) {
    if (allProduct[i].id === id) {
      allProduct.splice(i, 1);
      res.send({
        message: "product deleted successfully",
      });
      isFound = true;
      break;
    }
  }

  if (!isFound) {
    res.status(404).send({
      message: "Product Not Found",
    });
    return;
  }
});

app.put("/product/:id", (req, res) => {
  let body = req.body;
  let id = req.params.id;
  if (body.name && body.price && body.description) {
    let isFound = false;
    for (let i = 0; i < allProduct.length; i++) {
      if (allProduct[i].id === id) {
        allProduct[i].name = body.name;
        allProduct[i].price = body.price;
        allProduct[i].description = body.description;
        res.send({
          message: "product edited successfully",
        });
        isFound = true;
        break;
      }
    }
  }

  if (!isFound) {
    res.status(404).send({
      message: "Product Not Found",
    });
    return;
  }
});

app.listen(port, () => {
  console.log(`Example App is listening on port ${port}`);
});
