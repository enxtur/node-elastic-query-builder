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
      console.log('##', this.bools, '##');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyeV9idWlsZGVyLmpzIl0sIm5hbWVzIjpbIlF1ZXJ5QnVpbGRlciIsImluZGV4IiwidHlwZSIsImFnZ3MiLCJib29scyIsIm11c3QiLCJtdXN0X25vdCIsInNob3VsZCIsImxpbWl0IiwicGFnZSIsInNvcnQiLCJmcm9tIiwiYm9keSIsInNpemUiLCJxdWVyeSIsImZpbHRlcmVkIiwiZmlsdGVyIiwiYm9vbCIsIk9iamVjdCIsImFzc2lnbiIsImJvb2xUeXBlIiwiZmlsdGVyVHlwZSIsImZpZWxkIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwicHVzaCIsImZpZWxkcyIsInF1ZXJ5X3N0cmluZyIsImFkZCIsImFkZE11c3QiLCJhZGRRdWVyeVN0cmluZyIsImFkZE11c3ROb3QiLCJhZGRTaG91bGQiLCJuYW1lIiwib3B0aW9uIiwiYWdnIiwiYWRkQWdnIiwib3JkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7OztJQUNxQkEsWTtBQUNuQix3QkFBYUMsS0FBYixFQUFvQkMsSUFBcEIsRUFBMEI7QUFBQTs7QUFDeEIsU0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEMsWUFBTSxFQURLO0FBRVhDLGdCQUFVLEVBRkM7QUFHWEMsY0FBUTtBQUhHLEtBQWI7QUFLQSxTQUFLRixJQUFMLEdBQVksS0FBS0QsS0FBTCxDQUFXQyxJQUF2QjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBS0YsS0FBTCxDQUFXRSxRQUEzQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxLQUFLSCxLQUFMLENBQVdHLE1BQXpCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0Q7Ozs7NEJBRVE7QUFDUCxVQUFJQyxPQUFPLEtBQUtGLElB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T2EsTSxFQUFRO0FBQ2pDLFVBQUlDLDBCQUNEbEMsSUFEQyxFQUNNO0FBQ05vQjtBQURNLE9BRE4sQ0FBSjtBQUtBSixhQUFPQyxNQUFQLENBQWNpQixJQUFJbEMsSUFBSixDQUFkLEVBQXlCaUMsTUFBekI7QUFDQSxXQUFLaEMsSUFBTCxDQUFVdUIsSUFBVixDQUFlLENBQUNRLElBQUQsRUFBT0UsR0FBUCxDQUFmO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7OztnQ0FFWUYsSSxFQUFNWixLLEVBQU9hLE0sRUFBUTtBQUNoQyxXQUFLRSxNQUFMLENBQVksT0FBWixFQUFxQkgsSUFBckIsRUFBMkJaLEtBQTNCLEVBQWtDYSxNQUFsQztBQUNBLGFBQU8sSUFBUDtBQUNEOzs7NkJBRVMzQixLLEVBQU87QUFDZixXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzRCQUVRQyxJLEVBQU07QUFDYixXQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzRCQUVRYSxLLEVBQU9nQixLLEVBQU87QUFDckIsV0FBSzVCLElBQUwsR0FBWSxxQkFDVFksS0FEUyxFQUNEO0FBQ1BnQjtBQURPLE9BREMsRUFBWjtBQUtBLGFBQU8sSUFBUDtBQUNEOzs7NEJBRVFoQixLLEVBQU9nQixLLEVBQU87QUFDckIsV0FBSzVCLElBQUwsQ0FBVWdCLElBQVYscUJBQ0dKLEtBREgsRUFDVztBQUNQZ0I7QUFETyxPQURYO0FBS0EsYUFBTyxJQUFQO0FBQ0Q7Ozs7OztrQkFySmtCdEMsWSIsImZpbGUiOiJxdWVyeV9idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JqZWN0IH0gZnJvbSAndW5kZXJzY29yZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXJ5QnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yIChpbmRleCwgdHlwZSkge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleFxuICAgIHRoaXMudHlwZSA9IHR5cGVcbiAgICB0aGlzLmFnZ3MgPSBbXVxuICAgIHRoaXMuYm9vbHMgPSB7XG4gICAgICBtdXN0OiBbXSxcbiAgICAgIG11c3Rfbm90OiBbXSxcbiAgICAgIHNob3VsZDogW11cbiAgICB9XG4gICAgdGhpcy5tdXN0ID0gdGhpcy5ib29scy5tdXN0XG4gICAgdGhpcy5tdXN0X25vdCA9IHRoaXMuYm9vbHMubXVzdF9ub3RcbiAgICB0aGlzLnNob3VsZCA9IHRoaXMuYm9vbHMuc2hvdWxkXG4gICAgdGhpcy5saW1pdCA9IDEwXG4gICAgdGhpcy5wYWdlID0gMFxuICAgIHRoaXMuc29ydCA9IFtdXG4gIH1cblxuICBidWlsZCAoKSB7XG4gICAgbGV0IGZyb20gPSB0aGlzLnBhZ2UgKiB0aGlzLmxpbWl0XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgYm9keToge1xuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIHNpemU6IHRoaXMubGltaXQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgZmlsdGVyZWQ6IHtcbiAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICBib29sOiB7XG4gICAgICAgICAgICAgICAgbXVzdDogT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5tdXN0KSxcbiAgICAgICAgICAgICAgICBtdXN0X25vdDogT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5tdXN0X25vdCksXG4gICAgICAgICAgICAgICAgc2hvdWxkOiBPYmplY3QuYXNzaWduKFtdLCB0aGlzLnNob3VsZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWdnczogT2JqZWN0LmFzc2lnbih7fSwgb2JqZWN0KHRoaXMuYWdncykpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkIChib29sVHlwZSwgZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2Jvb2xUeXBlJywgYm9vbFR5cGUpXG4gICAgLy8gY29uc29sZS5sb2coJ3RoaXMuYm9vbHNbYm9vbFR5cGVdJywgdGhpcy5ib29sc1tib29sVHlwZV0pXG4gICAgY29uc29sZS5sb2coJyMjJywgdGhpcy5ib29scywgJyMjJylcbiAgICB0aGlzLmJvb2xzW2Jvb2xUeXBlXS5wdXNoKHtcbiAgICAgIFtmaWx0ZXJUeXBlXToge1xuICAgICAgICBbZmllbGRdOiB2YWx1ZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZFF1ZXJ5U3RyaW5nIChib29sVHlwZSwgZmllbGRzLCBxdWVyeSkge1xuICAgIHRoaXMuYm9vbHNbYm9vbFR5cGVdLnB1c2goe1xuICAgICAgcXVlcnlfc3RyaW5nOiB7ZmllbGRzLCBxdWVyeX1cbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRNdXN0IChmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZCgnbXVzdCcsIGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkTXVzdCgndGVybScsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdFF1ZXJ5U3RyaW5nIChmaWVsZHMsIHF1ZXJ5KSB7XG4gICAgdGhpcy5hZGRRdWVyeVN0cmluZygnbXVzdCcsIGZpZWxkcywgcXVlcnkpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZE11c3ROb3QgKGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkKCdtdXN0X25vdCcsIGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdE5vdFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkTXVzdE5vdCgndGVybScsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdE5vdFF1ZXJ5U3RyaW5nIChmaWVsZHMsIHF1ZXJ5KSB7XG4gICAgdGhpcy5hZGRRdWVyeVN0cmluZygnbXVzdF9ub3QnLCBmaWVsZHMsIHF1ZXJ5KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRTaG91bGQgKGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkKCdzaG91bGQnLCBmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZFNob3VsZFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkU2hvdWxkKCd0ZXJtJywgZmllbGQsIHZhbHVlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRTaG91bGRRdWVyeVN0cmluZyAoZmllbGRzLCBxdWVyeSkge1xuICAgIHRoaXMuYWRkUXVlcnlTdHJpbmcoJ211c3Rfbm90JywgZmllbGRzLCBxdWVyeSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkQWdnICh0eXBlLCBuYW1lLCBmaWVsZCwgb3B0aW9uKSB7XG4gICAgbGV0IGFnZyA9IHtcbiAgICAgIFt0eXBlXToge1xuICAgICAgICBmaWVsZFxuICAgICAgfVxuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKGFnZ1t0eXBlXSwgb3B0aW9uKVxuICAgIHRoaXMuYWdncy5wdXNoKFtuYW1lLCBhZ2ddKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRUZXJtc0FnZyAobmFtZSwgZmllbGQsIG9wdGlvbikge1xuICAgIHRoaXMuYWRkQWdnKCd0ZXJtcycsIG5hbWUsIGZpZWxkLCBvcHRpb24pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHNldExpbWl0IChsaW1pdCkge1xuICAgIHRoaXMubGltaXQgPSBsaW1pdFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXRQYWdlIChwYWdlKSB7XG4gICAgdGhpcy5wYWdlID0gcGFnZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXRTb3J0IChmaWVsZCwgb3JkZXIpIHtcbiAgICB0aGlzLnNvcnQgPSBbe1xuICAgICAgW2ZpZWxkXToge1xuICAgICAgICBvcmRlclxuICAgICAgfVxuICAgIH1dXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZFNvcnQgKGZpZWxkLCBvcmRlcikge1xuICAgIHRoaXMuc29ydC5wdXNoKHtcbiAgICAgIFtmaWVsZF06IHtcbiAgICAgICAgb3JkZXJcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuIl19