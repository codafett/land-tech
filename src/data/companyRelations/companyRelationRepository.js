import fs from 'fs';
import path from 'path';
import csvFileHandler from '../../utils/csvFileHandler/csvFileHandler';

const CompanyRelationRepository = () => {
  let data = [];
  let loaded = false;

  return {
    load() {
      if (!loaded) {
        const dataPath = path.join(
          process.cwd(),
          '/data/company_relations.csv'
        );
        if (!fs.existsSync(dataPath)) {
          throw new Error(`Could not locate the file: ${dataPath}`);
        }
        try {
          const fileData = csvFileHandler.readCsvFile(dataPath);

          data = fileData.map((line) => {
            const [id, name, parentId] = line.split(',');
            return {
              id,
              name,
              parentId,
            };
          });

          loaded = true;
        } catch (ex) {
          throw new Error(
            'There was an error processing the company_relations file'
          );
        }
      }
    },

    getAll() {
      return data;
    },

    getTopLevelCompanyId(id) {
      const matchingCompany = data.find((company) => company.id === id);
      if (matchingCompany.parentId) {
        return this.getTopLevelCompanyId(matchingCompany.parentId);
      }
      return matchingCompany;
    },

    getCompanyAndChildrenById(id) {
      const matchingCompany = data.find((company) => company.id === id);
      if (matchingCompany) {
        const children = data.filter((company) => company.parentId === id);
        if (children.length) {
          matchingCompany.children = children.map((child) => ({
            ...this.getCompanyAndChildrenById(child.id),
          }));
        }
      }
      return matchingCompany;
    },

    getCompanyTreeById(id) {
      let matchingCompany = data.find((company) => company.id === id);
      if (matchingCompany) {
        let topLevelCompany;
        if (matchingCompany.parentId) {
          topLevelCompany = this.getCompanyTreeById(matchingCompany.parentId);
        } else {
          topLevelCompany = matchingCompany;
        }
        matchingCompany = this.getCompanyAndChildrenById(topLevelCompany.id);
      }
      return matchingCompany;
    },
  };
};

export default CompanyRelationRepository;
