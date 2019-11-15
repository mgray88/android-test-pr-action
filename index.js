const core = require("@actions/core");
const github = require("@actions/github");
// const parser = require("fast-xml-parser");
// const axios = require('axios');
// const path = require("path");
const fs = require("fs");

/**
 * doc
 * @param {string} dir root dir to recurse
 * @param {array} files_ recursive array
 * @return {array} array of files
 */
function getFiles(dir, files_) {
  files_ = files_ || [];
  const files = fs.readdirSync(dir, { withFileTypes: true });
  files.forEach(file => {
    const name = dir + "/" + file.name;
    if (file.isDirectory()) {
      getFiles(file.name, files_);
    } else {
      files_.push(name);
    }
  });
  return files_;
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

  console.log(getFiles(process.env.GITHUB_WORKSPACE));
}

run();
