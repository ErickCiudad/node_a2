// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// If you don't have the Currency variable declared you can use 'mongoose.Types.Currency'
// var ProductSchema = Schema({
//   price: { type: Currency }
// });
// var Product = mongoose.model('Product', ProductSchema);
//
// var product = new Product({ price: "$1,200.55" });
// product.price; // Number: 120055
// product.price = 1200;
// product.price; // Number 1200 It will not round or multiply. Stored AS IS and should represent $12.00

var commentSchema = new Schema({
   rating:  {
       type: Number,
       min: 1,
       max: 5,
       required: true
   },
   comment:  {
       type: String,
       required: true
   },
   author:  {
       type: String,
       required: true
   }
}, {
   timestamps: true
});
// create a schema
var leaderSchema = new Schema({
  name: {type:String, required: true},
image: {type:String, required:true},
abbr: {type:String, required:true},
description: {type:String, required:true},
designation: {type:String, required:true}

});

// the schema is useless so far
// we need to create a model using it
var Leaders = mongoose.model('Leaders', leaderSchema);
// make this available to our Node applications
module.exports = Leaders;
