import camelCase from 'lodash/camelCase';

// automatic module registration
const requireModule = require.context('.', false, /\.js$/);
const modules = {};

requireModule.keys().forEach((fileName) => {
  if (fileName === './index.js' || fileName === './dummy.js') {
    return;
  }

  // return formatted data
  const moduleConfig = requireModule(fileName);
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''));
  modules[moduleName] = moduleConfig.default || moduleConfig;
});

export default modules;
