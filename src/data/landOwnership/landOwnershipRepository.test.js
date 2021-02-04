import fs from 'fs';
import path from 'path';
import csvFileHandler from '../../utils/csvFileHandler/csvFileHandler';
import landOwnershipRepository from './landOwnershipRepository';

jest.mock('fs');

describe('LandOwnershipRepository', () => {
  let readCsvFileSpy;
  beforeEach(() => {
    readCsvFileSpy = jest.spyOn(csvFileHandler, 'readCsvFile');
  });
  afterEach(() => {
    readCsvFileSpy.mockRestore();
  });
  describe('load', () => {
    it('should throw an error if the file does not exist', () => {
      const dataPath = path.join(process.cwd(), '/data/land_ownership.csv');
      fs.existsSync.mockReturnValue(false);
      expect(() => landOwnershipRepository.load()).toThrow(
        `Could not locate the file: ${dataPath}`
      );
      expect(landOwnershipRepository.data).toEqual([]);
    });

    it('should have empty data when file has no records', () => {
      fs.existsSync.mockReturnValue(true);
      csvFileHandler.readCsvFile.mockReturnValue([]);
      landOwnershipRepository.load();
      expect(readCsvFileSpy).toHaveBeenCalledTimes(1);
      expect(landOwnershipRepository.data).toEqual([]);
    });

    it('should have load data from file contents', () => {
      fs.existsSync.mockReturnValue(true);
      readCsvFileSpy.mockReturnValue(['T54343,C4012', 'T8871,C4012,']);
      landOwnershipRepository.load();
      expect(readCsvFileSpy).toHaveBeenCalledTimes(1);
      expect(landOwnershipRepository.data).toEqual([
        {
          id: 'T54343',
          companyId: 'C4012',
        },
        {
          id: 'T8871',
          companyId: 'C4012',
        },
      ]);
    });
  });
});
