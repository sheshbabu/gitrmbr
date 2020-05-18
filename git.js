const shell = require("shelljs");

function getBranches() {
  const { stdout } = shell.exec("git show-ref --heads | cut -d/ -f3-", {
    silent: true,
  });
  const branches = stdout.split("\n").filter((br) => br !== "");
  return branches;
}

function deleteBranches(branches) {
  const branchesAsString = branches.join(" ");

  shell.exec(`git branch -d ${branchesAsString}`, {
    silent: true,
  });

  shell.exec(`git push origin -d ${branchesAsString}`, {
    silent: true,
  });
}

module.exports = {
  getBranches,
  deleteBranches,
};
