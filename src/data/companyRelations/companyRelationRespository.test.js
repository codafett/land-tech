import fs from 'fs';
import path from 'path';
import csvFileHandler from '../../utils/csvFileHandler/csvFileHandler';
import CompanyRelationRepository from './companyRelationRepository';

jest.mock('fs');

describe('CompanyRelationRepository', () => {
  describe('load', () => {
    let companyRelationRepository;
    let readCsvFileSpy;
    beforeEach(() => {
      companyRelationRepository = CompanyRelationRepository();
      readCsvFileSpy = jest.spyOn(csvFileHandler, 'readCsvFile');
    });
    afterEach(() => {
      readCsvFileSpy.mockRestore();
    });
    it('should throw an error if the file does not exist', () => {
      const dataPath = path.join(process.cwd(), '/data/company_relations.csv');
      fs.existsSync.mockReturnValue(false);
      expect(() => companyRelationRepository.load()).toThrow(
        `Could not locate the file: ${dataPath}`
      );
      expect(companyRelationRepository.getAll()).toEqual([]);
    });

    it('should have empty data when file has no records', () => {
      fs.existsSync.mockReturnValue(true);
      csvFileHandler.readCsvFile.mockReturnValue([]);
      companyRelationRepository.load();
      expect(readCsvFileSpy).toHaveBeenCalledTimes(1);
      expect(companyRelationRepository.getAll()).toEqual([]);
    });

    it('should have load data from file contents', () => {
      fs.existsSync.mockReturnValue(true);
      readCsvFileSpy.mockReturnValue([
        'C100517359149,Leseetan Midlands Group Limited,R764915829891',
        'C101307938502,Cheales lesitech Plc,S100240634395',
        'C4012,J Sainsbury PLC,',
      ]);
      companyRelationRepository.load();
      expect(readCsvFileSpy).toHaveBeenCalledTimes(1);
      expect(companyRelationRepository.getAll()).toEqual([
        {
          id: 'C100517359149',
          name: 'Leseetan Midlands Group Limited',
          parentId: 'R764915829891',
        },
        {
          id: 'C101307938502',
          name: 'Cheales lesitech Plc',
          parentId: 'S100240634395',
        },
        {
          id: 'C4012',
          name: 'J Sainsbury PLC',
          parentId: '',
        },
      ]);
    });

    it('should NOT read the CSV file if load is called for a second time', () => {
      fs.existsSync.mockReturnValue(true);
      readCsvFileSpy.mockReturnValue([
        'C100517359149,Leseetan Midlands Group Limited,R764915829891',
        'C101307938502,Cheales lesitech Plc,S100240634395',
        'C4012,J Sainsbury PLC,',
      ]);
      companyRelationRepository.load();
      companyRelationRepository.load();
      companyRelationRepository.load();
      expect(readCsvFileSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCompanyTreeById', () => {
    let companyRelationRepository;
    let readCsvFileSpy;
    beforeEach(() => {
      readCsvFileSpy = jest.spyOn(csvFileHandler, 'readCsvFile');
      companyRelationRepository = CompanyRelationRepository();
    });
    afterEach(() => {
      readCsvFileSpy.mockRestore();
    });

    function loadData(data = []) {
      fs.existsSync.mockReturnValue(true);
      readCsvFileSpy.mockReturnValue(data);
      companyRelationRepository.load();
    }

    it('should return undefined when no value passed in', () => {
      const result = companyRelationRepository.getCompanyTreeById();
      expect(result).toBeUndefined();
    });

    it('should return undefined when no data is loaded', () => {
      loadData();
      const result = companyRelationRepository.getCompanyTreeById();
      expect(result).toBeUndefined();
    });

    it('should return undefined when no matching company id found', () => {
      loadData(['C100517359149,Leseetan Midlands Group Limited,R764915829891']);
      const result = companyRelationRepository.getCompanyTreeById('CD11111');
      expect(result).toBeUndefined();
    });

    it('should return matching company', () => {
      loadData(['C100517359149,Leseetan Midlands Group Limited,']);
      const result = companyRelationRepository.getCompanyTreeById(
        'C100517359149'
      );
      expect(result).toEqual({
        id: 'C100517359149',
        name: 'Leseetan Midlands Group Limited',
        parentId: '',
      });
    });

    it('should return matching company and parent', () => {
      loadData(['C100,Company 1,', 'C101,Company 2,C100']);
      const result = companyRelationRepository.getCompanyTreeById('C101');
      expect(result).toEqual({
        id: 'C100',
        name: 'Company 1',
        parentId: '',
        children: [
          {
            id: 'C101',
            name: 'Company 2',
            parentId: 'C100',
          },
        ],
      });
    });

    it('should return matching company, parent and children', () => {
      loadData([
        'C100,Company 1,',
        'C101,Company 2,C100',
        'C102,Company 3,C101',
        'C103,Company 4,C101',
        'C104,Company 5,C103',
      ]);
      const result = companyRelationRepository.getCompanyTreeById('C101');
      expect(result).toEqual({
        id: 'C100',
        name: 'Company 1',
        parentId: '',
        children: [
          {
            id: 'C101',
            name: 'Company 2',
            parentId: 'C100',
            children: [
              {
                id: 'C102',
                name: 'Company 3',
                parentId: 'C101',
              },
              {
                id: 'C103',
                name: 'Company 4',
                parentId: 'C101',
                children: [
                  {
                    id: 'C104',
                    name: 'Company 5',
                    parentId: 'C103',
                  },
                ],
              },
            ],
          },
        ],
      });
    });
  });
});
