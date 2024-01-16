import path from "path";
import ytdl from "ytdl-core";
import fs from "fs";

export const downloader = (videoUrl) =>
  new Promise((resolve, reject) => {
    // const url = videoUrl;
    const currentDate = new Date().toISOString().replace(/:/g, "-"); // Obtém a data atual como string no formato desejado
    // const extension = path.extname(mediaUrlToSave); // Obtém a extensão do arquivo a partir da URL
    const fileName = `video_${currentDate}.mp4`; // Nome do arquivo será algo como 'downloadedFile_2023-12-15T121518.829Z.jpeg'
    const filePath = path.join("./download/", fileName); // Caminho completo do arquivo com o diretório especificado

    ytdl(videoUrl, {
      quality: "lowestaudio",
      filter: "audioonly",
    })
      .on("end", () => {
        console.log("download feito");
        resolve();
      })
      .on("error", () => {
        console.log("download nao feito");
        reject();
      })
      .pipe(fs.createWriteStream(filePath));
  });
