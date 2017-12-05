#!/bin/sh

RELEASE_TYPE=${1:-snapshot}

./build.sh

mkdir -p test/poms/S
grunt bump
grunt compress:$RELEASE_TYPE nexusDeployer:$RELEASE_TYPE
