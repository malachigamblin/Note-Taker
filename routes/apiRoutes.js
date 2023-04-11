const router = require("express").Router();
const thoughts = require("../db/db.json");
const fs = require("fs");
const path = require("path");

const addNewThought = (body, thoughtArray) => {
  const newThought = body;
  if (!Array.isArray(thoughtArray)) thoughtArray = [];

  if (thoughtArray.length === 0) thoughtArray.push(0);

  body.id = thoughtArray[0];
  thoughtArray[0]++;

  thoughtArray.push(newThought);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(thoughtArray, null, 2)
  );
  return newThought;
};

const deleteThought = (id, thoughtArray) => {
  for (let i = 0; i < thoughtArray.length; i++) {
    let note = thoughtArray[i];

    if (note.id == id) {
      thoughtArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(thoughtArray, null, 2)
      );

      break;
    }
  }
};

router.get("/notes", (req, res) => {
  res.json(thoughts.slice(1));
});

router.post("/notes", (req, res) => {
  const newThought = addNewThought(req.body, thoughts);
  res.json(newThought);
});

router.delete("/notes/:id", (req, res) => {
  deleteThought(req.params.id, thoughts);
  res.json(true);
});

module.exports = router;
