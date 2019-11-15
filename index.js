const core = require("@actions/core");
const github = require("@actions/github");
// const parser = require("fast-xml-parser");
// const axios = require('axios');
// const path = require("path");
const fs = require("fs");

/**
 * doc
 * @param {string} dir root dir to recurse
 */
function getFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  files.forEach(file => {
    const name = dir + "/" + file.name;
    console.log(name);
    if (file.isDirectory()) {
      getFiles(file.name);
    }
  });
}

/**
 * doc
 */
async function run() {
  const githubToken = core.getInput("github-token");

  // const octokit = new github.Github(githubToken);

  const context = github.context;

  console.log(githubToken);
  console.log(context);

  console.log(process.env.HOME);
  console.log(process.env.GITHUB_WORKSPACE);
  getFiles(process.env.GITHUB_WORKSPACE);
}

run();
