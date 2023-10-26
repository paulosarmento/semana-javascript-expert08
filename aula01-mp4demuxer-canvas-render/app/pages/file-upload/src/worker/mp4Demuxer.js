import { createFile } from "../deps/mp4box.all.min.js";
export default class MP4Demuxer {
  #onConfig;
  #onChunck;
  #file;
  /**
   *
   * @param {ReadableStream} stream
   * @param {object} options
   * @param {(config: object) => void} options.onConfig
   *
   * @returns {Promise<void>}
   */
  async run(stream, { onConfig, onChunck }) {
    this.#onConfig = onConfig;
    this.#onChunck = onChunck;

    this.#file = createFile();
    this.#file.onReady = (args) => {
      debugger;
    };
    this.#file.onError = (error) => console.log("Deu ruim mp4Demuxer", error);

    this.#init(stream);
  }
  #init(stream) {}
}
