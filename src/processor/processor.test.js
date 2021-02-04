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
    it('should THROW No Options Provided when argsUtils returns an empty object', () => {
      extractOptionsSpy.mockReturnValue({});
      expect(() => processor.start()).toThrow('No options provided');
    });
  });
});
