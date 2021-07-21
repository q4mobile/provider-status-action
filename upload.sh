#!/bin/sh

npm run build
git commit -a -m "${1}"
git tag -a -m "${1}" $2
git push --follow-tags
