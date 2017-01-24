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
    this.must = [];
    this.must_not = [];
    this.should = [];
    this.aggs = [];
    this.bools = {
      must: this.must,
      must_not: this.must_not,
      should: this.should
    };
    this.limit = 10;
    this.offset = 0;
    this.sort = [];
  }

  _createClass(QueryBuilder, [{
    key: 'build',
    value: function build() {
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
          aggs: (0, _underscore.object)(this.aggs)
        }
      };
    }
  }, {
    key: 'add',
    value: function add(boolType, filterType, field, value) {
      this.bools[boolType].push(_defineProperty({}, filterType, _defineProperty({}, field, value)));
    }
  }, {
    key: 'addQueryString',
    value: function addQueryString(boolType, fields, query) {
      this.bools[boolType].push({
        query_string: { fields: fields, query: query }
      });
    }
  }, {
    key: 'addMust',
    value: function addMust(filterType, field, value) {
      this.add('must', filterType, field, value);
    }
  }, {
    key: 'addMustTerm',
    value: function addMustTerm(field, value) {
      this.addMust('term', field, value);
    }
  }, {
    key: 'addMustQueryString',
    value: function addMustQueryString(fields, query) {
      this.addQueryString('must', fields, query);
    }
  }, {
    key: 'addMustNot',
    value: function addMustNot(filterType, field, value) {
      this.add('must_not', filterType, field, value);
    }
  }, {
    key: 'addMustNotTerm',
    value: function addMustNotTerm(field, value) {
      this.addMustNot('term', field, value);
    }
  }, {
    key: 'addMustNotQueryString',
    value: function addMustNotQueryString(fields, query) {
      this.addQueryString('must_not', fields, query);
    }
  }, {
    key: 'addShould',
    value: function addShould(filterType, field, value) {
      this.add('should', filterType, field, value);
    }
  }, {
    key: 'addShouldTerm',
    value: function addShouldTerm(field, value) {
      this.addShould('term', field, value);
    }
  }, {
    key: 'addShouldQueryString',
    value: function addShouldQueryString(fields, query) {
      this.addQueryString('must_not', fields, query);
    }
  }, {
    key: 'addAgg',
    value: function addAgg(type, name, field) {
      this.aggs.push([name, _defineProperty({}, type, {
        field: field
      })]);
    }
  }, {
    key: 'addTermsAgg',
    value: function addTermsAgg(name, field) {
      this.addAgg('terms', name, field);
    }
  }, {
    key: 'setLimit',
    value: function setLimit(limit) {
      this.limit = limit;
    }
  }, {
    key: 'setOffset',
    value: function setOffset(offset) {
      this.offset = offset;
    }
  }, {
    key: 'setSort',
    value: function setSort(field, order) {
      this.sort = [_defineProperty({}, field, {
        order: order
      })];
    }
  }, {
    key: 'addSort',
    value: function addSort(field, order) {
      this.sort.push(_defineProperty({}, field, {
        order: order
      }));
    }
  }]);

  return QueryBuilder;
}();

exports.default = QueryBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyeV9idWlsZGVyLmpzIl0sIm5hbWVzIjpbIlF1ZXJ5QnVpbGRlciIsImluZGV4IiwidHlwZSIsIm11c3QiLCJtdXN0X25vdCIsInNob3VsZCIsImFnZ3MiLCJib29scyIsImxpbWl0Iiwib2Zmc2V0Iiwic29ydCIsImJvZHkiLCJzaXplIiwiZnJvbSIsInF1ZXJ5IiwiZmlsdGVyZWQiLCJmaWx0ZXIiLCJib29sIiwiYm9vbFR5cGUiLCJmaWx0ZXJUeXBlIiwiZmllbGQiLCJ2YWx1ZSIsInB1c2giLCJmaWVsZHMiLCJxdWVyeV9zdHJpbmciLCJhZGQiLCJhZGRNdXN0IiwiYWRkUXVlcnlTdHJpbmciLCJhZGRNdXN0Tm90IiwiYWRkU2hvdWxkIiwibmFtZSIsImFkZEFnZyIsIm9yZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7SUFDcUJBLFk7QUFDbkIsd0JBQWFDLEtBQWIsRUFBb0JDLElBQXBCLEVBQTBCO0FBQUE7O0FBQ3hCLFNBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEosWUFBTSxLQUFLQSxJQURBO0FBRVhDLGdCQUFVLEtBQUtBLFFBRko7QUFHWEMsY0FBUSxLQUFLQTtBQUhGLEtBQWI7QUFLQSxTQUFLRyxLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDRDs7Ozs0QkFFUTtBQUNQLGFBQU87QUFDTFQsZUFBTyxLQUFLQSxLQURQO0FBRUxDLGNBQU0sS0FBS0EsSUFGTjtBQUdMUyxjQUFNO0FBQ0pELGdCQUFNLEtBQUtBLElBRFA7QUFFSkUsZ0JBQU0sS0FBS0os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ZSI6InF1ZXJ5X2J1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvYmplY3QgfSBmcm9tICd1bmRlcnNjb3JlJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVlcnlCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IgKGluZGV4LCB0eXBlKSB7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4XG4gICAgdGhpcy50eXBlID0gdHlwZVxuICAgIHRoaXMubXVzdCA9IFtdXG4gICAgdGhpcy5tdXN0X25vdCA9IFtdXG4gICAgdGhpcy5zaG91bGQgPSBbXVxuICAgIHRoaXMuYWdncyA9IFtdXG4gICAgdGhpcy5ib29scyA9IHtcbiAgICAgIG11c3Q6IHRoaXMubXVzdCxcbiAgICAgIG11c3Rfbm90OiB0aGlzLm11c3Rfbm90LFxuICAgICAgc2hvdWxkOiB0aGlzLnNob3VsZFxuICAgIH1cbiAgICB0aGlzLmxpbWl0ID0gMTBcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLnNvcnQgPSBbXVxuICB9XG5cbiAgYnVpbGQgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbmRleDogdGhpcy5pbmRleCxcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgICBzaXplOiB0aGlzLmxpbWl0LFxuICAgICAgICBmcm9tOiB0aGlzLmxpbWl0ICogdGhpcy5vZmZzZXQsXG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgZmlsdGVyZWQ6IHtcbiAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICBib29sOiB7XG4gICAgICAgICAgICAgICAgbXVzdDogdGhpcy5tdXN0LFxuICAgICAgICAgICAgICAgIG11c3Rfbm90OiB0aGlzLm11c3Rfbm90LFxuICAgICAgICAgICAgICAgIHNob3VsZDogdGhpcy5zaG91bGRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWdnczogb2JqZWN0KHRoaXMuYWdncylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGQgKGJvb2xUeXBlLCBmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmJvb2xzW2Jvb2xUeXBlXS5wdXNoKHtcbiAgICAgIFtmaWx0ZXJUeXBlXToge1xuICAgICAgICBbZmllbGRdOiB2YWx1ZVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgYWRkUXVlcnlTdHJpbmcgKGJvb2xUeXBlLCBmaWVsZHMsIHF1ZXJ5KSB7XG4gICAgdGhpcy5ib29sc1tib29sVHlwZV0ucHVzaCh7XG4gICAgICBxdWVyeV9zdHJpbmc6IHtmaWVsZHMsIHF1ZXJ5fVxuICAgIH0pXG4gIH1cbiAgYWRkTXVzdCAoZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKSB7XG4gICAgdGhpcy5hZGQoJ211c3QnLCBmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpXG4gIH1cbiAgYWRkTXVzdFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkTXVzdCgndGVybScsIGZpZWxkLCB2YWx1ZSlcbiAgfVxuICBhZGRNdXN0UXVlcnlTdHJpbmcgKGZpZWxkcywgcXVlcnkpIHtcbiAgICB0aGlzLmFkZFF1ZXJ5U3RyaW5nKCdtdXN0JywgZmllbGRzLCBxdWVyeSlcbiAgfVxuXG4gIGFkZE11c3ROb3QgKGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkKCdtdXN0X25vdCcsIGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSlcbiAgfVxuICBhZGRNdXN0Tm90VGVybSAoZmllbGQsIHZhbHVlKSB7XG4gICAgdGhpcy5hZGRNdXN0Tm90KCd0ZXJtJywgZmllbGQsIHZhbHVlKVxuICB9XG4gIGFkZE11c3ROb3RRdWVyeVN0cmluZyAoZmllbGRzLCBxdWVyeSkge1xuICAgIHRoaXMuYWRkUXVlcnlTdHJpbmcoJ211c3Rfbm90JywgZmllbGRzLCBxdWVyeSlcbiAgfVxuXG4gIGFkZFNob3VsZCAoZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKSB7XG4gICAgdGhpcy5hZGQoJ3Nob3VsZCcsIGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSlcbiAgfVxuICBhZGRTaG91bGRUZXJtIChmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZFNob3VsZCgndGVybScsIGZpZWxkLCB2YWx1ZSlcbiAgfVxuICBhZGRTaG91bGRRdWVyeVN0cmluZyAoZmllbGRzLCBxdWVyeSkge1xuICAgIHRoaXMuYWRkUXVlcnlTdHJpbmcoJ211c3Rfbm90JywgZmllbGRzLCBxdWVyeSlcbiAgfVxuXG4gIGFkZEFnZyAodHlwZSwgbmFtZSwgZmllbGQpIHtcbiAgICB0aGlzLmFnZ3MucHVzaChbbmFtZSwge1xuICAgICAgW3R5cGVdOiB7XG4gICAgICAgIGZpZWxkXG4gICAgICB9XG4gICAgfV0pXG4gIH1cbiAgYWRkVGVybXNBZ2cgKG5hbWUsIGZpZWxkKSB7XG4gICAgdGhpcy5hZGRBZ2coJ3Rlcm1zJywgbmFtZSwgZmllbGQpXG4gIH1cbiAgc2V0TGltaXQgKGxpbWl0KSB7XG4gICAgdGhpcy5saW1pdCA9IGxpbWl0XG4gIH1cbiAgc2V0T2Zmc2V0IChvZmZzZXQpIHtcbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldFxuICB9XG4gIHNldFNvcnQgKGZpZWxkLCBvcmRlcikge1xuICAgIHRoaXMuc29ydCA9IFt7XG4gICAgICBbZmllbGRdOiB7XG4gICAgICAgIG9yZGVyXG4gICAgICB9XG4gICAgfV1cbiAgfVxuICBhZGRTb3J0IChmaWVsZCwgb3JkZXIpIHtcbiAgICB0aGlzLnNvcnQucHVzaCh7XG4gICAgICBbZmllbGRdOiB7XG4gICAgICAgIG9yZGVyXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4iXX0=