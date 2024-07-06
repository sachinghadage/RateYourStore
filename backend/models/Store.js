const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  name: { type: String, required: true, minlength: 20, maxlength: 60 },
  email: { type: String, required: true, unique: true },
  address: { type: String, maxlength: 400 },
  ratings: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' }, rating: { type: Number, min: 1, max: 5 } }],
});

StoreSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, { rating }) => acc + rating, 0);
  return sum / this.ratings.length;
});

module.exports = mongoose.model('Store', StoreSchema);
