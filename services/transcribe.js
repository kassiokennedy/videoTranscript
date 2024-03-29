import { pipeline } from "@xenova/transformers";
import wavefile from "wavefile";
import fs from "fs";
import path from "path";

export async function transcribeAudio() {
  try {
    const options = {
      chunk_length_s: 15,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe",
      return_timestamps: true,
    };
    // "Xenova/whisper-small" => pode ser modificado para um modelo maior mas requer mais processamento de sua amquina
    const transcriber = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    );
    // ---------- Arquivo da Web (streaming)
    // let url =
    //   "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav";
    // let buffer = Buffer.from(await fetch(url).then(x => x.arrayBuffer()))

    // ---------- Captura de arquivo local
    // const file = "./audio/audio.wav";
    const file = await audioBuffer("./audio/audio.wav");
    const buffer = Buffer.from(file);

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
    // ---------- Arquivo local - FIM

    let start = performance.now(); // Conta tempo de processamento
    const output = await transcriber(audioData, options);
    let end = performance.now();
    console.log(`\n\nExecution duration: ${(end - start) / 1000} seconds\n\n`);

    const text = output.text;
    console.log("text:", text);
  } catch (error) {
    console.log("\nError transcribe: \n", error);
  }
}

async function audioBuffer(file) {
  try {
    // Lê o arquivo como buffer
    const bufferDoArquivo = fs.readFileSync(file);
    // console.log("Buffer do arquivo:", bufferDoArquivo);
    return bufferDoArquivo;
  } catch (erro) {
    console.error("Erro ao ler o arquivo:", erro);
    return null;
  }
}
