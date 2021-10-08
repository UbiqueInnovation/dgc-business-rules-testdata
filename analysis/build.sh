HTML_DOWNLOAD=tmp/html-from-own.html
curl -X GET --header "Accept: text/html" "https://unshit.nl/?shit=https://verifier-api.coronacheck.nl/v4/dcbs/business_rules" > $HTML_DOWNLOAD
node src/extract-pre.js
rm $HTML_DOWNLOAD

# TODO  all-rules.json has ASCII encoding, with \u<hex> instead of UTF-8 encoded characters: convert to proper UTF8

cat tmp/all-rules.json | jq 'map((.Identifier|capture("(?<t>[A-Z]+)-(?<c>[A-Z]+)-(?<n>[0-9]+)")) + .)' > tmp/all-rules-exploded-IDs.json
rm -rf per-country/*
node src/split-rules.js
node src/copy-EU-rules.js

