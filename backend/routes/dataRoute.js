const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");

router.post("/postData", dataController.postData);
router.post("/fetchData", dataController.fetchData);

module.exports = router;
