# videoTranscript

Faz download e transcrição de video do YouTube

https://www.fronteditor.dev/gists/64e6ade5434ccd23e6ad89d50cafea3b/view

### Inpiração pro projeto

- https://www.youtube.com/watch?v=w0h1JGeVqFg&t=10s

### FEMPEG

https://creatomate.com/blog/how-to-use-ffmpeg-in-nodejs

### Xenova Transformers

- https://www.npmjs.com/package/@xenova/transformers

### Projeto que usa o chatgpt

- https://medium.com/@ralfelfving/build-your-own-voice-based-chat-assistant-with-openai-whisper-and-tts-text-to-speech-5c1ed05fa9ea

### para instalar todas a dependencias

- npm install --save

### comando para rodar o projeto em modo desenvolvedor

- npm run dev

//https://huggingface.co/docs/transformers.js/guides/node-audio-processing

```Javascript
    const options = {
      chunk_length_s: 15,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe",
      return_timestamps: true,
    };

```

```Javascript
    // "Xenova/whisper-small" => pode ser modificado para um modelo maior mas requer mais processamento de sua amquina
    const transcriber = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    );

```
