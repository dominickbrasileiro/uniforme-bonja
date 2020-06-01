require('dotenv/config');
const getToken = require('./functions/getToken');
const fetchData = require('./functions/fetchData');
const translateToBR = require('./functions/translateToBR');
const parseToCsv = require('./functions/parseToCsv');
const exportToCsv = require('./functions/exportToCsv');

class Main {
  constructor() {
    this.config = {
      dataset: {
        outputPath: 'output',
        filename: 'dataset.csv',
      },

      demands: {
        outputPath: 'output',
        filename: 'demands.csv',
      },
    };
  }

  async init() {
    const token = await getToken(process.env.API_URL);
    console.log('Token - OK');

    const data = await fetchData(process.env.API_URL, token);
    const { dataset, demands } = data;
    console.log('Data - OK');

    const datasetTranslated = translateToBR.dataset(dataset);
    const datasetCsvString = parseToCsv(datasetTranslated);
    console.log('Dataset - OK');

    const demandsTranslated = translateToBR.demands(demands);
    const demandsCsvString = parseToCsv(demandsTranslated);
    console.log('Demands - OK');

    const datasetOutput = exportToCsv(datasetCsvString, this.config.dataset);
    console.log(`Dataset output: ${datasetOutput}`);

    const demandsOutput = exportToCsv(demandsCsvString, this.config.demands);
    console.log(`Demands output: ${demandsOutput}`);
  }
}

new Main().init();
