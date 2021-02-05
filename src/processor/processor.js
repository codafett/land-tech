import aggregator from '../aggregator/aggregator';
import CompanyRelationRepository from '../data/companyRelations/companyRelationRepository';
import LandOwnershipRepository from '../data/landOwnership/landOwnershipRepository';
import argsUtils from '../utils/argsUtils/argsUtils';
import logger from '../utils/logger/logger';

const Processor = () => ({
  start() {
    const cliOptions = argsUtils.extractOptions(process.argv);
    if (!cliOptions || !Object.keys(cliOptions).length) {
      // No options supplied
      throw new Error('No options provided');
    }

    const companyRelationRepository = CompanyRelationRepository();
    companyRelationRepository.load();
    const landOwnershipRepository = LandOwnershipRepository();
    landOwnershipRepository.load();

    if (cliOptions.mode === 'from_root') {
      const companyData = companyRelationRepository.getCompanyTreeById(
        cliOptions.companyId
      );
      if (companyData && Object.keys(companyData).length) {
        const landParcelData = aggregator.getCompanyTreeLandAggregation(
          companyData,
          landOwnershipRepository
        );
        logger.logLandParcelData(landParcelData);
      }
    } else {
      throw new Error('Unrecognised mode provided');
    }
  },
});

export default Processor();
