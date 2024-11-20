function readPackage(packageJson, context) {

    if (packageJson.name === 'vue-server-renderer') {
      packageJson.dependencies['webpack'] = '^4.0.0';
    }
    return packageJson;
  }
  module.exports = {
    hooks: {
      readPackage
    }
  }