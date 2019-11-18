const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Skill = require("../models/Skill");
const Comment = require("../models/Skill");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;