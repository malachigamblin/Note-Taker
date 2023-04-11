const PORT = process.env.PORT || 3001;
const fs = require("fs");
const path = require("path");
const express = require("express");
const thoughts = require("./db/db.json");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  res.json(thoughts.slice(1));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

const addNewThought = (body, thoughtArray) => {
  const newThought = body;
  if (!Array.isArray(thoughtArray)) thoughtArray = [];

  if (thoughtArray.length === 0) thoughtArray.push(0);

  body.id = thoughtArray[0];
  thoughtArray[0]++;

  thoughtArray.push(newThought);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(thoughtArray, null, 2)
  );
  return newThought;
}


app.post("/api/notes", (req, res) => {
  const newThought = addNewThought(req.body, thoughts);
  res.json(newThought);
});

const deleteThought = (id, thoughtArray) => {
  for (let i = 0; i < thoughtArray.length; i++) {
    let note = thoughtArray[i];

    if (note.id == id) {
      thoughtArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(thoughtArray, null, 2)
      );

      break;
    }
  }
}


app.delete("/api/notes/:id", (req, res) => {
  deleteThought(req.params.id, thoughts);
  res.json(true);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
