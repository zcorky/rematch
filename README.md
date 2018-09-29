# rematch

[![NPM version](https://img.shields.io/npm/v/@zcorky/rematch.svg?style=flat)](https://www.npmjs.com/package/@zcorky/rematch)
[![Coverage Status](https://img.shields.io/coveralls/zcorky/rematch.svg?style=flat)](https://coveralls.io/r/zcorky/rematch)
[![Dependencies](https://david-dm.org/@zcorky/rematch/status.svg)](https://david-dm.org/@zcorky/rematch)
[![Build Status](https://travis-ci.com/zcorky/rematch.svg?branch=master)](https://travis-ci.com/zcorky/rematch)
![license](https://img.shields.io/github/license/zcorky/rematch.svg)
[![issues](https://img.shields.io/github/issues/zcorky/rematch.svg)](https://github.com/zcorky/rematch/issues)

> Stop `switch`, love `rematch` with Redux.

### Install

```
$ npm install @zcorky/rematch
```

### Usage

```javascript
import rematch from '@zcorky/rematch';

// before
export function app(state, action) {
	switch(action.type) {
		case '+':
			return { ...state, value: state.value + action.payload };
		case '-':
			return { ...state, value: state.value - action.payload };
		case 'x':
			return { ...state, value: state.value * action.payload };
		case '/':
			return { ...state, value: state.value / action.payload };
		// ....
		default:
			return state;
	}
}

// after
export const app = rematch({
	'+': (state, action) => ({ ...state, value: state.value + action.payload }),
	'-': (state, action) => ({ ...state, value: state.value - action.payload }),
	'x': (state, action) => ({ ...state, value: state.value * action.payload }),
	'/': (state, action) => ({ ...state, value: state.value / action.payload }),
	// ...
});
```