const shell = require("shelljs");
const inquirer = require("inquirer");
const git = require("./git");

if (!shell.which("git")) {
  shell.echo("Sorry, this script requires git");
  shell.exit(1);
}

const questions = [
  {
    type: "checkbox",
    name: "branches",
    message: "What branches do you want to delete?",
    choices: git.getBranches(),
  },
  {
    type: "confirm",
    name: "shouldDelete",
    message: "Are you sure you want to delete all these branches?",
    default: false,
  },
];

inquirer.prompt(questions).then((answers) => {
  const { branches, shouldDelete } = answers;

  if (shouldDelete === false) {
    shell.echo("Not deleting any branches");
    shell.exit(1);
  }

  git.deleteBranches(branches);
});
