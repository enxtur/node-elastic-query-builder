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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyeV9idWlsZGVyLmpzIl0sIm5hbWVzIjpbIlF1ZXJ5QnVpbGRlciIsImluZGV4IiwidHlwZSIsIm11c3QiLCJtdXN0X25vdCIsInNob3VsZCIsImFnZ3MiLCJib29scyIsImxpbWl0IiwicGFnZSIsInNvcnQiLCJmcm9tIiwiYm9keSIsInNpemUiLCJxdWVyeSIsImZpbHRlcmVkIiwiZmlsdGVyIiwiYm9vbCIsImJvb2xUeXBlIiwiZmlsdGVyVHlwZSIsImZpZWxkIiwidmFsdWUiLCJwdXNoIiwiZmllbGRzIiwicXVlcnlfc3RyaW5nIiwiYWRkIiwiYWRkTXVzdCIsImFkZFF1ZXJ5U3RyaW5nIiwiYWRkTXVzdE5vdCIsImFkZFNob3VsZCIsIm5hbWUiLCJvcHRpb24iLCJhZ2ciLCJPYmplY3QiLCJhc3NpZ24iLCJhZGRBZ2ciLCJvcmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7O0lBQ3FCQSxZO0FBQ25CLHdCQUFhQyxLQUFiLEVBQW9CQyxJQUFwQixFQUEwQjtBQUFBOztBQUN4QixTQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsU0FBS0MsS0FBTCxHQUFhO0FBQ1hKLFlBQU0sS0FBS0EsSUFEQTtBQUVYQyxnQkFBVSxLQUFLQSxRQUZKO0FBR1hDLGNBQVEsS0FBS0E7QUFIRixLQUFiO0FBS0EsU0FBS0csS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0Q7Ozs7NEJBRVE7QUFDUCxVQUFJQyxPQUFPLEtBQUtGLElBQUwsR0FBWSxLQUFLRCxLQUE1QjtBQUNBLGFBQU87QUFDTFAsZUFBTyxLQUFLQSxLQURQO0FBRUxDLGNBQU0sS0FBS0EsSUFGTjtBQUdMVSxjQUFNO0FBQ0pGLGdCQUFNLEtBQUtBLElBRFA7QUFFSkcsZ0JBQU0sS0FBS0wsS0FGUDtBQUdKRyxvQkFISTtBQUlKRyxpQkFBTztBQUNMQyxzQkFBVTtBQUNSQyxzQkFBUTtBQUNOQyxzQkFBTTtBQUNKZCx3QkFBTSxLQUFLQSxJQURQO0FBRUpDLDRCQUFVLEtBQUtBLFFBRlg7QUFHSkMsMEJBQVEsS0FBS0E7QUFIVDtBQURBO0FBREE7QUFETCxXQUpIO0FBZUpDLGdCQUFNLHdCQUFPLEtBQUtBLElBQVo7QUFmRjtBQUhELE9BQVA7QUFxQkQ7Ozt3QkFFSVksUSxFQUFVQyxVLEVBQVlDLEssRUFBT0MsSyxFQUFPO0FBQ3ZDLFdBQUtkLEtBQUwsQ0FBV1csUUFBWCxFQUFxQkksSUFBckIscUJBQ0dILFVBREgsc0JBRUtDLEtBRkwsRUFFYUMsS0FGYjtBQUtEOzs7bUNBRWVILFEsRUFBVUssTSxFQUFRVCxLLEVBQU87QUFDdkMsV0FBS1AsS0FBTCxDQUFXVyxRQUFYLEVBQXFCSSxJQUFyQixDQUEwQjtBQUN4QkUsc0JBQWMsRUFBQ0QsY0FBRCxFQUFTVCxZQUFUO0FBRFUsT0FBMUI7QUFHRDs7OzRCQUVRSyxVLEVBQVlDLEssRUFBT0MsSyxFQUFPO0FBQ2pDLFdBQUtJLEdBQUwsQ0FBUyxNQUFULEVBQWlCTixVQUFqQixFQUE2QkMsS0FBN0IsRUFBb0NDLEtBQXBDO0FBQ0Q7OztnQ0FFWUQsSyxFQUFPQyxLLEVBQU87QUFDekIsV0FBS0ssT0FBTCxDQUFhLE1BQWIsRUFBcUJOLEtBQXJCLEVBQTRCQyxLQUE1QjtBQUNEOzs7dUNBRW1CRSxNLEVBQVFULEssRUFBTztBQUNqQyxXQUFLYSxjQUFMLENBQW9CLE1BQXBCLEVBQTRCSixNQUE1QixFQUFvQ1QsS0FBcEM7QUFDRDs7OytCQUVXSyxVLEVBQVlDLEssRUFBT0MsSyxFQUFPO0FBQ3BDLFdBQUtJLEdBQUwsQ0FBUyxVQUFULEVBQXFCTixVQUFyQixFQUFpQ0MsS0FBakMsRUFBd0NDLEtBQXhDO0FBQ0Q7OzttQ0FFZUQsSyxFQUFPQyxLLEVBQU87QUFDNUIsV0FBS08sVUFBTCxDQUFnQixNQUFoQixFQUF3QlIsS0FBeEIsRUFBK0JDLEtBQS9CO0FBQ0Q7OzswQ0FFc0JFLE0sRUFBUVQsSyxFQUFPO0FBQ3BDLFdBQUthLGNBQUwsQ0FBb0IsVUFBcEIsRUFBZ0NKLE1BQWhDLEVBQXdDVCxLQUF4QztBQUNEOzs7OEJBRVVLLFUsRUFBWUMsSyxFQUFPQyxLLEVBQU87QUFDbkMsV0FBS0ksR0FBTCxDQUFTLFFBQVQsRUFBbUJOLFVBQW5CLEVBQStCQyxLQUEvQixFQUFzQ0MsS0FBdEM7QUFDRDs7O2tDQUVjRCxLLEVBQU9DLEssRUFBTztBQUMzQixXQUFLUSxTQUFMLENBQWUsTUFBZixFQUF1QlQsS0FBdkIsRUFBOEJDLEtBQTlCO0FBQ0Q7Ozt5Q0FFcUJFLE0sRUFBUVQsSyxFQUFPO0FBQ25DLFdBQUthLGNBQUwsQ0FBb0IsVUFBcEIsRUFBZ0NKLE1BQWhDLEVBQXdDVCxLQUF4QztBQUNEOzs7MkJBRU9aLEksRUFBTTRCLEksRUFBTVYsSyxFQUFPVyxNLEVBQVE7QUFDakMsVUFBSUMsMEJBQ0Q5QixJQURDLEVBQ007QUFDTmtCO0FBRE0sT0FETixDQUFKO0FBS0FhLGFBQU9DLE1BQVAsQ0FBY0YsSUFBSTlCLElBQUosQ0FBZCxFQUF5QjZCLE1BQXpCO0FBQ0EsV0FBS3pCLElBQUwsQ0FBVWdCLElBQVYsQ0FBZSxDQUFDUSxJQUFELEVBQU9FLEdBQVAsQ0FBZjtBQUNEOzs7Z0NBRVlGLEksRUFBTVYsSyxFQUFPVyxNLEVBQVE7QUFDaEMsV0FBS0ksTUFBTCxDQUFZLE9BQVosRUFBcUJMLElBQXJCLEVBQTJCVixLQUEzQixFQUFrQ1csTUFBbEM7QUFDRDs7OzZCQUVTdkIsSyxFQUFPO0FBQ2YsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7Ozs0QkFFUUMsSSxFQUFNO0FBQ2IsV0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7Ozs0QkFFUVcsSyxFQUFPZ0IsSyxFQUFPO0FBQ3JCLFdBQUsxQixJQUFMLEdBQVkscUJBQ1RVLEtBRFMsRUFDRDtBQUNQZ0I7QUFETyxPQURDLEVBQVo7QUFLRDs7OzRCQUVRaEIsSyxFQUFPZ0IsSyxFQUFPO0FBQ3JCLFdBQUsxQixJQUFMLENBQVVZLElBQVYscUJBQ0dGLEtBREgsRUFDVztBQUNQZ0I7QUFETyxPQURYO0FBS0Q7Ozs7OztrQkFqSWtCcEMsWSIsImZpbGUiOiJxdWVyeV9idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JqZWN0IH0gZnJvbSAndW5kZXJzY29yZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXJ5QnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yIChpbmRleCwgdHlwZSkge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleFxuICAgIHRoaXMudHlwZSA9IHR5cGVcbiAgICB0aGlzLm11c3QgPSBbXVxuICAgIHRoaXMubXVzdF9ub3QgPSBbXVxuICAgIHRoaXMuc2hvdWxkID0gW11cbiAgICB0aGlzLmFnZ3MgPSBbXVxuICAgIHRoaXMuYm9vbHMgPSB7XG4gICAgICBtdXN0OiB0aGlzLm11c3QsXG4gICAgICBtdXN0X25vdDogdGhpcy5tdXN0X25vdCxcbiAgICAgIHNob3VsZDogdGhpcy5zaG91bGRcbiAgICB9XG4gICAgdGhpcy5saW1pdCA9IDEwXG4gICAgdGhpcy5wYWdlID0gMFxuICAgIHRoaXMuc29ydCA9IFtdXG4gIH1cblxuICBidWlsZCAoKSB7XG4gICAgbGV0IGZyb20gPSB0aGlzLnBhZ2UgKiB0aGlzLmxpbWl0XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgYm9keToge1xuICAgICAgICBzb3J0OiB0aGlzLnNvcnQsXG4gICAgICAgIHNpemU6IHRoaXMubGltaXQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgZmlsdGVyZWQ6IHtcbiAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICBib29sOiB7XG4gICAgICAgICAgICAgICAgbXVzdDogdGhpcy5tdXN0LFxuICAgICAgICAgICAgICAgIG11c3Rfbm90OiB0aGlzLm11c3Rfbm90LFxuICAgICAgICAgICAgICAgIHNob3VsZDogdGhpcy5zaG91bGRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWdnczogb2JqZWN0KHRoaXMuYWdncylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGQgKGJvb2xUeXBlLCBmaWx0ZXJUeXBlLCBmaWVsZCwgdmFsdWUpIHtcbiAgICB0aGlzLmJvb2xzW2Jvb2xUeXBlXS5wdXNoKHtcbiAgICAgIFtmaWx0ZXJUeXBlXToge1xuICAgICAgICBbZmllbGRdOiB2YWx1ZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBhZGRRdWVyeVN0cmluZyAoYm9vbFR5cGUsIGZpZWxkcywgcXVlcnkpIHtcbiAgICB0aGlzLmJvb2xzW2Jvb2xUeXBlXS5wdXNoKHtcbiAgICAgIHF1ZXJ5X3N0cmluZzoge2ZpZWxkcywgcXVlcnl9XG4gICAgfSlcbiAgfVxuXG4gIGFkZE11c3QgKGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkKCdtdXN0JywgZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKVxuICB9XG5cbiAgYWRkTXVzdFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkTXVzdCgndGVybScsIGZpZWxkLCB2YWx1ZSlcbiAgfVxuXG4gIGFkZE11c3RRdWVyeVN0cmluZyAoZmllbGRzLCBxdWVyeSkge1xuICAgIHRoaXMuYWRkUXVlcnlTdHJpbmcoJ211c3QnLCBmaWVsZHMsIHF1ZXJ5KVxuICB9XG5cbiAgYWRkTXVzdE5vdCAoZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKSB7XG4gICAgdGhpcy5hZGQoJ211c3Rfbm90JywgZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKVxuICB9XG5cbiAgYWRkTXVzdE5vdFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkTXVzdE5vdCgndGVybScsIGZpZWxkLCB2YWx1ZSlcbiAgfVxuXG4gIGFkZE11c3ROb3RRdWVyeVN0cmluZyAoZmllbGRzLCBxdWVyeSkge1xuICAgIHRoaXMuYWRkUXVlcnlTdHJpbmcoJ211c3Rfbm90JywgZmllbGRzLCBxdWVyeSlcbiAgfVxuXG4gIGFkZFNob3VsZCAoZmlsdGVyVHlwZSwgZmllbGQsIHZhbHVlKSB7XG4gICAgdGhpcy5hZGQoJ3Nob3VsZCcsIGZpbHRlclR5cGUsIGZpZWxkLCB2YWx1ZSlcbiAgfVxuXG4gIGFkZFNob3VsZFRlcm0gKGZpZWxkLCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkU2hvdWxkKCd0ZXJtJywgZmllbGQsIHZhbHVlKVxuICB9XG5cbiAgYWRkU2hvdWxkUXVlcnlTdHJpbmcgKGZpZWxkcywgcXVlcnkpIHtcbiAgICB0aGlzLmFkZFF1ZXJ5U3RyaW5nKCdtdXN0X25vdCcsIGZpZWxkcywgcXVlcnkpXG4gIH1cblxuICBhZGRBZ2cgKHR5cGUsIG5hbWUsIGZpZWxkLCBvcHRpb24pIHtcbiAgICBsZXQgYWdnID0ge1xuICAgICAgW3R5cGVdOiB7XG4gICAgICAgIGZpZWxkXG4gICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24oYWdnW3R5cGVdLCBvcHRpb24pXG4gICAgdGhpcy5hZ2dzLnB1c2goW25hbWUsIGFnZ10pXG4gIH1cblxuICBhZGRUZXJtc0FnZyAobmFtZSwgZmllbGQsIG9wdGlvbikge1xuICAgIHRoaXMuYWRkQWdnKCd0ZXJtcycsIG5hbWUsIGZpZWxkLCBvcHRpb24pXG4gIH1cblxuICBzZXRMaW1pdCAobGltaXQpIHtcbiAgICB0aGlzLmxpbWl0ID0gbGltaXRcbiAgfVxuXG4gIHNldFBhZ2UgKHBhZ2UpIHtcbiAgICB0aGlzLnBhZ2UgPSBwYWdlXG4gIH1cblxuICBzZXRTb3J0IChmaWVsZCwgb3JkZXIpIHtcbiAgICB0aGlzLnNvcnQgPSBbe1xuICAgICAgW2ZpZWxkXToge1xuICAgICAgICBvcmRlclxuICAgICAgfVxuICAgIH1dXG4gIH1cblxuICBhZGRTb3J0IChmaWVsZCwgb3JkZXIpIHtcbiAgICB0aGlzLnNvcnQucHVzaCh7XG4gICAgICBbZmllbGRdOiB7XG4gICAgICAgIG9yZGVyXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4iXX0=