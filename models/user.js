const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
  
  amountCurrency: {type: Number,  required:true},
  coinName: {type: String, required:true},
  amountCoin: {type: Number},
  

}, {
  timestamps: true
});

const depositSchema = new Schema({
  
  amount: {type: Number,  required:true},
  balance: {type: Number,}
  
}, {
  timestamps: true
});

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true, // trims whitespace if your user types something like " alex@123.com " into "alex@123.com"
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  },
  
  transaction: [transactionSchema],
  deposit: [depositSchema]

  
}, {
  timestamps: true,
  // A cool mongoose trick to not send passwords to clients! (even though they'll be hashed)
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

module.exports = mongoose.model('User', userSchema);