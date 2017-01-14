'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function Cordial() {
  function cordial(input) {
    var parsed = cordial.parse(input);

    var category = void 0,
        match = false,
        finalTemplate = void 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(cordial.categories)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        category = cordial.categories[key];

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = category[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _step2.value,
                pattern = _step2$value.pattern,
                template = _step2$value.template,
                post = _step2$value.post,
                type = _step2$value.type;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = pattern[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var value = _step3.value;

                if (typeof pattern === 'string') {
                  switch (type) {
                    case 'startsWith':
                    case 'endsWith':
                      match = parsed[type](value);
                      break;
                    default:
                      // case 'isEqualTo':
                      match = parsed === value;
                  }
                } else {
                  match = !!parsed.match(pattern);
                }

                if (match) {
                  finalTemplate = template;

                  while (!(typeof finalTemplate === 'string' || Cordial.isElement(finalTemplate))) {
                    if (Array.isArray(finalTemplate)) {
                      finalTemplate = Cordial.getRandomValue(finalTemplate);
                    } else if (typeof finalTemplate === 'function') {
                      finalTemplate = finalTemplate(parsed);
                    }
                  }

                  if (typeof finalTemplate === 'string' && post && post.length > 0) {
                    finalTemplate += Cordial.getRandomValue(post);
                  }

                  return finalTemplate;
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
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

    return cordial.fallback();
  }

  cordial.categories = {};

  cordial.parse = function (input) {
    return input.toLowerCase().replace(/(\?|!|,|"|')+|^(\.|\s)+|(\.|\s)+$/g, '').replace(/\s+/g, ' ');
  };

  cordial.fallback = function () {
    return null;
  };

  return cordial;
}

Cordial.isElement = function (obj) {
  return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
};

Cordial.getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
