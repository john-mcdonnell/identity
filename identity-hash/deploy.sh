#!/bin/sh

./build.sh

mkdir -p test/poms/S
grunt bump compress:${1:-snapshot} nexusDeployer:${1:-snapshot}
