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
    key: 'addBool',
    value: function addBool(boolType, bool) {
      this.bools[boolType].push({ bool: bool });
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
    key: 'addMustBool',
    value: function addMustBool(bool) {
      this.addBool('must', bool);
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
    key: 'addMustNotBool',
    value: function addMustNotBool(bool) {
      this.addBool('must_not', bool);
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
    key: 'addShouldBool',
    value: function addShouldBool(bool) {
      this.addBool('should', bool);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyeV9idWlsZGVyLmpzIl0sIm5hbWVzIjpbIlF1ZXJ5QnVpbGRlciIsImluZGV4IiwidHlwZSIsImFnZ3MiLCJib29scyIsIm11c3QiLCJtdXN0X25vdCIsInNob3VsZCIsImxpbWl0IiwicGFnZSIsInNvcnQiLCJmcm9tIiwiYm9keSIsInNpemUiLCJxdWVyeSIsImZpbHRlcmVkIiwiZmlsdGVyIiwiYm9vbCIsIk9iamVjdCIsImFzc2lnbiIsImJvb2xUeXBlIiwiZmlsdGVyVHlwZSIsImZpZWxkIiwidmFsdWUiLCJwdXNoIiwiZmllbGRzIiwicXVlcnlfc3RyaW5nIiwiYWRkIiwiYWRkTXVzdCIsImFkZFF1ZXJ5U3RyaW5nIiwiYWRkQm9vbCIsImFkZE11c3ROb3QiLCJhZGRTaG91bGQiLCJuYW1lIiwib3B0aW9uIiwiYWdnIiwiYWRkQWdnIiwib3JkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7OztJQUNxQkEsWTtBQUNuQix3QkFBYUMsS0FBYixFQUFvQkMsSUFBcEIsRUFBMEI7QUFBQTs7QUFDeEIsU0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEMsWUFBTSxFQURLO0FBRVhDLGdCQUFVLEVBRkM7QUFHWEMsY0FBUTtBQUhHLEtBQWI7QUFLQSxTQUFLRixJQUFMLEdBQVksS0FBS0QsS0FBTCxDQUFXQyxJQUF2QjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBS0YsS0FBTCxDQUFXRSxRQUEzQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxLQUFLSCxLQUFMLENBQVdHLE1BQXpCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0Q7Ozs7NEJBRVE7QUFDUCxVQUFJQyxPQUFPLEtBQUtGLElBQUwsR0FB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QU87QUFDZixXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzRCQUVRQyxJLEVBQU07QUFDYixXQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzRCQUVRYSxLLEVBQU9lLEssRUFBTztBQUNyQixXQUFLM0IsSUFBTCxHQUFZLHFCQUNUWSxLQURTLEVBQ0Q7QUFDUGU7QUFETyxPQURDLEVBQVo7QUFLQSxhQUFPLElBQVA7QUFDRDs7OzRCQUVRZixLLEVBQU9lLEssRUFBTztBQUNyQixXQUFLM0IsSUFBTCxDQUFVYyxJQUFWLHFCQUNHRixLQURILEVBQ1c7QUFDUGU7QUFETyxPQURYO0FBS0EsYUFBTyxJQUFQO0FBQ0Q7Ozs7OztrQkF4TGtCckMsWSIsImZpbGUiOiJxdWVyeV9idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JqZWN0IH0gZnJvbSAndW5kZXJzY29yZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXJ5QnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yIChpbmRleCwgdHlwZSkge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleFxuICAgIHRoaXMudHlwZSA9IHR5cGVcbiAgICB0aGlzLmFnZ3MgPSBbXVxuICAgIHRoaXMuYm9vbHMgPSB7XG4gICAgICBtdXN0OiBbXSxcbiAgICAgIG11c3Rfbm90OiBbXSxcbiAgICAgIHNob3VsZDogW11cbiAgICB9XG4gICAgdGhpcy5tdXN0ID0gdGhpcy5ib29scy5tdXN0XG4gICAgdGhpcy5tdXN0X25vdCA9IHRoaXMuYm9vbHMubXVzdF9ub3RcbiAgICB0aGlzLnNob3VsZCA9IHRoaXMuYm9vbHMuc2hvdWxkXG4gICAgdGhpcy5saW1pdCA9IDEwXG4gICAgdGhpcy5wYWdlID0gMFxuICAgIHRoaXMuc29ydCA9IFtdXG4gIH1cblxuICBidWlsZCAoKSB7XG4gICAgbGV0IGZyb20gPSB0aGlzLnBhZ2UgKiB0aGlzLmxpbWl0XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgYm9keToge1xuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIHNpemU6IHRoaXMubGltaXQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgZmlsdGVyZWQ6IHtcbiAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICBib29sOiB7XG4gICAgICAgICAgICAgICAgbXVzdDogT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5tdXN0KSxcbiAgICAgICAgICAgICAgICBtdXN0X25vdDogT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5tdXN0X25vdCksXG4gICAgICAgICAgICAgICAgc2hvdWxkOiBPYmplY3QuYXNzaWduKFtdLCB0aGlzLnNob3VsZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWdnczogT2JqZWN0LmFzc2lnbih7fSwgb2JqZWN0KHRoaXMuYWdncykpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkIChib29sVHlwZSwgZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2Jvb2xUeXBlJywgYm9vbFR5cGUpXG4gICAgLy8gY29uc29sZS5sb2coJ3RoaXMuYm9vbHNbYm9vbFR5cGVdJywgdGhpcy5ib29sc1tib29sVHlwZV0pXG4gICAgLy8gY29uc29sZS5sb2coJyMjJywgdGhpcy5ib29scywgJyMjJylcbiAgICB0aGlzLmJvb2xzW2Jvb2xUeXBlXS5wdXNoKHtcbiAgICAgIFtmaWx0ZXJUeXBlXToge1xuICAgICAgICBbZmllbGRdOiB2YWx1ZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZEJvb2wgKGJvb2xUeXBlLCBib29sKSB7XG4gICAgdGhpcy5ib29sc1tib29sVHlwZV0ucHVzaCh7Ym9vbH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZFF1ZXJ5U3RyaW5nIChib29sVHlwZSwgZmllbGRzLCBxdWVyeSkge1xuICAgIHRoaXMuYm9vbHNbYm9vbFR5cGVdLnB1c2goe1xuICAgICAgcXVlcnlfc3RyaW5nOiB7ZmllbGRzLCBxdWVyeX1cbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRNdXN0IChmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZCgnbXVzdCcsIGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkTXVzdCgndGVybScsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdFJhbmdlIChmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZE11c3QoJ3JhbmdlJywgZmllbGQsIHZhbHVlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRNdXN0UXVlcnlTdHJpbmcgKGZpZWxkcywgcXVlcnkpIHtcbiAgICB0aGlzLmFkZFF1ZXJ5U3RyaW5nKCdtdXN0JywgZmllbGRzLCBxdWVyeSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdEJvb2wgKGJvb2wpIHtcbiAgICB0aGlzLmFkZEJvb2woJ211c3QnLCBib29sKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRNdXN0Tm90IChmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZCgnbXVzdF9ub3QnLCBmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZE11c3ROb3RUZXJtIChmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZE11c3ROb3QoJ3Rlcm0nLCBmaWVsZCwgdmFsdWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZE11c3ROb3RSYW5nZSAoZmllbGQsIHZhbHVlKSB7XG4gICAgdGhpcy5hZGRNdXN0Tm90KCdyYW5nZScsIGZpZWxkLCB2YWx1ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkTXVzdE5vdFF1ZXJ5U3RyaW5nIChmaWVsZHMsIHF1ZXJ5KSB7XG4gICAgdGhpcy5hZGRRdWVyeVN0cmluZygnbXVzdF9ub3QnLCBmaWVsZHMsIHF1ZXJ5KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRNdXN0Tm90Qm9vbCAoYm9vbCkge1xuICAgIHRoaXMuYWRkQm9vbCgnbXVzdF9ub3QnLCBib29sKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRTaG91bGQgKGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkKCdzaG91bGQnLCBmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZFNob3VsZFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkU2hvdWxkKCd0ZXJtJywgZmllbGQsIHZhbHVlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRTaG91bGRSYW5nZSAoZmllbGQsIHZhbHVlKSB7XG4gICAgdGhpcy5hZGRTaG91bGQoJ3JhbmdlJywgZmllbGQsIHZhbHVlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRTaG91bGRRdWVyeVN0cmluZyAoZmllbGRzLCBxdWVyeSkge1xuICAgIHRoaXMuYWRkUXVlcnlTdHJpbmcoJ3Nob3VsZCcsIGZpZWxkcywgcXVlcnkpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZFNob3VsZEJvb2wgKGJvb2wpIHtcbiAgICB0aGlzLmFkZEJvb2woJ3Nob3VsZCcsIGJvb2wpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZEFnZyAodHlwZSwgbmFtZSwgZmllbGQsIG9wdGlvbikge1xuICAgIGxldCBhZ2cgPSB7XG4gICAgICBbdHlwZV06IHtcbiAgICAgICAgZmllbGRcbiAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbihhZ2dbdHlwZV0sIG9wdGlvbilcbiAgICB0aGlzLmFnZ3MucHVzaChbbmFtZSwgYWdnXSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkVGVybXNBZ2cgKG5hbWUsIGZpZWxkLCBvcHRpb24pIHtcbiAgICB0aGlzLmFkZEFnZygndGVybXMnLCBuYW1lLCBmaWVsZCwgb3B0aW9uKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXRMaW1pdCAobGltaXQpIHtcbiAgICB0aGlzLmxpbWl0ID0gbGltaXRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc2V0UGFnZSAocGFnZSkge1xuICAgIHRoaXMucGFnZSA9IHBhZ2VcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc2V0U29ydCAoZmllbGQsIG9yZGVyKSB7XG4gICAgdGhpcy5zb3J0ID0gW3tcbiAgICAgIFtmaWVsZF06IHtcbiAgICAgICAgb3JkZXJcbiAgICAgIH1cbiAgICB9XVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRTb3J0IChmaWVsZCwgb3JkZXIpIHtcbiAgICB0aGlzLnNvcnQucHVzaCh7XG4gICAgICBbZmllbGRdOiB7XG4gICAgICAgIG9yZGVyXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbiJdfQ==