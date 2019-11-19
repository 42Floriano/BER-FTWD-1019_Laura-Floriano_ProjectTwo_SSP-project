const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const picture = req.body.picture;
  let interests = req.body.interests;
  let languages = req.body.languages;
  console.log(interests)


  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  const checkEmail = User.findOne({email: email})
    .then(user => {
      console.log("checkEmail, userObject", user)
      if(user !== null) {
        res.render("auth/signup", { message: "The email already exists" });
        return false;
      }
    })

  const checkUsername = User.findOne({username: username})
  .then(user => {
    console.log("checkUsername, userObject", user)
    if(user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return false;
    }
  })

  Promise.all([checkEmail, checkUsername])
    .then(response => {
      if (response[0] !== false && response[1] !== false) {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const newUser = new User({
          username,
          password: hashPass,
          email,
          interests,
          languages,
          picture,
  
        });
        console.log("PromiseAll newUser", newUser);
        newUser.save()
        .then(() => {
          res.redirect("/");
        })
        .catch(err => {
          res.render("auth/signup", { message: "Something went wrong" });
        })
      }
      })
    .catch(error => {
      console.log(error);
  })
});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
