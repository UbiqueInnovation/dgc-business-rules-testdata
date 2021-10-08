cat tmp/all-rules.json | jq 'map((.Identifier|capture("(?<t>[A-Z]+)-(?<c>[A-Z]+)-(?<n>[0-9]+)")) + .)' > tmp/all-rules-exploded-IDs.json
