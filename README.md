[![Build Status](https://travis-ci.org/goenning/guard-me.svg?branch=master)](https://travis-ci.org/goenning/guard-me)
[![npm version](https://badge.fury.io/js/guard-me.svg)](https://badge.fury.io/js/guard-me)

# guard-me

`guard-me` is a next-generation validation library for node.js. It is highly inspired on [JeremySkinner/FluentValidation](https://github.com/JeremySkinner/FluentValidation) for .NET.

> Decouple now your validation from the rest of the code!

## Example

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

It is written in TypeScript. This means `Definition Files (.d.ts)` files are bundled within the package.

Built-in validators:
- equal
- not equal
- required
- is in (...)
- matches a RegExp
- greater than or equal to
- less than or equal to
- length (min, max)
- Do anything you want with `must` validation! Supports Sync and Async validations using Promises

### Work is still in progress. And i need you!

Version `1.0.0` is planned to be the first stable release. There is no due date by now.
Please share with us your suggestions, feature request, bug report, code review, better docs, start a discussion, anything.
Feel free to submit a new issue for any matter.
