const Aggregator = () => ({
  getCompanyTreeLandAggregation(companyData, landOwnershipRepository) {
    let result = {};
    if (companyData) {
      let childResults;
      if (companyData.children && companyData.children.length) {
        childResults = companyData.children.map((childCompany) =>
          this.getCompanyTreeLandAggregation(
            childCompany,
            landOwnershipRepository
          )
        );
      }
      let count = landOwnershipRepository.countOfParcelsForCompanyId(
        companyData.id
      );
      if (childResults) {
        count += childResults.reduce(
          (childParcelCount, child) =>
            childParcelCount + (child.landParcelCount || 0),
          0
        );
      }
      result = {
        ...companyData,
        children: childResults,
        landParcelCount: count || 0,
      };
    }
    return result;
  },
});

export default Aggregator();
