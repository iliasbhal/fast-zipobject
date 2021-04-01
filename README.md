# :package: :sparkles: fast-zipobject

<p>
  <a href="https://www.npmjs.com/package/fast-zipobject"><img src="https://badge.fury.io/js/fast-zipobject.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/fast-zipobject"><img src="https://img.shields.io/npm/dw/fast-zipobject" alt="downloads per week"></a>
  <a href="https://bundlephobia.com/result?p=fast-zipobject"><img src="https://img.shields.io/bundlephobia/min/fast-zipobject" alt="bundle size"></a>
  <a href="https://github.com/iliasbhal/fast-zipobject/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="fast-zipobject is released under the MIT license." />
  </a>
</p>

## Installation
```bash
yarn add fast-zipobject
```
## Example

Simply call the function like you normally would using lodash.
The function expect two arrays: one of property identifiers and one of corresponding values

```tsx
import fastZipObject from 'fast-zipobject';

const obj = fastZipObject(['a', 'b'], [1, 2]);
// => { 'a': 1, 'b': 2 }
```
