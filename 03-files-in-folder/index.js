const fs = require('fs');
const path = require('path');

fs.readdir(path.join('03-files-in-folder', 'secret-folder'),  'utf-8', (err, files) => {
  if (err) throw err;
  files.forEach((file)=> {
    fs.stat(path.join('03-files-in-folder', 'secret-folder', file), (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      if(stats.isFile()) {
        const fileInfo = file.split('.');
        console.log(fileInfo[0], '-', fileInfo[1], '-', stats.size/1000+'kb');
      }
    });
  });
});

  
