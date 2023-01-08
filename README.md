# Link Checker with Node.js

This is a simple script that recursively checks links on a URL and reports the results back to the console.

## Usage

If you're going to use this in your project, you may just want to copy the `index.js` code and install the appropriate dependencies.

    npm install linkinator chalk

Or you can clone and work with this repo directly.

    git clone https://github.com/seancdavis/node-link-checker.git
    cd node-link-checker
    npm install

### Setting the Base URL

The script looks for a `LINK_CHECKER_BASE_URL` environment variable which it uses as the first link to check, and then begins recursively scanning that page by following links on the same domain.

There is also a fallback URL set directly in the `index.js` script, which you can change.

## Contact

This was built as an example project to serve a blog post. I don't intend on maintaining or improving it. I've built more complex examples for use in production in other repositories.

If you have questions or find bugs, feel free to [send me a message](https://www.seancdavis.com/contact/).
