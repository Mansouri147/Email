const fs = require("fs");
const util = require("util");

// fs.readFile("app.js", { encoding: "utf-8" }, (error, value) => {
//   console.log(value);
// });

const readFileAsync = util.promisify(fs.readFile);
(async () => {
  const result = await readFileAsync("app.js", { encoding: "utf-8" });
  console.log(result);
})();
