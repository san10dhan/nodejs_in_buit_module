const os = require("os");
const http = require("http");
const process = require("process");

function formatBytes(bytes) {
  if (bytes === 0) return "0 bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat(bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

const getCPUInfo = () => {
  const model = os.cpus()[0].model;
  const cores = os.cpus().length;
  const architecture = os.arch();
  return { model, cores, architecture };
};

const getOsInfo = () => {
  const platform = os.platform();
  const type = os.type();
  return { platform, type };
};

const networkAndProcessInfo = () => {
  const networkInfo = os.networkInterfaces();
  const processId = process.pid;
  const processTitle = process.title;
  return { networkInfo, processId, processTitle };
};

const server = http.createServer((req, res) => {
  const parseUrl = new URL(req.url, `http://${req.headers.host}`);
  res.setHeader("Content-Type", "application/json");
  if (parseUrl.pathname === "/") {
    res.statusCode = 200;

    res.end(
      JSON.stringify({
        name: "Welcome to system",
        routes: ["/cpu", "/network"],
      }),
    );
  } else if (parseUrl.pathname === "/cpu") {
    res.end(JSON.stringify(getCPUInfo()));
  }
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
