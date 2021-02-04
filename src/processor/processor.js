import argsUtils from '../utils/argsUtils/argsUtils';

const Processor = () => ({
  start() {
    const cliOptions = argsUtils.extractOptions(process.argv);
    if (!cliOptions || !Object.keys(cliOptions).length) {
      // No options supplied
      throw new Error('No options provided');
    }
  },
});

export default Processor();
