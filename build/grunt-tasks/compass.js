module.exports = function(grunt, data) {

  return {
    watch: {
      options: {
        sassDir: data.assetPath + '/scss',
        cssDir: data.assetPath + '/css',
        imagesDir: data.assetPath + '/img',
        outputStyle: "expanded",
        environment: "development",
        watch: true
      }
    },
    compile: {
      options: {
        sassDir: data.assetPath + '/scss',
        cssDir: data.assetPath + '/css',
        force: true,
        imagesDir: data.assetPath + '/img',
        outputStyle: "compressed",
        watch: false
      }
    }
  };
}