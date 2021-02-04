import argsUtils from '../utils/argsUtils/argsUtils';

const Processor = () => ({
  start() {
    const cliOptions = argsUtils.extractOptions(process.argv);
    console.log(`Processor.start: ${JSON.stringify(cliOptions)}`);
  },
});

export default Processor();
