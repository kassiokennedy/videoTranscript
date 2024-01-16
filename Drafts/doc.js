// Imports
import fs from "fs";
import path from "path";

import FormData from "form-data";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

// const x_api_key = process.env.X_API_KEY;
// const url_api_bot = process.env.URL_API_BOT;

//____________________________________________________________________________________

// documentos();

export function documentos(req, res) {
  console.log("Documents: ", req);
  // const url = req.mediaUrl;
  // const parameters = { mediaUrl: url };

  //   let data = new FormData();
  //   data.append(
  //     "arquivos",
  //     fs.createReadStream(
  //       "C:/Users/Kássio/Heroku/preventsenior/Files/Capturar.PNG"
  //     )
  //   );

  //   axios
  //     .request({
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: `${url_api_bot}/api/v1/uploads`,
  //       headers: {
  //         "x-api-key": x_api_key,
  //         ...data.getHeaders(),
  //       },
  //       data: data,
  //     })
  //     .then((response) => {
  //       console.log("Response do documets: ", JSON.stringify(response.data));
  //       return createResponse(`Seu token é : .`);
  //     })
  //     .catch((error) => {
  //       console.log("Erroir do documentos: ", error);
  //       // return res.json(error);
  //     });

  const directoryToSave = "./Files"; // Substitua com o caminho desejado
  const mediaUrl =
    "https://media.smooch.io/apps/65648704aa08d24e0c93816a/conversations/65648985659a3386ad5cee81/QoDqdekbUVb4-rDWD8V4fmnl/M-IhRBrb-IaOYKgNAZh8vE5Q.jpeg";

  async function downloadFile(directoryPath, mediaUrlToSave) {
    const currentDate = new Date().toISOString().replace(/:/g, "-"); // Obtém a data atual como string no formato desejado
    const extension = path.extname(mediaUrlToSave); // Obtém a extensão do arquivo a partir da URL
    const fileName = `File_${currentDate}${extension}`; // Nome do arquivo será algo como 'downloadedFile_2023-12-15T121518.829Z.jpeg'
    const filePath = path.join(directoryPath, fileName); // Caminho completo do arquivo com o diretório especificado

    try {
      const response = await axios.get(mediaUrlToSave, {
        responseType: "stream",
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
    }
  }

  //   Exemplo de uso: chama a função para baixar o arquivo e define o diretório onde os arquivos serão salvos

  downloadFile(directoryToSave, mediaUrl)
    .then(() => console.log("Arquivo baixado com sucesso!"))
    .catch((err) => console.error("Erro:", err));
}

//____________________________________________________________________________________
