import { LinkChecker } from "linkinator";
import chalk from "chalk";
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
checker.on("pagestart", (url) => pagesChecked.push(url));

await checker.check({ path: BASE_URL, recurse: true });

// Report broken links
if (brokenLinks.length > 0) {
  console.log("\n");
  console.log(`Found ${brokenLinks.length} broken links:`);
  for (const brokenLink of brokenLinks) {
    console.log("");
    console.log(brokenLink.url);
    console.log("  ", "STATUS:", brokenLink.status);
    console.log("  ", "SOURCE:", new URL(brokenLink.parent).pathname);
  }
}

// Report pages checked
console.log("");
console.log(`Checked ${pagesChecked.length} pages:`);
for (const page of pagesChecked) {
  console.log(" ", new URL(page).pathname);
}
