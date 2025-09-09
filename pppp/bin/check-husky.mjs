import { exec } from "child_process";

/* global process */ //required for eslint to allow process.env
if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
  console.log("(check-husky.mjs) skipping husky in CI build");
  process.exit(0);
}

const command = `sh -c 'cd .. && node .husky/install.mjs'`;
exec(command, (error, stdout, stderr) => {
  console.log("(check-husky.mjs) check-husky results: ", stdout);
  if (error || stderr) {
    console.error(
      `(check-husky.mjs) Husky install execution error: ${error.message ? error.message : stderr}`
    );
    process.exit(1);
  }
});
