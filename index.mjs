import { LinkChecker } from "linkinator";
// import { URL } from "url";
// import chalk from "chalk";

const checker = new LinkChecker();

checker.on("link", (link) => {
  console.log(link);
});

await checker.check({ recurse: true, path: "https://www.seancdavis.com/" });
