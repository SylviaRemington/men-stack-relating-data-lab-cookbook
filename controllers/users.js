// controllers/users.js
// ADDING A COMMUNITY PAGE


const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// This is the community index page where it gets all users from MongoDB and renders as a list (for everyone to see and access).
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users/index.ejs', { users });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// This builds the show page where it gets one specific user by id and renders it with each person's individual pantry (but read only/can't edit others).
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.render('users/show.ejs', { user });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;

