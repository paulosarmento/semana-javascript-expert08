import VideoProcessor from "./videoProcessor.js";
import MP4Demuxer from "./mp4Demuxer.js";
import CanvasRenderer from "./canvasRenderer.js";
import WebMWriter from "./../deps/webm-writer2.js";
const qvgaConstraints = {
  width: 320,
  height: 240,
};

const vgaConstraints = {
  width: 640,
  height: 480,
};
const hdConstraints = { width: 1280, height: 720 };

const encoderConfig = {
  ...qvgaConstraints,
  bitrate: 10e6,
  // WebM
  codec: "vp09.00.10.08",
  pt: 4,
  hardwareAcceleration: "prefer-software",
  // MP4
  //   codec: "avc1.42002A",
  //   pt: 1,
  //   hardwareAcceleration: "prefer-software",
  //   avc: { format: "annexb" },
};
const webmWriterConfig = {
  codec: "VP9",
  height: encoderConfig.height,
  width: encoderConfig.width,
  bitrate: encoderConfig.bitrate,
};

const mp4Demuxer = new MP4Demuxer();
const webMWriter = new WebMWriter(webmWriterConfig);
const videoProcessor = new VideoProcessor({
  mp4Demuxer,
  webMWriter,
});
// Funcoes que rodam em segundo plano no navegador
onmessage = async ({ data }) => {
  const renderFrame = CanvasRenderer.getRenderer(data.canvas);
  await videoProcessor.start({
    file: data.file,
    renderFrame,
    encoderConfig,
    sendMessage(message) {
      self.postMessage(message);
    },
  });
  // self.postMessage({ status: "done" });
};
