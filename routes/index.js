const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Skill = require("../models/Skill");
const Comment = require("../models/Comment");
const ensureLogin = require("connect-ensure-login");



/* GET home page */

router.get('/', (req, res, next) => {
  res.render('index', {
    loggedInUser: req.user
  });
});

router.get('/getUser', (req, res, next) => {
  if (req.user) {
    User.findById(req.user._id).then(user => {
      res.send(user)
      return;
    })
  }
  return;
})

/* SKILL DETAILS PAGE */

router.get("/details/:id", (req, res, next) => {
  console.log("TEST", req.params.id)

  Skill.findById(req.params.id)
    .then(theSkill => {
      console.log(theSkill)
      res.render("skills/details", {
        skill: theSkill,
        showDelete: theSkill.owner._id.toString() === req.user._id.toString(),
        loggedInUser: req.user
      })
    })

    .catch(err => {
      console.log(err)
    });

})


/* PROFILE */

router.get("/profile", (req, res, next) => {
  console.log(req.user._id)
  User.find({
      _id: req.user._id
    })
    .then(documents => {
      console.log(documents[0])
      res.render("profile/profile", {
        user: documents[0],
        loggedInUser: req.user
      })
    })
    .catch(err => {
      console.log(err);
    })
})

router.get("/profile/delete", ensureLogin.ensureLoggedIn(), (req, res, next) => {

  User.deleteOne({
      _id: req.user._id
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      next(err);
    });
});

router.post("/profile/update", ensureLogin.ensureLoggedIn(), (req, res, next) => {


  if (!req.body.username || !req.body.password || !req.body.email || !req.body.picture) {
    console.log("empty")
    res.redirect("/profile")
    return;
  }

  User.updateOne({
      _id: req.user._id
    }, {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      picture: req.body.picture,
      interests: req.body.interests,
      languages: req.body.languages
    })
    .then(() => {
      res.redirect("/profile");
      console.log("test1")
    })
    .catch(err => {
      next(err);
    });
});


/* Route to ADD SKILLS page */

router.get('/skills/addSkill', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('skills/addSkill', {
    loggedInUser: req.user
  });
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
        skills: documents,
        loggedInUser: req.user
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
          skills: documents,
          loggedInUser: req.user

        })
      } else {
        res.render("skills/search", {
          message: "Unfortunately not, the skill you are looking for is not available yet!",
          loggedInUser: req.user

        })
      }
    })
    .catch(err => {
      console.log(err)
    })
})

// DELETE SKILLS

router.get("/skills/:skillId/delete", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const query = {
    _id: req.params.skillId
  };


  Skill.deleteOne(query)
    .then(() => {
      res.redirect("/skills");
    })
    .catch(err => {
      next(err);
    });
});


// UPDATE SKILLS

router.post("/skills/:skillId/update", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log("test")
  const query = {
    _id: req.params.skillId
  };

  Skill.updateOne(query,

      {
        skillName: req.body.skillName,
        description: req.body.description,
        scheduleSpecs: req.body.scheduleSpecs,
        picture: req.body.picture,
      }


    )
    .then(() => {
      res.redirect(`/skills`);
    })
    .catch(err => {
      next(err);
    });
});


/* ADD COMMENTS */

router.post("/skills/:skillId/comment", (req, res, next) => {
  const content = req.body.comment;
  const author = req.user._id;

  Comment.create({
      content: content,
      author: author
    })
    .then(comment => {
      console.log("comment", comment)
      return Skill.findOneAndUpdate({
          _id: req.params.skillId
        }, {
          $push: {
            comments: comment._id
          }
        }, {
          new: true
        })
        .populate({
          path: "comments", // populates the `comments` field in the Room
          populate: {
            path: "author" // populates the `author` field in the Comment
          }
        })
        .then(skill => {
          console.log(skill)
          res.json(skill.comments); // updated comments array

          // send the room's document
          // res.redirect(`/rooms/${req.params.roomId}`);
        });
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;