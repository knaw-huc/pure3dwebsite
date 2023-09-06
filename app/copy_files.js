const fs = require("fs-extra");

const myArgs = process.argv.slice(2);
const projct = myArgs[0];

copyFiles()

function copyFiles() {
  console.log('copy');
  //fs.copySync("./"+projct+"/images/", "./"+projct+ +'/_dist/images/');
  //fs.cp("./"+projct+"/images/", "./"+projct+ +'/_dist/images/', { recursive: true }, (err) => {
  fs.cp("./rooswijk/images/", './rooswijk/_dist/images/', { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}