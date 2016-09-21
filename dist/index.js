'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Provider = function () {
  function _Provider() {
    _classCallCheck(this, _Provider);
  }

  _createClass(_Provider, [{
    key: 'init',
    value: function init(store, mithril, Component) {
      this.store = store;
      this.mithril = mithril;
      var comp = typeof Component === 'function' ? new Component() : Component;
      return comp;
    }
  }]);

  return _Provider;
}();

var Provider = exports.Provider = new _Provider();

function wrapView(comp, actionMap) {
  var origView = comp.view;
  comp.view = function (ctrl) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var nc = _extends({}, ctrl, actionMap);
    return origView.apply(undefined, [nc].concat(args));
  };
}

var dispatchFactory = function dispatchFactory(creator, dispatch) {
  return function () {
    for (var _len2 = arguments.length, factoryArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      factoryArgs[_key2] = arguments[_key2];
    }

    return function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return dispatch(creator.apply(undefined, factoryArgs.concat(args)));
    };
  };
};

var connect = exports.connect = function connect(selector, actions) {
  return function (Component) {
    return {
      view: function view(controller, props, children) {
        var _Provider$store = Provider.store;
        var dispatch = _Provider$store.dispatch;
        var getState = _Provider$store.getState;

        var actionMap = {};
        if (typeof actions === 'function') {
          actionMap = actions(dispatch);
        } else if ((typeof actions === 'undefined' ? 'undefined' : _typeof(actions)) === 'object') {
          var actionKeys = Object.keys(actions);
          var k = void 0;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = actionKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              k = _step.value;

              if (typeof actions[k] === 'function') {
                actionMap[k] = dispatchFactory(actions[k], dispatch);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
        var state = selector(getState());
        var comp = typeof Component === 'function' ? new Component() : Component;
        wrapView(comp, actionMap);
        return Provider.mithril(comp, _extends({ dispatch: dispatch }, state, actionMap, props), children);
      }
    };
  };
};

var redrawMiddleware = exports.redrawMiddleware = function redrawMiddleware() {
  return function (next) {
    return function (action) {
      next(action);
      if ((action.redraw || action.meta && action.meta.redraw) && Provider.mithril) {
        Provider.mithril.redraw();
      }
    };
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIl9Qcm92aWRlciIsInN0b3JlIiwibWl0aHJpbCIsIkNvbXBvbmVudCIsImNvbXAiLCJQcm92aWRlciIsIndyYXBWaWV3IiwiYWN0aW9uTWFwIiwib3JpZ1ZpZXciLCJ2aWV3IiwiY3RybCIsImFyZ3MiLCJuYyIsImRpc3BhdGNoRmFjdG9yeSIsImNyZWF0b3IiLCJkaXNwYXRjaCIsImZhY3RvcnlBcmdzIiwiY29ubmVjdCIsInNlbGVjdG9yIiwiYWN0aW9ucyIsImNvbnRyb2xsZXIiLCJwcm9wcyIsImNoaWxkcmVuIiwiZ2V0U3RhdGUiLCJhY3Rpb25LZXlzIiwiT2JqZWN0Iiwia2V5cyIsImsiLCJzdGF0ZSIsInJlZHJhd01pZGRsZXdhcmUiLCJuZXh0IiwiYWN0aW9uIiwicmVkcmF3IiwibWV0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBTUEsUzs7Ozs7Ozt5QkFDRUMsSyxFQUFPQyxPLEVBQVNDLFMsRUFBVztBQUMvQixXQUFLRixLQUFMLEdBQWFBLEtBQWI7QUFDQSxXQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxVQUFNRSxPQUFPLE9BQU9ELFNBQVAsS0FBcUIsVUFBckIsR0FBa0MsSUFBSUEsU0FBSixFQUFsQyxHQUFvREEsU0FBakU7QUFDQSxhQUFPQyxJQUFQO0FBQ0Q7Ozs7OztBQUdJLElBQU1DLDhCQUFXLElBQUlMLFNBQUosRUFBakI7O0FBR1AsU0FBU00sUUFBVCxDQUFtQkYsSUFBbkIsRUFBeUJHLFNBQXpCLEVBQW9DO0FBQ2xDLE1BQU1DLFdBQVdKLEtBQUtLLElBQXRCO0FBQ0FMLE9BQUtLLElBQUwsR0FBWSxVQUFDQyxJQUFELEVBQW1CO0FBQUEsc0NBQVRDLElBQVM7QUFBVEEsVUFBUztBQUFBOztBQUM3QixRQUFNQyxrQkFBU0YsSUFBVCxFQUFrQkgsU0FBbEIsQ0FBTjtBQUNBLFdBQU9DLDJCQUFTSSxFQUFULFNBQWdCRCxJQUFoQixFQUFQO0FBQ0QsR0FIRDtBQUlEOztBQUVELElBQU1FLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0MsT0FBRCxFQUFVQyxRQUFWO0FBQUEsU0FBdUI7QUFBQSx1Q0FBSUMsV0FBSjtBQUFJQSxpQkFBSjtBQUFBOztBQUFBLFdBQW9CO0FBQUEseUNBQUlMLElBQUo7QUFBSUEsWUFBSjtBQUFBOztBQUFBLGFBQWFJLFNBQVNELHlCQUFXRSxXQUFYLFFBQTJCTCxJQUEzQixFQUFULENBQWI7QUFBQSxLQUFwQjtBQUFBLEdBQXZCO0FBQUEsQ0FBeEI7O0FBRU8sSUFBTU0sNEJBQVUsU0FBVkEsT0FBVSxDQUFDQyxRQUFELEVBQVdDLE9BQVg7QUFBQSxTQUF1QixVQUFDaEIsU0FBRDtBQUFBLFdBQWdCO0FBQzVETSxVQUQ0RCxnQkFDdERXLFVBRHNELEVBQzFDQyxLQUQwQyxFQUNuQ0MsUUFEbUMsRUFDekI7QUFBQSw4QkFDSmpCLFNBQVNKLEtBREw7QUFBQSxZQUMxQmMsUUFEMEIsbUJBQzFCQSxRQUQwQjtBQUFBLFlBQ2hCUSxRQURnQixtQkFDaEJBLFFBRGdCOztBQUVqQyxZQUFJaEIsWUFBWSxFQUFoQjtBQUNBLFlBQUksT0FBT1ksT0FBUCxLQUFtQixVQUF2QixFQUFtQztBQUNqQ1osc0JBQVlZLFFBQVFKLFFBQVIsQ0FBWjtBQUNELFNBRkQsTUFFTyxJQUFJLFFBQU9JLE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBdkIsRUFBaUM7QUFDdEMsY0FBTUssYUFBYUMsT0FBT0MsSUFBUCxDQUFZUCxPQUFaLENBQW5CO0FBQ0EsY0FBSVEsVUFBSjtBQUZzQztBQUFBO0FBQUE7O0FBQUE7QUFHdEMsaUNBQVVILFVBQVYsOEhBQXNCO0FBQWpCRyxlQUFpQjs7QUFDcEIsa0JBQUksT0FBT1IsUUFBUVEsQ0FBUixDQUFQLEtBQXNCLFVBQTFCLEVBQXNDO0FBQ3BDcEIsMEJBQVVvQixDQUFWLElBQWVkLGdCQUFnQk0sUUFBUVEsQ0FBUixDQUFoQixFQUE0QlosUUFBNUIsQ0FBZjtBQUNEO0FBQ0Y7QUFQcUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVF2QztBQUNELFlBQU1hLFFBQVFWLFNBQVNLLFVBQVQsQ0FBZDtBQUNBLFlBQU1uQixPQUFPLE9BQU9ELFNBQVAsS0FBcUIsVUFBckIsR0FBa0MsSUFBSUEsU0FBSixFQUFsQyxHQUFvREEsU0FBakU7QUFDQUcsaUJBQVNGLElBQVQsRUFBZUcsU0FBZjtBQUNBLGVBQU9GLFNBQVNILE9BQVQsQ0FBaUJFLElBQWpCLGFBQXdCVyxrQkFBeEIsSUFBcUNhLEtBQXJDLEVBQStDckIsU0FBL0MsRUFBNkRjLEtBQTdELEdBQXFFQyxRQUFyRSxDQUFQO0FBQ0Q7QUFuQjJELEtBQWhCO0FBQUEsR0FBdkI7QUFBQSxDQUFoQjs7QUFzQkEsSUFBTU8sOENBQW1CLFNBQW5CQSxnQkFBbUI7QUFBQSxTQUFNLFVBQUNDLElBQUQ7QUFBQSxXQUFVLFVBQUNDLE1BQUQsRUFBWTtBQUMxREQsV0FBS0MsTUFBTDtBQUNBLFVBQUksQ0FBQ0EsT0FBT0MsTUFBUCxJQUFrQkQsT0FBT0UsSUFBUCxJQUFlRixPQUFPRSxJQUFQLENBQVlELE1BQTlDLEtBQTBEM0IsU0FBU0gsT0FBdkUsRUFBZ0Y7QUFDOUVHLGlCQUFTSCxPQUFULENBQWlCOEIsTUFBakI7QUFDRDtBQUNGLEtBTHFDO0FBQUEsR0FBTjtBQUFBLENBQXpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgX1Byb3ZpZGVyIHtcbiAgaW5pdCAoc3RvcmUsIG1pdGhyaWwsIENvbXBvbmVudCkge1xuICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcbiAgICB0aGlzLm1pdGhyaWwgPSBtaXRocmlsO1xuICAgIGNvbnN0IGNvbXAgPSB0eXBlb2YgQ29tcG9uZW50ID09PSAnZnVuY3Rpb24nID8gbmV3IENvbXBvbmVudCgpIDogQ29tcG9uZW50O1xuICAgIHJldHVybiBjb21wO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQcm92aWRlciA9IG5ldyBfUHJvdmlkZXIoKTtcblxuXG5mdW5jdGlvbiB3cmFwVmlldyAoY29tcCwgYWN0aW9uTWFwKSB7XG4gIGNvbnN0IG9yaWdWaWV3ID0gY29tcC52aWV3O1xuICBjb21wLnZpZXcgPSAoY3RybCwgLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IG5jID0gey4uLmN0cmwsIC4uLmFjdGlvbk1hcH07XG4gICAgcmV0dXJuIG9yaWdWaWV3KG5jLCAuLi5hcmdzKTtcbiAgfTtcbn1cblxuY29uc3QgZGlzcGF0Y2hGYWN0b3J5ID0gKGNyZWF0b3IsIGRpc3BhdGNoKSA9PiAoLi4uZmFjdG9yeUFyZ3MpID0+ICguLi5hcmdzKSA9PiBkaXNwYXRjaChjcmVhdG9yKC4uLmZhY3RvcnlBcmdzLCAuLi5hcmdzKSk7XG5cbmV4cG9ydCBjb25zdCBjb25uZWN0ID0gKHNlbGVjdG9yLCBhY3Rpb25zKSA9PiAoQ29tcG9uZW50KSA9PiAoe1xuICB2aWV3IChjb250cm9sbGVyLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICBjb25zdCB7ZGlzcGF0Y2gsIGdldFN0YXRlfSA9IFByb3ZpZGVyLnN0b3JlO1xuICAgIGxldCBhY3Rpb25NYXAgPSB7fTtcbiAgICBpZiAodHlwZW9mIGFjdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFjdGlvbk1hcCA9IGFjdGlvbnMoZGlzcGF0Y2gpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFjdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBhY3Rpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aW9ucyk7XG4gICAgICBsZXQgaztcbiAgICAgIGZvciAoayBvZiBhY3Rpb25LZXlzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uc1trXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGFjdGlvbk1hcFtrXSA9IGRpc3BhdGNoRmFjdG9yeShhY3Rpb25zW2tdLCBkaXNwYXRjaCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RhdGUgPSBzZWxlY3RvcihnZXRTdGF0ZSgpKTtcbiAgICBjb25zdCBjb21wID0gdHlwZW9mIENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBDb21wb25lbnQoKSA6IENvbXBvbmVudDtcbiAgICB3cmFwVmlldyhjb21wLCBhY3Rpb25NYXApO1xuICAgIHJldHVybiBQcm92aWRlci5taXRocmlsKGNvbXAsIHtkaXNwYXRjaCwgLi4uc3RhdGUsIC4uLmFjdGlvbk1hcCwgLi4ucHJvcHN9LCBjaGlsZHJlbik7XG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgcmVkcmF3TWlkZGxld2FyZSA9ICgpID0+IChuZXh0KSA9PiAoYWN0aW9uKSA9PiB7XG4gIG5leHQoYWN0aW9uKTtcbiAgaWYgKChhY3Rpb24ucmVkcmF3IHx8IChhY3Rpb24ubWV0YSAmJiBhY3Rpb24ubWV0YS5yZWRyYXcpKSAmJiBQcm92aWRlci5taXRocmlsKSB7XG4gICAgUHJvdmlkZXIubWl0aHJpbC5yZWRyYXcoKTtcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
