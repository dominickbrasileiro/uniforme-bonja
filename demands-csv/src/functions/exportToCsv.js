const path = require('path');
const fs = require('fs');

function exportToCsv(string, config) {
  const filename = config.filename || `${Date.now().toString()}.csv`;
  const output = path.resolve(config.outputPath, filename);

  if (!fs.existsSync(config.outputPath)) {
    fs.mkdirSync(config.outputPath, '0744');
  }

  fs.writeFile(output, string, (err) => {
    if (err) throw err;
  });

  return output;
}

module.exports = exportToCsv;
