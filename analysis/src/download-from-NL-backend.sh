HTML_DOWNLOAD=tmp/html-from-own.html
curl -X GET --header "Accept: text/html" "https://unshit.nl/?shit=https://verifier-api.coronacheck.nl/v4/dcbs/business_rules" > $HTML_DOWNLOAD
node src/extract-pre.js
rm $HTML_DOWNLOAD

# TODO  all-rules.json has ASCII encoding, with \u<hex> instead of UTF-8 encoded characters: convert to proper UTF8

