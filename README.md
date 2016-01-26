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

```javascript
var ensure = require('guard-me').ensure

var guard = ensure.that((check, object) => {
  check(object.title).required().length(1, 20)
  check(object.slug).required().message("Slug is mandatory! It's currently empty")
  check(object.tags).length(1, 3)
})

//Example A
var request = {
  title: 'Garmin Swim',
  slug: 'garmin-swim',
  tags: ['watch', 'garmin', 'sports']
}

guard.check(request).then((result) => {
  console.log(result.valid); //output: true
})

//Example B
var request = {
  title: 'Garmin Swim',
  slug: '',
  tags: []
}

guard.check(request).then((result) => {
  console.log(result.valid); //output: false

  console.log(result.errors[0].property); //output: slug
  console.log(result.errors[0].messages[0]); //output: Slug is mandatory! It's currently empty

  console.log(result.errors[1].property); //output: tags
  console.log(result.errors[1].messages[0]); //output: Tags must have between 1 and 3 elements
})
```
