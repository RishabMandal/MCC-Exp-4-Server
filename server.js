const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001; // or any other port you prefer

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:5000",
//       "https://myecommerce-seven.vercel.app",
//     ],
//     methods: ["GET", "HEAD", "POST"],
//     credentials: true,
//   })
// );
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
// mongoose.connect('mongodb://localhost:27017/formdata', {

// Define endpoint to save form data
app.post("/saveFormData", async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://Rishab829:Kanchan%401@expresstry.wqhmyb0.mongodb.net/formdata",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("Connected to MongoDB successfully");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });

    // Define schema for form data
    const formDataSchema = new mongoose.Schema({
      name: String,
      email: String,
      genderId: Number,
      agreeToTerms: Boolean,
    });

    // Define model for form data
    const FormData = mongoose.model("FormData", formDataSchema);
    const formData = req.body;
    // Create a new document using the FormData model
    const savedFormData = await FormData.create(formData);
    console.log("Form data saved successfully:", savedFormData);
    res.send("Form data saved successfully");
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(500).send("Error saving form data");
  }
});

app.get("/getFormData", async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://Rishab829:Kanchan%401@expresstry.wqhmyb0.mongodb.net/formdata",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("Connected to MongoDB successfully");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });

    // Define schema for form data
    const formDataSchema = new mongoose.Schema({
      name: String,
      email: String,
      genderId: Number,
      agreeToTerms: Boolean,
    });

    // Define model for form data
    const FormData = mongoose.model("FormData", formDataSchema);

    // Retrieve all form data from the database
    // const allFormData = await FormData.find();
    const collection = db.collection('formData');
    const allFormData = await collection.find().toArray();
    // res.json(allFormData);
    res.json(allFormData); // Send the data as JSON response
  } catch (err) {
    console.error("Error fetching form data:", err);
    res.status(500).send("Error fetching form data");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
