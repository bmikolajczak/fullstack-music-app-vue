import _ from 'lodash';

export default {
  install(app) {
    const baseComponents = require.context(
      '../components/base/', false, /[A-Za-z0-9-_,\s]+\.vue$/i,
    );

    // keys() return arr of files found bas on arguments above
    baseComponents.keys().forEach((fileName) => {
      const componentConfig = baseComponents(fileName);
      const componentName = _.upperFirst(
        _.camelCase(fileName.replace(/^\.\//, '').replace(/\.w+$/, '')),
      );

      app.component(`Base${componentName}`, componentConfig.default || componentConfig);
    });
  },
};
