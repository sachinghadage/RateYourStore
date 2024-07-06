const express = require('express');
const router = express.Router();
const Store = require('../models/Store');
const auth = require('../middlewares/auth');

// Add store (admin only)
router.post('/', auth, async (req, res) => {
  const { name, email, address } = req.body;
  try {
    const store = new Store({ name, email, address });
    await store.save();
    res.json(store);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Submit rating
router.post('/:storeId/rate', auth, async (req, res) => {
  const { rating } = req.body;
  try {
    const store = await Store.findById(req.params.storeId);
    const userRating = store.ratings.find(r => r.userId.toString() === req.user.id);
    if (userRating) {
      userRating.rating = rating;
    } else {
      store.ratings.push({ userId: req.user.id, rating });
    }
    await store.save();
    res.json(store);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
