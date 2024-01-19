import ffmpegStatic from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";

import fs from "fs";
import path from "path";

const inputFilePath = "caminho/do/seu/arquivo.mp3";
const outputFilePath = "caminho/do/seu/arquivo.wav";
// ___________________________________________________________________________________________

export const convertToWav = () =>
  new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegStatic);

    ffmpeg()
      .input("./services/video/video.mp4")
      .audioCodec("pcm_s16le") // Configura o codec de áudio para PCM com 16 bits por amostra
      // .audioChannels(2) // Configura o número de canais para 2 (estéreo) - remover isso
      .audioFrequency(44100) // Configura a taxa de amostragem para 44.1 kHz
      .on("end", () => {
        console.log("Conversão concluída com sucesso.");
        resolve();
      })
      .on("error", (err) => {
        console.error("Erro durante a conversão:", err);
        reject(err);
      })
      .save("./services/audio/audio.wav");
  });

// ___________________________________________________________________________________________
