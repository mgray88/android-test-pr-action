const core = require("@actions/core");
const github = require("@actions/github");
// const parser = require("fast-xml-parser");
// const axios = require('axios');
// const path = require("path");
const fs = require("fs");

/**
 * doc
 */
async function run() {
  const githubToken = core.getInput("github-token");

  // const octokit = new github.Github(githubToken);

  const context = github.context;

  console.log(githubToken);
  console.log(context);

  fs.readdir(__dirname, function(err, files) {
    if (err) {
      console.log("Unable to scan directory: " + err);
    }

    files.forEach(function(file) {
      console.log(file);
    });
  });
}

run();
