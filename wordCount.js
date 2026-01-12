const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const words = data.trim().split(/\s+/).length;
  const result = `Total number of words: ${words}`;

  fs.writeFile('output.txt', result, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Word count written to output.txt');
  });
});
