import assert from 'assert'
import QueryBuilder from '../src/query_builder'
describe('QueryBuilder', function () {
  let qb = new QueryBuilder('myindex', 'mytype')
    .addShouldTerm('type', 'sample-type')
    .addMustTerm('user_id', 1)
    .addMustNotTerm('deleted', true)
    .addMustQueryString(['title', 'desc'], '*hello*')
    .addMustRange('price', {
      gte: 10,
      lte: 100
    })
    .addTermsAgg('category_count', 'category_id', {size: 100})
    .setLimit(10)
    .setPage(0)
    .addSort('id', 'desc')
  let query = qb.build()
  it('it should generate query without error', function () {
    console.log(JSON.stringify(query, false, 4))
    assert.doesNotThrow(() => {
      let {
        index,
        type,
        body: {
          sort: [{
            id: {
              order
            }
          }],
          query: {
            filtered: {
              filter: {
                bool: {
                  must: [{
                    term: {
                      user_id: userId
                    }
                  }, {
                    query_string: {
                      fields: [title, desc]
                    }
                  }, {
                    range: {
                      price: {
                        gte,
                        lte
                      }
                    }
                  }],
                  must_not: [{
                    term: {
                      deleted
                    }
                  }],
                  should: [{
                    term: {
                      type: filterType
                    }
                  }]
                }
              }
            }
          },
          aggs: {
            category_count: {
              terms: {
                field,
                size
              }
            }
          }
        }
      } = query
      assert.equal(index, 'myindex')
      assert.equal(type, 'mytype')
      assert.equal(order, 'desc')
      assert.equal(userId, 1)
      assert.equal(title, 'title')
      assert.equal(desc, 'desc')
      assert(deleted)
      assert.equal(filterType, 'sample-type')
      assert.equal(field, 'category_id')
      assert.equal(size, 100)
      assert.equal(gte, 10)
      assert.equal(lte, 100)
    }, Error)
  })
})
