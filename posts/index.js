import expressApp from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = expressApp();

const posts = {}; //simulate db

app.use(bodyParser.json());
app.use(cors());

/* app.get("/posts", (req, res) => {
  res.send(posts);
}); */

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  //Emitting an event to Event Bus
  await axios.post("http://event-bus-clusterip-srv:2000/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

const EXPRESS_PORT = 4000;
app.listen(EXPRESS_PORT, () => {
  console.log("listening on port " + EXPRESS_PORT);
});
