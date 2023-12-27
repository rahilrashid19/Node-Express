const express = require("express");
const fs = require("fs");
const router = express.Router();

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

router.get("/api/v1/users", (req, res) => {
  res.status(200).json({
    status: "success",
    users: {
      users,
    },
  });
});

router.post("/api/v1/users", (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = {
    id: newId,
    ...req.body,
  };
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/../data/users.json`,
    JSON.stringify(users),
    (err) => {
      if (err) console.log(err);
      res.status(201).json({
        status: "success",
        user: {
          newUser,
        },
        message: "User added successfully",
      });
    }
  );
});

router.get("/api/v1/users/:id", (req, res) => {
  const id = +req.params.id;
  const filteredUser = users.filter((user) => user.id === id);
  res.status(200).json({
    status: "success",
    user: {
      filteredUser,
    },
  });
});

router.patch("/api/v1/users/:id", (req, res) => {
  const id = +req.params.id;
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
  });
});

router.delete("/api/v1/users/:id", (req, res) => {
  const id = +req.params.id;
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});

module.exports = router;
