import program from 'commander';

const ArgsUtils = () => ({
  extractOptions(args) {
    program
      .version('0.0.1')
      .option('-m, --mode <type>', 'DefaultMode')
      .parse(args);
    return program.opts();
  },
});

export default ArgsUtils();
