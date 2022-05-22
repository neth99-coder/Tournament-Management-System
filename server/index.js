const express = require("express");
const mysql = require("mysql");
const playerRoutes = require("./routes/playerRoutes");
const organizerRoutes = require("./routes/organizerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

require("dotenv").config();

app.use("/api/player", playerRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/admin", adminRoutes);
app.listen(3001, () => {
  console.log("Running server");
});
