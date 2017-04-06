import { object } from 'underscore'
export default class QueryBuilder {
  constructor (index, type) {
    this.index = index
    this.type = type
    this.aggs = []
    this.bools = {
      must: [],
      must_not: [],
      should: []
    }
    this.must = this.bools.must
    this.must_not = this.bools.must_not
    this.should = this.bools.should
    this.limit = 10
    this.page = 0
    this.sort = []
  }

  build () {
    let from = this.page * this.limit
    return {
      index: this.index,
      type: this.type,
      body: {
        sort: this.sort,
        size: this.limit,
        from,
        query: {
          filtered: {
            filter: {
              bool: {
                must: Object.assign([], this.must),
                must_not: Object.assign([], this.must_not),
                should: Object.assign([], this.should)
              }
            }
          }
        },
        aggs: Object.assign({}, object(this.aggs))
      }
    }
  }

  add (boolType, filterType, field, value) {
    // console.log('boolType', boolType)
    // console.log('this.bools[boolType]', this.bools[boolType])
    // console.log('##', this.bools, '##')
    this.bools[boolType].push({
      [filterType]: {
        [field]: value
      }
    })
    return this
  }

  addQueryString (boolType, fields, query) {
    this.bools[boolType].push({
      query_string: {fields, query}
    })
    return this
  }

  addMust (filterType, field, value) {
    this.add('must', filterType, field, value)
    return this
  }

  addMustTerm (field, value) {
    this.addMust('term', field, value)
    return this
  }

  addMustRange (field, value) {
    this.addMust('range', field, value)
    return this
  }

  addMustQueryString (fields, query) {
    this.addQueryString('must', fields, query)
    return this
  }

  addMustNot (filterType, field, value) {
    this.add('must_not', filterType, field, value)
    return this
  }

  addMustNotTerm (field, value) {
    this.addMustNot('term', field, value)
    return this
  }

  addMustNotRange (field, value) {
    this.addMustNot('range', field, value)
    return this
  }

  addMustNotQueryString (fields, query) {
    this.addQueryString('must_not', fields, query)
    return this
  }

  addShould (filterType, field, value) {
    this.add('should', filterType, field, value)
    return this
  }

  addShouldTerm (field, value) {
    this.addShould('term', field, value)
    return this
  }

  addShouldRange (field, value) {
    this.addShould('range', field, value)
    return this
  }

  addShouldQueryString (fields, query) {
    this.addQueryString('should', fields, query)
    return this
  }

  addAgg (type, name, field, option) {
    let agg = {
      [type]: {
        field
      }
    }
    Object.assign(agg[type], option)
    this.aggs.push([name, agg])
    return this
  }

  addTermsAgg (name, field, option) {
    this.addAgg('terms', name, field, option)
    return this
  }

  setLimit (limit) {
    this.limit = limit
    return this
  }

  setPage (page) {
    this.page = page
    return this
  }

  setSort (field, order) {
    this.sort = [{
      [field]: {
        order
      }
    }]
    return this
  }

  addSort (field, order) {
    this.sort.push({
      [field]: {
        order
      }
    })
    return this
  }
}

