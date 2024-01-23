import ffmpegStatic from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";

import fs from "fs";
import path from "path";

// ___________________________________________________________________________________________

export const createMP3 = () =>
  new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegStatic);

    ffmpeg()
      .input("./download/video.mp4") // capturar sempre o ultimo audio e repicar o nomme
      .outputOptions("-ab", "40k")
      .saveToFile("./audio/audio.mp3")
      //   .on("progress", (progress) => {
      //     if (progress.percent) {
      //       console.log(`Processing: ${Math.floor(progress.percent)}% done`);
      //     }
      //   })
      .on("end", () => {
        console.log("FFmpeg has finished.");
        resolve();
      })
      .on("error", (error) => {
        console.error("Error create MP3", error);
        reject(error);
      });
  });

// ___________________________________________________________________________________________
