export class FastZipObject {
  static zipIndexesByProps = new Map<string[], Record<string, number>>();
  static getZipIndexOfProp = (headers: string[]) => {
    let memoizedIndexes = FastZipObject.zipIndexesByProps.get(headers);
    if (memoizedIndexes) {
      return memoizedIndexes;
    }

    memoizedIndexes = headers.reduce((acc, header, i) => {
      acc[header] = i;
      return acc;
    }, {} as Record<string, number>);
    FastZipObject.zipIndexesByProps.set(headers, memoizedIndexes);
    return memoizedIndexes;
  };

  static LENGTH_THRESHOLD = 11;
  static createZipObject(props: string[], values: string[]) {
    if (props.length >= FastZipObject.LENGTH_THRESHOLD) {
      return FastZipObject.createProxyZipObject(props, values);
    }

    return FastZipObject.createSimpleZipObject(props, values);
  }

  static createSimpleZipObject(props: string[], values: string[]) {
    let obj :Record<string, unknown> = {};

    for(let i = 0; i < props.length; i++) {
      obj[props[i]] = values[i];
    }

    return obj;
  }

  static createProxyZipObject(props: string[], values: string[]) {
    return new Proxy({},  {
      get(target: any, prop: string) {
        return target[prop] 
          || values[FastZipObject.getZipIndexOfProp(props)[prop]]
      }
    });
  }
}