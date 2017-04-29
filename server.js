"use strict";

const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const port = 8000;
const mimeTypes = {
  "html": "text/html",
  "js": "text/javascript",
  "css": "text/css",
  "jpeg": "image/jpeg",
  "jpg": "image/jpg"
};

const server = http.createServer((req, res) => {
  let uri = url.parse(req.url).pathname;
  console.log(`Loading "${uri}"` + "\n");

  let fileName = path.join(process.cwd(), decodeURI(uri));

  console.log(process.cwd());
  console.log(decodeURI(uri));
  console.log(`Filename: "${fileName}"\n`);
  let stats;

  try {
    stats = fs.lstatSync(fileName);
  } catch(e) {
    res.writeHead(404, {"Content-type": "text/plain"});
    res.write("404 Not Found\tbaby!!\n");
    res.end();
    return
  }

  // res.writeHead(200, {"Content/type": "text/plain"});
  // res.end("Good morning!");

  if (stats.isFile()) {
    var mimeType = mimeTypes[path.extname(uri).split(".")[1]];
    console.log("Requested file MIME-type: " + mimeType);
    res.writeHead(200, {"Content/type": mimeType});
    var fileStream = fs.createReadStream(fileName);
    fileStream.pipe(res);
  } else if (stats.isDirectory()) {
    res.writeHead(302, {
      "location": "public/index.html"
    });
    res.end();
  } else {
    res.writeHead(500, {"Content-type": "text/plain"});
    res.write("500 Internal Error");
    res.end();
  }
})
.listen(port, "localhost", () => {
  console.log("Listening on localhost, port: " + port + "\n");
});

