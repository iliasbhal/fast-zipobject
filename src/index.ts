class FastZipObject {
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

  static createZipObject(props: string[], values: string[]) {
    const obj = new Proxy({} as Record<string, unknown>, {
      get(target, prop: string) {
        return target[prop] 
          || values[FastZipObject.getZipIndexOfProp(props)[prop]]
      }
    });
    return obj;
  }
}


export default FastZipObject.createZipObject;