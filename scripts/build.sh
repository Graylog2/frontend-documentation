#!/bin/bash
set -e

ORIGINAL_PATH=$PWD
SERVER_PATH=$(mktemp -d /tmp/server-XXXX)
WEB_PATH="$SERVER_PATH/graylog2-web-interface"

git clone https://github.com/Graylog2/graylog2-server.git "$SERVER_PATH"
cd "$SERVER_PATH"
SERVER_SHA=$(git rev-parse HEAD)
./mvnw -f graylog2-server/pom.xml clean frontend:install-node-and-yarn frontend:yarn

cd graylog2-web-interface

# Ensure commands executed by yarn also use the right node version
export PATH="$WEB_PATH/node:$PATH"

run_yarn() {
	"$WEB_PATH/node/node" "$WEB_PATH/node/yarn/dist/bin/yarn.js" "$@"
}

cd docs
run_yarn install
run_yarn run docs:build

cd "$ORIGINAL_PATH"
git checkout gh-pages
rm -r ./*
cp -r "$SERVER_PATH"/graylog2-web-interface/docs/styleguide/* ./
rm -rf .yarn

NUMBER_CHANGES=$(git status -s | wc -l)
if [[ $NUMBER_CHANGES -gt 0 ]]; then
  git add -A
  git commit -m "Update website to $SERVER_SHA"
  git push origin gh-pages
else
  echo "No changes made, skipping commit"
fi

exit 0

