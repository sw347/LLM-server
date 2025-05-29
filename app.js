const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");
const sttRoutes = require("./routes/sttRoutes");
require("dotenv").config();

const app = express();

app.use(cors({ origin: ["http://localhost:8081"], methods: ["GET", "POST"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", chatRoutes);
app.use("/", sttRoutes);

module.exports = app;
