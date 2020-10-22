import * as functions from "firebase-functions";
import axios from "axios";
import { createData } from "./createData";
import memeData from "./data/data.json";

const sendMeme = async () => {
  if (!functions.config().teams.url) return;

  const data = createData(
    memeData[Math.floor(Math.random() * memeData.length)]
  );
  console.log(data);
  await axios.post(functions.config().teams.url, data, {
    headers: {
      "Contents-Type": "application/json",
    },
  });
};

export const meme = functions.https.onRequest(async (request, response) => {
  await sendMeme();
  response.sendStatus(200);
});

export const scheduledMeme = functions.pubsub
  .schedule("*/15 9-17 * * 1-5")
  .timeZone("Asia/Tokyo")
  .onRun(async (context) => {
    await sendMeme();
  });
