const path = require('path');
const fsp = require('fs').promises;
const fs = require('fs');

const pathProj = path.join(__dirname, 'project-dist');
const pathTemplate = path.join(__dirname, 'template.html');
const pathComponents = path.join(__dirname, 'components');
const pathIndex = path.join(pathProj, 'index.html');
const pathStyle = path.join(__dirname, 'styles');
const pathAssets = path.join(__dirname, 'assets');
const pathAssetsProj = path.join(pathProj, 'assets');

fs.mkdir(pathProj, { recursive: true }, (err) => {
  if (err) throw err;
});

async function replaceContent() {
  const filesComponent = await fsp.readdir(pathComponents);
  const filesComponentHTML = [...filesComponent].filter((elem)=> path.extname(elem) == '.html');
  const contents = [];

  for(let file of filesComponentHTML) {
    const fileName = file.split('.');
    const readFileComponent = await fsp.readFile(pathComponents + '/' + file); 
    contents.push({fileName: fileName[0], data: readFileComponent});
  }
  let readFileTemplate = await fsp.readFile(pathTemplate, 'utf-8');

  for(let content of contents) {
    readFileTemplate = readFileTemplate.split(`{{${content.fileName}}}`);
    if (readFileTemplate.length > 1) {
      readFileTemplate = readFileTemplate.join(content.data);
    }
  }

  fs.writeFile(pathIndex, readFileTemplate, 'utf8', err => {
    if(err) throw err; 
  });

}

async function bundleCss() {
  const filesStyles = await fsp.readdir(pathStyle);
  const filesCss = [...filesStyles].filter((elem)=> path.extname(elem) == '.css');
  fs.writeFile(pathProj + '/' + 'style.css', '', (err) => {if (err) throw err;});
  filesCss.forEach(async(file) => {
    const readCssFiles = await fsp.readFile(pathStyle + '/' + file, 'utf-8');
    fs.appendFile(pathProj + '/' + 'style.css', '\n' + readCssFiles, (err) => {
      if(err) throw err; 
    });
  });
}

function copyDir(source, target) {
  fsp.mkdir(target)
    .then(async () => {
      const files = await fsp.readdir(source, { withFileTypes: true });
      files.forEach(async (file) => {
        const pathS = path.join(source, file.name);
        const pathT = path.join(target, file.name);
        if (file.isDirectory()) {
          copyDir(pathS, pathT);
        } else {
          await fsp.copyFile(pathS, pathT);
        }
      });
    });
}

replaceContent();
bundleCss();
copyDir(pathAssets, pathAssetsProj);



