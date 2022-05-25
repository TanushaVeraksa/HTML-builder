const fs = require('fs').promises;
const path = require('path');

let pathFiles = path.join(__dirname, 'files');
const pathFilesCopy = path.join(__dirname, 'files-copy');


function copyDir(source, target) {
  fs.mkdir(target)
    .then(async () => {
      const files = await fs.readdir(source, { withFileTypes: true });
      files.forEach(async (file) => {
        const pathS = path.join(source, file.name);
        const pathT = path.join(target, file.name);
        if (file.isDirectory()) {
          copyDir(pathS, pathT);
        } else {
          await fs.copyFile(pathS, pathT);
        }
      });
    });
}

copyDir(pathFiles, pathFilesCopy);




  
