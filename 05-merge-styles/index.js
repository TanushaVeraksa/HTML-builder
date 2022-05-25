const fs = require('fs');
const path = require('path');

let srcDir = path.join(__dirname, 'styles');
let prjDir = path.join(__dirname, 'project-dist');

fs.writeFile(path.format({dir: prjDir, base: 'bundle.css'}), '', 'utf8', err => {
  if(err) throw err; 
});

fs.readdir(srcDir,  'utf-8', (err, files) => {   
  if (err) throw err;
  let filesCss = [...files].filter((elem)=> path.extname(elem) == '.css');

  filesCss.forEach((elem) => {
    const stream = fs.createReadStream(path.join(__dirname, 'styles', elem));
    stream.on('data', (data) => {
      fs.appendFile('05-merge-styles/project-dist/bundle.css', '\n' + data, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Done');
      });
    });
  });
});
