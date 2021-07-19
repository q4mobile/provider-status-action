#!/bin/sh

git tag -d develop
git tag -a -m "Updateing dev version" develop
git push --follow-tags