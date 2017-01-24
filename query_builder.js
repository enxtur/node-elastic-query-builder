import { object } from 'underscore'
export class QueryBuilder {
  constructor (index, type) {
    this.index = index
    this.type = type
    this.must = []
    this.must_not = []
    this.should = []
    this.aggs = []
    this.bools = {
      must: this.must,
      must_not: this.must_not,
      should: this.should
    }
    this.limit = 10
    this.offset = 0
    this.sort = []
  }

  build () {
    return {
      index: this.index,
      type: this.type,
      body: {
        sort: this.sort,
        size: this.limit,
        from: this.limit * this.offset,
        query: {
          filtered: {
            filter: {
              bool: {
                must: this.must,
                must_not: this.must_not,
                should: this.should
              }
            }
          }
        },
        aggs: object(this.aggs)
      }
    }
  }

  add (boolType, filterType, field, value) {
    this.bools[boolType].push({
      [filterType]: {
        [field]: value
      }
    })
  }
  addQueryString (boolType, fields, query) {
    this.bools[boolType].push({
      query_string: {fields, query}
    })
  }
  addMust (filterType, field, value) {
    this.add('must', filterType, field, value)
  }
  addMustTerm (field, value) {
    this.addMust('term', field, value)
  }
  addMustQueryString (fields, query) {
    this.addQueryString('must', fields, query)
  }

  addMustNot (filterType, field, value) {
    this.add('must_not', filterType, field, value)
  }
  addMustNotTerm (field, value) {
    this.addMustNot('term', field, value)
  }
  addMustNotQueryString (fields, query) {
    this.addQueryString('must_not', fields, query)
  }

  addShould (filterType, field, value) {
    this.add('should', filterType, field, value)
  }
  addShouldTerm (field, value) {
    this.addShould('term', field, value)
  }
  addShouldQueryString (fields, query) {
    this.addQueryString('must_not', fields, query)
  }

  addAgg (type, name, field) {
    this.aggs.push([name, {
      [type]: {
        field
      }
    }])
  }
  addTermsAgg (name, field) {
    this.addAgg('terms', name, field)
  }
  setLimit (limit) {
    this.limit = limit
  }
  setOffset (offset) {
    this.offset = offset
  }
  setSort (field, order) {
    this.sort = [{
      [field]: {
        order
      }
    }]
  }
  addSort (field, order) {
    this.sort.push({
      [field]: {
        order
      }
    })
  }
}

