import fastZipObject from '../src';
import { performance } from 'perf_hooks';
import * as _ from 'lodash';

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



  testSpeedImprovement(3, 1.5);
  testSpeedImprovement(5, 2);
  testSpeedImprovement(10, 2);
  testSpeedImprovement(20, 3);
  testSpeedImprovement(30, 4);
  
  function testSpeedImprovement(numberOfProps: number, expectedSpeedYield: number) {
      it(`should be faster than lodash (array of ${numberOfProps} should be ${expectedSpeedYield}x faster)`, () => {
        const { props, values } = createPropsAndValues(numberOfProps);
    
        const startLodash = performance.now();
        for (let i = 0; i < 1000000; i++) {
          _.zipObject(props, values);
        }
        const lodashSpeed = performance.now() - startLodash;
    
    
        const startFastZip = performance.now();
        for (let i = 0; i < 1000000; i++) {
          fastZipObject(props, values);
        }

        const fastZipSpeed = performance.now() - startFastZip;
        expect(fastZipSpeed * expectedSpeedYield).toBeLessThan(lodashSpeed);
      });
    }
});

function createPropsAndValues(length: number) {
  const props = _.range(0, length).map((num) => `prop${num}`);
  const values = _.range(0, length).map((num) => `values${num}`);

  return {
    props,
    values,
  }
}
