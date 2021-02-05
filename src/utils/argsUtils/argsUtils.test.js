import argsUtils from './argsUtils';

describe('ArgsUtils', () => {
  describe('extractOptions', () => {
    it('should return empty object when no process args', () => {
      expect(argsUtils.extractOptions()).toEqual({});
    });
    it('should extract mode from args passed in', () => {
      expect(
        argsUtils.extractOptions([undefined, undefined, '--mode=found'])
      ).toEqual({ mode: 'found', companyId: undefined });
    });
    it('should extract mode and company Id', () => {
      expect(
        argsUtils.extractOptions([undefined, undefined, '--mode=found', 'C101'])
      ).toEqual({ mode: 'found', companyId: 'C101' });
    });
  });
});
