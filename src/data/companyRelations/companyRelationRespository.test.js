import fs from 'fs';
import path from 'path';
import csvFileHandler from '../../utils/csvFileHandler/csvFileHandler';
import companyRelationRepository from './companyRelationRepository';

jest.mock('fs');

describe('CompanyRelationRepository', () => {
  let readCsvFileSpy;
  beforeEach(() => {
    readCsvFileSpy = jest.spyOn(csvFileHandler, 'readCsvFile');
  });
  afterEach(() => {
    readCsvFileSpy.mockRestore();
  });
  describe('load', () => {
    it('should throw an error if the file does not exist', () => {
      const dataPath = path.join(process.cwd(), '/data/company_relations.csv');
      fs.existsSync.mockReturnValue(false);
      expect(() => companyRelationRepository.load()).toThrow(
        `Could not locate the file: ${dataPath}`
      );
      expect(companyRelationRepository.data).toEqual([]);
    });

    it('should have empty data when file has no records', () => {
      fs.existsSync.mockReturnValue(true);
      csvFileHandler.readCsvFile.mockReturnValue([]);
      companyRelationRepository.load();
      expect(readCsvFileSpy).toHaveBeenCalledTimes(1);
      expect(companyRelationRepository.data).toEqual([]);
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
      expect(companyRelationRepository.data).toEqual([
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
  });
});
