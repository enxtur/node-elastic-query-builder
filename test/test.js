import assert from 'assert'
import QueryBuilder from '../src/query_builder'
describe('QueryBuilder', function () {
  let qb = new QueryBuilder('myindex', 'mytype')
  qb.addMustTerm('user_id', 1)
  qb.addMustNotTerm('deleted', true)
  qb.addShouldTerm('type', 'sample-type')
  qb.addMustQueryString(['title', 'desc'], '*hello*')
  qb.addTermsAgg('category_count', 'category_id', {size: 100})
  qb.setLimit(10)
  qb.setPage(0)
  qb.addSort('id', 'desc')
  let query = qb.build()
  it('it should generate query without error', function () {
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
    }, Error)
  })
})
