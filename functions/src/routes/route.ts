import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import ShoutOuts from '../model/shoutOuts'

import { getClient } from '../db';


const app = express();
app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
// res.json({ message: "Banana!" });
// });


app.get("/", async (req, res) => {
  const to = req.query.to;
  const mongoQuery:any = {};
  if(to){
    mongoQuery.to=to;
  }
  try {
    const client = await getClient();
    const results = await client.db().collection<ShoutOuts>('shoutOuts').find(mongoQuery).toArray();
    res.json(results); // send JSON results
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({message: "Internal Server Error"});
  }
});


app.post("/", async (req, res) => {
  const shoutOut = req.body as ShoutOuts;
  try {
    const client = await getClient();
    const result = await client.db().collection<ShoutOuts>('shoutOuts').insertOne(shoutOut);
    shoutOut._id = result.insertedId;
    res.status(201).json(shoutOut);
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({message: "Internal Server Error"});
  }
});

  

export default functions.https.onRequest(app);

