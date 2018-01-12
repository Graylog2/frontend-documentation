#!/bin/bash
set -e

ORIGINAL_PATH=$PWD
SERVER_PATH=/tmp/server

git clone git://github.com/Graylog2/graylog2-server.git $SERVER_PATH
cd $SERVER_PATH
mvn -f graylog2-server/pom.xml clean frontend:install-node-and-yarn frontend:yarn

cd graylog2-web-interface

# Ensure commands executed by yarn also use the right node version
export PATH=$PWD/node:$PATH
node ./node/yarn/dist/bin/yarn.js run docs:build

cd $ORIGINAL_PATH
git checkout gh-pages
cp -r $SERVER_PATH/graylog2-web-interface/docs/styleguide/* ./
git add -A
git commit -m "Update website"
git push origin gh-pages

exit 0

