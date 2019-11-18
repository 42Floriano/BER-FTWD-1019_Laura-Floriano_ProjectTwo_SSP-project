// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Skill = require("../models/Skill");
const Comment = require("../models/Comment");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/ssp-project', {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [{
    username: "Floriano",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    email: "testmailOne",
    interests: ["Skateboarding", "Baking Banana Bread"],
    languages: ["French", "German"],
    picture: "test",
    id: "1234",
    // skills_Ids: Array
  },
  {
    username: "Laura",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    email: "testmailTwo",
    interests: ["Mushroom Search", "Guitar Playing"],
    languages: ["German", "English"],
    picture: "test",
    id: "5678",
    // skills_Ids: Array
  }
]

const skills = [{
  skillName: "Skateboarding Beginners Class",
  description: "I offer a 3 hours intro to skateboarding at Tempelhofer Feld on Sundays. I will provide a skateboard for you as well as a helmet and protective gear.",
  ScheduleSpecs: "Flexible on Sundays",
  picture: "test"
}]

const comments = [{
  // commentId ???
  senderId: "5678",
  receiverId: "1234",
  comment: "The skateboarding intro with Floriano was really helpful and a lot of fun!"
}]

// Seeds file that removes all users and creates 2 new users
User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    // console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })

Skill.deleteMany()
  .then(() => {
    return Skill.create(skills);
  })
  .then(skillsCreated => {
    console.log(`${skillsCreated.length} skills created with the following id:`);
    // console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })

Comment.deleteMany()
  .then(() => {
    return Comment.create(comments)
  })
  .then(commentsCreated => {
    console.log(`${commentsCreated.length} comments created with the following id:`);
    // console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })