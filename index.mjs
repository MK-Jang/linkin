import chalk from "chalk";
import { LinkChecker } from "linkinator";
import { URL } from "url";

const BASE_URL = "https://www.seancdavis.com/";
const LOGGER_MAP = {
  OK: chalk.green("."),
  BROKEN: chalk.red("!"),
  SKIPPED: chalk.yellow("?"),
};


const checker = new LinkChecker();

let brokenLinks = [];
checker.on("link", (link) => {
  process.stdout.write(LOGGER_MAP[link.state]);
  // Store reference if link is broken
  if (link.state === "BROKEN") brokenLinks.push(link);
});

// Store reference to page being checked
let pagesChecked = [];
checker.on("pagestart", (url) => {
  console.log(`Scanning ${url}`);
  pagesChecked.push(url);
});


export const checkerStart = async (url) => {
  brokenLinks = [];
  let arr = [];

  const options = {};
  options.path = url;
  options.recurse = true;
  options.concurrency = 10;
  options.timeout = 1000;
  


  await checker.check(options);

  return new Promise((resolve, reject) => {

    // Report broken links
    if (brokenLinks.length > 0) {
      console.log("\n");
      
      console.log(`Found ${brokenLinks.length} broken links:`);
      for (const brokenLink of brokenLinks) {
        let obj = {};
        if (brokenLink.status === 0 ) {
          if (0 < brokenLink.failureDetails.length) {
            if (brokenLink.failureDetails[0].code === undefined) {
              obj.status = brokenLink.failureDetails[0].type;
            } else {
              obj.status = brokenLink.failureDetails[0].code;
            }
            obj.message = brokenLink.failureDetails[0].message;
          } else {
            obj.status = brokenLink.status;  
            obj.message = "";
          }
          
        } else {
          obj.status = brokenLink.status;
          obj.message = "";
        }
        obj.url = brokenLink.url;
        obj.pathname = new URL(brokenLink.parent).pathname;
        arr.push(obj);

        console.log("");
        console.log(brokenLink.url);
        console.log("  ", "STATUS:", brokenLink.status);
        console.log("  ", "SOURCE:", new URL(brokenLink.parent).pathname);
      }
    }

    resolve(arr);

    // Report pages checked
    console.log("");
    console.log(`Checked ${pagesChecked.length} pages:`);
    for (const page of pagesChecked) {
      console.log(" ", new URL(page).pathname);
    }
  })
}
