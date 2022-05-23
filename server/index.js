const express = require("express");
const mysql = require("mysql");
const playerRoutes = require("./routes/playerRoutes");
const organizerRoutes = require("./routes/organizerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const homeRoutes = require("./routes/homeRoutes");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

require("dotenv").config();

app.use("/api/player", playerRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/",homeRoutes);




app.listen(3001, () => {
  console.log("Running server");
});
