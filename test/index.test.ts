import fastZipObject from '../src';

describe('fastZipObject', () => {
  it('should access attributes', () => {
    const props = ['prop1', 'prop2'];
    const values = ['hello', 'john doe'];

    const zipped = fastZipObject(props, values);
    expect(zipped.prop1).toEqual('hello');
    expect(zipped.prop2).toEqual('john doe');
  });

  it('should return undefined', () => {
    const props = ['prop1', 'prop2'];
    const values = ['hello', 'john doe'];

    const zipped = fastZipObject(props, values);
    expect(zipped.anotherProp).toEqual(undefined);
  });

  it('should update attribute', () => {
    const props = ['prop1', 'prop2'];
    const values = ['hello', 'john doe'];

    const zipped = fastZipObject(props, values);
    zipped.prop1 = 'bye';
    expect(zipped.prop1).toEqual('bye');
  });

});
