const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { getMaxListeners } = require("../models/User");
const {sendWelcomeEmail, sendCancelationEmail, } = require("../emails/mail");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'my auth system', {
    expiresIn: maxAge
  });
};


// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}


module.exports.signup_post = async (req, res) => {

  const {email, password} = req.body

  try {
    const user = await User.create({ email, password });
    sendWelcomeEmail(user.email, user.name  )
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}
  
module.exports.login_get = (req, res) => {
  res.render('login');
}
    
module.exports.login_post =  async  (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    sendCancelationEmail(user.email, user.name)
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}
  
module.exports.logout_get = (req, res) =>{
  res.cookie('jwt', ' ', { maxAge: 1});
  res.redirect('/');
}

module.exports.delete = (req, res) =>{
  const id = req.params.id;

  User.findByIdAndDelete(id)
  .then((result)=>{
    res.json({user: 'user deleted'})
  })
  .catch(err =>{
    console.log(err)
  })
}

module.exports.delete_get = (req, res)=>{
  res.cookie('jwt', ' ', { maxAge: 1});
  res.render('delete')
}

module.exports.update_post = async (req, res)=>{

  const id = req.params.id

  try {
    await User.findByIdAndUpdate(id, req.body , {new: true, runValidators: true});
    res.json({user: 'user updated'})
  } 
  catch (err) {
    // const errors = handleErrors(err);
    res.status(400).json({ err });
  }
}

module.exports.update_get = (req, res)=>{
  res.render('forget_password')
}