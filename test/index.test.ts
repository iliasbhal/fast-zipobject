import fastZipObject from '../src';
import { FastZipObject } from '../src/FastZipObject';
import { performance } from 'perf_hooks';
import * as _ from 'lodash';

describe('fastZipObject', () => {
  it('should access attributes', () => {
    const { props, values } = createPropsAndValues(
      FastZipObject.LENGTH_THRESHOLD
    );
    const zipped = fastZipObject(props, values);

    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      const value = values[i];
      expect(zipped[prop]).toEqual(value);
    }
  });

  it('should return undefined', () => {
    const { props, values } = createPropsAndValues(
      FastZipObject.LENGTH_THRESHOLD
    );

    const zipped = fastZipObject(props, values);
    expect(zipped.anotherProp).toEqual(undefined);
  });

  it('should update attribute', () => {
    const { props, values } = createPropsAndValues(
      FastZipObject.LENGTH_THRESHOLD
    );
    const zipped = fastZipObject(props, values);

    zipped.prop1 = 'bye';

    expect(zipped.prop1).toEqual('bye');
  });

  it('should work with Object.getOwnPropertyNames', () => {
    const { props, values } = createPropsAndValues(
      FastZipObject.LENGTH_THRESHOLD
    );
    const zipped = fastZipObject(props, values);
    const properties = Object.getOwnPropertyNames(zipped);

    expect(Array.isArray(properties)).toBeTruthy();
    expect(properties).toMatchObject(props);
  });

  it('should work with Object.keys', () => {
    const { props, values } = createPropsAndValues(
      FastZipObject.LENGTH_THRESHOLD
    );
    const zipped = fastZipObject(props, values);
    const properties = Object.keys(zipped);

    expect(Array.isArray(properties)).toBeTruthy();
    expect(properties).toMatchObject(props);
  });

  it('should work with Object.values', () => {
    const { props, values } = createPropsAndValues(
      FastZipObject.LENGTH_THRESHOLD
    );
    const zipped = fastZipObject(props, values);
    const properties = Object.values(zipped);

    expect(Array.isArray(properties)).toBeTruthy();
    expect(properties).toMatchObject(values);
  });

  it('should not references of props to avoid memory leaks', () => {
    const { props, values } = createPropsAndValues(
      FastZipObject.LENGTH_THRESHOLD
    );
    const zipped = fastZipObject(props, values);

    const sampleProp = props.pop()!;
    props.splice(0);

    expect(zipped[sampleProp]).toBeTruthy();
  });

  it('should not references of values to avoid memory leaks', () => {
    const { props, values } = createPropsAndValues(
      FastZipObject.LENGTH_THRESHOLD
    );
    const zipped = fastZipObject(props, values);

    const sampleProp = props[0];
    const expectedValue = values.shift()!;

    values.splice(0);

    expect(zipped[sampleProp]).toEqual(expectedValue);
  });

  testSpeedImprovement(3, 1.5);
  testSpeedImprovement(5, 2);
  testSpeedImprovement(10, 2);
  testSpeedImprovement(20, 3);
  testSpeedImprovement(30, 4);

  function testSpeedImprovement(
    numberOfProps: number,
    expectedSpeedYield: number
  ) {
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
  const props = _.range(0, length).map(num => `prop${num}`);
  const values = _.range(0, length).map(num => `values${num}`);

  return {
    props,
    values,
  };
}
