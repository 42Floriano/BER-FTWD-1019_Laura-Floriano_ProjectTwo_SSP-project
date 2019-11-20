const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  skillName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  scheduleSpecs: String,
  picture: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;