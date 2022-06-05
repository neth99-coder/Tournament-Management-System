const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");
const playerRoutes = require("./routes/playerRoutes");
const organizerRoutes = require("./routes/organizerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");
const authToken = require("./middleware/authenticateToken");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

require("dotenv").config();
require("./startup/prod")(app);

app.use("/api/player", authToken, playerRoutes);
app.use("/api/organizer", authToken, organizerRoutes);
app.use("/api/admin", authToken, adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/", homeRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Running server");
});
