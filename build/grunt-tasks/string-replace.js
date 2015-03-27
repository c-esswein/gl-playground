module.exports = function(grunt, data) {
  return {
    options: {
      replacements: [
        {
          pattern: /@VERSION/ig,
          replacement: '<%= grunt.option("buildNumber") %>'
        }
      ]
    },
    all: {
      files: {
        'build/': [
          data.distPath + '/*.html'
        ]
      }
    }
  }
};