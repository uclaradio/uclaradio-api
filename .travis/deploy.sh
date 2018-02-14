#!/bin/bash

eval "$(ssh-agent -s)"
chmod 600 .travis/deploy.key
ssh-add .travis/deploy.key
ssh-keyscan 192.241.200.33 >> ~/.ssh/known_hosts

if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  git remote add dokku dokku@192.241.200.33:api.uclaradio.com
elif [[ "$TRAVIS_BRANCH" == "staging" ]]; then
  git remote add dokku dokku@192.241.200.33:staginig-api.uclaradio.com
fi

git config --global push.default simple

if [[ $TRAVIS_BRANCH == "master" ]]; then
  git push dokku master;
elif [[ $TRAVIS_BRANCH == "staging" ]]; then
  git push dokku staging:master
fi
