require('dotenv/config');
const getToken = require('./functions/getToken');
const fetchDemands = require('./functions/fetchDemands');
const parseToCsv = require('./functions/parseToCsv');
const exportToCsv = require('./functions/exportToCsv');

class Main {
  constructor() {
    this.getToken = getToken.bind(this);
    this.fetchDemands = fetchDemands.bind(this);
    this.exportToCsv = exportToCsv.bind(this);

    this.config = {
      outputPath: process.env.OUTPUT_PATH,
      filename: process.env.OUTPUT_FILENAME,
    };
  }

  async init() {
    const token = await this.getToken(process.env.API_URL);
    console.log('Token - OK');

    const demands = await this.fetchDemands(process.env.API_URL, token);
    console.log('Demands - OK');

    const csvString = parseToCsv(demands);

    const output = exportToCsv(csvString, this.config);
    console.log(`Output: ${output}`);
  }
}

new Main().init();
