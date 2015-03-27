module.exports = function(grunt, data) {

  return {
    compile: {
     options: {
        title: 'Project name',  // optional
        message: 'Compile complete', //required
      }
    },
    build: {
     options: {
        title: 'Project name',  // optional
        message: 'Build complete', //required
      }
    }
  };
}