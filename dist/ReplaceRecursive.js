"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
;
/**
 * replace all content witch checkArgType matches to to recursive
 */
exports.replace = function (source, check, to, option) {
    var _a, _b;
    if (option === void 0) { option = {}; }
    switch (true) {
        // if function
        case typeof source === 'function':
            if (typeof check === 'function') {
                if (!check(source))
                    return source;
                if (typeof to === 'function')
                    return to(source);
                return to;
            }
            if (typeof to === 'function')
                return to(source);
            if (source === check)
                return to;
            return source;
        // if regex
        case source instanceof RegExp:
            if (typeof check === 'function') {
                if (!check(source))
                    return source;
                if (typeof to === 'function')
                    return to(source);
                return to;
            }
            if (typeof to === 'function')
                return to(source);
            if (source === check)
                return to;
            return source;
        // if set
        case source instanceof Set:
            if (typeof check === 'function') {
                if (check(source)) {
                    if (typeof to === 'function')
                        return to(source);
                    return to;
                }
            }
            var set = new Set();
            for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
                var item = source_1[_i];
                set.add(exports.replace(item, check, to));
            }
            return set;
        // if array
        case Array.isArray(source):
            if (typeof check === 'function') {
                if (check(source)) {
                    if (typeof to === 'function')
                        return to(source);
                    return to;
                }
            }
            var arr = [];
            for (var _c = 0, source_2 = source; _c < source_2.length; _c++) {
                var item = source_2[_c];
                arr.push(exports.replace(item, check, to));
            }
            return arr;
        // if map
        case source instanceof Map:
            if (typeof check === 'function') {
                if (check(source)) {
                    if (typeof to === 'function')
                        return to(source);
                    return to;
                }
            }
            var map = new Map();
            for (var _d = 0, source_3 = source; _d < source_3.length; _d++) {
                var _e = source_3[_d], key = _e[0], value = _e[1];
                var newKey = ((_a = option.replaceKey) === null || _a === void 0 ? void 0 : _a.map) ? exports.replace(key, check, to) : key;
                map.set(newKey, exports.replace(value, check, to));
            }
            return map;
        // if object
        case source !== null && typeof source === 'object':
            if (typeof check === 'function') {
                if (check(source)) {
                    if (typeof to === 'function')
                        return to(source);
                    return to;
                }
            }
            var obj = {};
            for (var _f = 0, _g = Object.entries(source); _f < _g.length; _f++) {
                var _h = _g[_f], key = _h[0], value = _h[1];
                var newKey = ((_b = option.replaceKey) === null || _b === void 0 ? void 0 : _b.map) ? exports.replace(key, check, to) : key;
                obj[newKey] = exports.replace(value, check, to);
            }
            return obj;
        // if primitive
        default:
            if (typeof check === 'function') {
                if (!check(source))
                    return source;
                if (typeof to === 'function')
                    return to(source);
                return to;
            }
            if (check instanceof RegExp) {
                if (typeof source === 'string' && to === 'string')
                    return source.replace(check, to);
                if (!check.test(source))
                    return source;
                if (typeof to === 'function')
                    return to(source);
                return to;
            }
            // if to is function
            if (typeof to === 'function') {
                if (source !== check)
                    return source;
                return to(source);
            }
            return source === check ? to : source;
    }
};
