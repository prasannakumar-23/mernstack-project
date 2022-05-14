let express = require("express");
let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";
let newUrl = "https://api.wazirx.com/api/v2/tickers";
let app = express(); //USED EXPRESS HERE TO CREATE A ROUTE TO GET THE STORED DATA FROM DATABASE
const https = require("https");
app.use(express.json());
app.listen(5000, () => console.log("Server running on port 5000!"));

//app.get("/:name", (req, res) => {
//res.send("Your name is " + req.params.name + "\n");
//});

//app.post("/", (req, res) => {
//res.json(req.body);
//});

let myObj; // to store json data from api

https
  .get(newUrl, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      data = JSON.parse(data);

      //inserting url json data into database

      /*
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("customers").insertMany(data, function (err, result) {
          if (err) throw err;
          res.json(result);
          db.close();
        });
      });
      */

      //console.log("data fetched");

      console.log("data fetched", data[Object.keys(data)[0]]); // PRINTS THE FIRST OBJECT OF JSON ARRAY
    });
  })
  .on("error", (err) => {
    console.log(err.message);
  })
  .end();

app.post("/", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("users");
    dbo.collection("customers").insertOne(
      {
        name: req.body.name,
        age: req.body.age,
      },
      function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
        //res.redirect("/");
      }
    );
  });
});

app.get("/:name", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("users");
    dbo.collection("customers").findOne(
      {
        name: req.params.name,
      },
      function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
        //res.redirect("/");
      }
    );
  });
});
