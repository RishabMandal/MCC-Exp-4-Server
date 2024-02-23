const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3001; // or any other port you prefer

app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
// mongoose.connect('mongodb://localhost:27017/formdata', {
mongoose
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

// Define endpoint to save form data
app.post("/saveFormData", async (req, res) => {
  const formData = req.body;
  try {
    // Create a new document using the FormData model
    const savedFormData = await FormData.create(formData);
    console.log("Form data saved successfully:", savedFormData);
    res.send("Form data saved successfully");
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(500).send("Error saving form data");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
