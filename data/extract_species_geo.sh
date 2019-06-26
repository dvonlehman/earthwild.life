#!/bin/bash

cat mammals.geojson | grep "\"id_no\": $1" | head -n 1 | rev | cut -c 2- | rev | jq . > "$1.geojson"
