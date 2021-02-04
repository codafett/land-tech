import argsUtils from './argsUtils';

describe('ArgsUtils', () => {
  describe('extractOptions', () => {
    it('should return empty object when no process args', () => {
      expect(argsUtils.extractOptions()).toEqual({});
    });
    it("should return completed object when [,,'--mode=found'] passed as args", () => {
      expect(
        argsUtils.extractOptions([undefined, undefined, '--mode=found'])
      ).toEqual({ mode: 'found' });
    });
  });
});
