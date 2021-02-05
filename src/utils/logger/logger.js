/* eslint-disable no-console */
const Logger = () => ({
  logLandParcelData(landParcelData, level = 0) {
    if (landParcelData && Object.keys(landParcelData).length) {
      const prefix = level ? ' - ' : '';
      const fillers = new Array(level).fill(' | ');
      console.log(
        `${fillers.join('')}${prefix} ${landParcelData.id}; ${
          landParcelData.name
        }; owner of ${landParcelData.landParcelCount} land parcels`
      );
      if (landParcelData.children && landParcelData.children.length) {
        landParcelData.children.forEach((child) =>
          this.logLandParcelData(child, level + 1)
        );
      }
    }
  },
});

export default Logger();
