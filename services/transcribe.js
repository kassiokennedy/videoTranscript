import { pipeline } from "@xenova/transformers";
import wavefile from "wavefile";
import fs from "fs";
import path from "path";

let data = null;

export async function transcribeAudio() {
  try {
    const options = {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe",
      return_timestamps: true,
    };
    // let transcriber = await pipeline(
    //   "automatic-speech-recognition",
    //   "Xenova/whisper-tiny"
    // );
    // data = await transcriber("./audio.wav", options);
    // console.log("\ndata aqui", data);

    let transcriber = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-tiny"
    );
    let file = "./audio/audio.wav";
    function lerArquivoComoBuffer(file) {
      try {
        // Lê o arquivo como buffer
        const bufferDoArquivo = fs.readFileSync(file);

        // Faça algo com o buffer, se necessário
        console.log("Buffer do arquivo:", bufferDoArquivo);

        return bufferDoArquivo;
      } catch (erro) {
        console.error("Erro ao ler o arquivo:", erro);
        return null;
      }
    }
    const bufferDoArquivo = lerArquivoComoBuffer(file);
    console.log(bufferDoArquivo);
    let url =
      "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav";

    let buffer = Buffer.from(bufferDoArquivo);
    // console.log(buffer);
    // Read .wav file and convert it to required format
    let wav = new wavefile.WaveFile(buffer);
    wav.toBitDepth("32f"); // Pipeline expects input as a Float32Array
    wav.toSampleRate(16000); // Whisper expects audio with a sampling rate of 16000
    let audioData = wav.getSamples();
    if (Array.isArray(audioData)) {
      if (audioData.length > 1) {
        const SCALING_FACTOR = Math.sqrt(2);
        for (let i = 0; i < audioData[0].length; ++i) {
          audioData[0][i] =
            (SCALING_FACTOR * (audioData[0][i] + audioData[1][i])) / 2;
        }
      }
      audioData = audioData[0];
    }
    let start = performance.now();
    let output = await transcriber(audioData, options);
    let end = performance.now();

    console.log(`\nExecution duration: ${(end - start) / 1000} seconds`);
    console.log("\nOutput:\n", output);
  } catch (error) {
    console.log("\nError transcribe: \n", error);
  }
}
//https://huggingface.co/docs/transformers.js/guides/node-audio-processing
