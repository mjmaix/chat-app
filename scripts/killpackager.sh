#!/bin/bash
echo "💣 Killing Packager on port 8081."
lsof -n -i4TCP:8081 | sed '1 d' | awk '{print $2}' | xargs kill -9
