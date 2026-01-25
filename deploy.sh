#!/bin/bash 
echo "Process to pull project and build"
echo "Start to get new content ..." 

if ! git pull; then
  echo "✗ git pull failed"
  exit 1
fi
echo "✓ git pull success"

echo "Start to build the new content"
cd ./front || exit 1

if ! bun run build; then
  echo "✗ build failed"
  exit 1
fi
echo "✓ build success"

echo "Finish to build project. The new version is online"