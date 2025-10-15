const express = require('express');
const router = express.Router({ mergeParams: true }); // keeps :userId params
const User = require('../models/user.js');

// Router logic below:

// This is the index. - It shows all pantry items for the logged-in user.
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', { 
        pantry: user.pantry,
        userId: req.session.user._id 
     });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// new item form page
router.get('/new', (req, res) => {
  res.render('foods/new.ejs', { userId: req.session.user._id });
});

// create item
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// viewing & showing edit form page - This will get a single food (e.g. one pantry item) and shows the edit screen with info prefilled in it.
router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', { 
        food,
        userId: req.session.user._id  // Pass userId
     });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// update item - This will save the changes made on the edit form.
router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.itemId);
    food.set(req.body);
    await user.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// delete item
router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;