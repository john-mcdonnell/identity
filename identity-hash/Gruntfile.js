module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: true,
        metadata: '',
        regExp: false
      }
    },

    compress: {
      snapshot: {
        options: {
          archive: './<%= pkg.name %>-<%= pkg.version %>-SNAPSHOT.zip',
          mode: 'zip'
        },
        files: [
          {expand: true, src: 'lib/**.js'},
          {expand: true, src: 'node_modules/**'}
        ]
      },
      release: {
        options: {
          archive: './<%= pkg.name %>-<%= pkg.version %>.zip',
          mode: 'zip'
        },
        files: [
          {expand: true, src: 'lib/**.js'},
          {expand: true, src: 'node_modules/**'}
        ]
      },
    },

    nexusDeployer: {
      snapshot: {
        options: {
          groupId: "<%= pkg.name %>-",
          artifactId: "<%= pkg.name %>-",
          version: "1.0.0",
          classifier: 'SNAPSHOT',
          packaging: 'zip',
          auth: {
            username: 'admin',
            password: 'admin123'
          },
          url: 'http://localhost:9220/nexus/content/repositories/snapshots',
          artifact: '<%= pkg.name %>-<%= pkg.version %>-SNAPSHOT.zip',
          noproxy: 'localhost',
          cwd: ''
        }
      },
      release: {
        options: {
          groupId: "<%= pkg.name %>-",
          artifactId: "<%= pkg.name %>-",
          version: "1.0.0",
          packaging: 'zip',
          auth: {
            username: 'admin',
            password: 'admin123'
          },
          url: 'http://localhost:9220/nexus/content/repositories/releases',
          artifact: '<%= pkg.name %>-<%= pkg.version %>.zip',
          noproxy: 'localhost',
          cwd: ''
        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('nexus-deployer');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', ['bump', 'compress', 'nexusDeployer:snapshot']);
};
