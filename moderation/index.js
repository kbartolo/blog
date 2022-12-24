import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

/* app.post("/moderation", (req, res) => {
  res.send(200);
}); */

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    console.log("Moderating Comment created", data);
    const status = data.content.includes("orange") ? "rejected" : "approved";
    const comment = {
      ...data,
      status,
    };

    await axios.post("http://localhost:2000/events", {
      type: "CommentModerated",
      data: comment,
    });
  }

  res.send({});
});

const PORT = 3600;
app.listen(PORT, (req, res) => console.log("Listen on port " + PORT));
