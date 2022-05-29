const mongoose = require('mongoose');

const placeschema = new mongoose.Schema({
    name : {
      type: String,
      required:[true, 'A place must have  a name'],
      unique:true
    },
    rating : {
      type:Number,
      default:4.5
    },
    pincode : {
      type:String,
      required:[true, 'A place must have a pincode']
    }
  });
  const place = mongoose.model('place', placeschema);

  module.exports = place;
