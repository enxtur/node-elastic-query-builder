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
    key: 'addShouldQueryString',
    value: function addShouldQueryString(fields, query) {
      this.addQueryString('must_not', fields, query);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyeV9idWlsZGVyLmpzIl0sIm5hbWVzIjpbIlF1ZXJ5QnVpbGRlciIsImluZGV4IiwidHlwZSIsImFnZ3MiLCJib29scyIsIm11c3QiLCJtdXN0X25vdCIsInNob3VsZCIsImxpbWl0IiwicGFnZSIsInNvcnQiLCJmcm9tIiwiYm9keSIsInNpemUiLCJxdWVyeSIsImZpbHRlcmVkIiwiZmlsdGVyIiwiYm9vbCIsIk9iamVjdCIsImFzc2lnbiIsImJvb2xUeXBlIiwiZmlsdGVyVHlwZSIsImZpZWxkIiwidmFsdWUiLCJwdXNoIiwiZmllbGRzIiwicXVlcnlfc3RyaW5nIiwiYWRkIiwiYWRkTXVzdCIsImFkZFF1ZXJ5U3RyaW5nIiwiYWRkTXVzdE5vdCIsImFkZFNob3VsZCIsIm5hbWUiLCJvcHRpb24iLCJhZ2ciLCJhZGRBZ2ciLCJvcmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7O0lBQ3FCQSxZO0FBQ25CLHdCQUFhQyxLQUFiLEVBQW9CQyxJQUFwQixFQUEwQjtBQUFBOztBQUN4QixTQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtDLEtBQUwsR0FBYTtBQUNYQyxZQUFNLEVBREs7QUFFWEMsZ0JBQVUsRUFGQztBQUdYQyxjQUFRO0FBSEcsS0FBYjtBQUtBLFNBQUtGLElBQUwsR0FBWSxLQUFLRCxLQUFMLENBQVdDLElBQXZCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFLRixLQUFMLENBQVdFLFFBQTNCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEtBQUtILEtBQUwsQ0FBV0csTUFBekI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDRDs7Ozs0QkFFUTtBQUNQLFVBQUlDLE9BQU8sS0FBS0YsSUFBTCxHQUFZLEtBQUtELEtB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T0MsTUFBUCxDQUFjZSxJQUFJaEMsSUFBSixDQUFkLEVBQXlCK0IsTUFBekI7QUFDQSxXQUFLOUIsSUFBTCxDQUFVcUIsSUFBVixDQUFlLENBQUNRLElBQUQsRUFBT0UsR0FBUCxDQUFmO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7OztnQ0FFWUYsSSxFQUFNVixLLEVBQU9XLE0sRUFBUTtBQUNoQyxXQUFLRSxNQUFMLENBQVksT0FBWixFQUFxQkgsSUFBckIsRUFBMkJWLEtBQTNCLEVBQWtDVyxNQUFsQztBQUNBLGFBQU8sSUFBUDtBQUNEOzs7NkJBRVN6QixLLEVBQU87QUFDZixXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzRCQUVRQyxJLEVBQU07QUFDYixXQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzRCQUVRYSxLLEVBQU9jLEssRUFBTztBQUNyQixXQUFLMUIsSUFBTCxHQUFZLHFCQUNUWSxLQURTLEVBQ0Q7QUFDUGM7QUFETyxPQURDLEVBQVo7QUFLQSxhQUFPLElBQVA7QUFDRDs7OzRCQUVRZCxLLEVBQU9jLEssRUFBTztBQUNyQixXQUFLMUIsSUFBTCxDQUFVYyxJQUFWLHFCQUNHRixLQURILEVBQ1c7QUFDUGM7QUFETyxPQURYO0FBS0EsYUFBTyxJQUFQO0FBQ0Q7Ozs7OztrQkFySmtCcEMsWSIsImZpbGUiOiJxdWVyeV9idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JqZWN0IH0gZnJvbSAndW5kZXJzY29yZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXJ5QnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yIChpbmRleCwgdHlwZSkge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleFxuICAgIHRoaXMudHlwZSA9IHR5cGVcbiAgICB0aGlzLmFnZ3MgPSBbXVxuICAgIHRoaXMuYm9vbHMgPSB7XG4gICAgICBtdXN0OiBbXSxcbiAgICAgIG11c3Rfbm90OiBbXSxcbiAgICAgIHNob3VsZDogW11cbiAgICB9XG4gICAgdGhpcy5tdXN0ID0gdGhpcy5ib29scy5tdXN0XG4gICAgdGhpcy5tdXN0X25vdCA9IHRoaXMuYm9vbHMubXVzdF9ub3RcbiAgICB0aGlzLnNob3VsZCA9IHRoaXMuYm9vbHMuc2hvdWxkXG4gICAgdGhpcy5saW1pdCA9IDEwXG4gICAgdGhpcy5wYWdlID0gMFxuICAgIHRoaXMuc29ydCA9IFtdXG4gIH1cblxuICBidWlsZCAoKSB7XG4gICAgbGV0IGZyb20gPSB0aGlzLnBhZ2UgKiB0aGlzLmxpbWl0XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgYm9keToge1xuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIHNpemU6IHRoaXMubGltaXQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgZmlsdGVyZWQ6IHtcbiAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICBib29sOiB7XG4gICAgICAgICAgICAgICAgbXVzdDogT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5tdXN0KSxcbiAgICAgICAgICAgICAgICBtdXN0X25vdDogT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5tdXN0X25vdCksXG4gICAgICAgICAgICAgICAgc2hvdWxkOiBPYmplY3QuYXNzaWduKFtdLCB0aGlzLnNob3VsZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWdnczogT2JqZWN0LmFzc2lnbih7fSwgb2JqZWN0KHRoaXMuYWdncykpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkIChib29sVHlwZSwgZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2Jvb2xUeXBlJywgYm9vbFR5cGUpXG4gICAgLy8gY29uc29sZS5sb2coJ3RoaXMuYm9vbHNbYm9vbFR5cGVdJywgdGhpcy5ib29sc1tib29sVHlwZV0pXG4gICAgLy8gY29uc29sZS5sb2coJyMjJywgdGhpcy5ib29scywgJyMjJylcbiAgICB0aGlzLmJvb2xzW2Jvb2xUeXBlXS5wdXNoKHtcbiAgICAgIFtmaWx0ZXJUeXBlXToge1xuICAgICAgICBbZmllbGRdOiB2YWx1ZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZFF1ZXJ5U3RyaW5nIChib29sVHlwZSwgZmllbGRzLCBxdWVyeSkge1xuICAgIHRoaXMuYm9vbHNbYm9vbFR5cGVdLnB1c2goe1xuICAgICAgcXVlcnlfc3RyaW5nOiB7ZmllbGRzLCBxdWVyeX1cbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRNdXN0IChmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZCgnbXVzdCcsIGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkTXVzdCgndGVybScsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdFF1ZXJ5U3RyaW5nIChmaWVsZHMsIHF1ZXJ5KSB7XG4gICAgdGhpcy5hZGRRdWVyeVN0cmluZygnbXVzdCcsIGZpZWxkcywgcXVlcnkpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZE11c3ROb3QgKGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkKCdtdXN0X25vdCcsIGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdE5vdFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkTXVzdE5vdCgndGVybScsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdE5vdFF1ZXJ5U3RyaW5nIChmaWVsZHMsIHF1ZXJ5KSB7XG4gICAgdGhpcy5hZGRRdWVyeVN0cmluZygnbXVzdF9ub3QnLCBmaWVsZHMsIHF1ZXJ5KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRTaG91bGQgKGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkKCdzaG91bGQnLCBmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZFNob3VsZFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkU2hvdWxkKCd0ZXJtJywgZmllbGQsIHZhbHVlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRTaG91bGRRdWVyeVN0cmluZyAoZmllbGRzLCBxdWVyeSkge1xuICAgIHRoaXMuYWRkUXVlcnlTdHJpbmcoJ211c3Rfbm90JywgZmllbGRzLCBxdWVyeSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkQWdnICh0eXBlLCBuYW1lLCBmaWVsZCwgb3B0aW9uKSB7XG4gICAgbGV0IGFnZyA9IHtcbiAgICAgIFt0eXBlXToge1xuICAgICAgICBmaWVsZFxuICAgICAgfVxuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKGFnZ1t0eXBlXSwgb3B0aW9uKVxuICAgIHRoaXMuYWdncy5wdXNoKFtuYW1lLCBhZ2ddKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRUZXJtc0FnZyAobmFtZSwgZmllbGQsIG9wdGlvbikge1xuICAgIHRoaXMuYWRkQWdnKCd0ZXJtcycsIG5hbWUsIGZpZWxkLCBvcHRpb24pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHNldExpbWl0IChsaW1pdCkge1xuICAgIHRoaXMubGltaXQgPSBsaW1pdFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXRQYWdlIChwYWdlKSB7XG4gICAgdGhpcy5wYWdlID0gcGFnZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXRTb3J0IChmaWVsZCwgb3JkZXIpIHtcbiAgICB0aGlzLnNvcnQgPSBbe1xuICAgICAgW2ZpZWxkXToge1xuICAgICAgICBvcmRlclxuICAgICAgfVxuICAgIH1dXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZFNvcnQgKGZpZWxkLCBvcmRlcikge1xuICAgIHRoaXMuc29ydC5wdXNoKHtcbiAgICAgIFtmaWVsZF06IHtcbiAgICAgICAgb3JkZXJcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuIl19