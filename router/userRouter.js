const express = require("express");
const fs = require("fs");
const router = express.Router();

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

const getUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    users: {
      users,
    },
  });
};

const createusers = (req, res) => {
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
};

const getUser = (req, res) => {
  const id = +req.params.id;
  const filteredUser = users.filter((user) => user.id === id);
  res.status(200).json({
    status: "success",
    user: {
      filteredUser,
    },
  });
};

const editUser = (req, res) => {
  const id = +req.params.id;
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
  });
};

const deleteUser = (req, res) => {
  const id = +req.params.id;
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
};

// router.get("/api/v1/users", getUsers);

// router.post("/api/v1/users", createusers);

// router.get("/api/v1/users/:id", getUser);

// router.patch("/api/v1/users/:id", editUser);

// router.delete("/api/v1/users/:id", deleteUser);

router.route("/api/v1/users").get(getUser).post(createusers);

router
  .route("/api/v1/users/:id")
  .patch(editUser)
  .delete(deleteUser)
  .get(getUser);

module.exports = router;
