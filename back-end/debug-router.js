const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/test", (req, res) => {
  res.send("test");
});
router.post("/test", (req, res) => {
  res.json(req.body);
});
