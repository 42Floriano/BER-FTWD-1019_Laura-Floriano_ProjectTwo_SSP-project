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
    password: bcrypt.hashSync("floriano", bcrypt.genSaltSync(bcryptSalt)),
    email: "testmailOne",
    interests: ["Skateboarding", "Baking Banana Bread"],
    languages: ["French", "German"],
    picture: "test",
    id: "1234",
    // skills_Ids: Array
  },
  {
    username: "Laura",
    password: bcrypt.hashSync("laura", bcrypt.genSaltSync(bcryptSalt)),
    email: "testmailTwo",
    interests: ["Mushroom Search", "Guitar Playing"],
    languages: ["German", "English"],
    picture: "test",
    id: "5678",
    // skills_Ids: Array
  }
]

const skills = [{
    skillName: "Fancy 3-course menu",
    description: "Still no idea what to cook for christmas? I can teach you how to cook a fancy dinner with 3 to 4 courses",
    ScheduleSpecs: "Flexible on Sundays",
    picture: "https://static.boredpanda.com/blog/wp-content/uploads/2017/12/funny-weird-wtf-stock-photos-57-5a3bb7ba3c266__700.jpg"
  }, {
    skillName: "Mountain Bike Intro",
    description: "Let's practice biking on Tempelhofer Feld!",
    ScheduleSpecs: "Weekends only, preferably starting around 10",
    picture: "https://static.boredpanda.com/blog/wp-content/uploads/2017/12/funny-weird-wtf-stock-photos-403-5a3bd36c44d28__700.jpg"
  }, {
    skillName: "Sewing Course",
    description: "I am studying fashion design at UDK and can teach you how to sew! Ideally you contact me with a project idea and your level of expertise so we can take it from there and work out how much time is needed",
    ScheduleSpecs: "Weekends only",
    picture: "https://img.buzzfeed.com/buzzfeed-static/static/enhanced/terminal01/2011/3/29/17/enhanced-buzz-14888-1301434118-8.jpg"
  },
  {
    skillName: "Teaching Kids how to read",
    description: "...",
    ScheduleSpecs: "Thursday, Friday or Sunday night",
    picture: "https://static.boredpanda.com/blog/wp-content/uploads/2017/12/5a3a10bd3f6c6_z3kfn4ivorfz__700.jpg"
  }

]

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