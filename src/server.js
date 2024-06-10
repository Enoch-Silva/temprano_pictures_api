const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//const morganBody = require("morgan-body");
const fs = require("fs");
const path = require("path");

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.json());
server.use(express.static("uploads"));

/*
const log = fs.createWriteStream(path.join(__dirname, "logs", "express.log"), {
  flags: "a",
}); 

morganBody(server, {
  noColors: true,
  stream: log,
});
*/

const PORT = 3010;

server.use("/", require("../routes/pictures"));

server.get("/", (req, res) => {
  res.send("ESSA É A ROTA INICIAL DA NOSSA API!...");
});

server.listen(PORT, () => {
  console.log(`Server Running on - http://localhost:${PORT}`);
});
