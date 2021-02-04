import fs from 'fs';
import path from 'path';
import csvFileHandler from '../../utils/csvFileHandler/csvFileHandler';

const CompanyRelationRepository = () => ({
  data: [],

  load() {
    const dataPath = path.join(process.cwd(), '/data/company_relations.csv');
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Could not locate the file: ${dataPath}`);
    }
    try {
      const fileData = csvFileHandler.readCsvFile(dataPath);

      this.data = fileData.map((line) => {
        const [id, name, parentId] = line.split(',');
        return {
          id,
          name,
          parentId,
        };
      });
    } catch (ex) {
      throw new Error(
        'There was an error processing the company_relations file'
      );
    }
  },
});

export default CompanyRelationRepository();
