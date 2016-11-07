

var mongoose = require('mongoose'),
   assert = require('assert');
var Leaders = require('./models/leaders');
// Connection URL
var url = 'mongodb://localhost:27017/confusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
   // we're connected!
   console.log("Connected correctly to server");
   // create a new dish
   Leaders.create({
       name: 'Peter Pan',
       image: 'images/alberto.png',
       designation: 'Chief Epicurious Officer',
       abbr: 'CEO',
       description: 'Our CEO, Peter...',
       comments: [
           {
               rating: 3,
               comment: 'This is insane',
               author: 'Matt Daemon'
           }
       ]
   }, function (err, leader) {
       if (err) throw err;
       console.log('Leader created!');
       console.log(leader);
       var id = leader._id;
       // get all the dishes
       setTimeout(function () {
           Leaders.findByIdAndUpdate(id, {
                   $set: {
                       description: 'Updated Test'
                   }
               }, {
                   new: true
               })
               .exec(function (err, leader) {
                   if (err) throw err;
                   console.log('Updated Leader!');
                   console.log(leader);
                   leader.comments.push({
                       rating: 5,
                       comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
                       author: 'Paul McVites'
                   });
                   leader.save(function (err, leader) {
                       console.log('Updated Comments!');
                       console.log(leader);
                       db.collection('leaders').drop(function () {
                           db.close();
                       });
                   });
               });
       }, 3000);//end of setTimeout called with an anonymous function
   });
  //  Promotions.price = 499;//should input data as 4.99$
});
