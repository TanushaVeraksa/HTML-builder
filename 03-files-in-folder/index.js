const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'),  'utf-8', (err, files) => {
  if (err) throw err;
  files.forEach((file)=> {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      if(stats.isFile()) {
        const fileInfo = file.split('.');
        console.log(fileInfo[0], '-', fileInfo[1], '-', stats.size +' byte');
      }
    });
  });
});

  
