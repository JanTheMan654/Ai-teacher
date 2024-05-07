const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json("Hello World");
  //   res.json(listOfPosts);
});

module.exports = router;
