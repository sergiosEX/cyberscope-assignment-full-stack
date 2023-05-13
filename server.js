const express = require("express");
const cors = require("cors");
const port = 3001;

const app = express();

app.use(cors());

const coinRoute = require("./routes/route.js");

app.use("/coins", coinRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});