const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const freteRoutes = require("./Time_14(Frete)/frete.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/frete", freteRoutes);

module.exports = app;