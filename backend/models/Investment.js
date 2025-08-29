const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  packageType: { type: String, enum: ['Bronze', 'Silver', 'Gold'] },
  amount: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Investment', investmentSchema);
