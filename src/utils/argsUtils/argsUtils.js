import program from 'commander';

const ArgsUtils = () => ({
  extractOptions(args) {
    const result = {};
    if (args) {
      program
        .version('0.0.1')
        .option('-m, --mode <type>', 'DefaultMode')
        .parse(args);
      const options = program.opts();
      result.mode = options.mode;
      [result.companyId] = program.args;
    }
    return result;
  },
});

export default ArgsUtils();
