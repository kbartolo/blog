import expressApp from "express";
import bodyparser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = expressApp();
const comments = {};

app.use(bodyparser.json());
app.use(cors());

// http://localhost:5000/posts/46511/comments
app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.status(200).send(comments[id] || []);
});

// http://localhost:5000/posts/46511/comments
// {"content":"brthy5  2223 dfgfdxsg"}

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  const commentId = randomBytes(4).toString("hex");
  comments[id] = comments[id] || [];
  comments[id].push({ id: commentId, content, status: "pending" });

  //Emitting an event to Event Bus, changing type of event
  await axios.post("http://event-bus-clusterip-srv:2000/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      status: "pending",
      postId: id,
    },
  });

  res.status(200).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Received Event", type);
  if (type === "CommentModerated") {
    const { id, postId, status } = data;
    const commentsByPostId = comments[postId];
    const comment = commentsByPostId.find((el) => el.id === id);
    comment.status = status;
    console.log("type === CommentModerated " + comment);

    await axios.post("http://event-bus-clusterip-srv:2000/events", {
      type: "CommentUpdated",
      data,
    });
  }
  res.send({});
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
