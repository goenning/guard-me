###Work is still in progress!

[![Build Status](https://travis-ci.org/goenning/guard-me.svg?branch=master)](https://travis-ci.org/goenning/guard-me)
[![npm version](https://badge.fury.io/js/guard-me.svg)](https://badge.fury.io/js/guard-me)

#guard-me

`guard-me` is next-generation validation library for node.js.

Features:
- Written in TypeScript, `.d.ts` files are bundled within the package

Built-in validations:
- equal
- length (min, max)

Do anything you want with `custom` validation! Supports Sync and Async code using Promises

####Javascript example
```
var ensure = require('guard-me').ensure

var request = {
  title: 'Garmin Swim',
  slug: 'garmin-swim'
}

var guard = ensure((check, object) => {
  check(object.title).length(1, 20).custom((r) => {
    return Promise.resolve(r != 'Garmin Swim');
  })
})

await guard.check(request).then((result) => {
  console.log(result.valid); //false
})
```

####TypeScript example
```
import {ensure} from 'guard-me'

interface SaveProductRequest {
  title:string,
  slug:string
}

var request:SaveProductRequest = {
  title: 'Garmin Swim',
  slug: 'garmin-swim'
}

var guard = ensure<SaveProductRequest>((check, object) => {
  check(object.title).length(1, 20).custom(async (r) => {
    return r != 'Garmin Swim';
  })
})

var execute = (async () => {
  var result = await guard.check(request)
  console.log(result.valid); //false
})()
```

TODO: Features, docs, how-to, demo

###ES6 is mandatory! (Node v4.0.0+)
