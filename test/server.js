const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 3000; // Port for your proxy server
const TARGET = "http://localhost:8080"; // The address of the server you're proxying to

// Set up the reverse proxy
app.use("/", createProxyMiddleware({ target: TARGET, changeOrigin: true }));

// Listen on the port
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
