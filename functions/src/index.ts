import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { createData } from "./createData";
import axios from "axios";

admin.initializeApp();

const sendMeme = async (y: boolean = false) => {
  if (!functions.config().teams.url) return;

  const target = y ? "yoshi" : "main";
  const count = await admin.database().ref(`/${target}/count`).once("value");
  const index = Math.floor(Math.random() * count.val());
  const ref = await admin
    .database()
    .ref(`/${target}/data/${index}`)
    .once("value");
  const data = createData(ref.val());
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
