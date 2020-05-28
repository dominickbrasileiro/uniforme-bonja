function parseToCsv(demands) {
  const columns = [];
  const rows = [];

  demands.forEach((demand) => {
    const demandColumns = Object.keys(demand);

    demandColumns.forEach((column) => {
      if (!columns.includes(column)) columns.push(column);
    });

    const demandRow = Object.values(demand).join(',');
    rows.push(demandRow);
  });

  const csv = [];
  csv.push(columns.join(','), '\n');
  csv.push(rows.join('\n'));

  return csv.join('');
}

module.exports = parseToCsv;
