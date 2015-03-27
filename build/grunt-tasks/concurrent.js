module.exports = function(grunt, data) {

  return {
    options: {
      logConcurrentOutput: true
    },

    watch: {
      tasks: ["compass:watch", "exec:closureWatch"]
    }
  };
}
