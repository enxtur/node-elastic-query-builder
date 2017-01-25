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
    this.page = 0;
    this.sort = [];
  }

  _createClass(QueryBuilder, [{
    key: 'build',
    value: function build() {
      var from = this.offset ? this.offset : this.page * this.limit;
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
    value: function addAgg(type, name, field, option) {
      var agg = _defineProperty({}, type, {
        field: field
      });
      Object.assign(agg[type], option);
      this.aggs.push([name, agg]);
    }
  }, {
    key: 'addTermsAgg',
    value: function addTermsAgg(name, field, option) {
      this.addAgg('terms', name, field, option);
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
    key: 'setPage',
    value: function setPage(page) {
      this.page = page;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyeV9idWlsZGVyLmpzIl0sIm5hbWVzIjpbIlF1ZXJ5QnVpbGRlciIsImluZGV4IiwidHlwZSIsIm11c3QiLCJtdXN0X25vdCIsInNob3VsZCIsImFnZ3MiLCJib29scyIsImxpbWl0Iiwib2Zmc2V0IiwicGFnZSIsInNvcnQiLCJmcm9tIiwiYm9keSIsInNpemUiLCJxdWVyeSIsImZpbHRlcmVkIiwiZmlsdGVyIiwiYm9vbCIsImJvb2xUeXBlIiwiZmlsdGVyVHlwZSIsImZpZWxkIiwidmFsdWUiLCJwdXNoIiwiZmllbGRzIiwicXVlcnlfc3RyaW5nIiwiYWRkIiwiYWRkTXVzdCIsImFkZFF1ZXJ5U3RyaW5nIiwiYWRkTXVzdE5vdCIsImFkZFNob3VsZCIsIm5hbWUiLCJvcHRpb24iLCJhZ2ciLCJPYmplY3QiLCJhc3NpZ24iLCJhZGRBZ2ciLCJvcmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7O0lBQ3FCQSxZO0FBQ25CLHdCQUFhQyxLQUFiLEVBQW9CQyxJQUFwQixFQUEwQjtBQUFBOztBQUN4QixTQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsU0FBS0MsS0FBTCxHQUFhO0FBQ1hKLFlBQU0sS0FBS0EsSUFEQTtBQUVYQyxnQkFBVSxLQUFLQSxRQUZKO0FBR1hDLGNBQVEsS0FBS0E7QUFIRixLQUFiO0FBS0EsU0FBS0csS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDRDs7Ozs0QkFFUTtBQUNQLFVBQUlDLE9BQU8sS0FBS0gsTUFBTCxHQUFjLEtBQUtBLE1B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QUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNEOzs7NEJBRVFDLEksRUFBTTtBQUNiLFdBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNEOzs7NEJBRVFXLEssRUFBT2dCLEssRUFBTztBQUNyQixXQUFLMUIsSUFBTCxHQUFZLHFCQUNUVSxLQURTLEVBQ0Q7QUFDUGdCO0FBRE8sT0FEQyxFQUFaO0FBS0Q7Ozs0QkFFUWhCLEssRUFBT2dCLEssRUFBTztBQUNyQixXQUFLMUIsSUFBTCxDQUFVWSxJQUFWLHFCQUNHRixLQURILEVBQ1c7QUFDUGdCO0FBRE8sT0FEWDtBQUtEOzs7Ozs7a0JBdElrQnJDLFkiLCJmaWxlIjoicXVlcnlfYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9iamVjdCB9IGZyb20gJ3VuZGVyc2NvcmUnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWVyeUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvciAoaW5kZXgsIHR5cGUpIHtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXhcbiAgICB0aGlzLnR5cGUgPSB0eXBlXG4gICAgdGhpcy5tdXN0ID0gW11cbiAgICB0aGlzLm11c3Rfbm90ID0gW11cbiAgICB0aGlzLnNob3VsZCA9IFtdXG4gICAgdGhpcy5hZ2dzID0gW11cbiAgICB0aGlzLmJvb2xzID0ge1xuICAgICAgbXVzdDogdGhpcy5tdXN0LFxuICAgICAgbXVzdF9ub3Q6IHRoaXMubXVzdF9ub3QsXG4gICAgICBzaG91bGQ6IHRoaXMuc2hvdWxkXG4gICAgfVxuICAgIHRoaXMubGltaXQgPSAxMFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMucGFnZSA9IDBcbiAgICB0aGlzLnNvcnQgPSBbXVxuICB9XG5cbiAgYnVpbGQgKCkge1xuICAgIGxldCBmcm9tID0gdGhpcy5vZmZzZXQgPyB0aGlzLm9mZnNldCA6ICh0aGlzLnBhZ2UgKiB0aGlzLmxpbWl0KVxuICAgIHJldHVybiB7XG4gICAgICBpbmRleDogdGhpcy5pbmRleCxcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgc29ydDogdGhpcy5zb3J0LFxuICAgICAgICBzaXplOiB0aGlzLmxpbWl0LFxuICAgICAgICBmcm9tLFxuICAgICAgICBxdWVyeToge1xuICAgICAgICAgIGZpbHRlcmVkOiB7XG4gICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgYm9vbDoge1xuICAgICAgICAgICAgICAgIG11c3Q6IHRoaXMubXVzdCxcbiAgICAgICAgICAgICAgICBtdXN0X25vdDogdGhpcy5tdXN0X25vdCxcbiAgICAgICAgICAgICAgICBzaG91bGQ6IHRoaXMuc2hvdWxkXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFnZ3M6IG9iamVjdCh0aGlzLmFnZ3MpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkIChib29sVHlwZSwgZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKSB7XG4gICAgdGhpcy5ib29sc1tib29sVHlwZV0ucHVzaCh7XG4gICAgICBbZmlsdGVyVHlwZV06IHtcbiAgICAgICAgW2ZpZWxkXTogdmFsdWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYWRkUXVlcnlTdHJpbmcgKGJvb2xUeXBlLCBmaWVsZHMsIHF1ZXJ5KSB7XG4gICAgdGhpcy5ib29sc1tib29sVHlwZV0ucHVzaCh7XG4gICAgICBxdWVyeV9zdHJpbmc6IHtmaWVsZHMsIHF1ZXJ5fVxuICAgIH0pXG4gIH1cblxuICBhZGRNdXN0IChmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZCgnbXVzdCcsIGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSlcbiAgfVxuXG4gIGFkZE11c3RUZXJtIChmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZE11c3QoJ3Rlcm0nLCBmaWVsZCwgdmFsdWUpXG4gIH1cblxuICBhZGRNdXN0UXVlcnlTdHJpbmcgKGZpZWxkcywgcXVlcnkpIHtcbiAgICB0aGlzLmFkZFF1ZXJ5U3RyaW5nKCdtdXN0JywgZmllbGRzLCBxdWVyeSlcbiAgfVxuXG4gIGFkZE11c3ROb3QgKGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkKCdtdXN0X25vdCcsIGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSlcbiAgfVxuXG4gIGFkZE11c3ROb3RUZXJtIChmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZE11c3ROb3QoJ3Rlcm0nLCBmaWVsZCwgdmFsdWUpXG4gIH1cblxuICBhZGRNdXN0Tm90UXVlcnlTdHJpbmcgKGZpZWxkcywgcXVlcnkpIHtcbiAgICB0aGlzLmFkZFF1ZXJ5U3RyaW5nKCdtdXN0X25vdCcsIGZpZWxkcywgcXVlcnkpXG4gIH1cblxuICBhZGRTaG91bGQgKGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkKCdzaG91bGQnLCBmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpXG4gIH1cblxuICBhZGRTaG91bGRUZXJtIChmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZFNob3VsZCgndGVybScsIGZpZWxkLCB2YWx1ZSlcbiAgfVxuXG4gIGFkZFNob3VsZFF1ZXJ5U3RyaW5nIChmaWVsZHMsIHF1ZXJ5KSB7XG4gICAgdGhpcy5hZGRRdWVyeVN0cmluZygnbXVzdF9ub3QnLCBmaWVsZHMsIHF1ZXJ5KVxuICB9XG5cbiAgYWRkQWdnICh0eXBlLCBuYW1lLCBmaWVsZCwgb3B0aW9uKSB7XG4gICAgbGV0IGFnZyA9IHtcbiAgICAgIFt0eXBlXToge1xuICAgICAgICBmaWVsZFxuICAgICAgfVxuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKGFnZ1t0eXBlXSwgb3B0aW9uKVxuICAgIHRoaXMuYWdncy5wdXNoKFtuYW1lLCBhZ2ddKVxuICB9XG5cbiAgYWRkVGVybXNBZ2cgKG5hbWUsIGZpZWxkLCBvcHRpb24pIHtcbiAgICB0aGlzLmFkZEFnZygndGVybXMnLCBuYW1lLCBmaWVsZCwgb3B0aW9uKVxuICB9XG5cbiAgc2V0TGltaXQgKGxpbWl0KSB7XG4gICAgdGhpcy5saW1pdCA9IGxpbWl0XG4gIH1cblxuICBzZXRPZmZzZXQgKG9mZnNldCkge1xuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0XG4gIH1cblxuICBzZXRQYWdlIChwYWdlKSB7XG4gICAgdGhpcy5wYWdlID0gcGFnZVxuICB9XG5cbiAgc2V0U29ydCAoZmllbGQsIG9yZGVyKSB7XG4gICAgdGhpcy5zb3J0ID0gW3tcbiAgICAgIFtmaWVsZF06IHtcbiAgICAgICAgb3JkZXJcbiAgICAgIH1cbiAgICB9XVxuICB9XG5cbiAgYWRkU29ydCAoZmllbGQsIG9yZGVyKSB7XG4gICAgdGhpcy5zb3J0LnB1c2goe1xuICAgICAgW2ZpZWxkXToge1xuICAgICAgICBvcmRlclxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuIl19