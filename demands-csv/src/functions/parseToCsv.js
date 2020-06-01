const { parse } = require('json2csv');

function parseToCsv(demands) {
  const fields = [];

  demands.forEach((demand) => {
    const demandFields = Object.keys(demand);

    demandFields.forEach((column) => {
      if (!fields.includes(column)) fields.push(column);
    });
  });

  const csv = parse(demands, fields);

  return csv;
}

module.exports = parseToCsv;
