const express = require("express");
const url = "http://stackoverflow.com";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./dist"));

// app.get("*", (req, res) => {
//   res.sendFile("./dist/index.html", {
//     root: dirname(fileURLToPath(import.meta.url)),
//   });
// });

app.use(express.static("../dist/index.html"));

const server = app.listen(PORT, () => {
  const host = server.address().address;
  console.log(`host `, host);
  console.log(`Server started at ${PORT}`);
  require("child_process").exec(`open http://127.0.0.1:${PORT}`);
});
