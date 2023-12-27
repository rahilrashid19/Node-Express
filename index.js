const express = require("express");
const app = express();
const userRouter = require("./router/userRouter.js");

const PORT = 4100;

app.use(express.json());

app.use("/", userRouter);

app.use("/:id", userRouter);

app.listen(PORT, () =>
  console.log(`listening to the express server on ${PORT}`)
);
