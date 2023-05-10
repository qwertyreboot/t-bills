const express = require("express");
const cors = require("cors");
require("dotenv").config();

const server = express();
server.use(cors());
server.use(express.json());

server.listen(process.env.PORT ?? 3000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
