#!/bin/sh

npm install grunt --global
npm install jshint --global
npm install fixpack --global
npm install grunt --save-exact --save-dev
npm install grunt-contrib-compress --save-exact --save-dev
npm install grunt-contrib-jshint --save-exact --save-dev
npm install nexus-deployer --save-exact --save-dev
npm install grunt-bump --save-dev

./tidy.sh