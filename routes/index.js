const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Skill = require("../models/Skill");
const Comment = require("../models/Skill");
const ensureLogin = require("connect-ensure-login");
const url = require('url');    


/* GET home page */

router.get('/', (req, res, next) => {
  res.render('index');
});

/* SKILL DETAILS PAGE */

router.get("/details/:id", (req, res, next) => {
  console.log("TEST",req.params.id)
 
  Skill.findById(req.params.id)
    .then(theSkill => {
      console.log(theSkill)
      res.render("skills/details", {
        skill: theSkill,
        showDelete: theSkill.owner._id.toString() === req.user._id.toString()
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
        user: documents[0]
      })
    })
    .catch(err => {
      console.log(err);
    })
})

router.get("/profile/delete", ensureLogin.ensureLoggedIn(), (req, res, next) => {

  // const query = { _id: req.user._id };
  // console.log(query);

  //   query.owner = req.user._id;

  // if the user that made the request is the one that created the room:
  // delete the room where the `_id` of the room is the one from the params and the `owner` of the room is the user who made the request

  User.deleteOne({ _id: req.user._id })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      next(err);
    });
});

router.post("/profile/update", ensureLogin.ensureLoggedIn(), (req, res, next) => {


  if(!req.body.username || !req.body.password || !req.body.email || !req.body.picture ){
    console.log("empty")
    res.redirect("/profile"
    )
  return;
  }

    User.updateOne({ _id: req.user._id },
      {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        picture: req.body.picture,
        interests: req.body.interests,
        languages: req.body.languages
      }
      )
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
          message: "Unfortunately not, the skill you are looking for is not available yet!"
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





module.exports = router;