###Work is still in progress!

[![Build Status](https://travis-ci.org/goenning/guard-me.svg?branch=master)](https://travis-ci.org/goenning/guard-me)
[![npm version](https://badge.fury.io/js/guard-me.svg)](https://badge.fury.io/js/guard-me)

#guard-me

`guard-me` is next-generation validation library for node.js.

Features:
- `Decouples` your validation from the rest of the code
- Written in TypeScript. This means `Definition Files (.d.ts)` files are bundled within the package

Built-in validators:
- equal
- not equal
- required
- length (min, max)
- Do anything you want with `custom` validation! Supports Sync and Async validations using Promises

####Javascript example
```javascript
var ensure = require('guard-me').ensure

var request = {
  title: 'Garmin Swim',
  slug: 'garmin-swim'
}

var guard = ensure((check, object) => {
  check(object.title).length(1, 20).must((r) => {
    return r != 'Garmin Swim';
  })
})

guard.check(request).then((result) => {
  console.log(result.valid); //false
})
```

####TypeScript example
```ts
import {ensure} from 'guard-me'

var request = {
  title: 'Garmin Swim',
  slug: 'garmin-swim'
}

var guard = ensure((check, object) => {
  check(object.title).length(1, 20).must(r => {
    return r != 'Garmin Swim';
  })
})

var execute = (async () => {
  var result = await guard.check(request)
  console.log(result.valid); //false
})()
```
