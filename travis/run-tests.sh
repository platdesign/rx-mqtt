#!/bin/sh

set -e

cd $TRAVIS_BUILD_DIR

mosquitto -d

npm install
npm test
