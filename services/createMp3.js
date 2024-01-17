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

// export const createMP3 = () =>
//   new Promise((resolve, reject) => {
//     // Tell fluent-ffmpeg where it can find FFmpeg
//     ffmpeg.setFfmpegPath(ffmpegStatic);

//     // Specify the directory where your files are located
//     const directory = "./download/";
//     const audioDirectory = "./audio";

//     // Read the files in the directory
//     fs.readdir(directory, (err, files) => {
//       if (err) {
//         console.error("Error reading directory:", err);
//         reject(err);
//         return;
//       }

//       // Filter out non-MP4 files
//       const mp4Files = files.filter((file) => file.endsWith(".mp4"));

//       // Sort files by modification time, most recent first
//       const sortedFiles = mp4Files
//         .map((file) => ({
//           file,
//           mtime: fs.statSync(path.join(directory, file)).mtimeMs,
//         }))
//         .sort((a, b) => b.mtime - a.mtime);

//       // Take the first file (most recent)
//       const latestFile = sortedFiles[0];

//       if (!latestFile) {
//         console.error("No MP4 files found.");
//         reject("No MP4 files found.");
//         return;
//       }

//       const inputPath = path.join(directory, latestFile.file);
//       const currentDate = new Date().toISOString().replace(/:/g, "-"); // Obtém a data atual como string no formato desejado
//       const fileName = `audio_${currentDate}.mp3`; // Nome do arquivo será algo como 'downloadedFile_2023-12-15T121518.829Z.jpeg'
//       const filePath = path.join(audioDirectory, fileName); // Caminho completo do arquivo com o diretório especificado

//       // Run FFmpeg
//       ffmpeg()
//         .input(inputPath)
//         .outputOptions("-ab", "40k")
//         .saveToFile(filePath)
//         .on("end", () => {
//           console.log("FFmpeg has finished.");
//           resolve();
//         })
//         .on("error", (error) => {
//           console.error(error);
//           reject(error);
//         });
//     });
//   });
