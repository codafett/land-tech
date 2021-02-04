import fs from 'fs';
import path from 'path';
import csvFileHandler from '../../utils/csvFileHandler/csvFileHandler';

const LandOwnershipRepository = () => ({
  data: [],

  load() {
    const dataPath = path.join(process.cwd(), '/data/land_ownership.csv');
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Could not locate the file: ${dataPath}`);
    }
    try {
      const fileData = csvFileHandler.readCsvFile(dataPath);

      this.data = fileData.map((line) => {
        const [id, companyId] = line.split(',');
        return {
          id,
          companyId,
        };
      });
    } catch (ex) {
      throw new Error('There was an error processing the land_ownership file');
    }
  },
});

export default LandOwnershipRepository();
