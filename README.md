# node-elastic-query-builder
Very simple search query builder for private purpose

## Install

Install with [npm](https://www.npmjs.com/package/elastic-query-builder)

```bash
npm install --save elastic-query-builder
```

## Example

```js
"use strict";

'use strict'
import QueryBuilder from 'elastic-query-builder'

let qb = new QueryBuilder('myindex', 'mytype')
qb.addMustTerm('user_id', 1)
qb.addMustNotTerm('deleted', true)
qb.addShouldTerm('type', 'sample-type')
qb.addMustQueryString(['title', 'desc'], '*hello*')
qb.addTermsAgg('category_count', 'category_id')
qb.setLimit(10)
qb.setOffset(0)
qb.addSort('id', 'desc')
let query = qb.build()

console.log(JSON.stringify(query, false, 4))
```
### Output
```json
{
    "index": "myindex",
    "type": "mytype",
    "body": {
        "sort": [
            {
                "id": {
                    "order": "desc"
                }
            }
        ],
        "size": 10,
        "from": 0,
        "query": {
            "filtered": {
                "filter": {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "user_id": 1
                                }
                            },
                            {
                                "query_string": {
                                    "fields": [
                                        "title",
                                        "desc"
                                    ],
                                    "query": "*hello*"
                                }
                            }
                        ],
                        "must_not": [
                            {
                                "term": {
                                    "deleted": true
                                }
                            }
                        ],
                        "should": [
                            {
                                "term": {
                                    "type": "sample-type"
                                }
                            }
                        ]
                    }
                }
            }
        },
        "aggs": {
            "category_count": {
                "terms": {
                    "field": "category_id"
                }
            }
        }
    }
}

```

### Tests
```bash
$ npm test
```
