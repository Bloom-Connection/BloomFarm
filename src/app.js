const express = require("express");
const fs = require("fs");
const app = express();

const farms = JSON.parse(
  fs.readFileSync(`${__dirname}/data/farms.json`, "utf-8")
);
app.get("/", (req, res) => {
  res.send("Hello from the Bloomfarm Server!");
});

app.get("/api/v1/farms", (req, res) => {
  res.status(200).json({
    status: "success",
    results: farms.length,
    data: {
      farms,
    },
  });
});

const port = 8000;
app.listen(port, () => console.log(`App running on port ${port}...`));
