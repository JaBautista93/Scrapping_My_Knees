var router = require("express").Router();
var clearController = require("../../controller/clear");

router.get("/", clearController.clearDB);

module.exports = router;
