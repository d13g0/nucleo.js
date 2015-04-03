#!/bin/bash
echo "Building Nucleo.js"
sh ./build.sh
echo "Copying lib to tutorials"
sh ./update_tutorials.sh
echo "DONE"
