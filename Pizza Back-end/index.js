const express = require("express");
const mongoose = require("mongoose");
const Products = require("./model/model");
const bodyParser = require("body-parser");
const app = express();

const Mong = "mongodb://localhost:27017/Product";
mongoose.connect(Mong, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Creating Data 
app.post("/createProduct", async (req, res) => {
  try {
    const { name, price, size, image } = req.body;
    const product = new Products({
      name,
      price,
      size,
      image
    }); 
    console.log(product);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



// getting data 
app.get("/getData", async (req, res) => {
  const products = await Products.find();
  res.status(200).send(products);
});

app.get("/getData/:id", async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).send(`Product not found ${req.params.id}`);
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post("/getData/items", async (req, res) => {
  let documents;
        try {
            documents = await Products.find({
                _id: { $in: req.body._id },
            }).select('-updatedAt -__v');
        } catch (err) {
            res.send(err)
        }
        console.log("data " , documents);
        return res.json(documents);
});


app.listen(3001, () => {
  console.warn(`Port is running on 3001`);
});
