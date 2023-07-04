const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./Router/Router");


app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));


app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
