const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./Router/Router");
const cors=require("cors")
const path=require("path")

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use(router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
