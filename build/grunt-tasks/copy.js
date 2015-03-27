module.exports = function(grunt, data) {

  return {
    /*cleanLocale: {
      src: 'src/asset/core/locales/en.xtb',
      dest: 'src/asset/core/locales/en.xtb',
      options: {
        process: function( content, srcpath ) {
          // Workaround through current closure compiler bug:
          // see: https://groups.google.com/forum/#!topic/closure-library-discuss/6wN7yu1nPvY
          return content.replace(/<translation .*?key="MSG_MONTH_AND_YEAR".*?>.*?<\/translation>/gmi, '');
        }
      }
    },
    index: {
      src: data.srcPath + '/index.html',
      dest: 'app-phonegap/www/index.html',
      options: {
        process: function(content, srcpath) {
          if (!grunt.option('buildVersion'))
          {
            grunt.fail.fatal('buildVersion parameter is not defined.');
          }

          content = content.replace('{{Version}}',
            grunt.option('buildVersion'));
          return content;
        }
      }
    },
    main: {
      files: [
        {expand: true, cwd: 'src/asset/core/css', src: ['**'], dest: 'app-phonegap/www/asset/core/css'},
        {expand: true, cwd: 'src/asset/core/js-min/en', src: ['app.js'], dest: 'app-phonegap/www/asset/core/js-min/en'},
        {expand: true, cwd: 'src/asset/core/img', src: ['**'], dest: 'app-phonegap/www/asset/core/img'},
        {expand: true, cwd: 'src/asset/core/font', src: ['**'], dest: 'app-phonegap/www/asset/core/font'},
        {expand: true, cwd: 'src/asset/core/mock', src: ['**'], dest: 'app-phonegap/www/asset/core/mock'},
        {expand: true, cwd: 'src/asset/core/video', src: ['**'], dest: 'app-phonegap/www/asset/core/video'},
        {expand: true, cwd: 'src/asset/third-party', src: ['**'], dest: 'app-phonegap/www/asset/third-party'}
      ]
    }*/
  };
}