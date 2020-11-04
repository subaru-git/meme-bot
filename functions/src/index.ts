import * as functions from "firebase-functions";
import axios from "axios";
import { createData } from "./createData";
import memeData from "./data/data.json";
import memeyData from "./data/data-y.json";

const sendMeme = async (y: boolean = false) => {
  if (!functions.config().teams.url) return;

  const targetData = y
    ? memeyData[Math.floor(Math.random() * memeyData.length)]
    : memeData[Math.floor(Math.random() * memeData.length)];
  const data = createData(targetData);
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

export const memey = functions.https.onRequest(async (request, response) => {
  await sendMeme(true);
  response.sendStatus(200);
});

export const scheduledMeme = functions.pubsub
  .schedule("*/15 9-17 * * 1-5")
  .timeZone("Asia/Tokyo")
  .onRun(async (context) => {
    await sendMeme();
  });
