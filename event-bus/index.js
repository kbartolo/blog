import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const events = [];

//We create a new endpoint to retreive all events that have ever occured
app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);
  //Post Microservice Event
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  //Comment Microservice Event
  axios.post("http://localhost:5000/events", event).catch((err) => {
    console.log(err.message);
  });
  //Query Microservice Event
  axios.post("http://localhost:4500/events", event).catch((err) => {
    console.log(err.message);
  });
  //Moderation Microservice Event
  axios.post("http://localhost:3600/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

const PORT = 2000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
