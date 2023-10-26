onmessage = ({ data }) => {
  // console.log("recebido!!", data);
  debugger;
  setTimeout(() => {
    self.postMessage({ status: "done" });
  }, 2000);
  // while (true) {}
};
