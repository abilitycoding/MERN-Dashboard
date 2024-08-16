const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app = express();
connectDB();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
