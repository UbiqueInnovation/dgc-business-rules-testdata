HTML_DOWNLOAD=tmp/html-from-own.html
curl -X GET --header "Accept: text/html" "https://unshit.nl/?shit=https://verifier-api.coronacheck.nl/v4/dcbs/business_rules" > $HTML_DOWNLOAD
xmllint --html --xpath "//html/body/pre/text()" $HTML_DOWNLOAD > tmp/all-rules.json
#rm $HTML_DOWNLOAD

# FIXME  xmllint has a problem with the '<' and '>' characters in the JSON in the <pre>
# TODO  all-rules.json has ASCII encoding, with \u<hex> instead of UTF-8 encoded characters: convert to proper UTF8

