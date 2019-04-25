#!/bin/bash
DIRECTORY="node_modules/react-native"
if [ -d "$DIRECTORY" ]; then
  echo "Running gradle clean"
  cd ./android/
  ./gradlew clean
  echo "Finished cleaning up android"
fi