const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    const { id, content, postId } = data;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id,
        content,
        status,
        postId: postId,
      }
    }).catch((error) => {
      console.log(error.message);
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on port 4003");
});
