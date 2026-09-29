import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve } from "node:path";

const port = Number(process.env.PORT) || 3002;
const outputDirectory = resolve("out");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

createServer((request, response) => {
  let pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);

  if (pathname === "/" || pathname === "/portfolio" || pathname === "/portfolio/") {
    pathname = "/index.html";
  } else if (pathname.startsWith("/portfolio/")) {
    pathname = pathname.slice("/portfolio".length);
  }

  let filePath = resolve(outputDirectory, `.${pathname}`);
  if (!filePath.startsWith(outputDirectory) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.statusCode = 404;
    filePath = resolve(outputDirectory, "404.html");
  }

  response.setHeader("Content-Type", contentTypes[extname(filePath)] ?? "application/octet-stream");
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`Portfolio preview: http://localhost:${port}/portfolio`);
});
