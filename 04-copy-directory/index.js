const fs = require('fs');
const path = require('path');

let srcDir = path.join('04-copy-directory', 'files');

fs.mkdir(path.join('04-copy-directory', 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
  fs.readdir(srcDir,  'utf-8', (err, files) => {   
    if (err) throw err;
    files.forEach((elem) => {
      fs.copyFile(path.join('04-copy-directory', 'files', elem), path.join('04-copy-directory', 'files-copy', elem), err => {
        if(err) throw err; 
        console.log('File copied successfully');
      });
    });
  });
}); 



  
