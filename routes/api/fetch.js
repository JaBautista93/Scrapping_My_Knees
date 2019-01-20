var router = require("express").Router();
var fetchController = require("../../controller/fetch");

router.get("/", fetchController.scrapeHeadlines);

module.exports = router;
