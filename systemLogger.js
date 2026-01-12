const os = require('os');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'system.log');

setInterval(() => {
  const log = `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU Cores: ${os.cpus().length}
Total Memory: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB
Free Memory: ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB
------------------------------
`;

  fs.appendFile(logFile, log, (err) => {
    if (err) console.error('Error writing log');
    else console.log('System info logged');
  });
}, 5000);
