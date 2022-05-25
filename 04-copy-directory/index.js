const fs = require('fs');
const path = require('path');

let srcDir = path.join(__dirname, 'files');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
  fs.readdir(srcDir,  'utf-8', (err, files) => {   
    if (err) throw err;
    files.forEach((elem) => {
      fs.copyFile(path.join(__dirname, 'files', elem), path.join(__dirname, 'files-copy', elem), err => {
        if(err) throw err; 
        console.log('File copied successfully');
      });
    });
  });
}); 



  
