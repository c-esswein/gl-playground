module.exports = function(grunt, data) {

  return {

    closureWatch: {
      cwd: "build",
      command: "java -jar plovr.jar serve plovr-config.json",
      stdout: true,
      stderror: true
    },

    closureBuild: {
      cwd: "build",
      command: "java -jar plovr.jar build plovr-config.json",
      stdout: true,
      stderror: true,
      exitCode: 0
    },

    seleniumWatch: {
      cwd: "build",
      command: "java -jar selenium-server-standalone-2.43.0.jar",
      stdout: true,
      stderror: true
    }
  };
}