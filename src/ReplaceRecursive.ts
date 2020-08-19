interface Ioption {
  replaceKey?: {
    map?: boolean;
    object?: boolean;
  };
};

/**
 * replace all content witch checkArgType matches to to recursive
 */
export const replace: any = (source: any, check: any, to: any, option: Ioption = {} as Ioption) => {
  switch (true) {
    // if function
    case typeof source === 'function':
      if (typeof check === 'function') {
        if (!check(source)) return source;

        if (typeof to === 'function') return to(source);
        return to;
      }

      if (typeof to === 'function') return to(source);

      if (source === check) return to;
      return source;

    // if regex
    case source instanceof RegExp:
      if (typeof check === 'function') {
        if (!check(source)) return source;

        if (typeof to === 'function') return to(source);
        return to;
      }

      if (typeof to === 'function') return to(source);

      if (source === check) return to;
      return source;

    // if set
    case source instanceof Set:
      if (typeof check === 'function') {
        if (check(source)) {
          if (typeof to === 'function') return to(source);
          return to;
        }
      }

      const set = new Set();
      for (const item of source) set.add(replace(item, check, to));
      return set;

    // if array
    case Array.isArray(source):
      if (typeof check === 'function') {
        if (check(source)) {
          if (typeof to === 'function') return to(source);
          return to;
        }
      }

      const arr = [];
      for (const item of source) arr.push(replace(item, check, to));
      return arr;

    // if map
    case source instanceof Map:
      if (typeof check === 'function') {
        if (check(source)) {
          if (typeof to === 'function') return to(source);
          return to;
        }
      }

      const map = new Map();
      for (const [key, value] of source) {
        const newKey = option.replaceKey?.map ? replace(key, check, to) : key;
        map.set(newKey, replace(value, check, to));
      }
      return map;

    // if object
    case source !== null && typeof source === 'object':
      if (typeof check === 'function') {
        if (check(source)) {
          if (typeof to === 'function') return to(source);
          return to;
        }
      }

      const obj: {[key: string]: any} = {};
      for (const [key, value] of Object.entries(source)) {
        const newKey = option.replaceKey?.map ? replace(key, check, to) : key;
        obj[newKey] = replace(value, check, to);
      }
      return obj;

    // if primitive
    default:
      if (typeof check === 'function') {
        if (!check(source)) return source;

        if (typeof to === 'function') return to(source);
        return to;
      }

      if (check instanceof RegExp) {
        if (typeof source === 'string' && to === 'string') return source.replace(check, to);

        if (!check.test(source)) return source;

        if (typeof to === 'function') return to(source);
        return to;
      }

      // if to is function
      if (typeof to === 'function') {
        if (source !== check) return source;
        return to(source);
      }

      return source === check ? to : source;
  }
};
