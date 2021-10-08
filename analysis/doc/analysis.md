# Analysis


## Download all uploaded rules

Run `src/download-from-NL-backend.sh` to produce a file `tmp/all-rules.json`.
Subsequent analysis is done through the use of the [`jq` tool](https://stedolan.github.io/jq/), or [Node.js](https://nodejs.org/en/).


## Extracting all rules (including dissected identifiers)

    $ cat tmp/all-rules.json | jq 'map((.Identifier|capture("(?<t>[A-Z]+)-(?<c>[A-Z]+)-(?<n>[0-9]+)")) + .)' > tmp/all-rules-exploded-IDs.json

This results in a file `all-rules-exploded-IDs.json` looking as follows:

```json
[
  {
    "t": "TR",
    "c": "DE",
    "n": "0003",
    "Identifier": "TR-DE-0003",
    "Type": "Acceptance",
    "Country": "DE",
    "Version": "1.0.0",
    "SchemaVersion": "1.0.0",
    "Engine": "CERTLOGIC",
    "EngineVersion": "0.7.5",
    "CertificateType": "Test",
    "Description": [
      {
        "lang": "en",
        "desc": "The sample for an NAA test (e.g., PCR) must have been taken no longer than 72 hours ago."
      },
      ...
    ],
    "ValidFrom": "2021-07-03T00:00:00Z",
    "ValidTo": "2030-06-01T00:00:00Z",
    "AffectedFields": [
      "t.0",
      "t.0.sc",
      "t.0.tt"
    ],
    "Logic": {
      "if": [
        {
          "var": "payload.t.0"
        },
      ...
    }
  },
  ...
]
```

The `t`, `c`, and `n` forms the dissection of the rule's original identifier.

The command above can also be run as:

    $ ./src/process-downloaded-rules.sh


## Which member states have uploaded rules?

    $ cat tmp/all-rules-exploded-IDs.json | jq 'map(.c) | unique'

results in:

```json
[
  "AL",
  "CH",
  "DE",
  "EE",
  "ES",
  "FR",
  "IE",
  "LT",
  "LU",
  "NL",
  "RO",
  "SI",
  "UA"
]
```

meaning: Albania, Switzerland, Germany, Estonia, Spain, France, Ireland, Lithuania, Luxembourg, the Netherlands, Romania, Slovenia, Ukraine - 13 in total


## Grouping rules per member state

    $ cat tmp/all-rules-exploded-IDs.json | jq 'group_by(.c)`

results in an array of arrays.


## Rules per member state

    $ cat tmp/all-rules-exploded-IDs.json | jq 'group_by(.c) | map({ co: .[0].c, rules: (map(.Identifier) | sort) })'

Executing the following

    $ node src/split-rules.json

yields per member state a directory within `per-country/` with all their rules in separate files, with file names of the following form

    `<rule type: GR|RR|TR|VR>-<rule sequence number (4 digits).json`

That structure allows for easy comparison between rule sets.


## Number of rules per member state

    $ cat tmp/all-rules-exploded-IDs.json | jq 'group_by(.c) | map({ co: .[0].c, nRules: .|length })'

results in:

| Member State | #Rules | Comments |
|---|---:|---|
| Albania | 9 |
| Switzerland | 20 |
| Germany | 11 |
| Spain | 10 |
| France | 17 |
| Ireland | 16 |
| Lithuania | 14 |
| Luxembourg | 10 |
| the Netherlands | 16 |
| Romania | 7 |
| Slovakia | 11 |
| Ukraine | 16 |


## EU template/recommended rules

Executing

    $ node src/copy-EU-rules.js

yields a directory `EU/` with the same structure as for the other member states after running `split-rules.json`.


## Validity ranges

    $ cat tmp/all-rules-exploded-IDs.json | jq 'map(.ValidTo) | sort | unique'

yields:

```json
[
  "2022-07-09T00:00:00Z",
  "2022-09-01T00:00:00Z",
  "2023-07-04T00:00:00Z",
  "2030-06-01T00:00:00Z",
  "2030-08-08T00:00:00Z",
  "2030-09-06T00:00:00Z",
  "2030-09-20T00:00:00Z",
  "2031-01-01T00:00:00Z"
]
```

    $ cat tmp/all-rules-exploded-IDs.json | jq 'map(.ValidFrom) | sort | unique'

yields:

```json
[
  "2021-07-03T00:00:00Z",
  "2021-07-04T15:00:00Z",
  "2021-07-05T00:00:00Z",
  "2021-07-09T12:00:00Z",
  "2021-07-12T00:00:00Z",
  "2021-07-16T12:00:00Z",
  "2021-07-17T08:00:00Z",
  "2021-07-30T00:00:00Z",
  "2021-08-05T00:00:00Z",
  "2021-08-08T00:00:00Z",
  "2021-08-10T00:00:00Z",
  "2021-08-13T00:00:00Z",
  "2021-08-14T00:00:00+02:00",
  "2021-08-19T00:00:00+02:00",
  "2021-08-22T10:00:00Z",
  "2021-09-03T00:00:00Z",
  "2021-09-06T00:00:00Z",
  "2021-09-16T00:00:00+02:00",
  "2021-09-17T12:00:00Z",
  "2021-09-19T18:30:00Z",
  "2021-09-20T00:00:00Z",
  "2021-09-24T19:00:00Z",
  "2021-09-26T00:00:00Z",
  "2021-09-30T12:00:00Z",
  "2021-10-03T00:00:00Z"
]
```

Conclusion: the downloaded rules are pre-filtered for validity - as one'd expect.

