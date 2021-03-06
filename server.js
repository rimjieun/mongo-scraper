
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;


var app = express();


app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(express.static("public"));

mongoose.connect("mongodb://localhost/week18day3mongoose");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});



app.get("/scrape", function(req, res) {

  request("https://www.reddit.com/r/news/", function(error, response, html) {
 
    var $ = cheerio.load(html);

    var arr = [];

    $("a.title").each(function(i, element) {

      var article = {};

      article.title = $(this).text();
      article.link = $(this).attr("href");

      var entry = new Article(article);

      arr.push(entry);

    });

    res.send(arr);

  });

});


app.get("/articles", function(req, res) {

  Article.find({}, function(error, doc) {

    if (error) {
      console.log(error);
    }

    else {
      res.json(doc);
    }
  });
});


// app.get("/articles/:id", function(req, res) {

//   Article.findOne({ "_id": req.params.id })

//   .populate("note")

//   .exec(function(error, doc) {

//     if (error) {
//       console.log(error);
//     }
   
//     else {
//       res.json(doc);
//     }
//   });
// });



// app.post("/articles/:id", function(req, res) {

//   var newNote = new Note(req.body);

//   newNote.save(function(error, doc) {

//     if (error) {
//       console.log(error);
//     }

//     else {

//       Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
 
//       .exec(function(err, doc) {

//         if (err) {
//           console.log(err);
//         }
//         else {

//           res.send(doc);
//         }
//       });
//     }
//   });
// });


app.listen(3000, function() {
  console.log("App running on port 3000!");
});