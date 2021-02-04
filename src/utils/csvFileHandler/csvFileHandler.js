import fs from 'fs';

const CsvUtils = () => ({
  readCsvFile(fileLocation) {
    return fs.readFileSync(fileLocation, 'utf8').split('\n').slice(1);
  },
});

export default CsvUtils();
