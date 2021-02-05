import fs from 'fs';
import path from 'path';
import csvFileHandler from '../../utils/csvFileHandler/csvFileHandler';

const LandOwnershipRepository = () => {
  let loaded = false;
  let data = [];

  return {
    load() {
      if (!loaded) {
        const dataPath = path.join(process.cwd(), '/data/land_ownership.csv');
        if (!fs.existsSync(dataPath)) {
          throw new Error(`Could not locate the file: ${dataPath}`);
        }
        try {
          const fileData = csvFileHandler.readCsvFile(dataPath);

          data = fileData.map((line) => {
            const [id, companyId] = line.split(',');
            return {
              id,
              companyId,
            };
          });

          loaded = true;
        } catch (ex) {
          throw new Error(
            'There was an error processing the land_ownership file'
          );
        }
      }
    },

    getAll() {
      return data;
    },

    countOfParcelsForCompanyId(companyId) {
      return data.filter((land) => land.companyId === companyId).length;
    },
  };
};

export default LandOwnershipRepository;
