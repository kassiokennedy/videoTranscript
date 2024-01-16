import { downloader } from "./services/downloader.js";
import { createMP3 } from "./services/createMp3.js";
//
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

import * as dotenv from "dotenv";
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// downloader
app.post("/download", async (req, res) => {
  // console.log(req);
  try {
    const videoUrl = req.body.videoUrl;
    await downloader(videoUrl);

    await createMP3();
    //
    return res.send("ok");
  } catch (error) {
    console.log("nao ok");
    return res.send("not ok");
  }
});

app.listen(6969);

// app.listen(process.env.PORT || 6969);
