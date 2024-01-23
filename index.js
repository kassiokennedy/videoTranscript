import express from "express";
import bodyParser from "body-parser";
import { downloader } from "./services/downloader.js";
import { convertToWav } from "./services/createWav.js";
import { transcribeAudio } from "./services/transcribe.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * envio da requisição simples assim:
 * {
 *   "videoUrl":"https://www.youtube.com/watch?v=9QgZBGgj_bs"
 * }
 */

app.post("/transcriber", async (req, res) => {
  // console.log(req);
  try {
    const videoUrl = req.body.videoUrl; // recebe o video da requisição
    //
    await downloader(videoUrl); // Faz o download do video
    //
    await convertToWav(); // Converte o arquivo de mp4 pra wav
    //
    await transcribeAudio(); //  Faz a transcição do audio
    //
    return res.send("ok");
  } catch (error) {
    console.log("nao ok");
    return res.send("not ok");
  }
});

app.listen(3000);
console.log("\nServer running at port: http://localhost:3000\n");
