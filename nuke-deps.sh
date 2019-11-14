#!/bin/bash

# Stop cached listeners
watchman watch-del-all

# Remove installed modules
rm -rf node_modules

# Remove HTML README file
rm -rf README.html

# #  Update node with brew
# brew upgrade node

# Remove yarn meta files
# rm yarn*

# Install only fresh copies
# yarn cache clean

# yarn

npm cache clean

# npm update -g
# npm upgrade

npm install

# Kill any other instance of the packager
lsof -ti:8081 | xargs kill

# Restart the thing
# npm start --reset-cache

expo r -c