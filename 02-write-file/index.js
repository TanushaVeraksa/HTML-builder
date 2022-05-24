const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

let writableStream = fs.createWriteStream(path.join('02-write-file', 'text.txt'));

const rl = readline.createInterface({ input, output });

rl.question('Press Enter for input content in a file (if you want cose input "exit") ', (answer) => {
  if(answer === 'ctrl + c' || answer == 'exit') {
    writableStream.end();
    rl.close();
  } 
  rl.on('line', (input) => {
    if(input == 'ctrl + c' || input == 'exit') {
      writableStream.end();
      rl.close();
    } else {
      writableStream.write(input);
      console.log(`Recorded content in a file: ${input}`);
    }
  });
});

rl.on('close', () => {
  console.log('Process completed');
  process.exit(0);
});



