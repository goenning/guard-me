###Work is still in progress!

#guard-me

`guard-me` is next-generation validation library for node.js.

It's full

```
var pg = require('pg-run')(require('pg'))

pg.connString = '<your connection string goes here>'

pg(function*() {
  yield pg.query('CREATE TEMP TABLE foo(id serial, name varchar(50))')
  yield pg.query('INSERT INTO foo VALUES (1, \'John\')')
  yield pg.query('INSERT INTO foo VALUES (2, \'Bob\')')

  var result = yield pg.query('SELECT COUNT(*)::int as count FROM foo')
  console.log(result.rows);
})
```

###ES6 is mandatory! (Node v4.0.0+)