import program from 'commander';

const ArgsUtils = () => ({
  extractOptions(args) {
    let result = {};
    if (args) {
      program
        .version('0.0.1')
        .option('-m, --mode <type>', 'DefaultMode')
        .parse(args);
      result = program.opts();
    }
    return result;
  },
});

export default ArgsUtils();
