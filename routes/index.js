const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Skill = require("../models/Skill");
const Comment = require("../models/Skill");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

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

router.get("/search", (req, res, next) => {
  const searchStr = req.query.q;
  const filtered = 

})


// const filtered = players.filter(player => {
//   if (player.name.toLowerCase().includes(searchString.toLowerCase())) {
//       return true;
//   }
// });

// res.render("players.hbs", {
//   playersList: filtered
// });


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