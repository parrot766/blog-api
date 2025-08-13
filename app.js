require("dotenv").config();
const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/indexRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/posts/:postUuid/comments", commentsRouter);
app.use("/user", usersRouter);

app.listen(PORT, () => console.log("app listening on port 3000!"));
