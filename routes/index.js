const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Skill = require("../models/Skill");
const Comment = require("../models/Skill");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* SKILLS OVERVIEW PAGE */

router.get("/skills", (req, res, next) => {
  Skill.find({})
    .then(documents => {
      res.render("skills/skills", {
        skills: documents
      })
    })
    .catch(err => {
      console.log(err);
    })
})


/* SEARCH */

router.post("/search", (req, res, next) => {
  const searchStr = req.body.skillSearch;
  console.log("SearchStr");

  Skill.find({
      skillName: new RegExp(searchStr, "i")
    })
    .then(documents => {
      console.log("filtered docs", documents)
      if (documents.length) {
        res.render("skills/search", {
          skills: documents
        })
      } else {
        res.render("skills/search", {
          message: "Unfortunately, the skill you are looking for is not available yet!"
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
})

/* SKILL DETAILS PAGE */

router.get("/details:id", (req, res, next) => {
  Skill.findById(req.params.id)
    .then(theSkill => {
      res.render("skills/details", {
        skill: theSkill
      })
    })
    .catch(err => {
      console.log(err)
    });
})


module.exports = router;