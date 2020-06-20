#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

rm -rf build
npm run-script build && sed -i 'sJ="/J="Jg' build/index.html && node build.js

