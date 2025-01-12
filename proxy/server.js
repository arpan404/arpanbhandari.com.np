const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 3000;
const TARGET = "http://localhost:8080";

app.use("/", createProxyMiddleware({ target: TARGET, changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});

