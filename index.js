const express = require("express");
const app = express();
const PORT = 4100;
const userRouter = require("./router/userRouter.js");
app.use(express.json());
app.use("/", userRouter);

app.use("/:id", userRouter);

app.listen(PORT, () =>
  console.log(`listening to the express server on ${PORT}`)
);
