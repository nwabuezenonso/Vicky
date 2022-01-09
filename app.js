const express = require('express');
const mongoose = require('mongoose')
const User = require('./model/User')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

//set up the express function
const app = express()

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost/Donvicky'
mongoose.connect(dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
  .then((result) => app.listen(3000, () => {'Server is running on port 3000'}))
  .catch((err) => console.log(err));

//routes

app.get('*', checkUser);
app.get('/', (req, res)=>{
  res.render('index' ) 
})

app.get('/dashboard', requireAuth, (req, res)=>{
  res.render('dashboard' ) 
})

app.get('/payment', requireAuth,  (req, res)=>{
  res.render('payment' ) 
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/login', (req, res) => {
  res.render('login')
})

//Auth routes
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

app.post('/signup',  async(req, res) => {

  const {user_, pass, city_, state_, number_, email_, last, first  } = req.body

  // console.log(email_content, password_content)
  try {
    const user = await User.create({user_, pass, city_, state_, number_, email_, last, first  });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    console.log(err)
    res.status(400).json({ err }) 
  }
})

app.post('/login', async(req, res) => {
  const { user_, pass } = req.body;

  try {
    const user = await User.login(user_, pass);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    // const errors = handleErrors(err);
    res.status(400).send( err);
  }
})


app.get('/logout',(req, res) =>{
  res.cookie('jwt', ' ', { maxAge: 1});
  res.redirect('/');
})