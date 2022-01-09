const mongoose = require('mongoose');
// const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  user_: {
    type: String,
    required: true,
    uppercase: true,
    unique: true
    // validate: [isEmail, 'Please enter a valid email']
  },
  pass: {
    type: String,
    required: true,
    // minlength: [6, 'Minimum password length is 6 characters'],
  },
  city_: {
    type: String,
    required: true,
    uppercase: true,
    // validate: [isEmail, 'Please enter a valid email']
  },
  state_: {
    type: String,
    required: true,
    uppercase: true,
    // minlength: [6, 'Minimum password length is 6 characters'],
  },
  number_: {
    type: Number,
    required: true,
    // validate: [isEmail, 'Please enter a valid email']
  },
  email_: {
    type: String,
    required: true,
    uppercase: true,
    // minlength: [6, 'Minimum password length is 6 characters'],
  },
  last: {
    type: String,
    required: true,
    uppercase: true,
    // validate: [isEmail, 'Please enter a valid email']
  },
  first: {
    type: String,
    required: true,
    uppercase: true,
    // minlength: [6, 'Minimum password length is 6 characters'],
  },

});




// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.pass = await bcrypt.hash(this.pass, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(user_, pass) {
  const user = await this.findOne({ user_ });
  if (user) {
    const auth = await bcrypt.compare(pass, user.pass);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('Donvick', userSchema);

module.exports = User;