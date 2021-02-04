import argsUtils from '../utils/argsUtils/argsUtils';
import processor from './processor';

describe('Processor', () => {
  describe('start', () => {
    let extractOptionsSpy;
    beforeEach(() => {
      extractOptionsSpy = jest.fn();
      argsUtils.extractOptions = extractOptionsSpy;
    });
    afterEach(() => {
      extractOptionsSpy.mockRestore();
    });
    it('should call argsUtils with process args', () => {
      process.argv = [];
      processor.start();
      expect(extractOptionsSpy).toHaveBeenCalledWith([]);
    });
  });
});
