const express = require("express");
const cors = require("cors");

const documentRoutes = require("./routes/documents");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/documents", documentRoutes);

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
