import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import ShoutOuts from '../model/shoutOuts'

import { getClient } from '../db';
import {  ObjectId } from "mongodb";


const app = express();
app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
// res.json({ message: "Banana!" });
// });


// app.get("/", async (req, res) => {
//   const to = req.query.to

//   const mongoQuery:any = {};
//   if(to){
//     mongoQuery.to=to;
//   }

//   try {
//     const client = await getClient();
//     const results = await client.db().collection<ShoutOuts>('shoutOuts').find(mongoQuery).toArray();
//     res.json(results); // send JSON results
//   } catch (err) {
//     console.error("FAIL", err);
//     res.status(500).json({message: "Internal Server Error"});
//   }
// });

app.get("/", async (req, res) =>{
  const to = req.query.to;
  const from = req.query.from;
  // const name = req.query.name;
  const query: any = {};
  if (to || from) {
    query.to=to;
    query.from=from;
  }


  try{
    const client = await getClient();
    const results = await client.db().collection<ShoutOuts>('shoutOuts').find(query).toArray();
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

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client.db().collection<ShoutOuts>('shoutOuts').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({message: "Not Found"});
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({message: "Internal Server Error"});
  }
});

  

export default functions.https.onRequest(app);

