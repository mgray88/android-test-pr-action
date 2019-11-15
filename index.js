const core = require("@actions/core");
const github = require("@actions/github");
// const parser = require("fast-xml-parser");
// const axios = require('axios');
// const path = require("path");
const fs = require("fs");

const fileRe = new RegExp("TEST-.*.xml");

/**
 * doc
 * @param {string} dir root dir to recurse
 * @return {array} list of test xml files
 */
function findTestXml(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  var xml = [];
  files.reduce((xml, file) => {
    const name = dir + "/" + file.name;
    if (file.isDirectory()) {
      xml.push(findTestXml(name));
    } else if (fileRe.test(file.name)) {
      xml.push(file);
    }
    return xml;
  });
  // files.forEach(file => {
  //   const name = dir + "/" + file.name;
  //   console.log(name);
  //   if (file.isDirectory()) {
  //     getFiles(name);
  //   }
  // });
  return xml;
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

  console.log(findTestXml(process.env.GITHUB_WORKSPACE));
}

run();
