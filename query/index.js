import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};
/* 
Data structure 
--------------
post === {
    '546jfgv' : {
        id: '546jfgv',
        title: 'post title',
        comments: [
            { id:'kfdg34',content:'comment content bla bla',status:'approved'}
        ]
    },
    '95461dfg' : {
        id: '95461dfg',
        title: 'post title',
        comments: [
            { id:'mdh343',content:'comment content 2',status:'rejected'}
        ]
    },...
}

*/

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const comment = posts[postId].comments.find((el) => el.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

//This endpoint serves data to the UI
app.get("/posts", (req, res) => {
  res.send(posts);
});

const PORT = 4500;
app.listen(PORT, async () => {
  console.log("listening on port " + PORT);

  // Sincying missed events, so when starting up the app we make a request to event bus
  // to get all missed events over time
  try {
    const res = await axios.get("http://localhost:2000/events");
    // console.log("res ", res);
    for (let event of res.data) {
      console.log("Processing event: ", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (err) {
    console.log(err.message);
  }
});
