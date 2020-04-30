
// requiring dep. below


const fs = require("fs");
const express = require("express");
const path = require("path");




// EXPRESS CONFIGURATION

// PORT
const app = express();
const PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// ROUTER



app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    let results;
    try {
        results = JSON.parse(fs.readFileSync("db/db.json", 'utf8'))
        console.log(results)
    } catch (err) {
        console.error(err)
    }
    res.json(results);
  });



app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var notes = req.body;
    var title = req.body.title;
    var text = req.body.text;
    var id = shortid.generate();
    var notes = {
        id: id,
        title: title,
        text: text
    }
    try {
        let oldFile = JSON.parse(fs.readFileSync("db/db.json", 'utf8'))
        oldFile.data.push(notes)
        fs.writeFileSync("./db/db.json", JSON.stringify(oldFile))
      } catch (err) {
        console.error(err)
      }
    res.json(notes);
  });

  app.delete("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    //  body parsing middleware
    var notes = req.body;
    var title = req.body.title;
    var text = req.body.text;
    var id = shortid.generate();
    var notes = {
        id: id,
        title: title,
        text: text
    }
    try {
        let filemade = JSON.parse(fs.readFileSync("db/db.json", 'utf8'))
        filemade.push(notes)
        fs.deleteFileSync("./db/db.json", JSON.stringify(filemade))
      } catch (err) {
        console.error(err)
      }
    res.json(notes);
  });



//Server starts


console.log("Start server")
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});



  