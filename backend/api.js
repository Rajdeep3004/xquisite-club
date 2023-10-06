const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./routes/userRoute");
require("./routes/dataRoute");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ["http://localhost:3000", "https://xquisiteclub.onrender.com"],
};
app.use(cors(corsOptions));
const userRoutes = require("./routes/userRoute.js");
const dataRoutes = require("./routes/dataRoute.js");
app.use("/api/user", userRoutes);
app.use("/api/data", dataRoutes);

mongoose
  .connect(process.env.ATLAS_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected to database!");
  });

app.listen(port, () => {
  console.log(`Backend server running on port- ${port}`);
});
