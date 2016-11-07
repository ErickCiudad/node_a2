

var mongoose = require('mongoose'),
   assert = require('assert');
var Promotions = require('./models/promotions');
// Connection URL
var url = 'mongodb://localhost:27017/confusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
   // we're connected!
   console.log("Connected correctly to server");
   // create a new dish
   Promotions.create({
       name: 'Weekend Grand Buffet',
       image: 'images/uthapizza.png',
       category: 'New',
       label: 'Hot',
       price: '1499',
       description: 'Endless possibilites',
       comments: [
           {
               rating: 3,
               comment: 'This is insane',
               author: 'Matt Daemon'
           }
       ]
   }, function (err, dish) {
       if (err) throw err;
       console.log('Promo created!');
       console.log(promotion);
       var id = promotion._id;
       // get all the dishes
       setTimeout(function () {
           Promotions.findByIdAndUpdate(id, {
                   $set: {
                       description: 'Updated Test'
                   }
               }, {
                   new: true
               })
               .exec(function (err, dish) {
                   if (err) throw err;
                   console.log('Updated Promotion!');
                   console.log(promotion);
                   promotion.comments.push({
                       rating: 5,
                       comment: 'I\'m getting a sinking feeling!',
                       author: 'Leonardo di Carpaccio'
                   });
                   promotion.save(function (err, dish) {
                       console.log('Updated Comments!');
                       console.log(promotion);
                       db.collection('promotion').drop(function () {
                           db.close();
                       });
                   });
               });
       }, 3000);//end of setTimeout called with an anonymous function
   });
  //  Promotions.price = 499;//should input data as 4.99$
});
