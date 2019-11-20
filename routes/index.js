const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Skill = require("../models/Skill");
const Comment = require("../models/Skill");
const ensureLogin = require("connect-ensure-login");


/* GET home page */

router.get('/', (req, res, next) => {
  res.render('index');
});


/* PROFILE */

router.get("/profile", (req, res, next) => {
  console.log(req.user._id);
  User.find({
      _id: req.user._id
    })
    .then(documents => {
      console.log(documents[0])
      res.render("profile/profile", {
        user: documents[0]
      })
    })
    .catch(err => {
      console.log(err);
    })
})

/* Route to ADD SKILLS page */

router.get('/skills/addSkill', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('skills/addSkill');
});

router.post("/add", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log("req.user", req.user);
  Skill.create({
      skillName: req.body.skillName,
      description: req.body.description,
      scheduleSpecs: req.body.scheduleSpecs,
      picture: req.body.picture,
      owner: req.user._id
    })
    .then(skill => {
      res.redirect("/skills");
    })
    .catch(err => {
      next(err);
    });
});


/* SKILLS OVERVIEW PAGE */

router.get("/skills", (req, res, next) => {
  Skill.find({})
    .then(documents => {
      console.log(documents)
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

router.get("/skills/:skillId/delete", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const query = {
    _id: req.params.skillId
  };


  // if the user that made the request is the one that created the room:
  // delete the room where the `_id` of the room is the one from the params and the `owner` of the room is the user who made the request

  Skill.deleteOne(query)
    .then(() => {
      res.redirect("/skills");
    })
    .catch(err => {
      next(err);
    });
});


/* SKILL DETAILS PAGE */

router.get("/details/:id", (req, res, next) => {
  Skill.findById(req.params.id)
    .then(theSkill => {
      res.render("skills/details", {
        skill: theSkill,
        showDelete: theSkill.owner._id.toString() === req.user._id.toString()
      })
    })
    .catch(err => {
      console.log(err)
    });
})





module.exports = router;