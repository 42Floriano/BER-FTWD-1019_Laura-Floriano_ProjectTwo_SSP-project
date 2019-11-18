const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 13
  },
  password: {
    type: String,
    validate: {
      validator: userPassword => {
        if (userPassword.length < 8) {
          return false;
        }
        return true;
      },
      message: "Please enter password with 8+ characters!"
    }
  },
  email: String,
  interests: Array,
  languages: Array,
  picture: String,
  skills_Ids: Array
});

const User = mongoose.model('User', userSchema);
module.exports = User;