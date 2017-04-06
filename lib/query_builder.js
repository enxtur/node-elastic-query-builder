'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueryBuilder = function () {
  function QueryBuilder(index, type) {
    _classCallCheck(this, QueryBuilder);

    this.index = index;
    this.type = type;
    this.aggs = [];
    this.bools = {
      must: [],
      must_not: [],
      should: []
    };
    this.must = this.bools.must;
    this.must_not = this.bools.must_not;
    this.should = this.bools.should;
    this.limit = 10;
    this.page = 0;
    this.sort = [];
  }

  _createClass(QueryBuilder, [{
    key: 'build',
    value: function build() {
      var from = this.page * this.limit;
      return {
        index: this.index,
        type: this.type,
        body: {
          sort: this.sort,
          size: this.limit,
          from: from,
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
          aggs: Object.assign({}, (0, _underscore.object)(this.aggs))
        }
      };
    }
  }, {
    key: 'add',
    value: function add(boolType, filterType, field, value) {
      // console.log('boolType', boolType)
      // console.log('this.bools[boolType]', this.bools[boolType])
      // console.log('##', this.bools, '##')
      this.bools[boolType].push(_defineProperty({}, filterType, _defineProperty({}, field, value)));
      return this;
    }
  }, {
    key: 'addQueryString',
    value: function addQueryString(boolType, fields, query) {
      this.bools[boolType].push({
        query_string: { fields: fields, query: query }
      });
      return this;
    }
  }, {
    key: 'addMust',
    value: function addMust(filterType, field, value) {
      this.add('must', filterType, field, value);
      return this;
    }
  }, {
    key: 'addMustTerm',
    value: function addMustTerm(field, value) {
      this.addMust('term', field, value);
      return this;
    }
  }, {
    key: 'addMustRange',
    value: function addMustRange(field, value) {
      this.addMust('range', field, value);
      return this;
    }
  }, {
    key: 'addMustQueryString',
    value: function addMustQueryString(fields, query) {
      this.addQueryString('must', fields, query);
      return this;
    }
  }, {
    key: 'addMustNot',
    value: function addMustNot(filterType, field, value) {
      this.add('must_not', filterType, field, value);
      return this;
    }
  }, {
    key: 'addMustNotTerm',
    value: function addMustNotTerm(field, value) {
      this.addMustNot('term', field, value);
      return this;
    }
  }, {
    key: 'addMustNotRange',
    value: function addMustNotRange(field, value) {
      this.addMustNot('range', field, value);
      return this;
    }
  }, {
    key: 'addMustNotQueryString',
    value: function addMustNotQueryString(fields, query) {
      this.addQueryString('must_not', fields, query);
      return this;
    }
  }, {
    key: 'addShould',
    value: function addShould(filterType, field, value) {
      this.add('should', filterType, field, value);
      return this;
    }
  }, {
    key: 'addShouldTerm',
    value: function addShouldTerm(field, value) {
      this.addShould('term', field, value);
      return this;
    }
  }, {
    key: 'addShouldRange',
    value: function addShouldRange(field, value) {
      this.addShould('range', field, value);
      return this;
    }
  }, {
    key: 'addShouldQueryString',
    value: function addShouldQueryString(fields, query) {
      this.addQueryString('should', fields, query);
      return this;
    }
  }, {
    key: 'addAgg',
    value: function addAgg(type, name, field, option) {
      var agg = _defineProperty({}, type, {
        field: field
      });
      Object.assign(agg[type], option);
      this.aggs.push([name, agg]);
      return this;
    }
  }, {
    key: 'addTermsAgg',
    value: function addTermsAgg(name, field, option) {
      this.addAgg('terms', name, field, option);
      return this;
    }
  }, {
    key: 'setLimit',
    value: function setLimit(limit) {
      this.limit = limit;
      return this;
    }
  }, {
    key: 'setPage',
    value: function setPage(page) {
      this.page = page;
      return this;
    }
  }, {
    key: 'setSort',
    value: function setSort(field, order) {
      this.sort = [_defineProperty({}, field, {
        order: order
      })];
      return this;
    }
  }, {
    key: 'addSort',
    value: function addSort(field, order) {
      this.sort.push(_defineProperty({}, field, {
        order: order
      }));
      return this;
    }
  }]);

  return QueryBuilder;
}();

exports.default = QueryBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyeV9idWlsZGVyLmpzIl0sIm5hbWVzIjpbIlF1ZXJ5QnVpbGRlciIsImluZGV4IiwidHlwZSIsImFnZ3MiLCJib29scyIsIm11c3QiLCJtdXN0X25vdCIsInNob3VsZCIsImxpbWl0IiwicGFnZSIsInNvcnQiLCJmcm9tIiwiYm9keSIsInNpemUiLCJxdWVyeSIsImZpbHRlcmVkIiwiZmlsdGVyIiwiYm9vbCIsIk9iamVjdCIsImFzc2lnbiIsImJvb2xUeXBlIiwiZmlsdGVyVHlwZSIsImZpZWxkIiwidmFsdWUiLCJwdXNoIiwiZmllbGRzIiwicXVlcnlfc3RyaW5nIiwiYWRkIiwiYWRkTXVzdCIsImFkZFF1ZXJ5U3RyaW5nIiwiYWRkTXVzdE5vdCIsImFkZFNob3VsZCIsIm5hbWUiLCJvcHRpb24iLCJhZ2ciLCJhZGRBZ2ciLCJvcmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7O0lBQ3FCQSxZO0FBQ25CLHdCQUFhQyxLQUFiLEVBQW9CQyxJQUFwQixFQUEwQjtBQUFBOztBQUN4QixTQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtDLEtBQUwsR0FBYTtBQUNYQyxZQUFNLEVBREs7QUFFWEMsZ0JBQVUsRUFGQztBQUdYQyxjQUFRO0FBSEcsS0FBYjtBQUtBLFNBQUtGLElBQUwsR0FBWSxLQUFLRCxLQUFMLENBQVdDLElBQXZCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFLRixLQUFMLENBQVdFLFFBQTNCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEtBQUtILEtBQUwsQ0FBV0csTUFBekI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDRDs7Ozs0QkFFUTtBQUNQLFVBQUlDLE9BQU8sS0FBS0YsSUFBTCxHQUFZLEtBQUtELEtB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OiJxdWVyeV9idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JqZWN0IH0gZnJvbSAndW5kZXJzY29yZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXJ5QnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yIChpbmRleCwgdHlwZSkge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleFxuICAgIHRoaXMudHlwZSA9IHR5cGVcbiAgICB0aGlzLmFnZ3MgPSBbXVxuICAgIHRoaXMuYm9vbHMgPSB7XG4gICAgICBtdXN0OiBbXSxcbiAgICAgIG11c3Rfbm90OiBbXSxcbiAgICAgIHNob3VsZDogW11cbiAgICB9XG4gICAgdGhpcy5tdXN0ID0gdGhpcy5ib29scy5tdXN0XG4gICAgdGhpcy5tdXN0X25vdCA9IHRoaXMuYm9vbHMubXVzdF9ub3RcbiAgICB0aGlzLnNob3VsZCA9IHRoaXMuYm9vbHMuc2hvdWxkXG4gICAgdGhpcy5saW1pdCA9IDEwXG4gICAgdGhpcy5wYWdlID0gMFxuICAgIHRoaXMuc29ydCA9IFtdXG4gIH1cblxuICBidWlsZCAoKSB7XG4gICAgbGV0IGZyb20gPSB0aGlzLnBhZ2UgKiB0aGlzLmxpbWl0XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgYm9keToge1xuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIHNpemU6IHRoaXMubGltaXQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgZmlsdGVyZWQ6IHtcbiAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICBib29sOiB7XG4gICAgICAgICAgICAgICAgbXVzdDogT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5tdXN0KSxcbiAgICAgICAgICAgICAgICBtdXN0X25vdDogT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5tdXN0X25vdCksXG4gICAgICAgICAgICAgICAgc2hvdWxkOiBPYmplY3QuYXNzaWduKFtdLCB0aGlzLnNob3VsZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWdnczogT2JqZWN0LmFzc2lnbih7fSwgb2JqZWN0KHRoaXMuYWdncykpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkIChib29sVHlwZSwgZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2Jvb2xUeXBlJywgYm9vbFR5cGUpXG4gICAgLy8gY29uc29sZS5sb2coJ3RoaXMuYm9vbHNbYm9vbFR5cGVdJywgdGhpcy5ib29sc1tib29sVHlwZV0pXG4gICAgLy8gY29uc29sZS5sb2coJyMjJywgdGhpcy5ib29scywgJyMjJylcbiAgICB0aGlzLmJvb2xzW2Jvb2xUeXBlXS5wdXNoKHtcbiAgICAgIFtmaWx0ZXJUeXBlXToge1xuICAgICAgICBbZmllbGRdOiB2YWx1ZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZFF1ZXJ5U3RyaW5nIChib29sVHlwZSwgZmllbGRzLCBxdWVyeSkge1xuICAgIHRoaXMuYm9vbHNbYm9vbFR5cGVdLnB1c2goe1xuICAgICAgcXVlcnlfc3RyaW5nOiB7ZmllbGRzLCBxdWVyeX1cbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRNdXN0IChmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZCgnbXVzdCcsIGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkTXVzdCgndGVybScsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdFJhbmdlIChmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZE11c3QoJ3JhbmdlJywgZmllbGQsIHZhbHVlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRNdXN0UXVlcnlTdHJpbmcgKGZpZWxkcywgcXVlcnkpIHtcbiAgICB0aGlzLmFkZFF1ZXJ5U3RyaW5nKCdtdXN0JywgZmllbGRzLCBxdWVyeSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdE5vdCAoZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKSB7XG4gICAgdGhpcy5hZGQoJ211c3Rfbm90JywgZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRNdXN0Tm90VGVybSAoZmllbGQsIHZhbHVlKSB7XG4gICAgdGhpcy5hZGRNdXN0Tm90KCd0ZXJtJywgZmllbGQsIHZhbHVlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRNdXN0Tm90UmFuZ2UgKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkTXVzdE5vdCgncmFuZ2UnLCBmaWVsZCwgdmFsdWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZE11c3ROb3RRdWVyeVN0cmluZyAoZmllbGRzLCBxdWVyeSkge1xuICAgIHRoaXMuYWRkUXVlcnlTdHJpbmcoJ211c3Rfbm90JywgZmllbGRzLCBxdWVyeSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkU2hvdWxkIChmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZCgnc2hvdWxkJywgZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRTaG91bGRUZXJtIChmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZFNob3VsZCgndGVybScsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkU2hvdWxkUmFuZ2UgKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkU2hvdWxkKCdyYW5nZScsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkU2hvdWxkUXVlcnlTdHJpbmcgKGZpZWxkcywgcXVlcnkpIHtcbiAgICB0aGlzLmFkZFF1ZXJ5U3RyaW5nKCdzaG91bGQnLCBmaWVsZHMsIHF1ZXJ5KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRBZ2cgKHR5cGUsIG5hbWUsIGZpZWxkLCBvcHRpb24pIHtcbiAgICBsZXQgYWdnID0ge1xuICAgICAgW3R5cGVdOiB7XG4gICAgICAgIGZpZWxkXG4gICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24oYWdnW3R5cGVdLCBvcHRpb24pXG4gICAgdGhpcy5hZ2dzLnB1c2goW25hbWUsIGFnZ10pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZFRlcm1zQWdnIChuYW1lLCBmaWVsZCwgb3B0aW9uKSB7XG4gICAgdGhpcy5hZGRBZ2coJ3Rlcm1zJywgbmFtZSwgZmllbGQsIG9wdGlvbilcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc2V0TGltaXQgKGxpbWl0KSB7XG4gICAgdGhpcy5saW1pdCA9IGxpbWl0XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHNldFBhZ2UgKHBhZ2UpIHtcbiAgICB0aGlzLnBhZ2UgPSBwYWdlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHNldFNvcnQgKGZpZWxkLCBvcmRlcikge1xuICAgIHRoaXMuc29ydCA9IFt7XG4gICAgICBbZmllbGRdOiB7XG4gICAgICAgIG9yZGVyXG4gICAgICB9XG4gICAgfV1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkU29ydCAoZmllbGQsIG9yZGVyKSB7XG4gICAgdGhpcy5zb3J0LnB1c2goe1xuICAgICAgW2ZpZWxkXToge1xuICAgICAgICBvcmRlclxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG4iXX0=