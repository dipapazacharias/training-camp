"use strict";

const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mimeTypes = {
  "html": "text/html",
  "js": "text/javascript",
  "css": "text/css",
  "jpeg": "image/jpeg",
  "jpg": "image/jpg"
};

const server = http.createServer((req, res) => {
  let uri = url.parse(req.url).pathname;
  let fileName = path.join(process.cwd(), decodeURI(uri));
  console.log(`Loading ${uri}` + "\n");
  console.log(`Filename: ${filename}`);
  let stats;
}).listen(8000);

